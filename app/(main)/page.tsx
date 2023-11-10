import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import {Metadata} from "next"

export const metadata: Metadata = {
  title: "Artesanatos da Zizi",
  description:
    "Artesantos dos artistas do Espírito Santo.",
}

const Home = () => {
  
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}

export default Home
