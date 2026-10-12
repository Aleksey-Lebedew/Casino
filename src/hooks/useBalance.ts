import { useContext } from "react"
import { BalanceContext } from "../context/balancecontext"


export const useBalance = () => {
    const balance = useContext(BalanceContext)
    if (!balance) {
        throw new Error("no useBalance, err")
    }
    return balance
}