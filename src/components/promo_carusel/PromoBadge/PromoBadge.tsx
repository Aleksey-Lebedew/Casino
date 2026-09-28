import type { ReactNode } from 'react';
import styles from './PromoBadge.module.scss';

interface PromoBadgeProps {
  children: ReactNode;
  tone?: 'green' | 'gold' | 'purple';
}

// Маленький цветной лейбл в углу слайда ("Кэшбэк", "Турнир недели" и т.д.).
// Цвет (tone) — это семантика повода, а не украшение: зелёный — бонусы,
// золотой — статусные/турнирные штуки, фиолетовый — кэшбэк.
export const PromoBadge = ({ children, tone = 'green' }: PromoBadgeProps) => (
  <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>
);
