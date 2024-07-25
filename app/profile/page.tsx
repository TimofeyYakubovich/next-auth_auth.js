import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

export default async function Profile() {
    // сделаемс сервеный компанент добовляем async
    // используем данные сесии получаем их через getServerSession передаем ему authConfig
  const session = await getServerSession(authConfig);
  console.log('Profile', session) // выводит в терминал так как компанент серверный

  return (
    <div>
        {/* если есть сессии то отрисовываем имя и картинку профиля */}
      <h1>Profile of {session?.user?.name}</h1>
      {session?.user?.image && <img src={session.user.image} alt="" />}
    </div>
  );
}