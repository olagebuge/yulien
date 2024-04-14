import LoginForm from "@/components/loginForm/loginForm";
import { handleGithubLogin, handleGoogleLogin } from "@/lib/action";
import styles from "./login.module.css";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
        <p className={styles.fastLoginWords}>快速登入</p>
        <div className={styles.iconContainer}>
          <form action={handleGithubLogin}>
            <button className={styles.github}>
              <Image
                src="/giticon.png"
                width={27}
                height={26}
                alt="googleLogin"
              />
            </button>
          </form>
          <form action={handleGoogleLogin}>
            <button className={styles.google}>
              <Image
                src="/google.svg"
                width={24}
                height={24}
                alt="googleLogin"
              />
            </button>
          </form>
        </div>
        </div>
        

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
