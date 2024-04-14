import UploadImages from "@/components/uploadImages/uploadImages";
import { auth } from "@/lib/auth";
import styles from "../mediaLayout.module.css";


const MediaPage = async () => {  
  const session = await auth();
  const id = session.user?.id;

  return (         
      <div className={styles.mediaBlock}>
        <UploadImages id={id} />        
      </div>
    
  );
};

export default MediaPage;
