import { getOrder } from "@/lib/data";
import styles from "./singleOrderPage.module.css";
import { FaCheck, FaRegEnvelope } from "react-icons/fa6";
import OrderAnnotation from "@/components/orderAnnotation/OrderAnnotation";

const SingleOrderPage = async ({ params }) => {
  const { id } = params;
  const order = await getOrder(id);

  if (!order.read) {
    order.read = true;
    order.situation = "已讀";
    await order.save();
  }

  console.log(order)

  return (
    <section className={`container ${styles.container}`}>
      <div className={styles.titleBlock}>
        <h1>洽詢資料</h1>
        <span className={styles.align}>{order.situation === "已讀" ? <FaCheck /> : <FaRegEnvelope />}{order.situation}</span>
      </div>
      <div className={styles.details}>
        <p>
          <span className={styles.sTitle}>時間</span>
          {order.createdAt.toString()}
        </p>
        <p>
          <span className={styles.sTitle}>稱呼</span>
          {order.name}
        </p>
        <p>
          <span className={styles.sTitle}>電話</span>
          {order.phone}
        </p>
        <p>
          <span className={styles.sTitle}>電子郵件</span>
          {order.email}
        </p>
        <p>
          <span className={styles.sTitle}>內容</span>
          {order.content}
        </p>
        <p>
          <span className={styles.sTitle}>註解</span>
          {order.annotation || "無註解"}
        </p>
      </div>

      <OrderAnnotation id={order._id} annotation={order.annotation}/>
    </section>
  );
};

export default SingleOrderPage;
