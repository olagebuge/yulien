import Image from "next/image";
import styles from "./singleMedia.module.css";
import { getMedia } from "@/lib/data";
import { FaFilePen } from "react-icons/fa6";
import ButtonAndMoodal from "@/components/buttonAndModal/ButtonAndModal";
import EditMediaForm from "@/components/editMediaForm/EditMediaForm";

// FETCH DATA WITH AN API
// const getData = async (id) => {
//   const res = await fetch(`${process.env.MEDIA_URL}/${id}`, {
//     next: { revalidate: 3600 },
//   });

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const media = await getMedia(id);

  return {
    title: `編輯媒體 | ${media?.title || "沒有標題"}`,
    description: "編輯媒體",
  };
};

const SingleMediaPage = async ({ params }) => {
  const { id } = params;
  // FETCH DATA WITHOUT AN API
  const media = await getMedia(id);

  // FETCH DATA WITH AN API
  //const media = await getData(id);  

  return (
    <div>
      <h1 className="alignTitle">
        <FaFilePen />
        編輯圖片
      </h1>
      <div className={styles.flexContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={media?.url}
            fill
            alt={media?.alt}
            className={styles.img}
          />
        </div>

      <EditMediaForm media={{id:media?.id,title:media?.title, alt:media?.alt}}/>
      </div>
      <ButtonAndMoodal imageId={media?.id} />
    </div>
  );
};

export default SingleMediaPage;
