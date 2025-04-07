import fs from 'fs-extra';
import path from 'path';

import { PKG_ROOT } from '@/consts.js';
import { addPackageDependency } from '@/utils/addPackageDependency.js';
import { type Installer } from './index.js';

export const socketIOInstaller: Installer = ({ projectDir, packages }) => {
  const usingTs = packages.typescript.inUse;

  addPackageDependency({
    projectDir,
    devMode: false,
    dependencies: ['socket.io'],
  });

  const extrasDir = path.join(PKG_ROOT, 'template/extras');

  const socketIOSrc = path.join(extrasDir, `src/${usingTs ? 'ts' : 'js'}/socket`);

  const socketIODest = path.join(projectDir, 'src/socket');

  fs.copySync(socketIOSrc, socketIODest);
};
