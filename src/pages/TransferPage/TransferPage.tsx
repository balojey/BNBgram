import { Section, Cell, List, Text, Avatar, Headline, Divider, Button, Input, Select} from '@telegram-apps/telegram-ui';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import { Common } from '@/components/Common';

import tonSvg from '../WalletPage/ton.svg';
import bnbchainLogo from '../WalletPage/bnbchain-logo.png'
import profilePicture from '../WalletPage/profile-pic.png';

export const TransferPage: FC = () => {
  const lp = useLaunchParams();
  const tokens = [
    {
      name: 'TON',
      symbol: 'TON',
      icon: tonSvg,
      balance: '1000000000000000000',
      dollar_equivalent: '10000000000000000',
      logoUrl: 'https://s3.crypto-bonus.cointelegraph.com/wp-content/uploads/2024/08/TON_logo.jpg'
    },
    {
      name: 'TON',
      symbol: 'TON',
      icon: tonSvg,
      balance: '1000000000000000000',
      dollar_equivalent: '10000000000000000',
      logoUrl: 'https://s3.crypto-bonus.cointelegraph.com/wp-content/uploads/2024/08/TON_logo.jpg'
    },
    {
      name: 'TON',
      symbol: 'TON',
      icon: tonSvg,
      balance: '1000000000000000000',
      dollar_equivalent: '10000000000000000',
      logoUrl: 'https://s3.crypto-bonus.cointelegraph.com/wp-content/uploads/2024/08/TON_logo.jpg'
    },
    {
      name: 'TON',
      symbol: 'TON',
      icon: tonSvg,
      balance: '1000000000000000000',
      dollar_equivalent: '10000000000000000',
      logoUrl: 'https://s3.crypto-bonus.cointelegraph.com/wp-content/uploads/2024/08/TON_logo.jpg'
    },
    
  ]
  
  return (
    <Page>
      <Common />

      <Section>
        <Input header="Address/Username" placeholder='0x345...543f / balojey'/>
      </Section>

      <Divider />
      
      <Section>
        <Cell>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '95vw',
                alignItems: 'center',
                padding: '5px',
            }}>
                <Input header="Amount" placeholder='0.00' />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '5px',
                }}>
                    <Select header="Token" placeholder="Select Token">
                        {
                            tokens.map((token, index) => (
                                <option key={index}>{token.name}</option>
                            ))
                        }
                    </Select>
                    <Button mode="plain" style={{
                        // marginTop: '10px',
                    }}>MAX</Button>
                </div>
            </div>
        </Cell>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            width: '30vw',
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            <Button size='l' stretched>
                Send
            </Button>
        </div>
      </Section>
    </Page>
  )
};
