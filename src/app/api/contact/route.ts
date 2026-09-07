import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const recipient = process.env.CONTACT_TO_EMAIL ?? "omconstruction1716@gmail.com";
const sender = process.env.CONTACT_FROM_EMAIL ?? "OM Construction <onboarding@resend.dev>";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid enquiry details." }, { status: 400 });
    }

    const { name, email, phone, message } = body as Record<string, unknown>;
    const values = [name, email, phone, message];
    if (!values.every((value) => value === undefined || typeof value === "string")) {
      return NextResponse.json({ error: "Invalid enquiry details." }, { status: 400 });
    }

    const safeName = typeof name === "string" ? name.trim() : "";
    const safeEmail = typeof email === "string" ? email.trim() : "";
    const safePhone = typeof phone === "string" ? phone.trim() : "";
    const safeMessage = typeof message === "string" ? message.trim() : "";

    if (!safeName || !safeEmail || !safeMessage) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (!emailPattern.test(safeEmail)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (safeName.length > 120 || safeEmail.length > 254 || safePhone.length > 40 || safeMessage.length > 5_000) {
      return NextResponse.json({ error: "Your enquiry is too long." }, { status: 400 });
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
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
        console.error("Resend contact email failed:", error);
      }
    } else {
      console.log("Website Enquiry Received (no RESEND_API_KEY set):", {
        name: safeName,
        email: safeEmail,
        phone: safePhone,
        message: safeMessage,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your enquiry. We will contact you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "We could not send your enquiry. Please call us on +91 9158636465." },
      { status: 500 },
    );
  }
}
