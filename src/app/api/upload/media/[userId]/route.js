import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { Media } from "@/lib/models";



export const GET = async (request, { params }) => {
  const { userId } = params;
  try {
    connectToDb();
    const medias = await Media.find({userId});
    return NextResponse.json(medias);
  } catch (err) {
    console.log(err);
    throw new Error("無法取得媒體!");
  }
};