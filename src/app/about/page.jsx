import Image from "next/image";
import styles from "./about.module.css";
import Link from "next/link";

export const metadata = {
  title: "About Page",
  description: "About description",
};

const AboutPage = () => {
  // console.log("lets check where it works")
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.textContainer}>
        <div>
          <h2 className="subtitle">About</h2>
          <h1 className="h1Title">關於永蓮</h1>
          <p className={`desc ${styles.w500}`}>
            我們致力於開發各種再生紙類作品，給您彈性且與眾不同的選擇
            可為您全面客製化紙製品，也能根據您的預算，進行小範圍的客製
            另有其他現成品可供挑選。
          </p>
        </div>
        <div className={styles.kvContainer}>
          <Image
            src="/lotusflower.png"
            fill
            alt="蓮花"
            className={styles.img}
          />
        </div>
      </div>

      <div className={styles.boxes}>
        <div className={styles.box}>
          <div className={styles.imgContainer}>
            <Image
              src="/about01.png"
              fill
              alt="民俗祭祀圖片"
              className={styles.img}
            />
          </div>

          <p>民俗祭祀</p>
        </div>
        <div className={styles.box}>
          <div className={styles.imgContainer}>
            <Image
              src="/about02.png"
              fill
              alt="包裝盒圖片"
              className={styles.img}
            />
          </div>
          <p>包裝盒</p>
        </div>
        <div className={styles.box}>
          <div className={styles.imgContainer}>
            <Image
              src="/about03.png"
              fill
              alt="客製商品圖片"
              className={styles.img}
            />
          </div>
          <p>客製商品</p>
        </div>
      </div>

      <section>
        <Link href="#" className={`alignButton ${styles.btnBG}`} >
          <Image src="/ask_icon.svg" width={28} height={28} alt="立即洽詢icon"/>
          立即洽詢
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
