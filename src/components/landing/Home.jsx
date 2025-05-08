import Hero from "./Hero"
import FeaturedProperties from "./FeaturedProperties"
import CtaSection from "./CtaSection"
import Footer from "../Footer"

const Home = () => {
  return (
    <div className="bg-black">
      <Hero />
      <FeaturedProperties />
      <CtaSection />
      <Footer/>
    </div>
  )
}

export default Home
