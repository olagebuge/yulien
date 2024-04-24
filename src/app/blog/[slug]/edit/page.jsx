import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import styles from "./editBlogPage.module.css";
import { getPost, getMedias, getCategory } from "@/lib/data";
import { FaPenToSquare } from "react-icons/fa6";

const EditBlogPage = async ({ params }) => {
  
  const { slug } = await params;
  const post = await getPost(slug);
  const media = await getMedias();
  const cate = await getCategory();

  return (
    <div className={`container ${styles.container}`}>
      <h1 className="alignTitle"><FaPenToSquare /> 編輯文章</h1>
      <AdminPostForm
        userId={post.userId}
        media={media}
        cate={cate}
        post={post}
      />
    </div>
  );
};

export default EditBlogPage;
