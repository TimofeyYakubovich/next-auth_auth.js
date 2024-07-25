"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const GoogleButton = () => {
    // получаем данные из url хуком useSearchParams
  const searchParams = useSearchParams();
  // достаем callbackUrl из searchParams если его там нет подефолту будет /profile
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  return (
    // при нажатии на кнопку вызываем функцию signIn и указываем провайдер google и указываем как именно это делать передаем callbackUrl
    <button onClick={() => signIn("google", { callbackUrl })}>
      Sign in with Google
    </button>
  );
};

export { GoogleButton };