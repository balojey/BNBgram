import { Flex, Heading, Box, Text, TextField, Button } from "@radix-ui/themes"
import { FC, useState } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';

import { useBNBgram } from '@/context/BNBgramContext';

export const TransferTokensSubPage: FC = () => {
    const lp = useLaunchParams();
    const [amount, setAmount] = useState<string>("")
    const {
        balance,
        shortenAddress,
        verifyReceiver,
        receiver,
        handleSetReceiver,
        sendToken,
        networks,
        net
    } = useBNBgram()
    const {
        client
    } = useSmartWallets()

    const handleSetAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) <= Number(balance)) {
        setAmount(e.target.value)
        } else {
        toast.warning(`${e.target.value} is higher than your balance`)
        }
    }

    return (
        <>
            <Heading as="h2" weight="regular" align="center">Send Tokens</Heading>
            <Flex direction="column" justify="center" align="center" py="5">
                <Box maxWidth="800px" py="3">
                <Text
                    as="label"
                >
                    Enter wallet address or User's username
                </Text>
                <TextField.Root
                    size="3"
                    placeholder={`${shortenAddress(client?.account.address as string)} or ${lp.initData?.user?.username}`}
                    value={receiver}
                    onChange={handleSetReceiver}
                    my="5"
                >
                    <TextField.Slot side='right'>
                    <Button
                        size="3"
                        variant='ghost'
                        onClick={() => verifyReceiver(receiver)}
                    >
                        <MagnifyingGlassIcon />
                        Verify
                    </Button>
                    </TextField.Slot>
                </TextField.Root>

                <Text
                    as="label"
                >
                    Enter Amount
                </Text>
                <TextField.Root
                    size="3"
                    placeholder="0.00"
                    value={amount}
                    onChange={handleSetAmount}
                    my="5"
                >
                    <TextField.Slot />
                </TextField.Root>

                <Button
                    size="4"
                    onClick={() => sendToken(receiver, amount, networks[net].chain)}
                >
                    Send
                </Button>
                </Box>
            </Flex>
        </>
    )
}