import { PromoBadge } from '../PromoBadge';
import { PromoButton } from '../PromoButton';
import styles from './CashbackPromo.module.scss';

// Слайд №2: еженедельный кэшбэк.
export const CashbackPromo = () => (
  <article className={styles.promo}>
    <div className={styles.content}>
      <PromoBadge tone="purple">Кэшбэк</PromoBadge>
      <h2 className={styles.title}>Возврат до 15%</h2>
      <p className={styles.subtitle}>с любых проигрышей каждую неделю — без отыгрыша</p>
      <PromoButton href="/promotions/cashback" variant="outline">
        Подробнее
      </PromoButton>
    </div>

    <div className={styles.art} aria-hidden="true">
      <span className={styles.percent}>15%</span>
      <span className={styles.period}>каждую неделю</span>
    </div>
  </article>
);
