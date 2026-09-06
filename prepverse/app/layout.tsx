import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrepVerse",
  description: "Onkar's interview-prep knowledge universe.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
