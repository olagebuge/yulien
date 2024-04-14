import { NextResponse, revalidatePath } from "next/server";
import fs from "fs/promises";
import { connectToDb } from "@/lib/utils";
import { User } from "@/lib/models";


export const POST = async (req) => {
  try {
    const file = await req.formData();
    const image = file.get("image");    
    const id = file.get("id");
    const byteLength = await image.arrayBuffer();
    const bufferData = await Buffer.from(byteLength);

    const pathOfImage = `./public/uploads/${new Date().getTime()}-${
      image.name
    }`;
    await fs.writeFile(pathOfImage, bufferData);

    connectToDb();
    
    const dbPathOfImage = pathOfImage.replace('./public', '');
    await User.findByIdAndUpdate(id, {
        image: dbPathOfImage          
    });     
    await revalidatePath("/profile");   
    return NextResponse.json({ imagePath: dbPathOfImage, status: "圖片上傳成功!", data: file.size });
  } catch (e) {
    return NextResponse.json({ status: "圖片上傳失敗!", data: e });
  }
};
