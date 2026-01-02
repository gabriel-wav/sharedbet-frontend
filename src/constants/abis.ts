// src/constants/abis.ts
import { Address } from 'viem';

// ATENÇÃO: Cole os endereços novos do terminal aqui!
// Endereços do deploy mais recente (hardhat)
export const USDC_ADDRESS: Address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const FACTORY_ADDRESS: Address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export const FACTORY_ABI = [
  // Agora aceita asset (address) como primeiro argumento
  "function createStrategy(address asset, uint256 performanceFeeBps) external returns (address)",
  "function strategies(uint256) view returns (address vault, address strategist)",
  "function strategiesCount() view returns (uint256)",
  "event StrategyCreated(address indexed vault, address indexed strategist)"
] as const;

export const VAULT_ABI = [
  // Deposit agora recebe valor (não é mais payable nativo)
  "function deposit(uint256 amount) external",
  "function withdraw(uint256 shares) external",
  "function totalAssets() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function asset() view returns (address)"
] as const;

export const USDC_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function mint(address to, uint256 amount) external"
] as const;