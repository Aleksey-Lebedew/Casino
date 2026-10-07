import { useState } from "react";
import { Link } from "react-router-dom";
import "./gamePage.scss";

// Возможные символы на барабанах
const SYMBOLS = ["7️⃣", "🍒", "🍋", "🔔", "💎", "🍇"];

export const GamePage = () => {
    // Храним текущие символы на трех барабанах (по умолчанию везде семерки)
    const [reels, setReels] = useState(["🍒", "🍒", "🍒"]);
    const [isSpinning, setIsLoading] = useState(false);
    const [winMessage, setWinMessage] = useState<string | null>(null);

    // Логика раскрутки барабанов
    const handleSpin = () => {
        setIsLoading(true);
        setWinMessage(null);

        // Имитируем кручение барабанов (1.5 секунды)
        setTimeout(() => {
            // Генерируем случайный символ для каждого из 3-х барабанов
            const reel1 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
            const reel2 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
            const reel3 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

            setReels([reel1, reel2, reel3]);

            // Проверяем выигрышные комбинации
            if (reel1 === "7️⃣" && reel2 === "7️⃣" && reel3 === "7️⃣") {
                setWinMessage("🔥 ДЖЕКПОТ! 777! 🔥");
            } else if (reel1 === reel2 && reel2 === reel3) {
                setWinMessage("🎉 Крупный выигрыш! 🎉");
            } else if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
                setWinMessage("👍 Малый выигрыш! 👍");
            } else {
                setWinMessage("❌ Попробуй еще раз! ❌");
            }

            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="slot-game">
            {/* Шапка */}
            <div className="slot-game__header">
                <Link to="/" className="btn-back">‹ Назад в лобби</Link>
            </div>

            {/* Игровой автомат */}
            <div className="slot-machine-wrapper">
                
                {/* Корпус автомата (как на твоем фото: золотой/темный с аркой сверху) */}
                <div className="slot-machine">
                    <div className="slot-machine__top-logo">LUCKY SLOT</div>
                    
                    {/* Табло выплат */}
                    <div className="slot-machine__paytable">
                        <div>7️⃣7️⃣7️⃣ = x100</div>
                        <div>💎💎💎 = x50</div>
                        <div>🍒🍒🍒 = x10</div>
                    </div>

                    {/* Экран с тремя крутящимися барабанами */}
                    <div className="slot-machine__screen">
                        {reels.map((symbol, index) => (
                            <div 
                                key={index} 
                                className={`slot-reel ${isSpinning ? `slot-reel--spinning-\${index}` : ""}`}
                            >
                                <span className="slot-symbol">{symbol}</span>
                            </div>
                        ))}
                    </div>

                    {/* Табло вывода сообщений о победе */}
                    <div className="slot-machine__display">
                        {isSpinning ? <span className="pulse-text">УДАЧИ...</span> : winMessage || "ЖДЕМ СТАВКУ"}
                    </div>
                </div>

                {/* Большая зеленая кнопка раскрутки под автоматом */}
                <button 
                    className="btn-spin-action" 
                    onClick={handleSpin} 
                    disabled={isSpinning}
                >
                    {isSpinning ? "БАРAБАНЫ КРУТЯТСЯ..." : "КРУТИТЬ БАРАБАН"}
                </button>

            </div>
        </div>
    );
};
