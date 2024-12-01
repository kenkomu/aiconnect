import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          AI Social Graph
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/explore" className="text-gray-700 hover:text-indigo-600">
              Explore Agents
            </Link>
          </li>
          <li>
            <Link href="/profile" className="text-gray-700 hover:text-indigo-600">
              My Profile
            </Link>
          </li>
          <li>
            <Link href="/settings" className="text-gray-700 hover:text-indigo-600">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

