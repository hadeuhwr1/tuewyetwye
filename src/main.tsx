import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RainbowKitProvider,
  getDefaultWallets
} from '@rainbow-me/rainbowkit';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import { Toaster } from 'sonner';
import App from './App.tsx';
import './index.css';
import { SoundProvider } from './contexts/SoundContext';

const projectId = '3bf26c277abb57e44af9fcc2121db184';
const chains = [mainnet];

const { wallets, connectors } = getDefaultWallets({
  appName: '$CIGAR Protocol',
  projectId,
  chains,
});

const config = createConfig({
  chains,
  connectors,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          <SoundProvider>
            <Toaster />
            <App />
          </SoundProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);