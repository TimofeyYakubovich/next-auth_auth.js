'use client'


// для компанента страницы ошибки есть зарезервированное название файла error.tsx
// но она должна использовать 'use client' и пропсом принимает объект error

export default function ErrorWrapper({ error }: { error: Error }) {
    return <h1>Oops!!! {error.message}</h1>;
}