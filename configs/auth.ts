// создаем директорию configs для конфигов в рамка жизненного цикла приложения и конфиг auth.ts для авторизации
import type { AuthOptions, User } from "next-auth";
import GoggleProvider from "next-auth/providers/google"
// вход через Credentials это через лгин пароль
import Credentials from "next-auth/providers/credentials";
import { users } from "@/data/user";

export const authConfig: AuthOptions = {
    // что тут должно быть в обезательном порядке провайдеры providers
    // что может быть провайдером самые разные клиенты 
    providers: [
        // любой провайдер предстовляет собой функцию каторую надо вызвать и передать в нее набор настроек
        // в случае с GoggleProvider это clientId и clientSecret откуда их брать ресурс cloud.google.com
        // достаем их из переменных окружения они могут быть undefined по мнению ts можем указать as string или !
        GoggleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        Credentials({
            // credentials то что будем запрашивать у пользователя
            credentials: {
                // они будут рисоваться автоматически поэтому помечаем label type required - обезательное поле
                email: { label: 'email', type: 'email', required: true },
                password: { label: 'password', type: 'password', required: true },
            },
            // функция authorize принимает credentials
            async authorize(credentials) {
                // authorize принимает credentials и проверяет авторизованы мы или нет и вернуть null если не авторизован если авторизован возврощает пользователя
                if (!credentials?.email || !credentials.password) return null; // если нет email или password возвращаем null
                // если данные есть то надо их проверить надо проверять при взаимодействии с бд она может быть напрямую подключена к next.js или к стороннему бекенду
                // сейчас сделаем просто есть файлик с пользователями к нему обрахаемся проверяем есть ли такой пользователь в файле users и тот email что ввел пользователь
                const currentUser = users.find(user => user.email === credentials.email)
                // если пользователь найден проверяем совападет ли пароль
                if (currentUser && currentUser.password === credentials.password) {
                    // надо вернуть пользователя без пароля поэтому из текущего пользователя currentUser пароль изымаем
                    const { password, ...userWithoutPass } = currentUser;

                    return userWithoutPass as User; // функция authorize ожидает что мы вернем определенный тип User и если наши данные не соответствуют ему он будет ругаться
                }

                return null
            }
        })
    ],
    // настройки странци
    pages: {
        signIn: '/signin', // теперь библиотека будет сюда переадрисовывать при попытке зайти на приватный роут

    }
}