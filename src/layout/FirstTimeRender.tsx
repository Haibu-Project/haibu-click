"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function FirstTimeRenderLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      router.replace("/auth/login"); 
    }
  }, [pathname, router]);

  return <>{children}</>;
}
