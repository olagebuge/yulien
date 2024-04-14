import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 1,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },    
  },
  { timestamps: true }
);

//SEO文章
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    categories:{
      type:[]
    }
  },
  { timestamps: true }
);

//商品
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    public:{
      type:Boolean,
      default:false
    },
    number:{
      type: String,      
    },
    desc: {
      type: String,      
    },
    img: {
      type: String,
    },
    photos:{
      type:[]
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    categories:{
      type:[],
      default:["未分類"]
    },
    variables:{
      type:[{       
        key:{
          type: String,
          required: true,
        },
        price:{
          type: Number,
          required: true,
        },
        stocks:{
          type: Number,
          default:null || 0,
        }
      }] 
  }},
  { timestamps: true }
);

//類別or標籤
const categorySchema = new mongoose.Schema({
  title:{
    type: String,
    maxLength:10,
    required: true,
  },
  slug: {
    type: String,    
    unique: true,
  },
  img:{
    type: String,
  }
})

//媒體
const mediaSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      default:"沒有標題",
    },
    url: {
      type: String,
      required: true,
    },      
    userId: {
      type: String,
      required: true,
    },   
    alt: {
      type: String,           
    },
  },
  { timestamps: true }
);


export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
export const Product = mongoose.models?.Product || mongoose.model("Product", productSchema);
export const Category = mongoose.models?.Category || mongoose.model("Category", categorySchema);
export const Media = mongoose.models?.Media || mongoose.model("Media", mediaSchema);