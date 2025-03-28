<p align="center">
  <img src="./ex-logo.png" width="130" alt="Create Ex Logo">
</p>

<h1 align="center">create-ex</h1>

<p align="center">
  A powerful TypeScript-based CLI tool to bootstrap a modular Express API application.
</p>

<p align="center">
  <code>npm create ex@latest</code>
</p>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Community](#community)
- [Contributing](#contributing)
- [License](#license)

## Overview

Create Ex is an interactive CLI tool that eliminates the tedious setup of an Express API. Whether you need a minimal scaffold or an advanced project with database integration using Prisma, this tool has you covered.

## Features

- **TypeScript:** Entirely built in TypeScript for robust type safety
- **Modular API Structure:** Clean separation of routes, controllers, services, helpers, and mappers
- **Database Integration:** Optional Prisma support with:
  - [SQLite](https://www.sqlite.org)
  - [MySQL](https://www.mysql.com)
  - [Planetscale](https://planetscale.com)
  - [PostgreSQL](https://www.postgresql.org)
  - [MongoDB](https://www.mongodb.com)
- **Automated Setup:** Automatically initializes Git, installs dependencies, and configures your project

## Quick Start

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MoWael11/create-ex.git
   cd create-ex
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Usage

Run the CLI tool:

```bash
npm run start
```

Follow the interactive prompts to:

- Choose your API template (base or with-db)
- Select a database provider (if applicable)

## Project Structure

```bash

/src
├── cli # CLI entry point
├── helpers # Utility functions
├── installers # Integrations like Prisma
└── utils # Various helper utilities

/template
├── base # Minimal API template
└── extras # API template with optional database support
```

## Community

Need help or want to share your ideas?

- Open an issue on GitHub
- Join our Discord

## Contributing

We welcome contributions! See our [CONTRIBUTING.md](https://github.com/MoWael11/create-ex/blob/main/CONTRIBUTING.md) for more details on how to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/MoWael11/create-ex/blob/main/LICENSE) file for details.
