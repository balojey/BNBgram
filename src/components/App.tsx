import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { BNBgramProvider } from '@/context/BNBgramContext';

import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { WalletPage } from '@/pages/WalletPage/WalletPage';
import { DappsPage } from '@/pages/DappsPage/DappsPage';
import { TransferPage } from '@/pages/TransferPage/TransferPage';

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const router = createHashRouter([
    {
      path: "/",
      element: <IndexPage />,
      children: [
        {
          element: <WalletPage />,
          index: true,
        },
        {
          element: <TransferPage />,
          path: "/transfer",
        },
        {
          element: <DappsPage />,
          path: "/dapps",
        }
      ]
    }
  ])

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <BNBgramProvider>
        <RouterProvider router={router} />
      </BNBgramProvider>
    </AppRoot>
  );
}
