import { Carousel } from './Carousel/Carousel';
import {
  WelcomeBonusPromo,
  CashbackPromo,
  TournamentPromo,
  VipPromo,
  FreeSpinsPromo,
} from './promos';

export const PromoCarouselSection = () => (
  <Carousel
    ariaLabel="Акции казино"
    slides={[
      <WelcomeBonusPromo key="welcome" />,
      <CashbackPromo key="cashback" />,
      <TournamentPromo key="tournament" />,
      <VipPromo key="vip" />,
      <FreeSpinsPromo key="freespins" />,
    ]}
  />
);
