import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const defaultRecipient = "omconstruction1716@gmail.com";
const sender = "onboarding@resend.dev";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getRecipient(): string {
  const envVal = (process.env.CONTACT_TO_EMAIL || "").trim();
  return emailPattern.test(envVal) ? envVal : defaultRecipient;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}

export async function POST(request: Request) {
  const apiKey = (process.env.RESEND_API_KEY || "").trim();

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set on Vercel environment variables.");
    return NextResponse.json(
      { error: "RESEND_API_KEY is missing on Vercel. Please add RESEND_API_KEY in Vercel settings and redeploy." },
      { status: 500 }
    );
  }

  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid enquiry details." }, { status: 400 });
    }

    const { name, email, phone, message } = body as Record<string, unknown>;
    const safeName = typeof name === "string" ? name.trim() : "";
    const safeEmail = typeof email === "string" ? email.trim() : "";
    const safePhone = typeof phone === "string" ? phone.trim() : "";
    const safeMessage = typeof message === "string" ? message.trim() : "";

    if (!safeName || !safeEmail || !safeMessage) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!emailPattern.test(safeEmail)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const recipient = getRecipient();
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: safeEmail,
      subject: `New website enquiry from ${safeName}`,
      text: [
        "New enquiry from the OM Construction website",
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        `Phone: ${safePhone || "Not provided"}`,
        "",
        "Message:",
        safeMessage,
      ].join("\n"),
      html: `
        <h2>New website enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(safePhone || "Not provided")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(safeMessage).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend send email error:", error);
      return NextResponse.json(
        { error: `Resend error: ${error.message || JSON.stringify(error)}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your enquiry. We will contact you soon.",
      data,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Contact form catch error:", error);
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
