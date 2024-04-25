"use client";

import { addOrder } from "@/lib/action";
import { useFormState } from "react-dom";
import styles from "./contactForm.module.css"



const ContactForm = () => { 
  const [state, formAction] = useFormState(addOrder, undefined);  

  return (    
    <form className={styles.form} action={formAction}>
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
        <option value="takePrice">取得報價單(7天內有效)</option>
        <option value="question">訂購問題</option>
        <option value="other">其他</option>
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
    {state?.error}
  </form>
  )
}

export default ContactForm