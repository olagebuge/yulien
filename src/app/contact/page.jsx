import Image from "next/image";
import styles from "./contact.module.css";
import Link from "next/link";
import ContactForm from "@/components/contactForm/ContactForm";

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
        
        <ContactForm />
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
