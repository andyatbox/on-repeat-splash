import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENTS = [
  "andy@box.biz",
  "lindsey.port@gmail.com",
  "sarah.milo@gmail.com",
  "port@onrepeatbeauty.com",
];

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  const { firstName, lastName, email, message } = await request.json();

  if (!firstName || !lastName || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "On Repeat <onboarding@resend.dev>",
      to: RECIPIENTS,
      replyTo: email,
      subject: `New signup: ${firstName} ${lastName}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;padding:32px">
          <h2 style="margin:0 0 24px;font-size:20px">New On Repeat signup</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px 0;color:#666;width:100px">Name</td><td style="padding:8px 0;font-weight:600">${esc(firstName)} ${esc(lastName)}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
            ${message ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top">Message</td><td style="padding:8px 0">${esc(message)}</td></tr>` : ""}
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
