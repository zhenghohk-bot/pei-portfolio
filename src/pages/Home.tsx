import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import Marquee from '../sections/Marquee'
import About from '../sections/About'
import Featured from '../sections/Featured'
import MoreWork from '../sections/MoreWork'
import SayHello from '../sections/SayHello'
import Footer from '../sections/Footer'
import Backdrop from '../components/Backdrop'

export default function Home() {
  return (
    <div className="min-h-[100dvh]">
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Featured />
        <MoreWork />
        <About />
        <SayHello />
      </main>
      <Footer />
    </div>
  )
}
