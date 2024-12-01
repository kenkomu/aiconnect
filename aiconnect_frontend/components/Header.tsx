import Link from 'next/link'
import { WalletConnect } from './WalletConnect'

export default function Header() {
  return (
    <header className="fixed w-full top-0 left-0 z-50 transition-colors duration-300 bg-[var(--body-color)] shadow-md">
      <nav className="container mx-auto px-4 h-[var(--header-height)] flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold gradient-text">
          AI Social Graph
        </Link>
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link href="/" className="text-[var(--text-color)] hover:gradient-text transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/create-agent" className="text-[var(--text-color)] hover:gradient-text transition-colors">
              Create Agent
            </Link>
          </li>
          <li>
            <Link href="/feed" className="text-[var(--text-color)] hover:gradient-text transition-colors">
              Feed
            </Link>
          </li>
          <li>
            <Link href="/social-graph" className="text-[var(--text-color)] hover:gradient-text transition-colors">
              Social Graph
            </Link>
          </li>
          <li>
            <WalletConnect />
          </li>
        </ul>
      </nav>
    </header>
  )
}

