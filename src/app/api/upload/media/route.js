import { NextResponse, revalidatePath } from "next/server";
import fs from "fs/promises";
import { connectToDb } from "@/lib/utils";
import { Media } from "@/lib/models";
import { auth } from "@/lib/auth";



export const GET = async (request) => {  
  try {
    connectToDb();
    const medias = await Media.find();
    return NextResponse.json(medias);
  } catch (err) {
    console.log(err);
    throw new Error("無法取得媒體!");
  }
};



export const POST = async (req) => {
  try {
    const files = await req.formData();
    const images = files.getAll("media[]");
    const id = files.get("id");

    const promises = images.map(async (image) => {
      console.log(image);
      const byteLength = await image.arrayBuffer();
      const bufferData = await Buffer.from(byteLength);
      const pathOfImage = `./public/uploads/${new Date().getTime()}-${
        image.name
      }`;

      await fs.writeFile(pathOfImage, bufferData);
      connectToDb();
      const dbPathOfImage = pathOfImage.replace("./public", "");
      const saveMedia = new Media({
        url: dbPathOfImage,
        userId: id,
        alt: "媒體圖片",
      });
      await saveMedia.save();
    });
    await revalidatePath("/media");
    return NextResponse.json({status: "圖片上傳成功!"});
  } catch (e) {
    return NextResponse.json({ status: "圖片上傳失敗!", data: e });
  }
};
