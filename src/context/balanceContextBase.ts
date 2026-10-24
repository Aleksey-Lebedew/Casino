import { createContext } from 'react';

export interface BalanceContextType {
    balance: number;
    addFunds: (amount: number) => void;
    incrementBalance: (amount: number) => void;
    dicrementBalance: (amount: number) => void;
    removeBalance: () => void;
}

export const BalanceContext = createContext<BalanceContextType | undefined>(undefined);
