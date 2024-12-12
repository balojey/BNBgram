import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

import { BNBgramProvider } from '@/context/BNBgramContext';

import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { WalletPage } from '@/pages/WalletPage/WalletPage';
import { DappsPage } from '@/pages/DappsPage/DappsPage';
import { TransferTokensSubPage } from '@/pages/WalletPage/TransferTokensSubPage';
import { TransactionHistorySubPage } from '@/pages/WalletPage/TransactionHistorySubPage';

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const router = createHashRouter([
    {
      path: "/",
      element: <IndexPage />,
      children: [
        {
          path: "/", // Parent route for WalletPage
          element: <WalletPage />,
          children: [
            {
              index: true, // This is the index route (default child)
              element: <TransferTokensSubPage />
            },
            {
              path: "history", // Nested child route
              element: <TransactionHistorySubPage />
            }
          ]
        },
        {
          path: "/dapps", // Separate route for DappsPage
          element: <DappsPage />,
        }
      ]
    }
  ]);
  

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <BNBgramProvider>
        <RouterProvider router={router} />
        <ToastContainer
          transition={Slide}
          theme='dark'
          autoClose={3000}
          position='top-center'
          newestOnTop={true}
        />
      </BNBgramProvider>
    </AppRoot>
  );
}
