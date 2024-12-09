import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useWallets, usePrivy } from '@privy-io/react-auth';
import { bscTestnet, bsc, opBNB, opBNBTestnet } from 'viem/chains';
import { createSmartAccountClient } from "permissionless";
import { toSimpleSmartAccount } from "permissionless/accounts";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { createPimlicoClient } from "permissionless/clients/pimlico"
import { entryPoint07Address } from "viem/account-abstraction"

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
    const {user} = usePrivy();
    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(`smartWalletAddress: ${smartWallet?.address}`);
    // Logs the smart wallet's address
    console.log(`smartWalletType: ${smartWallet?.type}`);
    // Logs the smart wallet type (e.g. 'safe', 'kernel', 'light_account', 'biconomy')

    return (
        <BNBgramContext.Provider value={{  }}>
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