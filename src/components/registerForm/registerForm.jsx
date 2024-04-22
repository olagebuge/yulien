"use client";

import { register } from "@/lib/action";
import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="使用者名稱" name="username" />
      <input type="email" placeholder="註冊Email電子郵件" name="email" />
      <input type="password" placeholder="註冊密碼" name="password" />
      <input
        type="password"
        placeholder="請再次輸入註冊密碼"
        name="passwordRepeat"
      />
      <button>註冊</button>
      {state?.error}
      <Link href="/login">
        已經擁有帳號了? <b>登入</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
