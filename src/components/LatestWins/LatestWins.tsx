import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../share/paths";
import { WinnerCard } from "../winnerCard/winnerCard";
import "./LatestWins.scss";
import { apiContext } from "../../context/apiContext";


// const mockWins = [
//     { id: "1", image: "https://placehold.co", nameWinner: "Player123", cash: 250000, nameGame: "Book of Dead" },
//     { id: "2", image: "https://placehold.co", nameWinner: "LuckyUser", cash: 180000, nameGame: "Sweet Bonanza" },
//     { id: "3", image: "https://placehold.co", nameWinner: "GameMaster", cash: 120000, nameGame: "Fruit Cocktail" },
//     { id: "4", image: "https://placehold.co", nameWinner: "Winner777", cash: 950000, nameGame: "Big Bass Bonanza" },
//     { id: "5", image: "https://placehold.co", nameWinner: "AlexWin", cash: 80000, nameGame: "Starburst" },
//     { id: "6", image: "https://placehold.co", nameWinner: "SlotQueen", cash: 310000, nameGame: "Gates of Olympus" },
//     { id: "7", image: "https://placehold.co", nameWinner: "SpinDoctor", cash: 145000, nameGame: "Legacy of Dead" },
//     { id: "8", image: "https://placehold.co", nameWinner: "MaxBetPro", cash: 520000, nameGame: "Razor Shark" },
//     { id: "9", image: "https://placehold.co", nameWinner: "CryptoKing", cash: 89000, nameGame: "Plinko" },
//     { id: "10", image: "https://placehold.co", nameWinner: "JackpotHunter", cash: 1250000, nameGame: "Crazy Time" },
//     { id: "11", image: "https://placehold.co", nameWinner: "CrazySpins", cash: 210000, nameGame: "Sweet Bonanza" },
//     { id: "12", image: "https://placehold.co", nameWinner: "GoldenTouch", cash: 75000, nameGame: "Book of Dead" },
//     { id: "13", image: "https://placehold.co", nameWinner: "WildWolf", cash: 165000, nameGame: "Big Bass Bonanza" },
//     { id: "14", image: "https://placehold.co", nameWinner: "FortuneSeeker", cash: 430000, nameGame: "Crazy Time" },
//     { id: "15", image: "https://placehold.co", nameWinner: "ZeusGamer", cash: 285000, nameGame: "Gates of Olympus" },
//     { id: "16", image: "https://placehold.co", nameWinner: "SugarRush", cash: 195000, nameGame: "Starburst" },
//     { id: "17", image: "https://placehold.co", nameWinner: "CoinCollector", cash: 62000, nameGame: "Fruit Cocktail" },
//     { id: "18", image: "https://placehold.co", nameWinner: "JokerUser", cash: 340000, nameGame: "Plinko" },
//     { id: "19", image: "https://placehold.co", nameWinner: "SharkSpin", cash: 710000, nameGame: "Razor Shark" },
//     { id: "20", image: "https://placehold.co", nameWinner: "VikingPower", cash: 115000, nameGame: "Legacy of Dead" }
// ];


export const LatestWins = () => {
    const { usersData, gamesData } = useContext(apiContext)

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
                    {usersData.map((win, index) => {
                        const curentGame = gamesData[index % gamesData.length]
                        const randomCash = Math.floor(10000 + Math.random() * 400000);

                        return (
                            <WinnerCard
                                key={win.id}
                                image={win.image}
                                nameWinner={win.nameWinner}
                                cash={randomCash}
                                nameGame={curentGame.title}
                            />
                        )
                    })}
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



