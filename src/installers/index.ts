import { prismaInstaller } from './prisma.js';
import { type PackageManager } from '@/utils/getUserPkgManager.js';
import { typescriptInstaller } from './typescript.js';

// Turning this into a const allows the list to be iterated over for programmatically creating prompt options
// Should increase extensibility in the future
export const availablePackages = ['prisma', 'typescript'] as const;
export type AvailablePackages = (typeof availablePackages)[number];

export const databaseProviders = [
  'mysql',
  'postgres',
  'sqlite',
  'planetscale',
  'mongodb',
] as const;
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

export const buildPkgInstallerMap = (
  packages: AvailablePackages[],
): PkgInstallerMap => ({
  typescript: {
    inUse: packages.includes('typescript'),
    installer: typescriptInstaller,
  },
  prisma: {
    inUse: packages.includes('prisma'),
    installer: prismaInstaller,
  },
});
