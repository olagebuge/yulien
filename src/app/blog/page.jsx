import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { getPosts, getCategory } from "@/lib/data";
import Image from "next/image";
import PostSideBar from "@/components/postSideBar/PostSideBar";

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch(`${process.env.BLOG_URL}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

export const metadata = {
  title: "祭拜殿堂",
  description:
    "拜拜有許多你可能不知道的眉角，閱讀祭拜殿堂的文章，讓你的心意能確實傳達給祖先神明",
};

const BlogPage = async () => {
  // FETCH DATA WITH AN API
  //const posts = await getData();

  // FETCH DATA WITHOUT AN API
  const posts = await getPosts();
  const categories = await getCategory();

  return (
    <div className={`container ${styles.container}`}>
      <section className={`flexBox ${styles.textContianer}`}>
        <div className="relaBlock">
          <h2 className="subtitle">Tips</h2>
          <h1 className="h1Title">祭拜殿堂</h1>
          <p className="desc">
            拜拜有許多你可能不知道的眉角
            <br />
            祭拜殿堂來告訴你，讓你的心意能確實傳達給祖先神明
          </p>
        </div>
        <div className={styles.bgImg}>
          <Image
            src="/blog_bg.svg"
            fill
            alt="blog_香爐背景"
            className={styles.img_kv}
          />
        </div>
      </section>
      <section className="flexBox">
        {posts.slice(0, 3).map((post) => (
          <div key={post.id} className={styles.postContainer}>
            <Image src={post.img} fill alt="文章封面" className={styles.img} />
            <p className={styles.postTitle}>{post.title}</p>
          </div>
        ))}
      </section>

      <section className={styles.postBlock}>
        <h3 className={`alignButton ${styles.h3Title}`}>
          <div className="iconContainer">
            <Image src="/blog_icon.svg" fill alt="所有文章icon" />
          </div>
          所有文章
        </h3>
        <PostSideBar cate={categories} initialPosts={posts} />
      </section>
    </div>
  );
};

export default BlogPage;
