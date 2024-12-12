import type { FC } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { TabNav, Box } from '@radix-ui/themes';

export const IndexPage: FC = () => {
    const { pathname } = useLocation();

    return (
        <>
          <Outlet />
          <Box position="absolute" bottom="3" width="100%">
            <TabNav.Root justify="center">
              <TabNav.Link asChild active={pathname === "/"}>
                <Link to="/">Wallet</Link>
              </TabNav.Link>
              <TabNav.Link asChild active={pathname === "/dapps"}>
                <Link to="/dapps">Dapps</Link>
              </TabNav.Link>
            </TabNav.Root>
          </Box>
        </>
    );
};
