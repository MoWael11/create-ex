import path from 'path';
import fs from 'fs-extra';

import { PKG_ROOT } from '@/consts.js';
import { type InstallerOptions } from '@/installers/index.js';

type SelectBoilerplateProps = Required<
  Pick<InstallerOptions, 'packages' | 'projectDir'>
>;

export const selectEnvFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const EnvFileDir = path.join(PKG_ROOT, 'template/extras/src/env');

  const usingDb = packages.prisma.inUse;
  let envFile = '_base';

  if (usingDb) {
    envFile = '_with-db';
  }

  const appSrc = path.join(EnvFileDir, envFile);
  const appDest = path.join(projectDir, '.env.local');
  fs.copySync(appSrc, appDest);
};

export const selectFiles = (
  { projectDir, packages }: SelectBoilerplateProps,
  folders: string[],
) => {
  const usingDb = packages.prisma.inUse;

  for (const folder of folders) {
    const sourceDir = path.join(PKG_ROOT, `template/extras/src/${folder}`);

    const destDir = path.join(projectDir, `src/${folder}`);
    fs.mkdirSync(destDir, { recursive: true });

    const files = fs.readdirSync(sourceDir);

    for (const file of files) {
      const fileSrc = path.join(sourceDir, file);
      const fileDest = path.join(destDir, file);

      if (fs.statSync(fileSrc).isFile()) {
        fs.copyFileSync(fileSrc, fileDest);
      } else if (fs.statSync(fileSrc).isDirectory()) {
        const baseFile = path.join(fileSrc, 'base.ts');
        const dbFile = path.join(fileSrc, 'with-db.ts');
        const sourceFile = usingDb ? dbFile : baseFile;

        const folderName = path.basename(fileSrc);
        const destFile = path.join(destDir, `${folderName}.ts`);

        fs.copyFileSync(sourceFile, destFile);
      }
    }
  }
};
