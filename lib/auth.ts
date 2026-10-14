import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { db } from "@/db";

async function sendViaZepto(to: string, subject: string, html: string) {
  const key = process.env.ZEPTOMAIL_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) {
    console.log(`[DEV-OTP] To:${to} Subject:${subject} Body:${html}`);
    return;
  }
  await fetch("https://api.zeptomail.com/v1.1/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Zoho-encrikey": key },
    body: JSON.stringify({
      from: { address: from, name: "Cardbook" },
      to: [{ email_address: { address: to } }],
      subject,
      htmlbody: html
    })
  });
}

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const subject = type === "sign-in" ? `Your Cardbook code: ${otp}` : `Cardbook verification: ${otp}`;
        await sendViaZepto(
          email,
          subject,
          `<p>Your Cardbook code is <b>${otp}</b>. It expires in 10 minutes. Use ${email} to sign in — no password needed.</p>`
        );
      }
    })
  ]
});
