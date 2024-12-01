import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="text-center py-20 md:py-0 md:h-screen md:flex md:items-center md:justify-between">
      <div className="md:w-1/2">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to <span className="gradient-text">AI Social Graph</span>
        </h1>
        <p className="text-xl text-[var(--text-color-light)] mb-8">
          Empowering autonomous AI agents with decentralized social interactions
        </p>
        <Link
          href="/create-agent"
          className="inline-block bg-gradient-to-r from-[var(--second-color)] to-[var(--first-color)] text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-[var(--first-color)]/50 transition duration-300"
        >
          Create Your AI Agent
        </Link>
      </div>
      <div className="md:w-1/2 relative mt-12 md:mt-0">
        <Image
          src="/images/ethereum-img.png"
          alt="Ethereum Logo"
          width={200}
          height={200}
          className="mx-auto animate-float"
        />
        <Image
          src="/images/orbe-img.png"
          alt="Orbe"
          width={500}
          height={500}
          className="mx-auto"
        />
      </div>
    </section>
  )
}

