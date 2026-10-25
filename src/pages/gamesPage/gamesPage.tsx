import { useContext } from "react";
import { GameCatalog } from "../../components/gameCatalog/gameCatalog";
import { apiContext } from "../../context/apiContext";
import { PromoCarouselSection } from "../../components/promo_carusel/PromoCarouselSection";
import { FIVE_DIAMONDS_GAME } from "../../share/games";

export const GamesPage = () => {
    const { gamesData } = useContext(apiContext);

    return (
        <>
            <PromoCarouselSection />
            <GameCatalog
                title="Все игры"
                games={gamesData}
                additionalPlayableGameIds={[FIVE_DIAMONDS_GAME.id]}
                headingLevel="h1"
            />
        </>
    )

};
