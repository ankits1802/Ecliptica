
// src/app/api/contact/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedData = contactFormSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ success: false, message: "Invalid form data.", errors: parsedData.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, email, message } = parsedData.data;

    // --- SIMULATED EMAIL SENDING ---
    console.log("--- Contact Form Submission Received ---");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    console.log("---------------------------------------");
    console.log("IMPORTANT: This is a SIMULATION. No email has actually been sent.");
    console.log("To send emails, integrate an email service (e.g., SendGrid, Mailgun, AWS SES, or Nodemailer with SMTP/OAuth2) here.");
    // --- END OF SIMULATION ---

    // TODO: Implement actual email sending logic here.
    // Example using a hypothetical email service:
    //
    // import { sendEmail } from '@/lib/email-service'; // A hypothetical email service wrapper
    // try {
    //   await sendEmail({
    //     to: "ankits1802@gmail.com",
    //     from: "noreply@yourdomain.com", // Use a verified sender email
    //     replyTo: email, // Set reply-to as the submitter's email
    //     subject: `New Contact Form Submission from ${name}`,
    //     text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    //     html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message:<br/>${message.replace(/\n/g, '<br/>')}</p>`,
    //   });
    //   return NextResponse.json({ success: true, message: "Message sent successfully!" });
    // } catch (error) {
    //   console.error("Failed to send email:", error);
    //   return NextResponse.json({ success: false, message: "Failed to send message due to a server error." }, { status: 500 });
    // }
    
    // For now, return a success response simulating the email was "sent"
    return NextResponse.json({ success: true, message: "Message received (simulation successful)." });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred on the server." }, { status: 500 });
  }
}
