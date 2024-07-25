"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import type { FormEventHandler } from "react";

const SignInForm = () => {
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    // в FormData передаем саму форму через event.currentTarget
    const formData = new FormData(event.currentTarget);
    // вызываем функцию signIn указываем провайдер credentials и передаем 
    // вызываем функцию signIn указываем провайдер credentials и передаем  и password
    // аслучае ошибки перебросит нас на страницу которая была автосгенерировано что бы этого не было указываем redirect: false,
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    // если пришел какой то ответ и в ответе нет ошибки то пользователь залогинился перкидываем его на /profile
    if (res && !res.error) {
      router.push("/profile");
    } else {
      console.log(res);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input type="email" name="email" required />
      <input type="password" name="password" required />
      <button type="submit">Sign In</button>
    </form>
  );
};

export { SignInForm };
