import { useContext } from "react";
import { apiContext } from "../../context/apiContext";
import { GameCatalog } from "../gameCatalog/gameCatalog";

export const PopularGame = () => {
    const { gamesData } = useContext(apiContext);

    return (
        <GameCatalog
            title="Популярные игры"
            games={gamesData}
            limit={5}
            showAllLink
        />
    );
};
