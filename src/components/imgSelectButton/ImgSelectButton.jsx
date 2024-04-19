"use client";

import { useState } from "react";
import Image from "next/image";
import {FaXmark } from "react-icons/fa6";
import styles from "./imgSelectButton.module.css";
import ImgComponent from "./imgComponent/ImgComponent";

const ImgSelectButton = ({ btnText, desText, media, productCover }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState(null); //只選擇封面的狀態下
  const [selectCover, setSelectCover] = useState(productCover || null);

  const onOpenHandler = async () => {
    setOpen(true);
  };
  const onCloseHandler = async () => {
    setOpen(false);
  };
  const onCoverHandler = async (url) => {
    setSelectCover(null);
    setCover(url);
  };
  const onComfirmHander = async () => {
    if (!cover) {
      return alert("你必須選擇1張封面!");
    }
    setSelectCover(cover);
    setOpen(false);
  };
  const onBalloonClickHandler = (event) => {
    event.stopPropagation(); // 阻止事件冒泡
  };
  
    
  

  return (
    <div className={styles.container}>
      <input type="hidden" name="img" value={selectCover || "/noavatar.png"}/>
      <div>
        {selectCover ? (
          <div className="flexBox">            
            <div className="imageContainer">             
              <Image src={selectCover} fill alt="類別封面"/>
              <div className={styles.cancelIcon} onClick={()=>{setCover(null); setSelectCover(null);}}>刪除</div>
            </div>            
          </div>
        ) : (
          <span className="tips">未選擇封面</span>
        )}
      </div>
      <div className="lineButton" onClick={onOpenHandler}>
        {btnText}
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
                      onClick={() => onCoverHandler(m.url)}
                      key={m._id}
                      className={(cover === m.url || selectCover=== m.url)? styles.checkOutline : ""}
                    >
                      <ImgComponent item={m} />
                    </div>
                  ))
                ) : (
                  <p>目前沒有任何媒體</p>
                )}
              </div>

              <div className="normalButton" onClick={onComfirmHander}>
                確認
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImgSelectButton;
