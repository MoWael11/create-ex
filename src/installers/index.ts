import { type PackageManager } from '@/utils/getUserPkgManager.js';
import { eslintInstaller } from './eslint.js';
import { prismaInstaller } from './prisma.js';
import { typescriptInstaller } from './typescript.js';
import { socketIOInstaller } from './socket-io.js';
import { drizzleInstaller } from './drizzle.js';

// Turning this into a const allows the list to be iterated over for programmatically creating prompt options
// Should increase extensibility in the future
export const availablePackages = ['typescript', 'socket-io', 'prisma', 'drizzle', 'eslint'] as const;
export type AvailablePackages = (typeof availablePackages)[number];

export const databaseProviders = ['mysql', 'postgres', 'sqlite', 'planetscale', 'mongodb'] as const;
export type DatabaseProvider = (typeof databaseProviders)[number];

export interface InstallerOptions {
  projectDir: string;
  pkgManager: PackageManager;
  noInstall: boolean;
  packages: PkgInstallerMap;
  projectName: string;
  scopedAppName: string;
  databaseProvider: DatabaseProvider;
}

export type Installer = (opts: InstallerOptions) => void;

export type PkgInstallerMap = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

export const buildPkgInstallerMap = (packages: AvailablePackages[]): PkgInstallerMap => ({
  typescript: {
    inUse: packages.includes('typescript'),
    installer: typescriptInstaller,
  },
  'socket-io': {
    inUse: packages.includes('socket-io'),
    installer: socketIOInstaller,
  },
  prisma: {
    inUse: packages.includes('prisma'),
    installer: prismaInstaller,
  },
  drizzle: {
    inUse: packages.includes('drizzle'),
    installer: drizzleInstaller,
  },
  eslint: {
    inUse: packages.includes('eslint'),
    installer: eslintInstaller,
  },
});
