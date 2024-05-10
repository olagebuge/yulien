import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import styles from "./editBlogPage.module.css";
import { getPost, getMedias, getCategory } from "@/lib/data";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { deletePost } from "@/lib/action";

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
      <form action={deletePost} className={styles.remove}>
        <input type="hidden" name="id" value={post.id} />
        <span>按下刪除按鈕後，貼文會立即被刪除，且不可回復。</span>
        <button className={styles.deleteButton}><FaRegTrashCan />刪除</button>
      </form>
    </div>
  );
};

export default EditBlogPage;
