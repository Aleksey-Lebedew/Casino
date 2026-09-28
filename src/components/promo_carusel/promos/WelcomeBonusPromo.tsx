import { PromoBadge } from '../PromoBadge';
import { PromoButton } from '../PromoButton';
import styles from './WelcomeBonusPromo.module.scss';

// Слайд №1: приветственный бонус на первый депозит.
export const WelcomeBonusPromo = () => (
  <article className={styles.promo}>
    <div className={styles.content}>
      <PromoBadge tone="green">Стартовый бонус</PromoBadge>
      <h2 className={styles.title}>+100% к депозиту</h2>
      <p className={styles.subtitle}>и 50 фриспинов в подарок на первый депозит</p>
      <PromoButton href="/registration" variant="primary">
        Забрать бонус
      </PromoButton>
    </div>

    {/* aria-hidden — декоративная графика ничего не сообщает screen reader'у */}
    <div className={styles.art} aria-hidden="true">
      <span className={`${styles.chip} ${styles.chipGreen}`} />
      <span className={`${styles.chip} ${styles.chipRed}`} />
      <span className={`${styles.chip} ${styles.chipGold}`} />
    </div>
  </article>
);
