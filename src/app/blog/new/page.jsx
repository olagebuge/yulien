import AdminPostForm from "@/components/adminPostForm/adminPostForm"
import { auth } from "@/lib/auth";
import { getCategory } from "@/lib/data";
import { FaFileCirclePlus } from "react-icons/fa6";

// FETCH DATA WITH AN API
const getUserMedia = async (userId) => {
  const res = await fetch(`${process.env.MEDIA_URL}/${userId}`, {
    headers: {      
      'Content-Type': 'application/json'
    },
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};

const NewBlogPage = async() => {

  const session = await auth();
  const userId = session?.user.id;
  const medias = await getUserMedia(userId);
  const categories = await getCategory();
  
  return (
    <div className="container center-height">
      <h1 className="alignTitle"><FaFileCirclePlus />創建新文章</h1>
       <AdminPostForm userId={userId} media={medias} cate={categories}/>
    </div>
  )
}

export default NewBlogPage