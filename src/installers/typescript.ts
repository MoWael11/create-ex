import fs from 'fs-extra';
import path from 'path';
import { PackageJson } from 'type-fest';

import { PKG_ROOT } from '@/consts.js';
import { addPackageDependency } from '@/utils/addPackageDependency.js';
import { type Installer } from './index.js';

export const typescriptInstaller: Installer = ({ projectDir, packages }) => {
  addPackageDependency({
    projectDir,
    devMode: true,
    dependencies: [
      'tsup',
      'tslib',
      'typescript',
      'rimraf',
      '@types/node',
      '@types/body-parser',
      '@types/cors',
      '@types/express',
    ],
  });

  const usingDb = packages.prisma.inUse || packages.drizzle.inUse;
  const extrasDir = path.join(PKG_ROOT, 'template/extras');

  const tsCfgSrc = path.join(extrasDir, 'config/tsconfig.json');
  const tsCfgDest = path.join(projectDir, 'tsconfig.json');

  const tsupCfgSrc = path.join(extrasDir, 'config/tsup.config.ts');
  const tsupCfgDest = path.join(projectDir, 'tsup.config.ts');

  const typesEnvFile = usingDb ? 'env-with-db.d.ts' : 'env.d.ts';
  const typesEnvSrc = path.join(extrasDir, 'src/ts/types', typesEnvFile);
  const typesEnvDest = path.join(projectDir, 'src/types/env.d.ts');

  const pkgJsonPath = path.join(projectDir, 'package.json');
  const pkgJson = fs.readJsonSync(pkgJsonPath) as PackageJson;
  pkgJson.scripts = {
    ...pkgJson.scripts,
    build: 'rimraf dist && tsup',
    dev: 'tsup --watch',
    clean: 'rimraf dist',
    start: 'node dist/index.js',
  };

  delete pkgJson.dependencies!['module-alias'];
  delete pkgJson.devDependencies!['nodemon'];

  fs.copySync(tsCfgSrc, tsCfgDest);
  fs.copySync(tsupCfgSrc, tsupCfgDest);
  fs.copySync(typesEnvSrc, typesEnvDest);
  fs.writeJsonSync(pkgJsonPath, pkgJson, { spaces: 2 });
};
