import { Product } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectToDb();

    const products = await Product.find();
    return NextResponse.json(products);
  } catch (err) {
    console.log(err);
    throw new Error("無法取得商品資料!");
  }
};
