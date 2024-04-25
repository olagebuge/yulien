"use client"

import styles from "./orderAnnotation.module.css";
import { useFormState } from "react-dom";
import {renewAnno} from "@/lib/action";

const OrderAnnotation = ({id, annotation}) => {
  const [state, formAction] = useFormState(renewAnno, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="id" value={id} />
      <textarea
        name="annotation"
        id="annotation"
        cols="30"
        rows="10"
        defaultValue={annotation}
      ></textarea>
      <button>修改註解</button>
    </form>
  );
};

export default OrderAnnotation;
