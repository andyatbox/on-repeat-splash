import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, message } = await request.json();

  const encode = (v: string) => encodeURIComponent(v);
  const body = [
    `submission[q2_q2_fullname0][first]=${encode(firstName)}`,
    `submission[q2_q2_fullname0][last]=${encode(lastName)}`,
    `submission[q3_q3_email1]=${encode(email)}`,
    `submission[q4_q4_textarea2]=${encode(message)}`,
  ].join("&");

  const res = await fetch(
    `https://api.jotform.com/form/${process.env.JOTFORM_FORM_ID}/submissions?apiKey=${process.env.JOTFORM_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    }
  );

  const data = await res.json();

  if (data.responseCode === 200 || data.responseCode === 201) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: data.message }, { status: 500 });
}
