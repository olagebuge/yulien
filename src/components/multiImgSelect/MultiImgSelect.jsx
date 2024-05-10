"use client";

import { useState } from "react";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import styles from "./multiImgSelect.module.css";
import ImgComponent from "./imgComponent/ImgComponent";
import Link from "next/link";

const MultiImgSelect = ({ btnText, desText, media, photos }) => {  

  const [open, setOpen] = useState(false);
  const [images, setImages] = useState(photos || []);
  const [comfirms, setComfirms] = useState(photos || []);  

  const onOpenHandler = async () => {
    setOpen(true);
  };
  const onCloseHandler = async () => {
    if (images !== comfirms) {
      setImages(comfirms);
    }
    setOpen(false);
  };
  const onSelectHandler = async (url) => {
    if (images.includes(url)) {
      setImages(images.filter((i) => i !== url));
    } else {
      setImages([...images, url]);
    }
  };
  const onComfirmHander = async () => {
    setComfirms(images);
    setOpen(false);
  };
  const onBalloonClickHandler = (event) => {
    event.stopPropagation(); // 阻止事件冒泡
  };

  return (
    <div className={styles.container}>
      <input type="hidden" name="photos" value={comfirms}/>
      <div className={styles.flexBox}>
        <h3>配圖</h3>
        <span>{comfirms?.length}／10</span>
        <span className="lineButton" onClick={onOpenHandler}>
          {btnText}
        </span>
      </div>

      {open && (
        <div className="overlay" onClick={onCloseHandler}>
          <div className="modal" onClick={onBalloonClickHandler}>
            <span className="closeIcon">
              <FaXmark onClick={onCloseHandler} />
            </span>
            <div className="alignBox">
              <p>{desText}</p>
              <div className={`flexBox ${styles.innerBox}`}>
                {media?.length ? (
                  media.map((m) => (
                    <div
                      key={m._id}
                      onClick={() => onSelectHandler(m.url)}
                      className={
                        images.includes(m.url) ? styles.checkOutline : ""
                      }
                    >
                      <ImgComponent item={m} />
                    </div>
                  ))
                ) : (
                  <>
                  <p>目前沒有任何媒體...</p>
                  <Link href="/media">前往上傳</Link>
                  </>
                )}
              </div>

              <div className="normalButton" onClick={onComfirmHander}>
                確認
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.selectImages}>
        {comfirms?.length ? (
          comfirms.map((i) => (
            <div key={i} className="imageContainer">
              <Image src={i} fill alt="被選取的圖片" />
              <div
                className={styles.cancelIcon}
                onClick={() => {
                  setComfirms(comfirms.filter((comfirm) => comfirm !== i));
                  setImages(images.filter((image) => image !== i));
                }}
              >
                刪除
              </div>
            </div>
          ))
        ) : (
          <span className="tips">您尚未選擇任何配圖...</span>
        )}
      </div>
    </div>
  );
};

export default MultiImgSelect;
