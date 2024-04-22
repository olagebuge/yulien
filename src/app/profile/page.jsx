import { auth } from "@/lib/auth";
import styles from "./profile.module.css";
import Image from "next/image";
import Link from "next/link";
import { getUser, getUserPosts } from "@/lib/data";
import SPostCard from "@/components/sPostCard/sPostCard";
import { FaUserPen, FaFileCirclePlus } from "react-icons/fa6";
import { deletePost } from "@/lib/action";

export const metadata = {
  title: "個人檔案",
  description: "會員個人檔案",
};

const profilePage = async () => {
  const session = await auth();
  const foundUser = await getUser(session.user?.email);
  const posts = await getUserPosts(foundUser?.id);

  return (
    <div className={`container ${styles.container}`}>      
        <div className={styles.details}>
          {foundUser?.isAdmin ? (
            <span className={styles.roleTag}>管理員</span>
          ) : (
            <span className={styles.roleTag}>一般會員</span>
          )}
          <Image
            src={foundUser?.image || "/noAvatar.png"}
            alt="avatar"
            width={120}
            height={120}
            className={styles.avatar}
          />
          <p>{foundUser?.username}</p>
          <p>{foundUser?.email}</p>
          <Link
            href="/profile/edit"
            className={`${styles.editButton} ${styles.iconButton}`}
          >
            <FaUserPen /> 更改資訊
          </Link>
        </div>
        <div className={styles.postContainer}>
          <h2>最新文章</h2>
          <div className={styles.postInner}>
            {posts.length ? (
              posts.map((post) => (
                <div className={styles.post} key={post.id}>
                  <SPostCard post={post} />
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button className={styles.postButton}>移除</button>
                  </form>
                </div>
              ))
            ) : (
              <div className={styles.noPost}>
                <p>目前還沒有文章T_T</p>
                <Link href="/blog/new" className={styles.iconButton}>
                  <FaFileCirclePlus />
                  立即新增
                </Link>
              </div>
            )}
          </div>
        </div>
      
    </div>
  );
};

export default profilePage;
