import * as p from '@clack/prompts';
import chalk from 'chalk';
import { Command } from 'commander';

import { CREATE_EX, DEFAULT_APP_NAME } from '@/consts.js';

import {
  type AvailablePackages,
  type DatabaseProvider,
} from '@/installers/index.js';
import { getVersion } from '@/utils/getExVersion.js';
import { getUserPkgManager } from '@/utils/getUserPkgManager.js';
import { IsTTYError } from '@/utils/isTTYError.js';
import { logger } from '@/utils/logger.js';
import { validateAppName } from '@/utils/validateAppName.js';
import { validateImportAlias } from '@/utils/validateImportAlias.js';

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
  importAlias: string;
}

interface CliResults {
  appName: string;
  packages: AvailablePackages[];
  databaseProvider: DatabaseProvider;
  flags: CliFlags;
}

const defaultOptions: CliResults = {
  appName: DEFAULT_APP_NAME,
  packages: ['prisma', 'typescript', 'eslint'],
  databaseProvider: 'postgres',
  flags: {
    noGit: false,
    noInstall: false,
    default: false,
    importAlias: '@/',
  },
};

export const runCli = async (): Promise<CliResults> => {
  const cliResults = defaultOptions;

  const program = new Command()
    .name(CREATE_EX)
    .description('A CLI for creating express app')
    .argument(
      '[dir]',
      'The name of the application, as well as the name of the directory to create',
    )
    .option(
      '--noGit',
      'Explicitly tell the CLI to not initialize a new git repo in the project',
      false,
    )
    .option(
      '--noInstall',
      "Explicitly tell the CLI to not run the package manager's install command",
      false,
    )
    .option(
      '-y, --default',
      'Bypass the CLI and use all default options to bootstrap a new ex-app',
      false,
    )
    .version(getVersion(), '-v, --version', 'Display the version number')
    .addHelpText(
      'afterAll',
      `\n The ex stack was inspired by ${chalk
        .hex('#E8DCFF')
        .bold('@MoWael11')}`,
    )
    .parse(process.argv);

  // Needs to be separated outside the if statement to correctly infer the type as string | undefined
  const cliProvidedName: string | undefined = program.args[0];

  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }

  cliResults.flags = { ...cliResults.flags, ...program.opts() };

  if (cliResults.flags.default) {
    return cliResults;
  }

  try {
    const pkgManager = getUserPkgManager();

    const project = await p.group(
      {
        ...(!cliProvidedName && {
          name: () =>
            p.text({
              message: 'What will your project be called?',
              defaultValue: cliProvidedName,
              validate: validateAppName,
              placeholder: DEFAULT_APP_NAME,
            }),
        }),
        language: () => {
          return p.select({
            message: 'Will you be using TypeScript or JavaScript?',
            options: [
              { value: 'typescript', label: 'TypeScript' },
              { value: 'javascript', label: 'JavaScript' },
            ],
            initialValue: 'typescript',
          });
        },
        database: () => {
          return p.select({
            message: 'What database ORM would you like to use?',
            options: [
              { value: 'none', label: 'None' },
              { value: 'prisma', label: 'Prisma' },
            ],
            initialValue: 'none',
          });
        },
        databaseProvider: ({ results }) => {
          if (results.database === 'none') return;
          return p.select({
            message: 'What database provider would you like to use?',
            options: [
              { value: 'sqlite', label: 'SQLite' },
              { value: 'mysql', label: 'MySQL' },
              { value: 'postgres', label: 'PostgreSQL' },
              { value: 'mongodb', label: 'MongoDB' },
              { value: 'planetscale', label: 'PlanetScale' },
            ],
            initialValue: 'sqlite',
          });
        },
        eslint: () => {
          return p.confirm({
            message: 'Would you like to use ESLint for linting?',
            initialValue: true,
          });
        },
        ...(!cliResults.flags.noGit && {
          git: () => {
            return p.confirm({
              message:
                'Should we initialize a Git repository and stage the changes?',
              initialValue: !defaultOptions.flags.noGit,
            });
          },
        }),
        ...(!cliResults.flags.noInstall && {
          install: () => {
            return p.confirm({
              message:
                `Should we run '${pkgManager}` +
                (pkgManager === 'yarn' ? `'?` : ` install' for you?`),
              initialValue: !defaultOptions.flags.noInstall,
            });
          },
        }),
        importAlias: () => {
          return p.text({
            message: 'What import alias would you like to use?',
            defaultValue: defaultOptions.flags.importAlias,
            placeholder: defaultOptions.flags.importAlias,
            validate: validateImportAlias,
          });
        },
      },
      {
        onCancel() {
          process.exit(1);
        },
      },
    );

    const packages: AvailablePackages[] = [];
    if (project.language === 'typescript') packages.push('typescript');
    if (project.database === 'prisma') packages.push('prisma');
    if (project.eslint) packages.push('eslint');

    return {
      appName: project.name ?? cliResults.appName,
      packages,
      databaseProvider:
        (project.databaseProvider as DatabaseProvider) || 'sqlite',
      flags: {
        ...cliResults.flags,
        noGit: !project.git || cliResults.flags.noGit,
        noInstall: !project.install || cliResults.flags.noInstall,
        importAlias: project.importAlias ?? cliResults.flags.importAlias,
      },
    };
  } catch (err) {
    // If the user is not calling create-ex from an interactive terminal, inquirer will throw an IsTTYError
    // If this happens, we catch the error, tell the user what has happened, and then continue to run the program with a default express app
    if (err instanceof IsTTYError) {
      logger.warn(`
        ${CREATE_EX} needs an interactive terminal to provide options`);

      const shouldContinue = await p.confirm({
        message: `Continue scaffolding a default ex app?`,
        initialValue: true,
      });

      if (!shouldContinue) {
        logger.info('Exiting...');
        process.exit(0);
      }

      logger.info(
        `Bootstrapping a default express app in ./${cliResults.appName}`,
      );
    } else {
      throw err;
    }
  }

  return cliResults;
};
