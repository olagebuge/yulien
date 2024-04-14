"use client";

import { useState } from "react";
import styles from "./variableProps.module.css";
import AddToCart from "../addToCart/AddToCart";

const VariableProps = ({ product }) => {
  const [select, setSelect] = useState(0);
  const [showProps, setShowProps] = useState(product.variables[0]);

  const onClickShowHandler = (index) => {
    setSelect(index)
    setShowProps(product.variables[index]);
  };

  return (
    <div className={styles.container}>
      <div className="flexBox">
        {product?.variables &&
          product.variables.map((item, index) => (
            <span
              key={index}
              onClick={()=> onClickShowHandler(index)}
              className={`${styles.variSpan} ${
                item?.stocks === null ? styles.none : ""
              } ${index === select ? styles.active : ""}`}
            >
              {item?.key}
            </span>
          ))}
      </div>
      <div className={styles.propBox}> 
        <span className={styles.price}>NT.{showProps.price}元</span>
        <span className={styles.stocks}>{showProps.stocks != (0 || null) ? <span>庫存 {showProps.stocks}</span>: "無庫存" }</span>
      </div>

      <AddToCart stocks={showProps.stocks}/>
    </div>
  );
};

export default VariableProps;
