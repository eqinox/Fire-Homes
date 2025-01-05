import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-sky-950 text-white p-5 h-24 flex items-center justify-between">
          <Link href="/" >Fire Homes</Link>
          <ul>
            <li>
              <Link href="/login">
              Login
              </Link>

              <Link href="/register">
              Signup
              </Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
