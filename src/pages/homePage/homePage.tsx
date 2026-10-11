import { LatestWins } from "../../components/LatestWins/LatestWins"
import { PopularGame } from "../../components/popularGame/popularGame"
import { PromoCarouselSection } from "../../components/promo_carusel/PromoCarouselSection"


export const HomePage = () => {

    return (
        <>
            <PromoCarouselSection />
            <LatestWins />
            <PopularGame />
        </>
    )
}

