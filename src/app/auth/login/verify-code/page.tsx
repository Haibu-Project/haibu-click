"use client"
import { Suspense } from "react";
import VerifyLoginComponent from "@/components/features/Auth/login/VerifyLogin";

export default function VerifyLogin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyLoginComponent />
    </Suspense>
  );
}
