"use client";

import styles from "./postSideBar.module.css";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PostSideBar = ({ cate, initialPosts }) => {
  const [selectCate, setSelectCate] = useState(null);
  const [posts, setPosts] = useState(initialPosts);

  const onSelectCate = (cateName) => {
    setSelectCate(cateName);
    if (cateName === null) {
      setPosts(initialPosts);
    } else {
      const filteredProducts = initialPosts.filter((p) =>
        p.categories.includes(cateName)
      );
      setPosts(filteredProducts);
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
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            className={styles.postContainer}
            key={post._id}
          >
            <div className={styles.imgContainer}>
              <Image src={post.img} fill alt={"這我還想不到該怎麼辦"} className={styles.img}/>
            </div>
            <div className={styles.textContainer}>
              <h3>{post.title}</h3>
              <p className={styles.desc}>{post?.desc.slice(0,15)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostSideBar;
