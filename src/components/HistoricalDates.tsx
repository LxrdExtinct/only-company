import React, { useState, useRef, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import gsap from "gsap";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import type { TimePeriod } from "./types";
import styles from "./HistoricalDates.module.scss";

interface Props {
  periods: TimePeriod[];
}

const HistoricalDates: React.FC<Props> = ({ periods }) => {
  const [activePeriod, setActivePeriod] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);
  const startYearRef = useRef<HTMLSpanElement>(null);
  const endYearRef = useRef<HTMLSpanElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const totalPeriods = periods.length;
  const angleStep = (2 * Math.PI) / totalPeriods;

  const updateCirclePositions = useCallback(() => {
    if (!circleRef.current) return;

    const radius = circleRef.current.offsetWidth / 2;
    const centerX = radius;
    const centerY = radius;

    pointsRef.current.forEach((point, index) => {
      if (point) {
        const angle = angleStep * index - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        gsap.set(point, {
          left: x,
          top: y,
        });
      }
    });
  }, [angleStep]);

  useEffect(() => {
    updateCirclePositions();
    window.addEventListener("resize", updateCirclePositions);
    return () => window.removeEventListener("resize", updateCirclePositions);
  }, [updateCirclePositions]);

  useEffect(() => {
    if (!periods[activePeriod]) return;

    const tl = gsap.timeline();

    tl.to([startYearRef.current, endYearRef.current], {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        if (startYearRef.current) {
          startYearRef.current.textContent =
            periods[activePeriod].startYear.toString();
        }
        if (endYearRef.current) {
          endYearRef.current.textContent =
            periods[activePeriod].endYear.toString();
        }
      },
    }).to([startYearRef.current, endYearRef.current], {
      opacity: 1,
      duration: 0.2,
    });

    pointsRef.current.forEach((point, index) => {
      if (point) {
        gsap.to(point, {
          scale: index === activePeriod ? 1.2 : 1,
          duration: 0.3,
        });
      }
    });

    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }

    setIsAnimating(false);
  }, [activePeriod, periods]);

  const handlePointClick = (index: number) => {
    if (index === activePeriod || isAnimating) return;
    setIsAnimating(true);
    setActivePeriod(index);
  };

  const handlePrev = () => {
    if (activePeriod > 0 && !isAnimating) {
      setIsAnimating(true);
      setActivePeriod((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (activePeriod < totalPeriods - 1 && !isAnimating) {
      setIsAnimating(true);
      setActivePeriod((prev) => prev + 1);
    }
  };

  const setPointRef = (index: number) => (el: HTMLDivElement | null) => {
    pointsRef.current[index] = el;
  };

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
  };

  return (
    <div className={styles.historicalDates}>
      <h2 className={styles.title}>Исторические даты</h2>

      <div className={styles.circleContainer}>
        <div className={styles.circle} ref={circleRef}>
          {periods.map((period, index) => (
            <div
              key={period.id}
              ref={setPointRef(index)}
              className={`${styles.circlePoint} ${index === activePeriod ? styles.active : ""}`}
              onClick={() => handlePointClick(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.yearDisplay}>
        <span className={styles.startYear} ref={startYearRef}>
          {periods[activePeriod].startYear}
        </span>
        <span className={styles.endYear} ref={endYearRef}>
          {periods[activePeriod].endYear}
        </span>
      </div>

      <div className={styles.navigation}>
        <button
          className={styles.navButton}
          onClick={handlePrev}
          disabled={activePeriod === 0 || isAnimating}
        >
          ←
        </button>
        <span className={styles.pagination}>
          {String(activePeriod + 1).padStart(2, "0")}/
          {String(totalPeriods).padStart(2, "0")}
        </span>
        <button
          className={styles.navButton}
          onClick={handleNext}
          disabled={activePeriod === totalPeriods - 1 || isAnimating}
        >
          →
        </button>
      </div>

      <div className={styles.sliderContainer}>
        <button
          className={`${styles.sliderButton} ${styles.prev}`}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          ←
        </button>
        <button
          className={`${styles.sliderButton} ${styles.next}`}
          onClick={() => swiperRef.current?.slideNext()}
        >
          →
        </button>

        <Swiper
          modules={[Navigation, Mousewheel]}
          spaceBetween={30}
          slidesPerView="auto"
          mousewheel={{ forceToAxis: true }}
          onSwiper={handleSwiperInit}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {periods[activePeriod].events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className={styles.eventCard}>
                <div className={styles.eventYear}>{event.year}</div>
                <div className={styles.eventDescription}>
                  {event.description}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HistoricalDates;
