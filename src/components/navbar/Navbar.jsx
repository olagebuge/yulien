import Link from "next/link"
import UserAvatar from "./links/userAvatar/userAvatar";
import Links from "./links/Links"
import styles from "./navbar.module.css"
import { auth } from "@/lib/auth";
import { getUser } from "@/lib/data";
import Image from "next/image";


const Navbar = async () => {

  const session = await auth();    
  const foundUser = await getUser(session?.user.email);  

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        <Image src="/lotuslogo.svg" width={50} height={50} alt="Logo"/>
        <p className={styles.logoText}>Forever Lotus</p>
      </Link> 
      <Links/>      
      <UserAvatar foundUser={foundUser}/>
    </div>
  )
}

export default Navbar