import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../share/paths";
import { WinnerCard } from "../winnerCard/winnerCard";
import "./LatestWins.scss";
import { apiContext } from "../../context/apiContext";
import { createWinRecords } from "../../share/winnings";

export const LatestWins = () => {
    const { usersData, gamesData } = useContext(apiContext)
    const wins = createWinRecords(usersData, gamesData);
    const trackRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: string) => {
        if (trackRef.current) {
            const scrollAmount = 208;
            trackRef.current.scrollTo({
                left: trackRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="latest-wins">

            <div className="latest-wins__header">
                <div className="latest-wins__title-wrapper">
                    <div className="img_wrapper">
                        <svg xmlns="http://w3.org" viewBox="0 0 500 500" width="100%" height="100%" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" fill="#ffffff" d="M170 165h160v80c0 55-45 100-100 100h40c-55 0-100-45-100-100zm0 15h-35c-20 0-20 85 5 105 20 15 30 15 40 5-8-15-10-35-10-50zm0 20v40c0 10 2 20 6 30-10 2-21 0-28-8-10-10-10-62 22-62zm160-20h35c20 0 20 85-5 105-20 15-30 15-40 5 8-15 10-35 10-50zm0 20v40c0 10-2 20-6 30 10 2 21 0 28-8 10-10 10-62-22-62zm-95 145h30v50h-30zm-40 50h110v25H195zm-15 25h140v15H180z" />
                        </svg>

                    </div>
                    <h2 className="latest-wins__title">Последние крупные выигрыши</h2>
                </div>

                <Link to={PATHS.allWinnings()} className="latest-wins__link-all">
                    Все выигрыши <span>→</span>
                </Link>
            </div>

            <div className="latest-wins__slider">

                <button
                    className="latest-wins__arrow latest-wins__arrow--prev"
                    aria-label="Предыдущий слайд"
                    onClick={() => handleScroll("left")}
                >
                    ‹
                </button>

                <div className="latest-wins__track" ref={trackRef}>
                    {wins.length > 0 ? wins.map((win) => (
                        <WinnerCard
                            key={win.id}
                            winId={win.id}
                            image={win.image}
                            nameWinner={win.nameWinner}
                            cash={win.cash}
                            nameGame={win.game?.title ?? "Игра недоступна"}
                        />
                    )) : (
                        <p className="latest-wins__empty">Выигрышей пока нет.</p>
                    )}
                </div>

                <button
                    className="latest-wins__arrow latest-wins__arrow--next"
                    aria-label="Следующий слайд"
                    onClick={() => handleScroll("right")}
                >
                    ›
                </button>

            </div>

        </section>
    );
};


