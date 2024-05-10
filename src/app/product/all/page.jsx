import CateSideBar from "@/components/cateSideBar/CateSideBar";
import { getCategory } from "@/lib/data";


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
const AllProductPage = async () => {
  const products = await getData();
  const categories = await getCategory();
  return (
    <div>
      <CateSideBar cate={categories} initialProducts={products} />
    </div>
  );
};

export default AllProductPage;
