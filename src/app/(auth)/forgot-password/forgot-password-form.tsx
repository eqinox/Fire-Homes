"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase/client";
import { useToast } from "@/hooks/use-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await sendPasswordResetEmail(auth, email);
        toast({
          title: "Email sent!",
          description: "Check your email to reset your password",
          variant: "success",
        });
        setEmail("");
      }}
      className="flex flex-col gap-4"
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button className="w-full" type="submit">
        Reset Password
      </Button>
    </form>
  );
}
