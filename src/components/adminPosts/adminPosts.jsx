import { getPosts } from "@/lib/data";
import styles from "./adminPosts.module.css";
import Image from "next/image";
import Link from "next/link";

const AdminPosts = async () => {
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <div className={styles.detail}>
            <div>
            <Image
              src={post.img || "/noAvatar.png"}
              alt=""
              width={50}
              height={50}
            />
            <span className={styles.postTitle}>{post.title}</span>
            </div>
            <div>
            <span className={styles.date}>{`${new Date(post.createdAt).getFullYear()}-${new Date(post.createdAt).getMonth()+1}-${new Date(post.createdAt).getDate()}`}</span>
            <Link className={styles.postButton} href={`/blog/${post.slug}/edit`}>編輯</Link>
            </div>
          </div>
          
          
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;
