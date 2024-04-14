"use client";

import styles from "./cateSideBar.module.css";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CateSideBar = ({ cate, initialProducts }) => {
  const [selectCate, setSelectCate] = useState(null);
  const [products, setProducts] = useState(initialProducts);

  const onSelectCate = (cateName) => {
    setSelectCate(cateName);
    if (cateName === null) {
      setProducts(initialProducts);
    } else {
      const filteredProducts = initialProducts.filter((p) =>
        p.categories.includes(cateName)
      );
      setProducts(filteredProducts);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.h3Title}>類別</h3>
        <div className={styles.sideCates}>
          <div
            className={!selectCate && styles.active}
            onClick={() => onSelectCate(null)}
          >
            全部
          </div>
          {cate?.length ?
            cate.map((c) => (
              <div
                onClick={() => onSelectCate(c.title)}
                className={selectCate === c.title && styles.active}
              >
                {c.title}
              </div>
            )):""}
            <div
            className={selectCate === "未分類" && styles.active}
            onClick={() => onSelectCate("未分類")}
          >
            未分類
          </div>
        </div>
      </div>
      <div className={styles.productBlock}>
        {products.map((product) => (
          <Link
            href={`/product/${product.slug}`}
            className={styles.productContainer}
            key={product.id}
          >
            <div className={styles.imgContainer}>
              <Image src={product.img} fill alt={"這我還想不到該怎麼辦"} />
            </div>
            <h3>{product.title}</h3>
            <span>NT.{product.variables[0]?.price}元</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CateSideBar;