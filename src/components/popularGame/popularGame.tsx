import { useContext } from "react";
import { GameCard } from "../gameCard/gameCard";
import { Link } from "react-router-dom";
import { PATHS } from "../../share/paths";
import './popularGame.scss'
import { apiContext } from "../../context/apiContext";
// export const MOCK_GAMES_DATA = [
//     {
//         image: "https://placehold.co",
//         title: "Book of Dead",
//         description: "Разгадайте тайны Древнего Египта и найдите скрытые сокровища фараонов."
//     },
//     {
//         image: "https://placehold.co",
//         title: "Sweet Bonanza",
//         description: "Лавина сладостей, ярких красок и огромных множителей в сладком мире."
//     },
//     {
//         image: "https://placehold.co",
//         title: "Fruit Cocktail",
//         description: "Классический фруктовый слот с любимой бонусной игрой из нулевых."
//     },
//     {
//         image: "https://placehold.co",
//         title: "Big Bass Bonanza",
//         description: "Закидывайте удочку и ловите самую крупную денежную рыбу."
//     },
//     {
//         image: "https://placehold.co",
//         title: "Starburst",
//         description: "Космическое сияние драгоценных камней и расширяющиеся дикие символы."
//     },
//     {
//         image: "https://placehold.co",
//         title: "Gates of Olympus",
//         description: "Врата Зевса открыты. Испытайте на себе щедрость олимпийских богов."
//     },
//     {
//         image: "https://placehold.co",
//         title: "Legacy of Dead",
//         description: "Продолжение легендарной египетской саги с расширяющимися символами."
//     },
//     {
//         image: "https://placehold.co",
//         title: "Razor Shark",
//         description: "Опасное подводное приключение с мистическими рядами зубастых акул."
//     },
//     {
//         image: "https://placehold.co",
//         title: "Plinko",
//         description: "Простая и захватывающая аркада: куда упадет шарик, там и ваш выигрыш."
//     },
//     {
//         image: "https://placehold.co",
//         title: "Crazy Time",
//         description: "Сумасшедшее live-шоу с огромным денежным колесом и бонусными играми."
//     }
// ];


export const PopularGame = () => {
    const { gamesData } = useContext(apiContext);
    return (
         <section className="popular-games">
            
            <div className="popular-games__header">
                <h2 className="popular-games__title">Популярные игры</h2>
                <Link className="popular-games__all-link" to={PATHS.games()}>
                    Полный список игр <span aria-hidden="true">→</span>
                </Link>
            </div>

            <div className="popular-games__grid">
                {gamesData.slice(0, 5).map((game, index) => (
                    <GameCard
                        key={index}
                        image={`${game.image}/150`} 
                        title={game.title}
                        description={game.description}
                    />
                ))}
            </div>

        </section>
    )
} 
