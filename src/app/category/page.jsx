import { deleteCategory } from "@/lib/action";
import styles from "./category.module.css";
import { FaList, FaWrench } from "react-icons/fa6";
import { getCategory, getUserMedias } from "@/lib/data";
import CategoryForm from "@/components/categoryForm/CategoryForm";
import { auth } from "@/lib/auth";
import Image from "next/image";

const CategoryPage = async () => {
  const session = await auth();
  const media = await getUserMedias(session?.user.id);
  const categories = await getCategory();

  return (
    <div className={`container ${styles.container}`}>
      <h1 className={`alignTitle ${styles.h1Title}`}>
        <FaList />
        類別管理
      </h1>
      <div className={styles.hContainer}>
        <CategoryForm media={media} />
        <div className={styles.categoryBlock}>
          <h2>
            <FaWrench />
            已有類別
          </h2>
          <ul className={styles.tagPools}>
            {categories?.length ? (
              categories
                .sort((a, b) => {
                  return new Date(b.createdAt) - new Date(a.createdAt);
                })
                .map((c) => (
                  <li key={c.id} className={styles.tag}>
                    <div className={styles.tagTitle}>
                      {c?.img ? (
                        <div className={styles.imageContainer}>
                          <Image src={c.img} fill alt="類別示意圖" />
                        </div>
                      ) : (
                        <div className={styles.imageContainer}>無圖片</div>
                      )}
                      {c.title}
                      <span className={styles.slug}>{c.slug}</span>
                    </div>
                    <div className={styles.flexBox}>
                      <span className={styles.edit}>編輯</span>

                      <form action={deleteCategory}>
                        <input type="hidden" name="id" value={c.id} />
                        <button className={styles.delete}>刪除</button>
                      </form>
                    </div>
                  </li>
                ))
            ) : (
              <li className="description">您還沒有新增任何類別...</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
