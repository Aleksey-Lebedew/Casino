import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiContext } from "../../context/apiContext";
import "./gamePage.scss";
import { useBalance } from "../../hooks/useBalance";

// Возможные символы на барабанах
const SYMBOLS = ["7️⃣", "🍒", "🍋", "🔔", "💎", "🍇", "👎"];

export const GamePage = () => {
    const { balance, incrementBalance, dicrementBalance, removeBalance } = useBalance();
    const { id } = useParams<{ id: string }>();
    const { gamesData } = useContext(apiContext);
    const game = gamesData.find((item) => item.id === id);
    const [reels, setReels] = useState(["🍒", "🍒", "🍒"]);
    const [isSpinning, setIsLoading] = useState(false);
    const [winMessage, setWinMessage] = useState<string | null>(null);

    const handleSpin = () => {
        if (isSpinning || balance <= 0) {
            return;
        }

        setIsLoading(true);
        setWinMessage(null);

        setTimeout(() => {
            const reel1 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
            const reel2 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
            const reel3 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

            setReels([reel1, reel2, reel3]);

            if (reel1 === "👎" && reel2 === "👎" && reel3 === "👎") {
                setWinMessage("👎 ALL -- 👎");
                removeBalance();
            } else if (reel1 === "7️⃣" && reel2 === "7️⃣" && reel3 === "7️⃣") {
                setWinMessage("🔥 ДЖЕКПОТ! 777! 🔥 +100");
                incrementBalance(100);
            } else if (reel1 === reel2 && reel2 === reel3) {
                setWinMessage("🎉 Крупный выигрыш! +50 🎉");
                incrementBalance(50);
            } else if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
                setWinMessage("👍 Малый выигрыш! +10 👍");
                incrementBalance(10);
            } else {
                setWinMessage("❌ Попробуй еще раз! -200 ❌");
                dicrementBalance(200);
            }

            setIsLoading(false);
        }, 1500);
    };

    if (!game) {
        return (
            <div className="slot-game">
                <div className="slot-game__header">
                    <Link to="/" className="btn-back">‹ Назад в лобби</Link>
                </div>
                <p className="slot-game__unavailable">Игра недоступна в каталоге.</p>
            </div>
        );
    }

    const cannotPlay = balance < 200;

    return (
        <div className="slot-game">
            <div className="slot-game__header">
                <Link to="/" className="btn-back">‹ Назад в лобби</Link>
            </div>

            <div className="slot-machine-wrapper">
                <div className="slot-machine">
                    <div className="slot-machine__top-logo">{game.title}</div>

                    <div className="slot-machine__paytable">
                        <div>7️⃣7️⃣7️⃣ = +100</div>
                        <div>💎💎💎 = +50</div>
                        <div>🍒🍒🍒 = +10</div>
                    </div>

                    <div className="slot-machine__screen">
                        {reels.map((symbol, index) => (
                            <div
                                key={index}
                                className={`slot-reel ${isSpinning ? `slot-reel--spinning-${index}` : ""}`}
                            >
                                <span className="slot-symbol">{symbol}</span>
                            </div>
                        ))}
                    </div>

                    <div className={`slot-machine__display${balance < 0 ? " slot-machine__display--negative" : ""}`}>
                        {isSpinning ? (
                            <span className="pulse-text">УДАЧИ...</span>
                        ) : balance < 0 ? (
                            <span role="alert">ОТРИЦАТЕЛЬНЫЙ БАЛАНС</span>
                        ) : balance === 0 ? (
                            winMessage || "НЕДОСТАТОЧНО СРЕДСТВ"
                        ) : (
                            winMessage || "ЖДЕМ СТАВКУ"
                        )}
                    </div>
                </div>

                <button
                    className="btn-spin-action"
                    onClick={handleSpin}
                    disabled={isSpinning || cannotPlay}
                >
                    {isSpinning ? "БАРАБАНЫ КРУТЯТСЯ..." : "КРУТИТЬ БАРАБАН"}
                </button>
            </div>
        </div>
    );
};
