import { PromoBadge } from '../PromoBadge';
import { PromoButton } from '../PromoButton';
import styles from './VipPromo.module.scss';

// Слайд №4: VIP-программа.
export const VipPromo = () => (
  <article className={styles.promo}>
    <div className={styles.content}>
      <PromoBadge tone="gold">Только для избранных</PromoBadge>
      <h2 className={styles.title}>VIP-программа</h2>
      <p className={styles.subtitle}>
        Личный менеджер, эксклюзивные бонусы и увеличенные лимиты вывода
      </p>
      <PromoButton href="/vip" variant="outline">
        Узнать больше
      </PromoButton>
    </div>

    {/* Корона нарисована одним div через clip-path — без картинки и без SVG */}
    <div className={styles.art} aria-hidden="true">
      <span className={styles.crown} />
    </div>
  </article>
);
