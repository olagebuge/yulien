import Image from "next/image";
import styles from "./mediaCard.module.css";
import Link from "next/link";
import { FaPen } from "react-icons/fa6";

const MediaCard = ({ url, alt, imageId }) => {
  return (
    <div>      
      <div className="imageContainer">
        <Image src={url} fill alt={alt} />
        <Link href={`/media/${imageId}`}><button className={styles.editButton}><FaPen /></button></Link>
      </div>
    </div>
  );
};

export default MediaCard;
