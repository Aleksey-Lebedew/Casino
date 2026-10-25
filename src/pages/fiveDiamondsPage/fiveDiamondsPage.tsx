import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/button/button";
import { useBalance } from "../../hooks/useBalance";
import { PATHS } from "../../share/paths";
import "./fiveDiamondsPage.scss";

type CellContent = "diamond" | "bomb";
type RoundStatus = "idle" | "playing" | "won" | "lost";

interface Cell {
    content: CellContent;
    revealed: boolean;
    revealedByPlayer: boolean;
}

const BOARD_SIZE = 25;
const BOMB_COUNT = 12;
const DIAMOND_COUNT = BOARD_SIZE - BOMB_COUNT  ;
const TARGET_DIAMONDS = 5;
const STARTING_LIVES = 3;

const createBoard = (): Cell[] => {
    const contents: CellContent[] = [
        ...Array.from({ length: DIAMOND_COUNT }, () => "diamond" as const),
        ...Array.from({ length: BOARD_SIZE - DIAMOND_COUNT }, () => "bomb" as const),
    ];

    for (let index = contents.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [contents[index], contents[randomIndex]] = [contents[randomIndex], contents[index]];
    }

    return contents.map((content) => ({
        content,
        revealed: false,
        revealedByPlayer: false,
    }));
};

const formatAmount = (amount: number) =>
    new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 }).format(amount);

export const FiveDiamondsPage = () => {
    const { balance, incrementBalance, dicrementBalance } = useBalance();
    const [betInput, setBetInput] = useState("");
    const [board, setBoard] = useState<Cell[]>([]);
    const [diamondsFound, setDiamondsFound] = useState(0);
    const [lives, setLives] = useState(STARTING_LIVES);
    const [bet, setBet] = useState(0);
    const [status, setStatus] = useState<RoundStatus>("idle");

    const parsedBet = Number(betInput);
    const isValidBet = Number.isFinite(parsedBet) && parsedBet > 50 && parsedBet <= balance;

    const startRound = () => {
        if (status === "playing" || !isValidBet) {
            return;
        }

        dicrementBalance(parsedBet);
        setBet(parsedBet);
        setBoard(createBoard());
        setDiamondsFound(0);
        setLives(STARTING_LIVES);
        setStatus("playing");
    };

    const revealCell = (index: number) => {
        const cell = board[index];
        if (status !== "playing" || !cell || cell.revealed) {
            return;
        }

        setBoard((currentBoard) =>
            currentBoard.map((currentCell, cellIndex) =>
                cellIndex === index
                    ? { ...currentCell, revealed: true, revealedByPlayer: true }
                    : currentCell,
            ),
        );

        if (cell.content === "diamond") {
            const nextDiamondsFound = diamondsFound + 1;
            setDiamondsFound(nextDiamondsFound);

            if (nextDiamondsFound === TARGET_DIAMONDS) {
                incrementBalance(bet * 2);
                setStatus("won");
            }
            return;
        }

        const nextLives = lives - 1;
        setLives(nextLives);
        if (nextLives === 0) {
            setBoard((currentBoard) =>
                currentBoard.map((currentCell) => ({ ...currentCell, revealed: true })),
            );
            setStatus("lost");
        }
    };

    const statusMessage = {
        idle: "Выберите ставку и начните раунд",
        playing: "Откройте 5 алмазов, чтобы получить выплату x2",
        won: `Победа! На баланс начислено ${formatAmount(bet * 2)}`,
        lost: "Жизни закончились — ставка сгорела",
    }[status];

    return (
        <section className="five-diamonds">
            <header className="five-diamonds__header">
                <Link className="btn secondary md" to={PATHS.games()}>
                    ‹ Все игры
                </Link>
                <div>
                    <h1 className="five-diamonds__title">5 Алмазов</h1>
                    <p className="five-diamonds__subtitle">
                        Поле 5×5. 5 спрятанных алмазов. 3 жизни.
Это не «Сапер». Здесь нет цифр и подсказок. Это чистая проверка вашего везения и интуиции. Каждый выбор — риск, каждый шаг — испытание судьбы.
Доверитесь шестому чувству, чтобы забрать все сокровища? Ваша ставка удваивается при выигрыше и полностью сгорает при проигрыше.
                    </p>
                </div>
            </header>

            <div className="five-diamonds__panel">
                <div className="five-diamonds__controls">
                    <label className="five-diamonds__bet">
                        <span>Ставка</span>
                        <input
                            type="number"
                            min="50"
                            step="any"
                            inputMode="decimal"
                            value={betInput}
                            onChange={(event) => setBetInput(event.target.value)}
                            disabled={status === "playing"}
                            aria-label="Ставка"
                        />
                    </label>
                    <p className="five-diamonds__balance" aria-label="Баланс">
                        Баланс: <strong>{formatAmount(balance)}</strong>
                    </p>
                </div>

                <div className="five-diamonds__stats" aria-label="Состояние раунда">
                    <p>
                        Алмазы: <strong>{diamondsFound}/{TARGET_DIAMONDS}</strong>
                    </p>
                    <p className="five-diamonds__lives" aria-label={`Жизни: ${lives} из ${STARTING_LIVES}`}>
                        {Array.from({ length: STARTING_LIVES }, (_, index) => (
                            <span
                                key={index}
                                className={index < lives
                                    ? "five-diamonds__life"
                                    : "five-diamonds__life five-diamonds__life--lost"}
                                aria-hidden="true"
                            >
                                ❤️
                            </span>
                        ))}
                    </p>
                </div>

                <div className="five-diamonds__board" aria-label="Игровое поле 5 на 5">
                    {Array.from({ length: BOARD_SIZE }, (_, index) => {
                        const cell = board[index];
                        const cellClass = [
                            "five-diamonds__cell",
                            cell?.revealed ? "five-diamonds__cell--revealed" : "",
                            cell?.revealed && cell.content === "diamond"
                                ? "five-diamonds__cell--diamond"
                                : "",
                            cell?.revealed && cell.content === "bomb"
                                ? "five-diamonds__cell--bomb"
                                : "",
                            cell?.revealed && !cell.revealedByPlayer
                                ? "five-diamonds__cell--auto-revealed"
                                : "",
                        ].filter(Boolean).join(" ");

                        return (
                            <button
                                key={index}
                                type="button"
                                className={cellClass}
                                onClick={() => revealCell(index)}
                                disabled={status !== "playing" || !cell || cell.revealed}
                                aria-label={cell?.revealed
                                    ? `Ячейка ${index + 1}: ${cell.content === "diamond" ? "алмаз" : "бомба"}`
                                    : `Ячейка ${index + 1}: закрыта`}
                            >
                                {cell?.revealed ? (cell.content === "diamond" ? "💎" : "💣") : ""}
                            </button>
                        );
                    })}
                </div>

                <p className={`five-diamonds__message five-diamonds__message--${status}`} aria-live="polite">
                    {statusMessage}
                </p>

                <Button
                    size="lg"
                    onClick={startRound}
                    disabled={status === "playing" || !isValidBet}
                >
                    {status === "idle" ? "Начать раунд" : "Новый раунд"}
                </Button>
                <p className="five-diamonds__hint">
                    Для старта нужна ставка больше 50 и не выше текущего баланса.
                </p>
            </div>
        </section>
    );
};
