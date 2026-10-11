import { useContext } from "react";
import { GameCatalog } from "../../components/gameCatalog/gameCatalog";
import { apiContext } from "../../context/apiContext";
import { PromoCarouselSection } from "../../components/promo_carusel/PromoCarouselSection";

export const GamesPage = () => {
    const { gamesData } = useContext(apiContext);

    return (
        <>
            <PromoCarouselSection />
            <GameCatalog title="Все игры" games={gamesData} headingLevel="h1" />
        </>
    )

};
