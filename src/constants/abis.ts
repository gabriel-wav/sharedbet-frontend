// src/constants/abis.ts

// Endereços do teu deploy local (copiados do teu terminal)
export const FACTORY_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
export const USDC_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// ABI da Factory (Para criar estratégias)
export const FACTORY_ABI = [
  "function createStrategy(uint256 performanceFeeBps) external returns (address)",
  "function strategies(uint256) view returns (address vault, address strategist)",
  "function strategiesCount() view returns (uint256)",
  "event StrategyCreated(address indexed vault, address indexed strategist)"
] as const;

// ABI do Vault (Para depositar e ver saldo)
export const VAULT_ABI = [
  "function deposit(uint256 amount) external",
  "function withdraw(uint256 shares) external",
  "function totalAssets() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function asset() view returns (address)"
] as const;

// ABI do USDC (Para dar Approve)
export const USDC_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function mint(address to, uint256 amount) external" // Apenas para o Mock!
] as const;