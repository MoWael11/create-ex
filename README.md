<p align="center">
  <img src="./ex-logo.png" alt="Create Express App Logo" width="150">
</p>

<h1 align="center">Create Ex</h1>

<p align="center">
  Interactive CLI tool to bootstrap a modular typesafe Express API application.
</p>

<div align="center">

[![Express.js][express-img]][express-url]
[![NPM version][npm-img]][npm-url]
[![Downloads][downloads-img]][npm-url]
[![PRs-Welcome][contribute-img]][contribute-url]

</div>

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Interactive Mode](#interactive-mode)
  - [Non-interactive Mode](#non-interactive-mode)
  - [Cli Options](#cli-options)
- [Community](#community)
- [Contributing](#contributing)
- [License](#license)

## Overview

`create-ex` is designed to kickstart your Express projects with best practices built in. It consists of:

- **TypeScript:** Built entirely with TypeScript
- **Modular API Structure:** Routes, controllers, services, and mappers
- **Optional Database Integration:** Optional Prisma or Drizzle support with multiple database providers:
  - [SQLite](https://www.sqlite.org)
  - [MySQL](https://www.mysql.com)
  - [Planetscale](https://planetscale.com)
  - [PostgreSQL](https://www.postgresql.org)
  - [MongoDB](https://www.mongodb.com)
- **Optional Web Socket Integration:** Real-time communication using Socket.IO with modular event handling
- **Automated Setup:** Initialize Git, install dependencies, and configure project settings effortlessly

It's a CLI tool to streamline the setup of a modular Express API application. Every component is optional, and the final template is generated based on your specific needs.
We provide our recommendations for best practices, but ultimately, the decisions are yours.

## Getting Started

### Interactive Mode

The easiest way to get started is by using the interactive CLI. Run one of the commands below and follow the prompts to configure your new Express project:

```bash
# npm
npx create-ex@latest

# yarn
yarn create ex

# pnpm
pnpm create ex@latest

# bun
bun create ex@latest
```

### Non-interactive Mode

If you prefer to create a new project without interactive prompts, you can pass command-line options. For example, run:

```bash
npx create-ex my-app --noGit --noInstall -y
```

### Cli Options

When you run `npx create-ex --help`, you'll see a summary of available options:

```bash
Usage: create-ex [options] [dir]

Arguments:
  dir            The name of the application, as well as the name of the directory to create

Options:
  --noGit        Explicitly tell the CLI to not initialize a new Git repo in the project
  --noInstall    Explicitly tell the CLI to not run the package manager install command
  -y, --default  Bypass the CLI and use all default options to bootstrap a new ex-app
  -v, --version  Display the version number
  -h, --help     display help for command
```

## Community

We believe in building a supportive ecosystem. If you have questions or need help:

- [Open an issue](https://github.com/MoWael11/create-ex/issues/new) on our repository.

## Contributing

We welcome contributions to improve Create Express App! Please see our [CONTRIBUTING.md](https://github.com/MoWael11/create-ex/blob/main/CONTRIBUTING.md) for more details on how to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/MoWael11/create-ex/blob/main/LICENSE) file for details.

[downloads-img]: https://img.shields.io/npm/dm/create-ex?color=364fc7&logoColor=364fc7
[npm-url]: https://www.npmjs.com/package/create-ex
[npm-img]: https://img.shields.io/npm/v/create-ex?color=08ad52&logoColor=0b7285
[contribute-url]: https://github.com/MoWael11/create-ex/blob/main/CONTRIBUTING.md
[contribute-img]: https://img.shields.io/badge/PRs-welcome-blue.svg
[express-url]: https://expressjs.com
[express-img]: https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB
