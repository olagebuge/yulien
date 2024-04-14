"use client";

import { addCategory } from "@/lib/action";
import { useFormState } from "react-dom";
import { FaPlus } from "react-icons/fa6";
import ImgSelectButton from "../imgSelectButton/ImgSelectButton";
import RegexStatus from "../regexStatus/regexStatus";


const CategoryForm = async ({ media }) => {
  const [state, formAction] = useFormState(addCategory, undefined);

  return (
    <div>
      <h2>
        <FaPlus />
        新增
      </h2>
      <p className="description">{state?.error}</p>
      <form action={formAction} className="formContiner">
        <label>
          名稱
          <input
            type="text"
            name="title"
            placeholder="商品分類名稱，例如：辦公用品"
            required
          />
        </label>

        <RegexStatus />

        <label>
          圖片
          <ImgSelectButton
            media={media}
            btnText={"選擇"}
            desText={"請選擇1張圖片作為類別的代表封面圖"}
          />
        </label>
        <button>確認新增</button>
      </form>
    </div>
  );
};

export default CategoryForm;
