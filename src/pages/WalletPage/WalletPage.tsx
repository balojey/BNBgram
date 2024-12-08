import { Section, Cell, Image, List, Text, Avatar, Headline, Divider, Button} from '@telegram-apps/telegram-ui';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';
import { Common } from '@/components/Common';

import tonSvg from './ton.svg';
import bnbchainLogo from './bnbchain-logo.png'
import profilePicture from './profile-pic.png';

export const WalletPage: FC = () => {
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
    <Page back={false}>
      <Common />

      <Section>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
          }}>
          <Headline weight='2'>Tokens</Headline>
          <Link to='/transfer'>
            <Button
              mode="filled"
              size="s"
            >
              Transfer
            </Button>
          </Link>
        </div>
        <div>
          {tokens.map((token, index) => (
            <Cell key={index}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '95vw',
                alignItems: 'center',
                padding: '1px 20px',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Avatar
                    size={28}
                    src={token.logoUrl}
                  ></Avatar>
                  <Text weight='2'>{token.name}</Text>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '5px 20px',
                }}>
                  <Text weight='2'>{token.balance}{token.symbol}</Text>
                  <Text weight='3'>${token.dollar_equivalent}</Text>
                </div>
              </div>
            </Cell>
          ))}
        </div>
      </Section>
    </Page>
  )
  // return (
  //   <Page back={false}>
  //     <List>
  //       <Section
  //         header="Features"
  //         footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
  //       >
  //         <Link to="/ton-connect">
  //           <Cell
  //             before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }}/>}
  //             subtitle="Connect your TON wallet"
  //           >
  //             TON Connect
  //           </Cell>
  //         </Link>
  //       </Section>
  //       <Section
  //         header="Application Launch Data"
  //         footer="These pages help developer to learn more about current launch information"
  //       >
  //         <Link to="/init-data">
  //           <Cell subtitle="User data, chat information, technical data">Init Data</Cell>
  //         </Link>
  //         <Link to="/launch-params">
  //           <Cell subtitle="Platform identifier, Mini Apps version, etc.">Launch Parameters</Cell>
  //         </Link>
  //         <Link to="/theme-params">
  //           <Cell subtitle="Telegram application palette information">Theme Parameters</Cell>
  //         </Link>
  //       </Section>
  //     </List>
  //   </Page>
  // );
};
