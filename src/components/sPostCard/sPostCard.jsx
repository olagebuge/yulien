import Image from "next/image";
import styles from "./sPostCard.module.css";
import Link from "next/link";

const SPostCard = ({ post }) => {
  return (
    <Link className={styles.container} href={`/blog/${post.slug}`}>
      <div className={styles.top}>
        {post.img && (
          <div className={styles.imgContainer}>
            <Image src={post.img} alt="" fill className={styles.img} />
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <span className={styles.date}>
          {post.createdAt?.toString().slice(4, 16)}
        </span>
        <h3 className={styles.title}>{post.title}</h3>
      </div>
    </Link>
  );
};

export default SPostCard;
