import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENTS = ["andy@box.biz", "lindsey.port@gmail.com", "sarah.milo@gmail.com"];

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, message } = await request.json();

  const { error } = await resend.emails.send({
    from: "On Repeat <noreply@box.biz>",
    to: RECIPIENTS,
    replyTo: email,
    subject: `New sign-up: ${firstName} ${lastName}`,
    html: `
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
