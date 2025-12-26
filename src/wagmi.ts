import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  hardhat, // <--- 1. Importei isto
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'SharedBet App', // Podes mudar o nome aqui se quiseres
  projectId: 'YOUR_PROJECT_ID', // Podes deixar assim para teste local
  chains: [
    hardhat, // <--- 2. Adicionei aqui (IMPORTANTE: deixa em primeiro para testes)
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});