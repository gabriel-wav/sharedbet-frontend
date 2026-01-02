import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  localhost,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'SharedBet App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    localhost,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: false, // Desabilita SSR para evitar problemas com wagmi
});