"use server";

import { revalidatePath } from "next/cache";
import { Post, User, Media, Category, Product, Order } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

export const addPost = async (prevState, formData) => {
  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");

  const { title, desc, slug, userId,img, categories } = Object.fromEntries(formData);  

  try {
    connectToDb();
    const newPost = new Post({
      title,      
      img,
      desc,
      slug,
      userId,
      categories
    });

    await newPost.save();
    console.log(newPost);

    revalidatePath("/blog");
    revalidatePath("/admin");
    revalidatePath("/profile");

  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
  redirect("/blog");
};

export const editPost = async (prevState, formData) => {
  const {
    id,
    title,      
    img,
    desc,
    slug,    
    categories
  } = Object.fromEntries(formData);

  try {
    connectToDb();   
    const parsedCategories = categories.split(","); 

    await Post.findByIdAndUpdate(id, {
      title, 
      img,
      desc,      
      slug,      
      categories: parsedCategories,
    });

    revalidatePath("/managepost");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/blog/${slug}/edit`);
  } catch (err) {
    console.log(err);
    return { error: "儲存修改商品內容時發生錯誤!" };
  }
  redirect("/managepost");
};


export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("已刪除此篇文章!");

    revalidatePath("/blog");
    revalidatePath("/admin");
    revalidatePath("/profile");

  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
  redirect("/blog")
};

export const addUser = async (prevState, formData) => {
  const { username, email, password, image } = Object.fromEntries(formData);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "新增使用者時發生錯誤!" };
  }
};

export const editUser = async (formData) => {
  const { username, email, id } = Object.fromEntries(formData);
  try {
    connectToDb();
    await User.findByIdAndUpdate(id, {
      username,
      email,
    });
    revalidatePath("/profile");
    return { success: "使用者資料更新成功!" };
  } catch (err) {
    return { error: "編輯使用者資料時發生錯誤!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "發生錯誤!" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleGoogleLogin = async () => {
  "use server";
  await signIn("google");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, image, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const login = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "錯誤的帳號或密碼" };
    }
    throw err;
  }
};

export const deleteMedia = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Media.findByIdAndDelete(id);
    revalidatePath("/media/manage");
  } catch (err) {
    console.log(err);
    return { error: "無法刪除" };
  }
  redirect("/media/manage");
};

export const editMedia = async (prevState, formData) => {
  const { id, title, alt } = Object.fromEntries(formData);

  try {
    await Media.findByIdAndUpdate(id, { title, alt });
    revalidatePath(`/media/${id}`);
    return { success: "更新資料成功!" };
  } catch (err) {
    console.log(err);
    return { error: "更新資料失敗" };
  }
};

export const addCategory = async (prevState, formData) => {
  try {
    const { title, slug, img } = Object.fromEntries(formData);

    connectToDb();
    let lowerSlug = slug.toLowerCase();
    const newCategory = new Category({
      title,
      slug: lowerSlug,
      img,
    });
    await newCategory.save();
    revalidatePath("/category");
    return { success: "類別新增成功!" };
  } catch (err) {
    console.log(err);
    return { error: "類別新增失敗，標題與代稱都需正確填寫" };
  }
};

export const deleteCategory = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    let targetCategory = await Category.findById(id);

    // 找到所有帶有目標類別的商品
    let foundProducts = await Product.find({
      categories: { $in: [targetCategory.title] },
    });
    // 更新商品的類別陣列，將目標類別過濾掉
    foundProducts.forEach(async (product) => {
      product.categories = product.categories.filter(
        (category) => category !== targetCategory.title
      );
      await product.save();
    });

    //刪除此類別
    await Category.findByIdAndDelete(id);
    revalidatePath("/product");
    revalidatePath("/product/manage");
    revalidatePath("/product/[slug]");
    revalidatePath("/category");
  } catch (err) {
    console.log(err);
    return { error: "無法刪除" };
  }
  redirect("/category");
};

export const addProduct = async (prevState, formData) => {
  const {
    title,
    number,
    desc,
    img,
    photos,
    slug,
    userId,
    categories,
    variables,
  } = Object.fromEntries(formData);

  try {
    connectToDb();
    const parsedImages = photos.split(","); // 使用逗號拆分字串為陣列
    const parsedCategories = categories.split(","); // 使用逗號拆分字串為陣列
    const parsedVariables = JSON.parse(variables); // 解析 JSON 字串為物件

    parsedVariables.map((v) => {
      if (!isNaN(v.price)) {
        return { error: "務必填寫價錢!" };
      } else {
        v.price = parseInt(v.price);
      }
      if (!isNaN(v.stocks)) {
        v.stocks = 0;
      } else {
        v.stocks = parseInt(v.stocks);
      }
    });
    
    const newProduct = new Product({
      title,      
      number,
      desc,
      img,
      public: false,
      photos: parsedImages,
      slug,
      userId,
      categories: parsedCategories,
      variables: parsedVariables,
    });
    console.log(newProduct);
    await newProduct.save();
    revalidatePath("/product/(tabs)/manage");
    revalidatePath("/product");
  } catch (err) {
    console.log(err);
    return { error: "儲存商品時發生錯誤!" };
  }
  redirect("/product/manage");
};

export const editProduct = async (prevState, formData) => {
  const {
    id,
    title,
    number,
    desc,
    img,
    photos,
    slug,
    userId,
    categories,
    variables,
  } = Object.fromEntries(formData);

  try {
    connectToDb();
    const parsedImages = photos.split(",");
    const parsedCategories = categories.split(",");
    const parsedVariables = JSON.parse(variables);

    parsedVariables.map((v) => {
      if (!isNaN(v.price)) {
        return { error: "務必填寫價錢!" };
      } else {
        v.price = parseInt(v.price);
      }
      if (!isNaN(v.stocks)) {
        v.stocks = 0;
      } else {
        v.stocks = parseInt(v.stocks);
      }
    });

    await Product.findByIdAndUpdate(id, {
      title,
      number,
      desc,
      img,
      photos: parsedImages,
      slug,
      userId,
      categories: parsedCategories,
      variables: parsedVariables,
    });
    revalidatePath("/product/manage");
    revalidatePath("/product");
    revalidatePath(`/product/${slug}`);
    revalidatePath(`/product/${slug}/edit`);
  } catch (err) {
    console.log(err);
    return { error: "儲存修改商品內容時發生錯誤!" };
  }
  redirect("/product/manage");
};

//上下架商品章用
export const toggleShelves = async(formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDb();
    const foundProduct = await Product.findById(id);    
    foundProduct.public = !foundProduct.public;    
    await foundProduct.save();

    revalidatePath("/product");
    revalidatePath("/product/manage");

  } catch (err) {
    console.log(err);
    return { error: "上下架時發生錯誤!" };
  }
  
  redirect("/product");
};


export const addOrder = async (prevState, formData) => {

  const { name, phone, email, situation, question, content } = Object.fromEntries(formData); 

  let qType = "";
    if (question === "takePrice") {
      qType = "取得報價單";
    } else if (question === "question") {
      qType = "訂購相關問題";
    } else {
      qType = "其他";
    }

  try {
    connectToDb();
    const newOrder = new Order({
      name, phone, email, situation, question:qType, content, read:false, annotation:""
    });

    await newOrder.save();

     // 寄送郵件
     const transporter = nodemailer.createTransport({
      service: "gmail",
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN, // 需要加入 refresh token
        accessToken: process.env.GOOGLE_ACCESS_TOKEN, // 需要加入 access token
      },
    });

    const mailOption = {
      from: process.env.MAILER_FROM,
      to: process.env.MAILER_TO,
      subject: "【新問題】來自永蓮紙藝",
      html: `
          <h3>哈囉，您有來自永蓮紙藝的新問題</h3>
          <ul>
              <li>訪客名稱: ${name}</li>
              <li>連絡電話: ${phone}</li>
              <li>電子郵件: ${email}</li>
              <li>問題類型: ${qType}</li>
              <li>問題內容: ${content}</li>
          </ul>
          `,
    };

    await transporter.sendMail(mailOption);
    
    revalidatePath("/profile");

  } catch (err) {
    console.log(err);
    return { error: "發生錯誤，無法送出訂單!" };
  }
  redirect("/profile"); //暫時
};



export const renewAnno = async (prevState, formData) => {
  const { id, annotation } = Object.fromEntries(formData);
  
  console.log(id, annotation);

  try {
    await Order.findByIdAndUpdate(id, {annotation});
    revalidatePath("/order");
    revalidatePath(`/order/${id}`);

    return { success: "更新註解成功!" };
  } catch (err) {
    console.log(err);
    return { error: "更新註解失敗" };
  }
};