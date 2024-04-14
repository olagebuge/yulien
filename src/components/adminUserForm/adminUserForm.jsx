"use client";

import { addUser } from "@/lib/action";
import styles from "./adminUserForm.module.css";
import { useFormState } from "react-dom";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h2>新增使用者</h2>
      <input type="text" name="username" placeholder="請輸入使用者名稱(中英文皆可)" />
      <input type="text" name="email" placeholder="請輸入電子信箱(帳號)" />
      <input type="password" name="password" placeholder="請輸入密碼" />      
      <select name="isAdmin">
        <option value="false">是否有管理權限?</option>
        <option value="false">否</option>
        <option value="true">是</option>
      </select>
      <button>Add</button>
      {state?.error}
    </form>
  );
};

export default AdminUserForm;
