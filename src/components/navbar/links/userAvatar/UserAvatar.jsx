"use client";

import { useState } from "react";
import ProfileSubMenu from "../profileSubMenu/profileSubMenu";
import NavLink from "../navLink/navLink";
import styles from "./userAvatar.module.css";
import { FaXmark, FaEllipsis } from "react-icons/fa6";

const links =[{
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
}]

const UserAvatar = ({ foundUser }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {foundUser ? (
        <>          
          <ProfileSubMenu image={foundUser.image || "/noAvatar.png"} />
        </>
      ) : (
        <>
          <FaEllipsis
            className={styles.menuButton}
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="overlay" onClick={() => setOpen(false)}>
            <div className={styles.mobileLinks}>
              <FaXmark onClick={() => setOpen(false)} className={styles.xmark}/>
              {links.map((link) => (
                <NavLink key={link.path} item={link}/>
              ))}
            </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserAvatar;
