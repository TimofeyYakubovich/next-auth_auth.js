// import { PostSearch } from "@/components/PostSearch";
// import { Posts } from "@/components/Posts";
import { Metadata } from "next";
import Link from "next/link";

// получение данных что бы реальные блоги рисовать создаем функцию ее не надо возвращать экспортировать
// все что мы экспортируем next понимает именнои из страниц из папки компанентов все что угодно можно экспортировать
// а из уровня страниц некст воспринимает поособому гдето названия важны как для Metadata и generateMetadata для дефолтного эеспорта это не так важно
// но вспомогательные функции мы не экспортируем

// этот fetch не тот fetch что в браузере темболее что отрабатывет он на сервере дополнен возможностями от некста
// объект с настройками расширен
async function getData () {
  // при перезагрузки страницы данные подгрузились мгновенно потому что некст кеширует данные это не всегда оптимально данные могут изменяться
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', { // делаем запрос за постами
    // у fetch от некст в объекте настроек есть объект next с 2 полями revalidate и tags revalidate это с каким промежутком мы хотим делать запросы обновлять данные
    // на сервере этот запрос произодйт раз в минуту но не для каждого пользователя и теперь данные будут закешированы на указанное время
    next: {
      revalidate: 60
    }
  }) 

  if(!response.ok) throw new Error('Unable to fetch') // если произошла ошибка прокидываем текс ошибки

  return response.json()
}

export const metadata: Metadata = {
  title: "Blog | Next App",
};

// серверные компаненты в отличии от обычных реакт компанентов могут быть асинхронными
// так как сдесь отрисовываются просто результат от сервера в ввиде html все что написано до return и будет функция синхронной или асинхронной не так важно
// важно что используем его как серверный компанент
export default async function Blog() { 
  const posts = await getData()
  return (
    <>
      <h1>Blog page</h1>
      <ul>
        {posts.map((post: any) => (
          // несмотря на то что это сервреный компанент всеравно требуется key
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      {/* <PostSearch /> */}
      {/* <Posts /> */}
    </>
  );
}