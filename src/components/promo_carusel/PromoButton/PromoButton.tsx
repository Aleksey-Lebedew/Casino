import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './PromoButton.module.scss';

interface PromoButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline';
}

// Кнопка призыва к действию для промо-слайдов ("Зарегистрироваться",
// "Подробнее" и т.п.). Это ссылка <a>, а не <button> — семантически
// верно, потому что она ведёт на другую страницу/раздел, а не выполняет
// действие на текущей. Это важно и для доступности, и для SEO.
export const PromoButton = ({ variant = 'primary', className, children, ...rest }: PromoButtonProps) => (
  <a className={`${styles.button} ${styles[variant]} ${className ?? ''}`} {...rest}>
    {children}
  </a>
);
