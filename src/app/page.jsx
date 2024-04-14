import Image from "next/image";
import styles from "./home.module.css";
import SliderShow from "@/components/sliderShow/SliderShow";

const sliderCover = "/slide_flower01.png";
const sliderData = ["/slide_flower02.png","/slide_flower03.png"];

const Home = () => {
  return (
    <>
      <section className={styles.container1}>
        <div className="container">
          <div className={styles.sliderContainer}>
            <SliderShow img={sliderCover} photos={sliderData} />
          </div>

          <div className={styles.textContainer}>
            <p className={styles.desc}>Forever Lotus</p>
            <h1 className={styles.title}>永蓮紙藝</h1>
          </div>
        </div>
      </section>
      <section className={`full-container ${styles.container2}`}>
        <div className="container">
          <div className={styles.introContainer}>
            <h2 className="h2Title">
              <div className={styles.h2_decContainer}>
                <Image src="/h2_dec.svg" fill alt="h2裝飾" />
              </div>
              環保材質，展開即完成
            </h2>
            <div className={styles.introText}>
              <p className={styles.margin20}>摺蓮花，代表對已故親友的心意</p>
              也許，我們可以用其他方式迴向給親朋好友
              <p>專利設計款蓮花為再生紙製作，結構牢靠，不須橡皮筋固定</p>
              外觀優雅，顏色眾多，愛地球之餘送行也相當體面
            </div>
          </div>
          <div className={styles.imgContainer}>
            <Image src="/KV_intro.png" fill alt="介紹圖片" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
