//連結資料庫
import mongoose from "mongoose";

const connection = {};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};





// //設置multer
// import multer from "multer";

// //檔案存放目錄及檔案名稱
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

// //檔案類型限制
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else ({ error: "不支援的檔案類型，您只能上傳jpg/jpeg/png格式圖檔" },
//   false
//   )
// };

// export const upload = multer({
//   storage,
//   limits: { fieldSize: 1024 * 1024 },
//   fileFilter,
// });
