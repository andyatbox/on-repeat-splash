import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, message } = await request.json();

  const params = new URLSearchParams();
  params.append("submission[q2_q2_fullname0][first]", firstName);
  params.append("submission[q2_q2_fullname0][last]", lastName);
  params.append("submission[q3_q3_email1]", email);
  params.append("submission[q4_q4_textarea2]", message);

  const res = await fetch(
    `https://api.jotform.com/form/${process.env.JOTFORM_FORM_ID}/submissions?apiKey=${process.env.JOTFORM_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    }
  );

  const data = await res.json();

  if (data.responseCode === 200 || data.responseCode === 201) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: data.message }, { status: 500 });
}
