"use client";

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { celoAlfajores, goerli } from 'wagmi/chains'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { FC, ReactNode } from 'react'

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [infuraProvider({ apiKey: 'a2047ea7526243caa61bdfda4b24e4d5' })],
)

// Set up wagmi config
const config = createConfig({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({
      chains, options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      }
    }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: '...',
    //   },
    // }),

  ],
  publicClient,
  webSocketPublicClient,
})

interface WagmiProviderProps {
  children: ReactNode;
}

export const WagmiProvider: FC<WagmiProviderProps> = ({ children }) => {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  )

} 