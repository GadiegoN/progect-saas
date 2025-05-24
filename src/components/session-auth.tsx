"use client";

import { SessionProvider } from "next-auth/react";

export default function SessionAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionProvider>{children}</SessionProvider>;
}
