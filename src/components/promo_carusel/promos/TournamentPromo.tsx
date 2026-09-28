import { PromoBadge } from '../PromoBadge';
import { PromoButton } from '../PromoButton';
import styles from './TournamentPromo.module.scss';

// Слайд №3: турнир недели с призовым фондом.
export const TournamentPromo = () => (
  <article className={styles.promo}>
    <div className={styles.content}>
      <PromoBadge tone="gold">Турнир недели</PromoBadge>
      <h2 className={styles.title}>Призовой фонд 500 000 ₽</h2>
      <p className={styles.subtitle}>Играйте в слоты и поднимайтесь в рейтинге игроков</p>
      <PromoButton href="/tournaments/weekly" variant="primary">
        Участвовать
      </PromoButton>
    </div>

    {/* Кубок — инлайновый SVG на currentColor, красится через CSS (.trophy) */}
    <div className={styles.art} aria-hidden="true">
      <svg viewBox="0 0 120 120" className={styles.trophy} xmlns="http://www.w3.org/2000/svg">
        <path d="M35 20h50v10a25 25 0 0 1-25 25 25 25 0 0 1-25-25V20z" fill="currentColor" />
        <path d="M35 25H15v5a20 20 0 0 0 20 20" fill="none" stroke="currentColor" strokeWidth="5" />
        <path d="M85 25h20v5a20 20 0 0 1-20 20" fill="none" stroke="currentColor" strokeWidth="5" />
        <rect x="52" y="55" width="16" height="25" fill="currentColor" />
        <rect x="38" y="80" width="44" height="10" rx="3" fill="currentColor" />
      </svg>
    </div>
  </article>
);
