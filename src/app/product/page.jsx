import { getCategory } from "@/lib/data";
import CateSideBar from "@/components/cateSideBar/CateSideBar";

// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch(`${process.env.PRODUCT_URL}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const BlogPage = async () => {
  // FETCH DATA WITH AN API
  const products = await getData();
  const publicProducts = products.filter((p)=>p.public)
  const categories = await getCategory();

  return (
    <div>
      <CateSideBar cate={categories} initialProducts={publicProducts}/>
    </div>
  );
};

export default BlogPage;
