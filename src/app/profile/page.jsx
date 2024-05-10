import { auth } from "@/lib/auth";
import styles from "./profile.module.css";
import Image from "next/image";
import Link from "next/link";
import { getUser, getOrders } from "@/lib/data";
import { FaUserPen, FaFileCirclePlus, FaPlus } from "react-icons/fa6";

export const metadata = {
  title: "個人檔案",
  description: "會員個人檔案",
};

const profilePage = async () => {
  const session = await auth();
  const foundUser = await getUser(session.user?.email);
  const orders = await getOrders();

  const unreadOrders = orders.filter((order) => !order.read);
  const historyOrders = orders.filter((order) => order.read);

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

      <section className={styles.colBlock}>
        <div className={styles.postContainer}>
          <h2>最新訂單</h2>
          目前有{unreadOrders.length}筆新洽詢
          <div className={styles.ordersPool}>
            {unreadOrders.length > 0
              ? unreadOrders.map((order) => (
                  <Link
                    key={order._id}
                    className={styles.orderContainer}
                    href={`/order/${order._id}`}
                  >
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
                    <p>【{order.question}】</p>
                    <p className={styles.summary}>
                      {order.content.slice(0, 12)}...
                    </p>
                  </Link>
                ))
              : ""}
          </div>
        </div>
        <div className={styles.postContainer}>
          <h2>歷史洽詢</h2>
          目前有{historyOrders.length}筆歷史洽詢
          <div className={styles.ordersPool}>
            {historyOrders.length > 0
              ? historyOrders.map((order) => (
                  <Link
                    key={order._id}
                    className={styles.orderContainer}
                    href={`/order/${order._id}`}
                  >
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
                    <p>【{order.question}】</p>
                    <p className={styles.summary}>
                      {order.content.slice(0, 12)}...
                    </p>
                  </Link>
                ))
              : ""}
          </div>
        </div>
      </section>
    </section>
  );
};

export default profilePage;
