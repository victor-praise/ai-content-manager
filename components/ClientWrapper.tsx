
'use client';
import { ClerkProvider } from "@clerk/nextjs";





export default function ClientWapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}
