"use client";

import styles from "./cateMangeList.module.css";
import { useState } from "react";
import Image from "next/image";
import { FaPen } from "react-icons/fa6";
import Link from "next/link";
import { toggleShelves } from "@/lib/action";

const CateMangeList = ({ cate, initialProducts }) => {
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
        <div className={styles.sideCates}>
          <div
            className={!selectCate ? styles.active : ""}
            onClick={() => onSelectCate(null)}
          >
            全部
          </div>
          {cate?.length
            ? cate.map((c) => (
                <div
                  key={c._id}
                  onClick={() => onSelectCate(c.title)}
                  className={selectCate === c.title ? styles.active : ""}
                >
                  {c.title}
                </div>
              ))
            : ""}
           <div
            className={selectCate === "未分類" ? styles.active : ""}
            onClick={() => onSelectCate("未分類")}
          >
            未分類
          </div>
        </div>
      </div>
      <div className={styles.productBlock}>
        {products.map((product) => (
          <div className={styles.productContainer} key={product._id}>
            <div className={styles.imgContainer}>
              <Image src={product.img} fill alt={"這我還想不到該怎麼辦"} />
              <Link
                href={`/product/${product.slug}/edit`}
                className={styles.editIcon}
              >
                <FaPen />
              </Link>
              <h3>{product.title}</h3>
            </div>

            <div className={styles.editIconList}>
              <div className={styles.status}>
                <span
                  className={`${styles.light} ${
                    product.public === false ? styles.red : ""
                  }`}
                ></span>
                {product.public === false ? "草稿" : "公開中"}
              </div>
              <form action={toggleShelves}>
                <input type="hidden" name="id" value={product._id}/>
                <button className={`${styles.drawft} ${
                    product.public === false ? styles.red : ""
                  }`}>
                  {product.public === false ? "上架" : "下架"}
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CateMangeList;
