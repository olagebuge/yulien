import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const {data} = await resend.emails.send({
      from: 'next@yulien.mobuyashea.com',
      to: 'buge5566@gmail.com',
      subject:'hello from nextjs text 14',
      html:'<h1>hello, from nextjs text 14</h1>'
    });

    return NextResponse.json({data})
  } catch (error) {
    return NextResponse.json({error})
  }
}