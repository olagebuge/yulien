"use client";
import { FaCheck, FaXmark, FaExclamation } from "react-icons/fa6";
import styles from "./regexStatus.module.css";
import { useState } from "react";

const RegexStatus = ({ title, productSlug }) => {
  const [slug, setSlug] = useState(productSlug || null);

  const handleSlugChange = (e) => {
    const value = e.target.value;
    const regex = /^[\w]+(\-*[\w]+)+$/i;
    if (regex.test(value)) {
      setSlug(1);
    } else if (value === "") {
      setSlug(null);
    } else {
      setSlug(2);
    }
  };
  return (
    <>
      <div className="rowInput">
        <label>{title || "代稱"}</label>
        <input
          type="text"
          name="slug"
          placeholder="代稱，例如:office-tools"
          onChange={handleSlugChange}
          defaultValue={productSlug}
          required
        />
      </div>
      {slug === null && (
        <span className={styles.metion}>
          <FaExclamation />
          輸入英數字及-連字符組成的代稱，不分大小寫
        </span>
      )}
      {slug === 1 && (
        <span className={styles.successStatus}>
          <FaCheck />
          OK!
        </span>
      )}
      {slug === 2 && (
        <span className={styles.errorStatus}>
          <FaXmark />
          不能輸入英數字及-連字符以外的字元，開頭與結尾必須是英數字
        </span>
      )}
    </>
  );
};

export default RegexStatus;
