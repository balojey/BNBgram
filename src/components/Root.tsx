import {PrivyProvider} from '@privy-io/react-auth';
import { bscTestnet, bsc, opBNB } from 'viem/chains';
import { http, WagmiProvider } from "wagmi";
import { createConfig } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {SmartWalletsProvider} from '@privy-io/react-auth/smart-wallets';

import { Theme, ThemePanel } from "@radix-ui/themes";

import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import BNBgramLogo from "./BNBgram_logo_180x90.png"

const wagmiConfig = createConfig({
  chains: [bscTestnet, bsc, opBNB],
  transports: {
    [bscTestnet.id]: http(),
    [bsc.id]: http(),
    [opBNB.id]: http(),
  },
});
 
const queryClient = new QueryClient();

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function Root() {
  return (
    <Theme accentColor="amber" radius="none" appearance='dark'>
      <ErrorBoundary fallback={ErrorBoundaryError}>
        <PrivyProvider
          appId={import.meta.env.VITE_PRIVY_APP_ID}
          config={
            {
              embeddedWallets: {
                createOnLogin: 'users-without-wallets',
              },
              loginMethods: ["telegram"],
              appearance: {
                theme: 'light',
                accentColor: '#676FFF',
                logo: BNBgramLogo,
              },
              defaultChain: bscTestnet,
              supportedChains: [
                bsc,
                opBNB,
                bscTestnet,
              ],
            }
          }
        >
          <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <SmartWalletsProvider>
                <App/>
              </SmartWalletsProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </PrivyProvider>
      </ErrorBoundary>
      <ThemePanel />
    </Theme>
  );
}
