import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { bscTestnet, bsc, opBNB } from 'viem/chains';
import { createPublicClient, http, formatEther, parseEther, type Chain } from "viem";
import { isAddress } from 'viem';
import { toast } from "react-toastify"
import { Avatar } from '@radix-ui/themes';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';

interface Network {
    label: string;
    icon: ReactNode;
    chain: Chain;
}

interface BNBgramContextType {
    balance: string;
    receiver: string;
    handleSetReceiver: (e: React.ChangeEvent<HTMLInputElement>) => void
    getBalance: (chain: Chain) => void;
    verifyAddress: (address: string) => any;
    net: string;
    handleSetNet: (network: string) => void;
    networks: Record<string, Network>;
    currentChain: Chain;
    handleCopyAddress: (address: string | undefined) => void;
    shortenAddress: (address: string | undefined) => string;
    fetchUserByUsername: (username: string | undefined) => any;
    verifyReceiver: (address: string) => void
    sendToken: (address: string, amount: string, network: Chain) => void
}

const BNBgramContext = createContext<BNBgramContextType | undefined>(undefined);

interface BNBgramProviderProps {
    children: ReactNode;
}

export const BNBgramProvider: React.FC<BNBgramProviderProps> = ({ children }) => {
    const { client } = useSmartWallets()
    const { user } = usePrivy();
    const [receiver, setReceiver] = useState<string>("")
    const [net, setNet] = React.useState<string>("bsct");
    const networks = {
        bsct: {
            label: "Binance Smart Chain Testnet",
            icon: <Avatar
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVOpnnWOVh-rBpR8q2L2Ne5fObarNaFmJWYg&s'
                fallback='BSCT'
                size="1"
                radius='medium'
            />,
            chain: bscTestnet
        },
        mainBsc: {
            label: "Binance Smart Chain",
            icon: <Avatar
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNH9-rFKf6clrdMOTG1ELpss2KRyku_iyZsw&s'
                fallback='BSC'
                size="1"
                radius='medium'
            />,
            chain: bsc
        },
        opbnb: {
            label: "OpBNB",
            icon: <Avatar 
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_uJoQkwcJNNwHoydHoLJ7Jyp8QDzRenxcng&s'
                fallback='opBNB'
                size="1"
                radius='medium'
            />,
            chain: opBNB
        }
    }
    const [balance, setBalance] = useState<string>("0")
    const [currentChain, setCurrentChain] = useState<Chain>(bscTestnet)
    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(`smartWalletAddress: ${smartWallet?.address}`);
    // Logs the smart wallet's address
    console.log(`smartWalletType: ${smartWallet?.type}`);
    // Logs the smart wallet typ`e (e.g. 'safe', 'kernel', 'light_account', 'biconomy')

    const getBalance = async (chain: Chain = currentChain) => {
        const publicClient = createPublicClient({
            chain: chain, // or whatever chain you are using
            transport: http()
        })
        const bal = await publicClient.getBalance({
            address: smartWallet?.address as `0x${string}`
        })
        setBalance(formatEther(bal))
    }

    const verifyAddress = (address: string) => {
        if (isAddress(address)) {
            return true
        } else {
            return false
        }
    }

    const handleSetReceiver = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReceiver(e.target.value)
    }

    const handleSetNet = async (network: string) => {
        setNet(network)

        if (net === "bsct") setCurrentChain(bscTestnet);
        if (net === "mainBsc") setCurrentChain(bsc);
        if (net === "opbnb") setCurrentChain(opBNB);

        await client?.switchChain({
            id: networks[network].chain.id
        })
        
        getBalance(networks[network].chain)
    }

    const handleCopyAddress = (address: string | undefined) => {
        if (!address) {
            console.error("No address available to copy.");
            return;
        }
        navigator.clipboard
            .writeText(address)
            .then(() => {
                toast.success("Address copied to clipboard!");
            })
            .catch((err) => {
                toast.error("Failed to copy address: ", err);
            });
    };

    const shortenAddress = (address: string | undefined, startLength = 6, endLength = 3): string => {
        if (!address) return "Invalid address";
        if (address.length <= startLength + endLength) return address;
        return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
    };

    const fetchUserByUsername = async (username: string | undefined) => {
        const appId = import.meta.env.VITE_PRIVY_APP_ID;
        const appSecret = import.meta.env.VITE_PRIVY_APP_SECRET;
    
        const url = "https://auth.privy.io/api/v1/users/telegram/username";
        console.log(`Username: ${username}`)
        console.log(`Basic ${btoa(`${appId}:${appSecret}`)}`)
    
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${appId}:${appSecret}`,
                    "privy-app-id": appId,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username })
            });
    
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                return false
            }
    
            const data = await response.json();
            console.log("Response Data:", data);
            return true
        } catch (error) {
            console.error("Error fetching user by username:", error);
            return false
        }
    };

    const verifyReceiver = async (receiver: string) => {
        let result = false
        if (receiver.startsWith("0x")) {
            result = verifyAddress(receiver)
        } else {
            result = await fetchUserByUsername(receiver)
        }
        if (result) {
            toast.success("Account verified")
        } else {
            toast.error("Account does not exist")
        }
    }

    const sendToken = async (address: string, amount: string, network: Chain) => {
        const txHash = await client?.sendTransaction({
            account: client?.account,
            chain: network,
            to: address as `0x${string}`,
            value: parseEther(amount)
        })
        const receipt = await client?.waitForUserOperationReceipt({
            hash: txHash as `0x${string}`
        })
        console.log(`txHash: ${txHash}`)
        console.log(`receipt: ${receipt}`)
    }
    
    useEffect(() => {
        getBalance()
        client?.switchChain({
            id: networks[net].chain.id
        })
        console.log(`balance: ${balance}`);
    }, [])

    return (
        <BNBgramContext.Provider value={{
            balance,
            getBalance,
            verifyAddress,
            net,
            handleSetNet,
            networks,
            currentChain,
            handleCopyAddress,
            shortenAddress,
            fetchUserByUsername,
            verifyReceiver,
            receiver,
            handleSetReceiver,
            sendToken,
        }}>
            {children}
        </BNBgramContext.Provider>
    );
};

export const useBNBgram = (): BNBgramContextType => {
    const context = useContext(BNBgramContext);
    if (!context) {
        throw new Error('useBNBgramContext must be used within a BNBgramProvider');
    }
    return context;
};