"use client";
// сдесь могут быть самые разные провайдеры ссейчас добавляем только SessionProvider
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};