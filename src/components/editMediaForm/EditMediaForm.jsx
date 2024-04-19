"use client";

import styles from "./editMediaForm.module.css";
import { FaRegCircleXmark, FaRegCircleCheck} from "react-icons/fa6";
import { editMedia } from "@/lib/action";
import { useFormState } from "react-dom";


const EditMediaForm = ({media}) => {
  const [state, formAction] = useFormState(editMedia, undefined);
  return (
    <form className={styles.formContainer} action={formAction}>
      
      {state?.error && (<p className="errorStatus alignButton"><FaRegCircleXmark /><span>{state?.error}</span></p>)}      
      {state?.success && (<p className="successStatus alignButton"><FaRegCircleCheck /><span>{state?.success}</span></p>)} 

      <input type="hidden" name="id" value={media?.id} />
      <label>
        <h3>標題</h3>
        <input
          type="text"
          name="title"
          defaultValue={media?.title || "沒有標題"}
        />
      </label>
      <label>
        <h3>
          描述(alt)
          <span className={styles.tips}>輸入相應的圖片描述有助於SEO</span>
        </h3>
        <input type="text" name="alt" defaultValue={media?.alt} />
      </label>
      <button>        
        確認修改
      </button>
    </form>
  );
};

export default EditMediaForm;
