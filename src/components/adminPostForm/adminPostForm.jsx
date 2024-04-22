"use client";

import { addPost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";
import ImgSelectButton from "../imgSelectButton/ImgSelectButton";
import RegexStatus from "../regexStatus/RegexStatus";
import CateTag from "../cateTag/CateTag";

const AdminPostForm = async ({ userId, media, cate }) => {
  const [state, formAction] = useFormState(addPost, undefined);

  return (
    <div>
      <form action={formAction} className={styles.container}>
        <input type="hidden" name="userId" value={userId} />
        <div className={styles.uploadBlock}>
          <h3>文章封面</h3>
          <ImgSelectButton
            btnText={"選擇"}
            desText={"請選擇一張文章封面"}
            media={media}
          />
        </div>
        <div style={{display:"flex"}}>
        <label>文章標題</label>
          <input type="text" name="title" placeholder="請輸入文章標題" />
        </div>
        <CateTag cate={cate} />
        <RegexStatus title={"文章代稱"} />
        <h3>文章內容</h3>
        <textarea type="text" name="desc" placeholder="請輸入文章內容" rows={10} />
        <button>確認送出</button>
        {state?.error}
      </form>
    </div>
  );
};

export default AdminPostForm;
