"use client";

import { useState } from "react";
import Image from "next/image";
import ProfileSubMenu from "../profileSubMenu/profileSubMenu";
import NavLink from "../navLink/navLink";
import styles from "./userAvatar.module.css"

const UserAvatar = ({ foundUser }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {foundUser ? (
        <>
          {foundUser?.isAdmin && (
            <NavLink item={{ title: "管理", path: "/admin" }} />
          )}
          <ProfileSubMenu image={foundUser.image || "/noAvatar.png"} />
        </>
      ) : (
        <NavLink item={{ title: "登入", path: "/login" }} />
      )}
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
