"use client";


import styles from "./links.module.css";
import NavLink from "./navLink/navLink";

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

const Links = () => {
  
  

  // TEMPORARY
  // const session = true;
  // const isAdmin = true;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
       
      </div>
     
    </div>
  );
};

export default Links;
