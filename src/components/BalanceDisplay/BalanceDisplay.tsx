import { useBalance } from "../../hooks/useBalance";
import "./BalanceDisplay.scss";

// interface BalanceDisplayProps {
//     balance: number;
// }
export const BalanceDisplay = () => {
    const { balance } = useBalance()
    return (
        <>
            < section className="balance-display" aria-label="Баланс" >
                <p className="balance-display__label">Баланс</p>
                <p className="balance-display__amount">{balance}</p>
            </section>
        </>
    )

}

