import ProductForm from "@/components/productForm/ProductForm";
import { getMedias,getCategory } from "@/lib/data";
import { FaFilePen } from "react-icons/fa6";
import styles from "./singleProductEdit.module.css"

const getData = async (slug) => {
    const res = await fetch(`${process.env.PRODUCT_URL}/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error("發生一些錯誤");
    }
    return res.json();
};

const SingleProductEditpage = async ({ params }) => {
  const { slug } = await params;
  const product = await getData(slug);
  const media = await getMedias()
  const cate = await getCategory();
 

  return (
  <div className={`container ${styles.container}`}>
    <h1 className="alignTitle"><FaFilePen />產品編輯頁面</h1>
    <ProductForm userId={product.userId} media={media} cate={cate} product={product}/>
  </div>)
};

export default SingleProductEditpage;
