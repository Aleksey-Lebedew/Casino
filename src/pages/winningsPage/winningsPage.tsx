import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { WinnerCard } from "../../components/winnerCard/winnerCard";
import { apiContext } from "../../context/apiContext";
import { PATHS } from "../../share/paths";
import { createWinRecords } from "../../share/winnings";
import "./winningsPage.scss";

const WINS_PER_PAGE = 10;

export const WinningsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { usersData, gamesData } = useContext(apiContext);
    const wins = createWinRecords(usersData, gamesData);
    const [currentPage, setCurrentPage] = useState(1);

    if (id) {
        const win = wins.find((item) => item.id === id);

        return (
            <section className="winnings-page">
                <Link className="winnings-page__back" to={PATHS.allWinnings()}>
                    ‹ Все выигрыши
                </Link>
                {win ? (
                    <article className="winning-detail">
                        <h1 className="winnings-page__title">Выигрыш</h1>
                        <p className="winning-detail__field">
                            <span>Игрок</span>
                            <strong>{win.nameWinner}</strong>
                        </p>
                        <p className="winning-detail__field">
                            <span>Сумма выигрыша</span>
                            <strong className="winning-detail__cash">
                                ₽ {win.cash.toLocaleString()}
                            </strong>
                        </p>
                        <p className="winning-detail__field">
                            <span>Игра</span>
                            <strong>{win.game?.title ?? "Игра недоступна"}</strong>
                        </p>
                    </article>
                ) : (
                    <p className="winnings-page__empty">Выигрыш не найден.</p>
                )}
            </section>
        );
    }

    const pageCount = Math.ceil(wins.length / WINS_PER_PAGE);
    const pageWins = wins.slice(
        (currentPage - 1) * WINS_PER_PAGE,
        currentPage * WINS_PER_PAGE,
    );
    const firstVisibleWin = (currentPage - 1) * WINS_PER_PAGE + 1;
    const lastVisibleWin = Math.min(currentPage * WINS_PER_PAGE, wins.length);

    return (
        <section className="winnings-page">
            <h1 className="winnings-page__title">Все выигрыши</h1>
            {wins.length === 0 ? (
                <p className="winnings-page__empty">Выигрышей пока нет.</p>
            ) : (
                <>
                    <p className="winnings-page__range" aria-live="polite">
                        Показаны {firstVisibleWin}–{lastVisibleWin} из {wins.length}
                    </p>
                    <div className="winnings-page__grid">
                        {pageWins.map((win) => (
                            <WinnerCard
                                key={win.id}
                                winId={win.id}
                                image={win.image}
                                nameWinner={win.nameWinner}
                                cash={win.cash}
                                nameGame={win.game?.title ?? "Игра недоступна"}
                            />
                        ))}
                    </div>
                    {pageCount > 1 && (
                        <nav className="winnings-pagination" aria-label="Страницы выигрышей">
                            <button
                                className="winnings-pagination__button"
                                type="button"
                                onClick={() => setCurrentPage((page) => page - 1)}
                                disabled={currentPage === 1}
                            >
                                Назад
                            </button>
                            <div className="winnings-pagination__pages">
                                {Array.from({ length: pageCount }, (_, index) => {
                                    const page = index + 1;

                                    return (
                                        <button
                                            key={page}
                                            className="winnings-pagination__button"
                                            type="button"
                                            onClick={() => setCurrentPage(page)}
                                            aria-label={`Страница ${page}`}
                                            aria-current={currentPage === page ? "page" : undefined}
                                            disabled={currentPage === page}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                className="winnings-pagination__button"
                                type="button"
                                onClick={() => setCurrentPage((page) => page + 1)}
                                disabled={currentPage === pageCount}
                            >
                                Вперёд
                            </button>
                        </nav>
                    )}
                </>
            )}
        </section>
    );
};
