"use client";

import { login } from "@/lib/action";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="請輸入信箱" name="email" />
      <input type="password" placeholder="請輸入密碼" name="password" />
      <button>登入</button>
      <div className={styles.error_message}>{state?.error}</div>
      <Link href="/register">
        {"還沒有帳號嗎?"} <b>立即註冊</b>
      </Link>
    </form>
  );
};

export default LoginForm;
