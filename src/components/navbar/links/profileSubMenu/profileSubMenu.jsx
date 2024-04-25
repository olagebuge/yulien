"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./profileSubMenu.module.css";
import { handleLogout } from "@/lib/action";
import { useState, useContext } from "react";
import AvatarContext from "@/contexts/AvatarContext";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import NavLink from "../navLink/navLink";

const links = [
  {
    title: "關於我們",
    path: "/about",
  },
  {
    title: "祭拜殿堂",
    path: "/blog",
  },
  {
    title: "商品選購",
    path: "/product",
  },
  {
    title: "聯絡我們",
    path: "/contact",
  },
];

const ProfileSubMenu = ({ image }) => {
  const [open, setOpen] = useState(false);
  const { avatar } = useContext(AvatarContext);

  return (
    <div className={styles.container}>
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
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className={styles.subBox}>
            <Link href="/profile">個人檔案</Link>
            <div className={styles.pages}>
              <p className={styles.subTitle}>
                <hr />
                <span>頁面</span>
              </p>
              {links.map((link) => (
                <Link href={link.path}>{link.title}</Link>
              ))}
            </div>
            <p className={styles.subTitle}>
              <hr />
              <span>管理</span>
            </p>
            <Link href="/category">類別</Link>
            <Link href="/managepost">文章</Link>
            <Link href="/product/manage">商品</Link>
            <Link href="/media/manage">媒體</Link>
            <p className={styles.subTitle}>
              <hr />
            </p>
            <form action={handleLogout}>
              <button className={styles.logout}>
                <FaArrowRightFromBracket />
                登出
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSubMenu;
