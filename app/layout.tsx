import { Metadata } from "next";
import "./globals.css";
import { TheHeader } from "@/components/TheHeader";
import { TheFooter } from "@/components/TheFooter";
import { Providers } from "@/components/Providers";
import { Inter } from "next/font/google"
// 1 Layout всегда в корне должен лежать RootLayout потому что next автоматически не добавляет head body во все файлы
export const metadata: Metadata = {
  title: "Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TheHeader />
          <main className="container">{children}</main>
          <TheFooter />
        </Providers>
      </body>
    </html>
  );
}
