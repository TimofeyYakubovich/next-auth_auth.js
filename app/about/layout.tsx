import Link from "next/link";
// можно создавать любое количесвто вложенных лойаутов 
// сделаем вложенное меню что бы переходить в разные разделы директории
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>About us</h1>
      <ul>
        <li>
          <Link href="/about/contacts">Contacts</Link>
        </li>
        <li>
          <Link href="/about/team">Team</Link>
        </li>
      </ul>
      {/* children в этом случае это либо соседняя страница либо дочерния от About */}
      {/* при переходе между страницами этот Layout никуда не денется */}
      {/* и таких вложенных лойаутов можно создаватьсколько угодно например внутри страниц Team и Contact */}
      {children}
    </div>
  );
}