import styles from "./mediaCollection.module.css";
import { getUserMedias } from "@/lib/data";
import MediaCard from "./mediaCard/MediaCard";
import { auth } from "@/lib/auth";


const MediaCollection = async () => {
  const session = await auth();
  const media = await getUserMedias(session?.user.id);

  return (
    <div>
      <h3>已上傳圖片{media?.length}</h3>
      <div className={styles.uploadImagesBlock}>
        {media?.length ? (
          media
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((m) => (
              <div key={m._id}>                
                <MediaCard url={m.url} alt={m.alt} imageId={m._id}/>               
              </div>
            ))
        ) : (
          <p>您還沒有上傳任何圖片</p>
        )}
        
      </div>
    </div>
  );
};

export default MediaCollection;
