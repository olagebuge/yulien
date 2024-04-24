"use client";

import { addCategory } from "@/lib/action";
import { useFormState } from "react-dom";
import { FaPlus } from "react-icons/fa6";
import ImgSelectButton from "../imgSelectButton/ImgSelectButton";
import RegexStatus from "../regexStatus/regexStatus";
import styles from "./categoryForm.module.css";

const CategoryForm = async ({ media }) => {
  const [state, formAction] = useFormState(addCategory, undefined);

  return (
    <div className={styles.container}>
      <h2 className="alignTitle">
        <FaPlus /> 新增
      </h2>
      <p className="description">{state?.error}</p>
      <form action={formAction} className="formContiner">
        <div className="rowInput">
          <label htmlFor="title">名稱</label>
          <input
            type="text"
            name="title"
            placeholder="商品分類名稱，例如：辦公用品"
            required
          />
        </div>
        <RegexStatus />
        <div className="rowInput">
          <label htmlFor="img">圖片</label>
          <ImgSelectButton
            media={media}
            btnText={"選擇"}
            desText={"請選擇1張圖片作為類別的代表封面圖"}
          />
        </div>
        <button>確認新增</button>
      </form>
    </div>
  );
};

export default CategoryForm;
