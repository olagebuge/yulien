import styles from "./register.module.css";
import RegisterForm from "@/components/registerForm/registerForm";
import { FaRegPenToSquare } from "react-icons/fa6";


const RegisterPage = () => {
  return (
    <div className={styles.container}>      
      <div className={styles.wrapper}>
      <h1 className="alignTitle"><FaRegPenToSquare />立即註冊</h1>
        <RegisterForm/>
      </div>
    </div>
  );
};

export default RegisterPage;
