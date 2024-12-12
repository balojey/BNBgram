import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets"
import { Avatar, Select, Flex, Text, Button } from "@radix-ui/themes"
import { CopyIcon, ReloadIcon } from '@radix-ui/react-icons';
import { FC } from "react"

import { useBNBgram } from '@/context/BNBgramContext';

export const Common: FC = () => {
    const lp = useLaunchParams();
    const {
        balance,
        net,
        handleSetNet,
        networks,
        handleCopyAddress,
        shortenAddress,
        getBalance
    } = useBNBgram()
    const { client } = useSmartWallets()

    return (
        <Flex width="100%" direction="column" justify="center" align="center" gap="3" py="7">
            <Select.Root defaultValue="bsct" size="2" value={net} onValueChange={handleSetNet}>
                <Select.Trigger radius="full">
                    <Flex as="span" align="center" gap="2">
                        {networks[net].icon}
                        {networks[net].label}
                    </Flex>
                </Select.Trigger>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Testnets</Select.Label>
                        <Select.Item value='bsct'>Binance Smart Chain Testnet</Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    <Select.Group>
                        <Select.Label>Mainnets</Select.Label>
                        <Select.Item value='mainBsc'>Binance Smart Chain</Select.Item>
                        <Select.Item value='opbnb'>opBNB</Select.Item>
                    </Select.Group>
                </Select.Content>
            </Select.Root>

            <Avatar src={lp.initData?.user?.photoUrl} fallback="BNB" size="7" />

            <Flex gap="3" align="center">
                <Text size="5" weight="medium">{balance}{networks[net].chain.nativeCurrency.symbol}</Text>
                <Button
                    size="1"
                    variant="ghost"
                    onClick={() => getBalance(networks[net].chain)}
                >
                    <ReloadIcon />
                </Button>
            </Flex>

            <Text>@{lp.initData?.user?.username}</Text>

            <Button variant='soft' onClick={() => handleCopyAddress(client?.account.address as string)}>
                <CopyIcon />
                {shortenAddress(client?.account.address as string)}
            </Button>
        </Flex>
    )
}