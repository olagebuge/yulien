"use client";

import Image from "next/image";
import styles from "./sliderShow.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const SliderShow = ({ img, photos }) => {
  return (
    <div className={styles.mySwiperBlock}>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className={styles.mySwiper}
        spaceBetween={60}        
      >
        <SwiperSlide className={styles.swiperContainer}>
          <Image src={img} fill alt="" />
        </SwiperSlide>
        {photos[0] !== "" &&
          photos.map((photo) => (
            <SwiperSlide className={styles.swiperContainer}>
              <Image src={photo} fill alt="" />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className={styles.intro}>
        <h4>專利設計款</h4>一體成形、多色可選
      </div>
    </div>
  );
};

export default SliderShow;
