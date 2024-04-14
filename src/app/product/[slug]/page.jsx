import styles from "./singleProductPage.module.css";
import { getMediaByUrl } from "@/lib/data";
import SliderShow from "@/components/sliderShow/SliderShow";
import VariableProps from "@/components/variableProps/VariableProps";

const getData = async (slug) => {
  const res = await fetch(`${process.env.PRODUCT_URL}/${slug}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("發生一些錯誤");
  }
  return res.json();
};

const singleProductPage = async ({ params }) => {
  const { slug } = params;
  const product = await getData(slug);

  const getAlt = async (url) => {
    const media = await getMediaByUrl(url);
    return media.alt;
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.productTitle}>
          {product.title}
          <span className="tips">貨號{product.number}</span>
        </h1>
        <SliderShow img={product.img} photos={product.photos} />
      </div>
      <div className={styles.details}>
        <div className={styles.variables}>
          <h3>規格</h3>
          <VariableProps product={product} />
        </div>

        <div className={styles.bottomBlock}>
          {product.desc && (
            <div>
              <h3>敘述</h3>
              <p>{product.desc}</p>
            </div>
          )}

          <div className={styles.tagPools}>
            {product.categories &&
              product.categories.map((c) => (
                <span className={styles.cateTag}>{c}</span>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default singleProductPage;
