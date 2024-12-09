import { Section, Cell, List, Text, Avatar, Headline, Divider, Button, Input, Select} from '@telegram-apps/telegram-ui';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import type { FC } from 'react';
import { useActiveWallet, usePrivy } from '@privy-io/react-auth';

import bnbchainLogo from '../pages/WalletPage/bnbchain-logo.png'
import { useBNBgram } from '@/context/BNBgramContext';


export const Common: FC = () => {
    const lp = useLaunchParams();
    // const { embeddedWallet } = useBNBgram()
    const { wallet } = useActiveWallet()

    const {ready, authenticated, login} = usePrivy();
    // Disable login when Privy is not ready or the user is already authenticated
    const disableLogin = !ready || (ready && authenticated);

    return (
        <>
            <Section>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '5px',
                }}>
                <button disabled={disableLogin} onClick={login}>
                    Log in
                </button>
                <Avatar
                    size={48}
                    src={bnbchainLogo}
                ></Avatar>
                <Select
                    header="Network"
                    placeholder="Select a Network"
                >
                    <option>TestNet</option>
                    <option>MainNet</option>
                </Select>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '5px',
                    paddingBottom: "20px"
                }}>
                <Avatar
                    size={96}
                    src={lp.initData?.user?.photoUrl}
                    style={{
                        margin: "20px auto"
                    }}
                ></Avatar>
                <Text weight='1'>{"0.3BNB"}</Text>
                <Text weight='3'>@{lp.initData?.user?.username}</Text>
                <Text weight='3'>{wallet?.address}</Text>
                </div>
            </Section>

            <Divider />
        </>
    )
}