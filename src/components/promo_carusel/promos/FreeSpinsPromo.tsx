import { PromoBadge } from '../PromoBadge';
import { PromoButton } from '../PromoButton';
import styles from './FreeSpinsPromo.module.scss';

// Слайд №5: фриспины без депозита за регистрацию.
export const FreeSpinsPromo = () => (
  <article className={styles.promo}>
    <div className={styles.content}>
      <PromoBadge tone="green">Без депозита</PromoBadge>
      <h2 className={styles.title}>30 фриспинов</h2>
      <p className={styles.subtitle}>просто за регистрацию аккаунта</p>
      <PromoButton href="/registration" variant="primary">
        Зарегистрироваться
      </PromoButton>
    </div>

    <div className={styles.art} aria-hidden="true">
      <div className={styles.reel}>
        <span>7</span>
        <span>★</span>
        <span>$</span>
      </div>
    </div>
  </article>
);
