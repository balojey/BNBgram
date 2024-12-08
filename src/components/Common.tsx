import { Section, Cell, List, Text, Avatar, Headline, Divider, Button, Input, Select} from '@telegram-apps/telegram-ui';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import type { FC } from 'react';


import bnbchainLogo from '../pages/WalletPage/bnbchain-logo.png'
import profilePicture from '../pages/WalletPage/profile-pic.png';


export const Common: FC = () => {
    const lp = useLaunchParams();

    return (
        <>
            <Section>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '5px',
                }}>
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
                    src={profilePicture}
                    style={{
                        margin: "20px auto"
                    }}
                ></Avatar>
                <Text weight='1'>0.3BNB</Text>
                <Text weight='3'>@{lp.initData?.user?.username}</Text>
                </div>
            </Section>

            <Divider />
        </>
    )
}