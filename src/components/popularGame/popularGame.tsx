import { useContext } from "react";
import { apiContext } from "../../context/apiContext";
import { GameCatalog } from "../gameCatalog/gameCatalog";
import { FIVE_DIAMONDS_GAME } from "../../share/games";

export const PopularGame = () => {
    const { gamesData } = useContext(apiContext);
    const popularGames = [
        ...gamesData.filter((game) => game.id !== FIVE_DIAMONDS_GAME.id).slice(0, 4),
        FIVE_DIAMONDS_GAME,
    ];

    return (
        <GameCatalog
            title="Популярные игры"
            games={popularGames}
            showAllLink
            additionalPlayableGameIds={[FIVE_DIAMONDS_GAME.id]}
        />
    );
};
