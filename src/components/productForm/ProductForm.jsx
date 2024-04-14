"use client";

import { addProduct, editProduct } from "@/lib/action";
import styles from "./productForm.module.css";
import { useFormState } from "react-dom";
import ImgSelectButton from "../imgSelectButton/ImgSelectButton";
import MultiImgSelect from "../multiImgSelect/multiImgSelect";
import VariableInput from "./variableInput/VariableInput";
import CateTag from "../cateTag/CateTag";
import RegexStatus from "../regexStatus/RegexStatus";

const ProductForm = async ({ userId, media, cate, product }) => {
  const [state, formAction] = useFormState(
    product ? editProduct : addProduct,
    undefined
  );

  return (
    <div>
      <form action={formAction} className={styles.container}>
        <input type="hidden" name="id" value={product && product._id} />
        <input type="hidden" name="userId" value={userId} />
        <label>
          商品名稱
          <input
            type="text"
            name="title"
            placeholder="請填入商品名稱"
            defaultValue={product && product.title}
          />
        </label>
        <label>
          商品貨號
          <input
            type="text"
            name="number"
            placeholder="例:A001"
            defaultValue={product && product.number}
          />
        </label>
        <CateTag cate={cate} productCate={(product && product.categories[0] !== "") && product.categories} />
        <RegexStatus title={"商品代稱"} productSlug={product && product.slug} />
        <div className={styles.formImages}>
          <div className={styles.uploadBlock}>
            <h3>商品封面</h3>
            <ImgSelectButton
              btnText={"選擇"}
              desText={"請選擇一張商品封面"}
              media={media}
              productCover={product && product.img}
            />
          </div>
          <div className={styles.uploadBlock}>
            <MultiImgSelect
              btnText={"選擇"}
              desText={"請選擇商品配圖"}
              media={media}
              photos={(product && product?.photos[0] !== "") && product.photos}
            />
          </div>
        </div>

        <VariableInput productVariables={product && product.variables} />

        <textarea
          type="text"
          name="desc"
          placeholder="商品敘述"
          rows={10}
          defaultValue={product && product.desc}
        />
        <button>確認送出</button>
        {state?.error}
      </form>
    </div>
  );
};

export default ProductForm;
