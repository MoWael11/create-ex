import fs from 'fs-extra';
import path from 'path';
import { PackageJson } from 'type-fest';

import { PKG_ROOT } from '@/consts.js';
import { addPackageDependency } from '@/utils/addPackageDependency.js';
import { type Installer } from './index.js';

export const eslintInstaller: Installer = ({ projectDir, packages, pkgManager }) => {
  const usingTs = packages.typescript.inUse;

  addPackageDependency({
    projectDir,
    devMode: true,
    dependencies: [
      'eslint',
      'globals',
      ...(usingTs ? (['typescript-eslint', '@typescript-eslint/parser'] as const) : []),
    ],
  });

  const extrasDir = path.join(PKG_ROOT, 'template/extras');

  const eslintSrc = path.join(extrasDir, `config/eslint/${usingTs ? 'ts' : 'js'}.config.js`);
  const eslintDest = path.join(projectDir, 'eslint.config.js');

  const pkgJsonPath = path.join(projectDir, 'package.json');
  const pkgJson = fs.readJsonSync(pkgJsonPath) as PackageJson;

  const lintCommand = `eslint src/**/*.${usingTs ? 'ts' : '{js,cjs,mjs}'}`;
  const runPrefix = ['npm', 'bun'].includes(pkgManager) ? 'run ' : '';

  // Update package.json scripts
  pkgJson.scripts = {
    ...pkgJson.scripts,
    lint: lintCommand,
    ...(usingTs ? { prebuild: `${pkgManager} ${runPrefix}lint` } : {}),
  };

  fs.copySync(eslintSrc, eslintDest);
  fs.writeJsonSync(pkgJsonPath, pkgJson, { spaces: 2 });
};
