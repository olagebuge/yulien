import { getCategory } from "@/lib/data";
import styles from "./product.module.css";
import Image from "next/image";
import Link from "next/link";

const titleDatas = [
  { imgurl: "/productCate01.png", name: "各色蓮花樣品組" },
  { imgurl: "/productCate02.svg", name: "樣品系列", upside: true },
  { imgurl: "/productCate03.png", name: "拜拜便利包" },
  { imgurl: "/productCate04.svg", name: "可店取系列" },
  { imgurl: "/productCate05.png", name: "祭拜用品", upside: true },
  { imgurl: "/productCate06.svg", name: "便利包系列" },
];

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch(`${process.env.PRODUCT_URL}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

export const metadata = {
  title: "商品選購",
  description: "歡迎個人或經銷商訂購，若您不確定產品是否符合預期，可先下單少量樣品",
};


const BlogPage = async () => {
  // FETCH DATA WITH AN API
  const products = await getData();
  const publicProducts = products.filter((p) => p.public);
  const categories = await getCategory();

  return (
    <div className={styles.container}>
      <section className={`flexBox ${styles.textContianer}`}>
        <div>
          <h2 className="subtitle">Product</h2>
          <h1 className="h1Title">商品選購</h1>
        </div>
        <p className="desc">
          歡迎個人或經銷商訂購<br/>
          若您不確定產品是否符合預期，可先下單少量樣品
        </p>
      </section>

      <section className="flexBox">
        <div className={styles.topBlock}>
          <div className={styles.commandBlock}>
            <div className={styles.discount}>
              大量採購
              <p>
                - 30<span className={styles.smaller}>%</span>
              </p>
            </div>
            <Image
              src="/slide_flower03.png"
              width={320}
              height={320}
              className={styles.commandImg}
              alt="圖示"
            />
          </div>
          <div>
            <h3>專利款設計蓮花</h3>
            <p className={styles.text}>不挑色，顏色平均分配</p>
          </div>
        </div>

        <Link href="/product/all" className={styles.cateBlock}>
          {titleDatas.map((data) => (
            <div className={styles.cateItem} key={data.name}>
              <div className={styles.cateImgContainer}>
                <Image src={data.imgurl} fill alt="圖示" />
              </div>

              <h3 className={data?.upside ? styles.upside : ""}>{data.name}</h3>
            </div>
          ))}
        </Link>
      </section>

      <section className={styles.deliverBlock}>
        <div className={styles.flexBox}>
        <div className={styles.carBg}>
          <h2 className={`alignButton ${styles.h2Title}`}>
            <div className={styles.iconContainer}>
              <Image src="/deliver_icon.svg" width={63} height={37} alt="car"/>
            </div>
            物流方式
          </h2>
          <p className={styles.deliverDesc}>
            訂購貨物邊長小於30公分者，可以使用店到店及iPost取件服務，若訂購商品較多， 請選擇宅配或郵局包裹。
          </p>
        </div>
        <div className={styles.listBlock}>
          <ul className={styles.points}>
            <li>超商店到店</li>
            <li>i郵箱寄件</li>
            <li>宅配</li>
            <li>郵局包裹</li>
          </ul>
          <Link href="/product/all" className={styles.btnBG}>立即選購</Link>
        </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
