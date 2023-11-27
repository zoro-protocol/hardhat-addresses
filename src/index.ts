import path from "path";
import { extendConfig, extendEnvironment } from "hardhat/config";
import { lazyFunction } from "hardhat/plugins";
import { DEFAULT_ADDRESSES_PATH, getAddress, recordAddress } from "./addresses";
import { HardhatConfig, HardhatRuntimeEnvironment, HardhatUserConfig } from "hardhat/types";
import "./type-extensions";

extendConfig((config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
  const addressesPath: string | undefined = userConfig.paths?.addresses;

  let newAddressesPath: string;
  if (addressesPath === undefined) {
    newAddressesPath = path.join(config.paths.root, DEFAULT_ADDRESSES_PATH);
  } else {
    if (path.isAbsolute(addressesPath)) {
      newAddressesPath = addressesPath;
    } else {
      newAddressesPath = path.normalize(path.join(config.paths.root, addressesPath));
    }
  }

  config.paths.addresses = newAddressesPath;
});

extendEnvironment((hre: HardhatRuntimeEnvironment) => {
  hre.recordAddress = lazyFunction(() => recordAddress.bind(null, hre));
  hre.getAddress = lazyFunction(() => getAddress.bind(null, hre));
});
