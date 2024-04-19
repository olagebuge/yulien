import styles from "./edit.module.css";
import UploadAvatar from "@/components/uploadAvatar/uploadAvatar";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getUser } from "@/lib/data";
import { editUser } from "@/lib/action";
import { Suspense } from "react";
import { FaAddressCard } from "react-icons/fa6";

const profileEditPage = async () => {
  const session = await auth();
  const foundUser = await getUser(session.user?.email);

  return (
    <div className={`container ${styles.container}`}>
      <ul className={styles.leftList}>
        <li className={styles.active}>
          <Link href="#">基本設定</Link>
        </li>
        <li>
          <Link href="#">重設密碼</Link>
        </li>
        <li>
          <Link href="#">管理展示</Link>
        </li>
        <li>
          <Link href="#">問題回報</Link>
        </li>
      </ul>

      {foundUser && (
        <Suspense fallback={<div>Loading...</div>}>
          <UploadAvatar
            image={foundUser?.image || "/noAvatar.png"}
            id={foundUser.id}
          />
        </Suspense>
      )}
      <form className={styles.formContainer} action={editUser}>
        <h2><FaAddressCard />基本資料</h2>
        <input type="hidden" name="id" defaultValue={foundUser.id} />
        <div className={styles.details}>
          <label htmlFor="username">名稱</label>
          <input
            type="text"
            name="username"
            defaultValue={foundUser?.username}
          />
        </div>
        <div className={styles.details}>
          <label htmlFor="email">信箱</label>
          <input type="email" name="email" defaultValue={foundUser?.email} />
        </div>

        <button>確認變更</button>
      </form>
    </div>
  );
};

export default profileEditPage;
