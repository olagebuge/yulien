"use client";

import Image from "next/image";
import styles from "./uploadAvatar.module.css";
import { useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import AvatarContext from "@/contexts/AvatarContext";
import { FaPen, FaImage } from "react-icons/fa6";
import { revalidatePath } from "next/cache";

const UploadAvatar = async ({ image, id }) => {  
  const [file, setFile] = useState(null);
  const [showAvatar, setShowAvatar] = useState(image);
  const { setAvatar } = useContext(AvatarContext);
  const router = useRouter();

  const onChangeHandler = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    setShowAvatar(URL.createObjectURL(file));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("您必須選擇圖片!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("image", file);

      var requestOptions = { method: "POST", body: formData };
      const response = await fetch("/api/upload/avatar", requestOptions);
      const data = await response.text();      
      setAvatar(JSON.parse(data).imagePath); 
           
      if (response.ok) {
        revalidatePath('/', 'layout');
        router.refresh();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className={styles.imgUpdate}>
        <h2><FaImage/>頭像</h2>
        <input type="hidden" name="id" defaultValue={id} />
        <label>
          <input type="file" name="image" onChange={onChangeHandler} hidden />
          <div className={styles.imgContainer}>            
            <Image src={showAvatar} alt="新的頭像" fill className={styles.img} />
            <div className={styles.penContainer}>
              <p>選擇圖檔</p>
              <div><FaPen /></div>
            </div>
          </div>
        </label>
        <button>確認上傳</button>
      </form>
    </>
  );
};

export default UploadAvatar;
