import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './Carousel.module.scss';

interface CarouselProps {
  slides: ReactNode[];
  autoPlayInterval?: number;
  ariaLabel?: string;
}

export const Carousel = ({
  slides,
  autoPlayInterval = 6000,
  ariaLabel = 'Акции и предложения',
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const slidesCount = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % slidesCount) + slidesCount) % slidesCount);
    },
    [slidesCount],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const stopAutoPlay = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAutoPlay = useCallback(() => {
    if (!autoPlayInterval) return;
    stopAutoPlay();
    timerRef.current = window.setInterval(goNext, autoPlayInterval);
  }, [autoPlayInterval, goNext]);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay]);

  return (
    <section
      className={styles.carousel}
      aria-roledescription="карусель"
      aria-label={ariaLabel}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      <div className={styles.viewport}>
        <div className={styles.track} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <div
              className={styles.slide}
              key={index}
              role="group"
              aria-roledescription="слайд"
              aria-label={`${index + 1} из ${slidesCount}`}
              aria-hidden={index !== activeIndex}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowPrev}`}
        onClick={goPrev}
        aria-label="Предыдущий слайд"
      >
        ‹
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowNext}`}
        onClick={goNext}
        aria-label="Следующий слайд"
      >
        ›
      </button>

      <div className={styles.dots} role="tablist" aria-label="Выбор слайда">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Показать слайд ${index + 1}`}
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
};
