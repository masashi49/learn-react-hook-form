import Link from 'next/link';

const Links = ['Home', 'About', 'Contact'];

export function navigation() {
  return (
    <nav>
      <ul className="flex space-x-4 bg-blue-600 p-4">
        {Links.map((link) => (
          <Link
            key={link}
            href={`/${link.toLowerCase()}`}
            className="text-white hover:underline cursor-pointer"
          >
            {link}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
