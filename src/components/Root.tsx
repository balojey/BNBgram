import {PrivyProvider} from '@privy-io/react-auth';
import { bscTestnet, bsc, opBNB, opBNBTestnet } from 'viem/chains';

import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { publicUrl } from '@/helpers/publicUrl.ts';
import BNBgramLogo from "./BNBgram_logo_180x90.png"

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
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <PrivyProvider
        appId={import.meta.env.VITE_PRIVY_APP_ID}
        config={{
          // Display email and wallet as login methods
          loginMethods: ['telegram'],
          // Customize Privy's appearance in your app
          appearance: {
            theme: 'light',
            accentColor: '#676FFF',
            logo: BNBgramLogo,
          },
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            createOnLogin: 'users-without-wallets',
          },
          defaultChain: bscTestnet,
          supportedChains: [
            bsc,
            opBNB,
            opBNBTestnet,
            bscTestnet,
          ]
        }}
      >
        <App/>
      </PrivyProvider>
    </ErrorBoundary>
  );
}
