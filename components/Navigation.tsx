"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks: NavLink[];
};

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();
  // сессии useSession этот хук использует возможности реакт контекста поэтмоу нужно создать провайдер Providers.tsx клиентский компанент
  // есть еще серверный вариант можно было бы через сервер получать сессию и спускать ее в этот компанент Navigation
  const session = useSession()
  console.log(session) // в консоль приходит объект с информациейц авторизовани пользователь или нет и с информацией о пользователе expires когда истекает сессия

return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.label}
            href={link.href}
            className={isActive ? "active" : ""}
          >
            {link.label}
          </Link>
        );
      })}
      {/* если есть сессия и у этошй сессии есть data создаем ссылку на профиль */}
      {session?.data && (
        <Link href='/profile'>Profile</Link>
      )}
      {/* ссылки для входа и выхода если данные есть рисуем выход если нет рисуем вход
          next-auth предоставляет функции для входа и выхода signIn, signOut */}
      {session.data 
        ? <Link href="#" onClick={() => signOut({callbackUrl: '/'})}>Sign Out</Link> // когда пользователь нажимает разлогиниться отработает функция signOut и отправляем на главную странциу
        // : <Link href="/api/auth/signin">Sign In</Link> // для входа ссылка пока что автосгенирированная
        : <Link href="/signin">Sign In</Link>
      }
    </>
  );
};

export { Navigation };