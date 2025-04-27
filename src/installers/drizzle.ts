import fs from 'fs-extra';
import path from 'path';
import { type PackageJson } from 'type-fest';

import { PKG_ROOT } from '@/consts.js';
import { type Installer } from '@/installers/index.js';
import { addPackageDependency } from '@/utils/addPackageDependency.js';

export const drizzleInstaller: Installer = ({ projectDir, databaseProvider, packages }) => {
  addPackageDependency({
    projectDir,
    dependencies: ['drizzle-kit'],
    devMode: true,
  });

  addPackageDependency({
    projectDir,
    dependencies: [
      'drizzle-orm',
      (
        {
          mysql: 'mysql2',
          postgres: 'pg',
          sqlite: '@libsql/client',
          planetscale: '@planetscale/database',
        } as const
      )[databaseProvider as 'mysql' | 'postgres' | 'sqlite' | 'planetscale'],
    ],
    devMode: false,
  });

  if (databaseProvider === 'postgres')
    addPackageDependency({
      projectDir,
      dependencies: ['@types/pg'],
      devMode: true,
    });

  const usingTS = packages.typescript.inUse;

  const subFolder = usingTS ? 'ts' : 'js';
  const ext = usingTS ? 'ts' : 'js';

  const extrasDir = path.join(PKG_ROOT, 'template/extras');

  const schemaSrc = path.join(extrasDir, `src/${subFolder}/db/drizzle-schema`, `with-${databaseProvider}.${ext}`);
  const schemaDest = path.join(projectDir, `src/db/schema.${ext}`);

  const clientSrc = path.join(extrasDir, `src/${subFolder}/db/drizzle-index`, `with-${databaseProvider}.${ext}`);
  const clientDest = path.join(projectDir, `src/db/index.${ext}`);

  const configSrc = path.join(extrasDir, `config/drizzle/config.${ext}`);
  const configDest = path.join(projectDir, `drizzle.config.${ext}`);

  let configText = fs.readFileSync(configSrc, 'utf-8');
  if (databaseProvider !== 'sqlite') {
    configText = configText.replace(
      "dialect: 'sqlite'",
      `dialect: '${
        {
          mysql: 'mysql',
          postgres: 'postgresql',
          planetscale: 'mysql',
        }[databaseProvider as 'mysql' | 'postgres' | 'planetscale']
      }'`,
    );
  }

  fs.writeFileSync(configDest, configText);

  // for sqlite we need to create the folder of the local db file
  if (databaseProvider === 'sqlite') {
    fs.mkdirSync(path.join(projectDir, 'data/db'), { recursive: true });
  }

  // add postinstall and db scripts to package.json
  const packageJsonPath = path.join(projectDir, 'package.json');

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    postinstall: 'drizzle-kit generate',
    'db:push': 'drizzle-kit push',
    'db:studio': 'drizzle-kit studio',
    'db:generate': 'drizzle-kit generate',
    'db:migrate': 'drizzle-kit migrate',
  };

  fs.copySync(schemaSrc, schemaDest);
  fs.copySync(clientSrc, clientDest);
  fs.writeJSONSync(packageJsonPath, packageJsonContent, {
    spaces: 2,
  });
};
