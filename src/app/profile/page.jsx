import { auth } from "@/lib/auth";
import styles from "./profile.module.css";
import Image from "next/image";
import Link from "next/link";
import { getUser, getUserPosts, getOrders } from "@/lib/data";
import SPostCard from "@/components/sPostCard/sPostCard";
import { FaUserPen, FaFileCirclePlus, FaPlus } from "react-icons/fa6";
import { deletePost } from "@/lib/action";

export const metadata = {
  title: "個人檔案",
  description: "會員個人檔案",
};

const profilePage = async () => {
  const session = await auth();
  const foundUser = await getUser(session.user?.email);
  const posts = await getUserPosts(foundUser?.id);
  const orders = await getOrders();

  return (
    <section className={`container ${styles.container}`}>
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
        <h2>最新訂單</h2>
        目前有{orders.length}張訂單
        {orders.length > 0
          ? orders.map((order) => (
              <div key={order._id} className={styles.orderContainer}>
                <div className={styles.date}>
                  <span>{`${new Date(order.createdAt)
                    .getFullYear()
                    .toString()}-${
                    parseInt(new Date(order.createdAt).getMonth()) + 1
                  }-${new Date(order.createdAt).getDate()}`}</span>
                  <span>{order.situation}</span>
                </div>
                <div className={styles.orderName}>
                  <h3>{order.name}</h3>
                  <p>{order.phone}</p>
                  <p>{order.email}</p>
                </div>
                <p>{order.question}</p>
                <p>{order.content.slice(0, 10)}...</p>
              </div>
            ))
          : ""}
      </div>
    </section>
  );
};

export default profilePage;
