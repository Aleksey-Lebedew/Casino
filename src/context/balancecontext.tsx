import { createContext, useEffect, useState, type ReactNode } from 'react';

export interface BalanceContextType {
    balance: number;
    addFunds: (amount: number) => void;
    incrementBalance: (amount: number) => void;
    dicrementBalance: (amount: number) => void;
    removeBalance: () => void;
}
export const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: ReactNode }) {
    const [balance, setBalance] = useState(() => {
        const savedBalance = localStorage.getItem('balance')
        if (savedBalance !== null) {
            return Number(savedBalance)
        }
        return 0
    })

    useEffect(
        () => {
            localStorage.setItem('balance', String(balance))

        },
        [balance]
    )



    const addFunds = (amount: number) => {
        setBalance((prev) => prev + amount)
    }

    const incrementBalance = (amount: number) => {
        setBalance((prev) => prev + amount)
    }

    const dicrementBalance = (amount: number) => {
        setBalance((prev) => prev - amount)
    }

    const removeBalance = () => {
        localStorage.removeItem('balance')
        setBalance((prev) => prev * 0)
    }


    return (
        <BalanceContext.Provider value={{ balance, addFunds, incrementBalance, dicrementBalance, removeBalance }}>
            {children}
        </BalanceContext.Provider>
    );
}
