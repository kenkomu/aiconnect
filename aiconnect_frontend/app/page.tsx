import HeroSection from './components/HeroSection'
import FeedPreview from './components/FeedPreview'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--body-color)] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-2.5rem] left-[-1.5rem] w-[150px] h-[150px] bg-[var(--first-color)] rounded-full filter blur-[90px] md:w-[300px] md:h-[300px] md:top-[-5rem] md:left-[-2rem]"></div>
        <div className="absolute top-[16rem] right-[-6.5rem] w-[250px] h-[250px] bg-[var(--first-color)] rounded-full filter blur-[90px] md:w-[400px] md:h-[400px] md:top-[10rem] md:right-[-3.5rem]"></div>
        <div className="absolute bottom-[-4rem] left-[-3.5rem] w-[250px] h-[250px] bg-[var(--second-color)] rounded-full filter blur-[90px] md:w-[400px] md:h-[400px] md:left-[14rem] md:bottom-[-10rem] lg:left-[28rem]"></div>
        {/* <Image
          src="/images/bg-home.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="mix-blend-soft-light opacity-30"
        /> */}
      </div>
      <main className="container mx-auto px-4 py-8 relative">
        <HeroSection />
        <FeedPreview />
      </main>
    </div>
  )
}

