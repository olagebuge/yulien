// "use client";
import Image from "next/image";
import styles from "./contact.module.css";
// import dynamic from "next/dynamic";
// import HydrationTest from "@/components/hydrationTest";

// const HydrationTestNoSSR = dynamic(()=>import("@/components/hydrationTest"), {ssr: false})

export const metadata = {
  title: "Contact Page",
  description: "Contact description",
};

const ContactPage = () => {
  // const a = Math.random();

  // console.log(a);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        {/* <HydrationTestNoSSR/> */}
        {/* <div suppressHydrationWarning>{a}</div> */}
        <form action="" className={styles.form}>
          <input type="text" placeholder="請填寫您的大名" />
          <input type="email" placeholder="請填寫聯絡信箱" />
          <input type="text" placeholder="請填寫電話號碼(選填)" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="請填寫聯絡內容"
          ></textarea>
          <button>寄送訊息</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
