import { Product } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();

    const product = await Product.findOne({ slug });
    return NextResponse.json(product);
  } catch (err) {
    console.log(err);
    throw new Error("無法取得商品資料!");
  }
};

export const DELETE = async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();

    await Product.deleteOne({ slug });
    return NextResponse.json("已刪除這項商品");
  } catch (err) {
    console.log(err);
    throw new Error("無法取得商品資料!");
  }
};
