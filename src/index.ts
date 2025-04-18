#!/usr/bin/env node
import path from 'path';
import { execa } from 'execa';
import fs from 'fs-extra';
import { type PackageJson } from 'type-fest';

import { runCli } from '@/cli/index.js';
import { createProject } from '@/helpers/createProject.js';
import { initializeGit } from '@/helpers/git.js';
import { logNextSteps } from '@/helpers/logNextSteps.js';
import { setImportAlias } from '@/helpers/setImportAlias.js';
import { buildPkgInstallerMap } from '@/installers/index.js';
import { getUserPkgManager } from '@/utils/getUserPkgManager.js';
import { logger } from '@/utils/logger.js';
import { parseNameAndPath } from '@/utils/parseNameAndPath.js';
import { renderTitle } from '@/utils/renderTitle.js';
import { installDependencies } from '@/helpers/installDependencies.js';
import { getVersion } from '@/utils/getExVersion.js';

type CEXPackageJSON = PackageJson & {
  cexMetadata?: {
    initVersion: string;
  };
};

const main = async () => {
  const pkgManager = getUserPkgManager();
  renderTitle();

  const {
    appName,
    packages,
    databaseProvider,
    flags: { noGit, noInstall, importAlias },
  } = await runCli();

  const usePackages = buildPkgInstallerMap(packages);

  // e.g. dir/@mono/app returns ["@mono/app", "dir/app"]
  const [scopedAppName, appDir] = parseNameAndPath(appName);

  const projectDir = await createProject({
    projectName: appDir,
    scopedAppName,
    packages: usePackages,
    databaseProvider,
    importAlias,
    noInstall,
  });

  // Write name to package.json
  const pkgJson = fs.readJSONSync(path.join(projectDir, 'package.json')) as CEXPackageJSON;
  pkgJson.name = scopedAppName;
  pkgJson.cexMetadata = { initVersion: getVersion() };

  // ? Bun doesn't support this field (yet)
  if (pkgManager !== 'bun') {
    const { stdout } = await execa(pkgManager, ['-v'], {
      cwd: projectDir,
    });
    pkgJson.packageManager = `${pkgManager}@${stdout.trim()}`;
  }

  fs.writeJSONSync(path.join(projectDir, 'package.json'), pkgJson, {
    spaces: 2,
  });

  // update import alias in any generated files if not using the default
  if (importAlias !== '@/') {
    setImportAlias(projectDir, importAlias);
  }

  if (!noInstall) {
    await installDependencies({ projectDir });
  }

  if (!noGit) {
    await initializeGit(projectDir);
  }

  await logNextSteps({
    projectName: appDir,
    packages: usePackages,
    noInstall,
    projectDir,
  });

  process.exit(0);
};

main().catch((err) => {
  logger.error('Aborting installation...');
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error('An unknown error has occurred. Please open an issue on github with the below:');
    console.log(err);
  }
  process.exit(1);
});
