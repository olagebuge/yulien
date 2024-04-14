"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./profileSubMenu.module.css";
import { handleLogout } from "@/lib/action";
import { useState, useContext } from "react";
import AvatarContext from "@/contexts/AvatarContext";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const ProfileSubMenu = ({ image }) => {
  const [open, setOpen] = useState(false);
  const { avatar } = useContext(AvatarContext);

  return (
    <div className={styles.container}>
      {open && <div className={styles.overlay} onClick={() => setOpen(false)}></div>}
      <div
        className={styles.avatarContainer}
        onClick={() => setOpen((prev) => !prev)}
      >        
        {avatar ? (
          <Image
            src={avatar}
            alt="user-avatar"
            fill
            className={styles.avatar}
          />
        ) : (
          <Image src={image} alt="user-avatar" fill className={styles.avatar} />
        )}
      </div>
      {open && (
        <div className={styles.subBox}>
          <Link href="/profile">個人檔案</Link>
          <p className={styles.subTitle}><hr /><span>管理</span></p>
          <Link href="/category">類別</Link>
          <Link href="/product/manage">商品管理</Link>        
          <Link href="/media/manage">媒體相簿</Link>
          <p className={styles.subTitle}><hr /></p>
          <form action={handleLogout}>
            <button className={styles.logout}><FaArrowRightFromBracket />登出</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileSubMenu;
