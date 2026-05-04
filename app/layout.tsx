import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "インテリア診断 | あなたの部屋があなたを語る",
  description: "部屋の写真をアップロードするだけで、あなたのインテリアスタイルとパーソナリティを診断。インテリアMBTIで自分の空間を再発見。",
  openGraph: {
    title: "インテリア診断 | あなたの部屋があなたを語る",
    description: "部屋の写真をアップロードするだけで、あなたのインテリアスタイルとパーソナリティを診断。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
