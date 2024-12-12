import { Box, TabNav } from "@radix-ui/themes"
import { FC } from "react";

import { Common } from '@/components/Common';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const WalletPage: FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Common />
      <Box>
        <Box width="100%" py="3">
          <TabNav.Root justify="center">
            <TabNav.Link asChild active={pathname === "/"}>
              <Link to="/">Transfer Tokens</Link>
            </TabNav.Link>
            <TabNav.Link asChild active={pathname === "/history"}>
              <Link to="/history">Transaction History</Link>
            </TabNav.Link>
          </TabNav.Root>
        </Box>
      </Box>
      <Outlet />
    </>
  )
};
