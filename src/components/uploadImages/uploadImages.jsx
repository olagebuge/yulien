"use client";

import Image from "next/image";
import styles from "./uploadImages.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowUpFromBracket, FaTrashCan, FaCirclePlus } from "react-icons/fa6";

const UploadImages = async ({ id }) => {
  const [files, setFiles] = useState(null);
  const [showImages, setShowImages] = useState(null);
  const router = useRouter();

  const onChangeHandler = async (e) => {
    let newFiles = e.target.files;
    let selectFiles;

    if (files) {
      newFiles = Array.from(files).concat(Array.from(newFiles));
      selectFiles = new DataTransfer();
      newFiles.forEach((file) => selectFiles.items.add(file));
      selectFiles = selectFiles.files;
    } else {
      selectFiles = newFiles;
    }
    renewImage(selectFiles);
  };

  const onDeleteHandler = async (index) => {
    let newFiles = Array.from(files);
    newFiles.splice(index, 1);
    let selectFiles = new DataTransfer();
    newFiles.forEach((file) => selectFiles.items.add(file));
    selectFiles = selectFiles.files;

    renewImage(selectFiles);
  };

  //更新files及顯示圖片的內容
  const renewImage = (selectFiles) => {
    setFiles(selectFiles);

    let fileUrls = [];
    for (let i = 0; i < selectFiles.length; i++) {
      fileUrls.push(URL.createObjectURL(selectFiles[i]));
    }
    setShowImages(fileUrls);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!files) {
      alert("您至少需要選擇1張圖片!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("id", id);
      for (let i = 0; i < files.length; i++) {
        formData.append(`media[]`, files[i]);
      }
      var requestOptions = { method: "POST", body: formData };
      const response = await fetch("/api/upload/media", requestOptions);
      console.log(response.ok);
      if (response.ok) {
        setFiles(null);
        setShowImages(null);
        router.refresh();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className={styles.imgUpdate}
      onSubmit={onSubmitHandler}
      encType="multipart/form-data"
    >
      <input type="hidden" name="id" defaultValue={id} />
      <h2>
        <p>         
          <span className={styles.nums}>
            已選{showImages ? showImages.length : 0}張
          </span>
        </p>

        <button><FaArrowUpFromBracket/> 確認上傳</button>
      </h2>
      <div className={styles.uploadImages}>
        <label>
          <input
            type="file"
            name="images"
            onChange={onChangeHandler}
            hidden
            multiple
          />

          <FaCirclePlus className={styles.uploadIcon} />
        </label>
        <div className={styles.uploadImages}>
          {showImages &&
            showImages.map((showImage, index) => (
              <div className={styles.imgContainer} key={index}>
                <FaTrashCan
                  className={styles.trashCan}
                  onClick={() => onDeleteHandler(index)}
                />
                <Image
                  src={showImage}
                  alt="展示圖片"
                  fill
                  className={styles.img}
                />
              </div>
            ))}
        </div>
      </div>
    </form>
  );
};

export default UploadImages;
