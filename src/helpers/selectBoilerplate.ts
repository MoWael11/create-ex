import path from 'path';
import fs from 'fs-extra';

import { PKG_ROOT } from '@/consts.js';
import { type InstallerOptions } from '@/installers/index.js';

type SelectBoilerplateProps = Required<Pick<InstallerOptions, 'packages' | 'projectDir'>>;

type SelectEnvBoilerplateProps = Required<Pick<InstallerOptions, 'packages' | 'projectDir' | 'databaseProvider'>>;

export const selectIndexFile = ({ projectDir, packages }: SelectBoilerplateProps) => {
  const usingTS = packages.typescript.inUse;

  const subFolder = usingTS ? 'ts' : 'js';
  const ext = usingTS ? 'ts' : 'js';

  const IndexFileDir = path.join(PKG_ROOT, `template/extras/src/${subFolder}/index`);

  const usingDb = packages.prisma.inUse || packages.drizzle.inUse;
  const usingSocketIO = packages['socket-io'].inUse;

  let indexFile = `base.${ext}`;

  if (usingDb && usingSocketIO) {
    indexFile = `with-db-socket-io.${ext}`;
  } else if (usingDb) {
    indexFile = `with-db.${ext}`;
  } else if (usingSocketIO) {
    indexFile = `with-socket-io.${ext}`;
  }

  const indexSrc = path.join(IndexFileDir, indexFile);
  const indexDest = path.join(projectDir, `src/index.${ext}`);
  fs.copySync(indexSrc, indexDest);
};

export const selectEnvFile = ({ projectDir, packages, databaseProvider }: SelectEnvBoilerplateProps) => {
  const envFileDir = path.join(PKG_ROOT, 'template/extras/config/env');
  const envDest = path.join(projectDir, '.env');

  const usingPrisma = packages.prisma.inUse;
  const usingDrizzle = packages.drizzle.inUse;
  const usingDb = usingPrisma || usingDrizzle;

  const envFile = usingDb ? '_with-db' : '_base';
  const envSrc = path.join(envFileDir, envFile);

  if (usingDb) {
    const databaseUrls = {
      mysql: 'mysql://<DATABASE_USERNAME>@127.0.0.1:3306/<DATABASE_NAME>',
      sqlite: usingPrisma ? 'file:../data/db/dev.db' : 'file:./data/db/dev.db',
      postgres: 'postgresql://<DATABASE_USERNAME>:<DATABASE_PASSWORD>@localhost:5432/<DATABASE_NAME>?schema=public',
      planetscale:
        'mysql://<DATABASE_USERNAME>:<DATABASE_PASSWORD>@aws.connect.psdb.cloud/<DATABASE_NAME>?sslaccept=strict',
      mongodb: 'mongodb://<DATABASE_USERNAME>:<DATABASE_PASSWORD>@localhost:27017/<DATABASE_NAME>',
    };

    const connectionString = databaseUrls[databaseProvider];

    let envText = fs.readFileSync(envSrc, 'utf-8');
    envText = envText.replace('DATABASE_URL=""', `DATABASE_URL="${connectionString}"`);

    fs.writeFileSync(envDest, envText);
  } else {
    fs.copySync(envSrc, envDest);
  }
};

/**
 * Copies files from template folders to the project directory.
 * For regular files, it copies them directly.
 * For subdirectories, it selects the appropriate file (base.ts or with-db.ts) and copies it, to the destination with the folder name as the filename.
 */
export const selectFiles = ({ projectDir, packages }: SelectBoilerplateProps, folders: string[]) => {
  const usingPrisma = packages.prisma.inUse;
  const usingDrizzle = packages.drizzle.inUse;
  const usingTS = packages.typescript.inUse;

  const subFolder = usingTS ? 'ts' : 'js';
  const ext = usingTS ? 'ts' : 'js';

  for (const folder of folders) {
    const sourceDir = path.join(PKG_ROOT, `template/extras/src/${subFolder}/${folder}`);
    const files = fs.readdirSync(sourceDir);

    const destDir = path.join(projectDir, `src/${folder}`);

    for (const file of files) {
      const fileSrc = path.join(sourceDir, file);
      const fileDest = path.join(destDir, file);

      if (fs.statSync(fileSrc).isFile()) {
        fs.copySync(fileSrc, fileDest);
      } else if (fs.statSync(fileSrc).isDirectory()) {
        let fileName = `base.${ext}`;
        if (usingPrisma) {
          fileName = `with-prisma.${ext}`;
        } else if (usingDrizzle) {
          fileName = `with-drizzle.${ext}`;
        }

        const srcFile = path.join(fileSrc, fileName);
        const folderName = path.basename(fileSrc);
        const destFile = path.join(destDir, `${folderName}.${ext}`);

        fs.copySync(srcFile, destFile);
      }
    }
  }
};
