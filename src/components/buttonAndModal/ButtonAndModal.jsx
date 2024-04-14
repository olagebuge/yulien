"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import styles from "./buttonAndModal.module.css";
import { FaRegCircleQuestion, FaXmark } from "react-icons/fa6";
import { deleteMedia, toggleShelves } from "@/lib/action";

const ButtonAndMoodal = ({ imageId, shelves, words, productId }) => {
  const [state, formAction] = useFormState(shelves ? toggleShelves : deleteMedia, undefined);
  const [open, setOpen] = useState(false);
  

  const onOpenHandler = () => {
    setOpen(true);
  };

  const onCloseHandler = () => {
    setOpen(false);
  };  
 
  const onBalloonClickHandler = (event) => {
    event.stopPropagation(); // 阻止事件冒泡
  };

  return (
    <div className={styles.container}>
      {shelves ? (
        <span
          className={`${styles.drawft} ${words === "下架" ? styles.red : ""}`}
          onClick={onOpenHandler}
        >
          {words}
        </span>
      ) : (
        <button className={styles.delete} onClick={onOpenHandler}>
          <FaXmark />
          刪除媒體
        </button>
      )}

      {open && (
        <div className={styles.overlay} onClick={onCloseHandler}>
          <div className={styles.balloon} onClick={onBalloonClickHandler}>
            <span className={styles.closeIcon}>
              <FaXmark onClick={onCloseHandler} />
            </span>
            <div className={styles.content}>
              {shelves ? (
                <>
                  <h3>
                    <FaRegCircleQuestion />
                    文章即將{words}
                  </h3>
                  確定要{words}這項產品／文章嗎?
                </>
              ) : (
                <>
                  <h3>
                    <FaRegCircleQuestion />
                    確定要刪除這張圖片嗎?
                  </h3>
                  <p>圖片刪除後無法復原，需重新上傳哦!</p>
                </>
              )}

              <div className={styles.buttons}>
                <form action={formAction}>
                  <input
                    type="hidden"
                    name="id"
                    value={shelves ? productId : imageId}
                  />
                  <button className={styles.delete}>
                    {shelves ? "確定" : "刪除"}
                  </button>
                </form>
                <button className={styles.cancel} onClick={onCloseHandler}>
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonAndMoodal;
