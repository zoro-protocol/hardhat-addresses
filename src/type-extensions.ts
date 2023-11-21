import "hardhat/types/config";
import "hardhat/types/runtime";

declare module "hardhat/types/config" {
  export interface ProjectPathsUserConfig {
    addresses?: string;
  }

  export interface ProjectPathsConfig {
    addresses: string;
  }
}

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    recordAddress: (path: string, name: string, address: string) => void;
    getAddress: (path: string, name: string) => string;
  }
}
