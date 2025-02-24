"use client";

import { Suspense } from "react";
import VerifyCode from "@/components/features/Auth/register/VerifyCode";

export default function VerifyCodePage() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyCode />
    </Suspense>
  );
}
