# hardhat-addresses

[Hardhat](https://hardhat.org/) plugin that extends the [Hardhat Runtime Environment](https://hardhat.org/advanced/hardhat-runtime-environment) with functions to manage contract addresses.

## Installation

```bash
npm install @zoroprotocol/hardhat-addresses hardhat
```

Import the plugin in your `hardhat.config.js`:

```js
require("@zoroprotocol/hardhat-addresses");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "@zoroprotocol/hardhat-addresses";
```

## Environment extensions

This plugin extends the Hardhat Runtime Environment by adding:

- `recordAddress(file, name, address)` to record an address
- `getAddress(file, name)` to retrieve a recorded address

## Configuration

This plugin extends the `HardhatUserConfig`'s `ProjectPathsUserConfig` object with an optional
`addresses` field.

This is an example of how to set it:

```ts
const config: HardhatUserConfig = {
  paths: {
    addresses: "deploy/addresses"
  }
};
```

This will be the path in the root directory where addresses will be stored. If the field is not set, it will default to "addresses".

## Usage

There are no additional steps you need to take for this plugin to work.

The address functions will operate on files stored in the directory specified by the `paths` configuration.

The file used in the directory is specified when calling one of the address functions. This file can be formatted as a filename with no extension or as an absolute path to a file.

Examples:

```ts
getAddress("main", "project-token");
getAddress("main.json", "project-token");
getAddress("/home/enzo/zoro-addresses/main.json", "project-token");
```
