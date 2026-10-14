"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [msg, setMsg] = useState("");

  const request = async () => {
    setMsg("Sending code to " + email + " via ZeptoMail...");
    const r = await authClient.emailOtp.sendVerificationOtp({ email, type: "sign-in" });
    if (r.error) { setMsg("Failed: " + r.error.message); return; }
    setStep("otp");
    setMsg("Code sent. Check inbox (or dev console if keys missing).");
  };
  const verify = async () => {
    const r = await authClient.signIn.emailOtp({ email, otp });
    if (r.error) { setMsg("Wrong/expired code: " + r.error.message); return; }
    setMsg("Signed in. Opening branch...");
    window.location.href = "/branch";
  };
  return (
    <main>
      <div className="card"><h1 className="text-xl font-extrabold">Sign in to Cardbook</h1>
        <p className="text-sm">Use your email. We send a 6-digit code — no password to remember. Each person signs in with their own account.</p></div>
      <div className="card">
        {step === "email" ? (<>
          <label className="font-bold">Email address</label>
          <input className="w-full min-h-[56px] border rounded-xl p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@pharmacy.com" />
          <button className="btn btn-primary" onClick={request}>Send me a code</button>
        </>) : (<>
          <label className="font-bold">6-digit code sent to {email}</label>
          <input className="w-full min-h-[56px] border rounded-xl p-2" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" inputMode="numeric" />
          <button className="btn btn-primary" onClick={verify}>Verify & open Cardbook</button>
          <button className="btn" style={{ border: "2px solid #0E7C6B" }} onClick={() => setStep("email")}>Use a different email</button>
        </>)}
        {msg && <p style={{ fontWeight: 700 }}>{msg}</p>}
      </div>
    </main>
  );
}
