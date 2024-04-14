import ProductForm from "@/components/productForm/ProductForm";
import { auth } from "@/lib/auth";
import { getCategory } from "@/lib/data";

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

const NewProductPage = async() => {

  const session = await auth();
  const userId = session?.user.id;  
  const medias = await getUserMedia(userId);
  const categories = await getCategory();
  
  return (
    <div>      
      <ProductForm cate={categories} media={medias} userId={userId}/>
    </div>
  )
}

export default NewProductPage