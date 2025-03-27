import path from 'path';

import { installPackages } from '@/helpers/installPackages.js';
import { scaffoldProject } from '@/helpers/scaffoldProject.js';
import {
  selectEnvFile,
  selectFiles,
  selectIndexFile,
} from '@/helpers/selectBoilerplate.js';
import {
  type DatabaseProvider,
  type PkgInstallerMap,
} from '@/installers/index.js';
import { getUserPkgManager } from '@/utils/getUserPkgManager.js';

interface CreateProjectOptions {
  projectName: string;
  packages: PkgInstallerMap;
  scopedAppName: string;
  noInstall: boolean;
  importAlias: string;
  databaseProvider: DatabaseProvider;
}

export const createProject = async ({
  projectName,
  scopedAppName,
  packages,
  noInstall,
  databaseProvider,
}: CreateProjectOptions) => {
  const pkgManager = getUserPkgManager();
  const projectDir = path.resolve(process.cwd(), projectName);

  // Bootstraps the base express application
  await scaffoldProject({
    projectName,
    projectDir,
    pkgManager,
    noInstall,
  });

  // Install the selected packages
  installPackages({
    projectName,
    scopedAppName,
    projectDir,
    pkgManager,
    packages,
    noInstall,
    databaseProvider,
  });

  selectIndexFile({ packages, projectDir });
  selectEnvFile({ packages, projectDir, databaseProvider });

  // Copy additional project structure folders
  const folders = [
    'controllers',
    'mappers',
    'models',
    'routes',
    'services',
    'utils',
    'config',
    'middlewares',
    'helpers',
  ];
  selectFiles({ packages, projectDir }, folders);

  return projectDir;
};
