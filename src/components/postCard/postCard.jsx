import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <>
      <Link className={styles.container} href={`/blog/${post.slug}`}>
        {post.img && (
          <div className={styles.imgContainer}>
            <Image src={post.img} alt="" fill className={styles.img} />
          </div>
        )}
        <span>{post.createdAt?.toString().slice(0, 10)}</span>

        <h3 className={styles.title}>{post.title}</h3>
      </Link>
    </>
  );
};

export default PostCard;
