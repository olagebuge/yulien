// "use client";
import Image from "next/image";
import styles from "./contact.module.css";
import Link from "next/link";

// import dynamic from "next/dynamic";
// import HydrationTest from "@/components/hydrationTest";

// const HydrationTestNoSSR = dynamic(()=>import("@/components/hydrationTest"), {ssr: false})

export const metadata = {
  title: "聯絡我們",
  description: "聯絡永蓮紙藝洽詢或訂購商品",
};

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <section className={`flexBox ${styles.textContianer}`}>
        <div>
          <h2 className="subtitle">Contact</h2>
          <h1 className="h1Title">聯絡我們</h1>
        </div>
        <p className={styles.desc}>
          歡迎個人或經銷商訂購，若您不確定產品是否符合預期，
          可先下單少量樣品，或親自到店察看樣品
        </p>
      </section>
      <section className="container">
        <div className={styles.formContainer}>
          {/* <HydrationTestNoSSR/> */}
          {/* <div suppressHydrationWarning>{a}</div> */}

          <form action="" className={styles.form}>
            <div className={styles.rowInput}>
              <label htmlFor="name">稱呼</label>
              <input type="text" id="name" name="name" placeholder="稱呼" />
            </div>
            <div className={styles.rowInput}>
              <label htmlFor="phone">電話</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="連絡電話"
              />
            </div>
            <div className={styles.rowInput}>
              <label htmlFor="email">電子信箱</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="請填寫聯絡信箱"
              />
            </div>
            <div className={styles.rowInput}>
              <label htmlFor="question">洽詢類別</label>
              <select name="question" id="question">
                <option value="">取得報價單(7天內有效)</option>
                <option value="">訂購問題</option>
                <option value="">其他</option>
              </select>
            </div>
            <div className={styles.rowInput}>
              <label htmlFor="content">洽詢內容</label>
              <textarea
                name="content"
                id="content"
                cols="20"
                rows="10"
                placeholder="請填寫洽詢內容"
              ></textarea>
            </div>

            <button>確認送出</button>
          </form>
        </div>

        <div className={styles.imageBlock}>
          
            <h3 className={styles.h3Title}>想<span className={styles.lineDec}>更快</span>取得報價?</h3>
            <Link href="tel:+886-4-27001111" className={styles.contactBtn}>
              <div className={styles.imgContainer}>
                <Image src="/tel_icon.png" alt="" fill className={styles.img} />
              </div>
              點我撥打電話
            </Link>
          
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
