import path from 'path';
import fs from 'fs-extra';
import { type PackageJson } from 'type-fest';

import { PKG_ROOT } from '@/consts.js';
import { type Installer } from '@/installers/index.js';
import { addPackageDependency } from '@/utils/addPackageDependency.js';

export const prismaInstaller: Installer = ({
  projectDir,
  databaseProvider,
}) => {
  addPackageDependency({
    projectDir,
    dependencies: ['prisma'],
    devMode: true,
  });
  addPackageDependency({
    projectDir,
    dependencies: ['@prisma/client'],
    devMode: false,
  });
  if (databaseProvider === 'planetscale')
    addPackageDependency({
      projectDir,
      dependencies: ['@prisma/adapter-planetscale', '@planetscale/database'],
      devMode: false,
    });

  const templateDir = path.join(PKG_ROOT, 'template');

  const schemaSrc = path.join(
    templateDir,
    'extras/prisma/schema',
    `${
      databaseProvider === 'planetscale'
        ? 'planetscale'
        : databaseProvider === 'mongodb'
        ? 'mongodb'
        : 'base'
    }.prisma`,
  );

  let schemaText = fs.readFileSync(schemaSrc, 'utf-8');
  // that because the base.prisma has the same configuration for different db provders like postgresql, mysql, mongo
  if (databaseProvider !== 'sqlite') {
    schemaText = schemaText.replace(
      'provider = "sqlite"',
      `provider = "${
        {
          mysql: 'mysql',
          postgres: 'postgresql',
          planetscale: 'mysql',
          mongodb: 'mongodb',
        }[databaseProvider]
      }"`,
    );
  }

  const schemaDest = path.join(projectDir, 'prisma/schema.prisma');
  fs.mkdirSync(path.dirname(schemaDest), { recursive: true });
  fs.writeFileSync(schemaDest, schemaText);

  const clientSrc = path.join(
    templateDir,
    'extras/src/db',
    databaseProvider === 'planetscale'
      ? 'db-prisma-planetscale.ts'
      : 'db-prisma.ts',
  );

  const clientDest = path.join(projectDir, 'src/db/prisma.ts');

  // add postinstall and push script to package.json
  const packageJsonPath = path.join(projectDir, 'package.json');

  const packageJsonContent = fs.readJSONSync(packageJsonPath) as PackageJson;
  packageJsonContent.scripts = {
    ...packageJsonContent.scripts,
    postinstall: 'prisma generate',
    'db:push': 'prisma db push',
    'db:studio': 'prisma studio',
    'db:generate': 'prisma migrate dev',
    'db:migrate': 'prisma migrate deploy',
  };

  fs.copySync(clientSrc, clientDest);
  fs.writeJSONSync(packageJsonPath, packageJsonContent, {
    spaces: 2,
  });
};
