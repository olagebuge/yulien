"use client";

import styles from "./addToCart.module.css";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa6";

const AddToCart = ({ stocks }) => {
  return (
    <form className={styles.formContainer}>
      <label>
        <span className={styles.mathIcon}>-</span>
        <input type="number" name="buy" defaultValue={stocks >= 1 ? 1 : 0} max={stocks}/>
        <span className={`${styles.mathIcon} ${styles.right}`}>+</span>
      </label>
      <button>
        <FaCartPlus />
        加入購物車
      </button>
    </form>
  );
};

export default AddToCart;
