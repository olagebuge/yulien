"use client";

import { addPost, editPost } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";
import ImgSelectButton from "../imgSelectButton/ImgSelectButton";
import RegexStatus from "../regexStatus/RegexStatus";
import CateTag from "../cateTag/CateTag";

const AdminPostForm = async ({ userId, media, cate, post }) => {  
  const [state, formAction] = useFormState(
    post ? editPost : addPost,
    undefined
  );

  return (
    <div>
      <form action={formAction} className={styles.container}>
        <input type="hidden" name="id" value={post && post._id} />
        <input type="hidden" name="userId" value={userId} />
        <div className={styles.uploadBlock}>
          <h3>文章封面</h3>
          <ImgSelectButton
            btnText={"選擇"}
            desText={"請選擇一張文章封面"}
            media={media}
            productCover={post && post?.img}
          />
        </div>
        <div style={{display:"flex"}}>
        <label>文章標題</label>
          <input type="text" name="title" placeholder="請輸入文章標題" defaultValue={post && post.title}/>
        </div>
        <CateTag cate={cate} productCate={(post && post.categories[0] !== "") && post.categories}/>
        <RegexStatus title={"文章代稱"} productSlug={post && post.slug}/>
        <h3>文章內容</h3>
        <textarea type="text" name="desc" placeholder="請輸入文章內容" rows={10} defaultValue={post && post?.desc}/>
        <button>確認送出</button>
        {state?.error}
      </form>
    </div>
  );
};

export default AdminPostForm;
