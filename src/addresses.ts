import path from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import _ from "lodash";
import { getChainId } from "./utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { AddressConfig } from "./types";

export const DEFAULT_ADDRESSES_PATH = "addresses";
export const DEFAULT_ADDRESSES_FILE = "main";

function getPath(hre: HardhatRuntimeEnvironment, file: string): string {
  if (path.isAbsolute(file)) {
    return file;
  } else {
    return path.normalize(path.join(hre.config.paths.addresses, file));
  }
}

function getAddressAll(path: string): AddressConfig {
  let addresses: AddressConfig = {};

  if (existsSync(path)) {
    const json: string = readFileSync(path, "utf8");
    addresses = JSON.parse(json);
  }

  return addresses;
}

export function getAddress(hre: HardhatRuntimeEnvironment, file: string, name: string): string {
  const addressesPath = getPath(hre, file);
  const addresses: AddressConfig = getAddressAll(addressesPath);
  const chainId: number = getChainId(hre);

  const address: string = addresses[name][chainId];

  if (address === undefined) {
    throw new Error(`Address for ${name} on chain ID ${chainId} not configured`);
  }

  return address;
}

export function recordAddress(
  hre: HardhatRuntimeEnvironment,
  file: string,
  name: string,
  address: string
): void {
  const addressesPath = getPath(hre, file);
  const addresses: AddressConfig = getAddressAll(addressesPath);

  const chainId: number = getChainId(hre);
  const newAddresses: AddressConfig = { [name]: { [chainId]: address } };
  const updatedAddresses: AddressConfig = _.merge(addresses, newAddresses);

  const newJson: string = JSON.stringify(updatedAddresses, null, 2);
  writeFileSync(addressesPath, newJson);
}