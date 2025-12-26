import { createPublicClient, http, createWalletClient, custom } from 'viem'
import { localhost } from 'viem/chains'

// Reading (RPC)
export const publicClient = createPublicClient({
  chain: localhost,
  transport: http('http://127.0.0.1:8545'),
})

// Writing (wallet / MetaMask)
export const walletClient =
  typeof window !== 'undefined' && window.ethereum
    ? createWalletClient({
        chain: localhost,
        transport: custom(window.ethereum),
      })
    : null
