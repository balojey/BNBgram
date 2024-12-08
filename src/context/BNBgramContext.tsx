import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import {useWallets} from '@privy-io/react-auth';
import { bscTestnet, bsc, opBNB, opBNBTestnet } from 'viem/chains';

export interface IProductInfo {
    id?: number,
    businessName: string;
    receiversAddress: string;
    intermediariesWallet: string;
    condition: string;
    yourLocation: string;
    receiversLocation: string;
    intermediariesLocation: string;
    productImage: File;
    status?: string;
}

export interface IProductHistory {
    location: string,
    condition: {
        condition: string,
        image: File
    },
    time: string
}

interface BNBgramContextType {
    // products: IProductInfo[];
    // addProduct: (product: IProductInfo) => void;
    // shipProduct: (product: IProductInfo, location: string, condition: string) => void;
    // updateProduct: (product: IProductInfo, location: string, condition: string) => void;
    // deliverProduct: (product: IProductInfo, condition: string) => void;
    // getProductHistory: (productId: number) => Promise<IProductHistory[]>;
}

const BNBgramContext = createContext<BNBgramContextType | undefined>(undefined);

interface BNBgramProviderProps {
    children: ReactNode;
}

export const BNBgramProvider: React.FC<BNBgramProviderProps> = ({ children }) => {

    const {wallets} = useWallets();
    const embeddedWallet = wallets.find((wallet) => (wallet.walletClientType === 'privy'));
    console.log(`Wallets: ${wallets}`);
    console.log(`embeddedWallet: ${embeddedWallet}`);

    const switchChain = useCallback(async () => {
        await embeddedWallet?.switchChain(bscTestnet.id);
    }, [])

    useEffect(() => {
        switchChain();
    }, [switchChain])

    return (
        <BNBgramContext.Provider value={{  }}>
            {children}
        </BNBgramContext.Provider>
    );
};

export const useBNBgramContext = (): BNBgramContextType => {
    const context = useContext(BNBgramContext);
    if (!context) {
        throw new Error('useBNBgramContext must be used within a BNBgramProvider');
    }
    return context;
};