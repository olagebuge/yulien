import { Post, User, Media, Category, Product } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

// TEMPORARY DATA
// const users = [
//   { id: 1, name: "John" },
//   { id: 2, name: "Jane" },
// ];

// const posts = [
//   { id: 1, title: "Post 1", body: "......", userId: 1 },
//   { id: 2, title: "Post 2", body: "......", userId: 1 },
//   { id: 3, title: "Post 3", body: "......", userId: 2 },
//   { id: 4, title: "Post 4", body: "......", userId: 2 },
// ];

export const getPosts = async () => {
  try {
    connectToDb();
    const posts = await Post.find();
    return posts;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};

export const getPost = async (slug) => {
  try {
    connectToDb();
    const post = await Post.findOne({ slug });
    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};

export const getUser = async (email) => {
  noStore();
  try {
    connectToDb();
    const user = await User.findOne({ email }); //改成用email
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const getUserById = async (userId) => {
  noStore();
  try {
    connectToDb();
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const getUserPosts = async (id) => {
  try {
    const posts = await getPosts();
    const userPosts = posts.filter((post) => post.userId === id);

    return userPosts;
  } catch (err) {
    console.log(err);
    throw new Error("尋找此人的文章時發生錯誤...");
  }
};

export const getUserMedias = async (id) => {
  noStore();
  try {
    connectToDb();
    const medias = await Media.find();
    const userMedias = medias.filter((media) => media.userId === id);

    return userMedias;
  } catch (err) {
    console.log(err);
    throw new Error("尋找上傳的媒體時發生錯誤...");
  }
};

export const getMedia = async (id) => {
  noStore();
  try {
    connectToDb();
    const media = await Media.findById(id);

    return media;
  } catch (err) {
    console.log(err);
    throw new Error("找不到這個媒體");
  }
};

export const getMediaByUrl = async (url) => {
  noStore();
  try {
    connectToDb();
    const media = await Media.findOne({url});

    return media;
  } catch (err) {
    console.log(err);
    throw new Error("找不到這個媒體");
  }
};

export const getCategory = async () => {
  try {
    connectToDb();
    const categories = await Category.find();

    return categories;
  } catch (err) {
    console.log(err);
    throw new Error("找不到類別");
  }
};

export const getProduct = async () => {
  try {
    connectToDb();
    const products = await Product.find();

    return products;
  } catch (err) {
    console.log(err);
    throw new Error("找不到產品");
  }
};

