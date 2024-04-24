import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, phone, email, question, content } = await request.json();

    let qType = "";
    if (question === "takePrice") {
      qType = "取得報價單";
    } else if (question === "question") {
      qType = "訂購相關問題";
    } else {
      qType = "其他";
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "buge5566@gmail.com",
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      },
    });

    const mailOption = {
      from: "bcript778899@gmail.com",
      to: "buge5566@gmail.com",
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

    return NextResponse.json(
      { message: "洽詢表單已送出，請等候回覆" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "表單送出時發生錯誤，請直接撥打電話訂購" },
      { status: 500 }
    );
  }
}
