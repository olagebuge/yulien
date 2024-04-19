import CateMangeList from "@/components/cateMangeList/CateMangeList";
import { getCategory } from "@/lib/data";
import styles from "./product.module.css";


// FETCH DATA WITH AN API
const getData = async () => {
  const res = await fetch(`${process.env.PRODUCT_URL}`, {next:{revalidate:3600}});

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const ProductsManagePage = async () => {

  // FETCH DATA WITH AN API
  const products = await getData();  
  const categories = await getCategory();

  return (
    <div>      
      <CateMangeList initialProducts={products} cate={categories}/>
    </div>
  );
};

export default ProductsManagePage;
