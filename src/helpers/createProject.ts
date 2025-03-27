import fs from 'fs';
import path from 'path';

import { PKG_ROOT } from '@/consts.js';
import { installPackages } from '@/helpers/installPackages.js';
import { scaffoldProject } from '@/helpers/scaffoldProject.js';
import { selectEnvFile, selectFiles } from '@/helpers/selectBoilerplate.js';
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
  const templateDir = path.join(PKG_ROOT, 'template');

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

  // Copy additional project structure folders
  const folders = [
    'index',
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
  selectEnvFile({ packages, projectDir });
  selectFiles({ packages, projectDir }, folders);

  return projectDir;
};
