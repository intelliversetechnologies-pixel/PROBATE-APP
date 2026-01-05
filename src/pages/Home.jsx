import React from 'react'
import Header from '../components/Header'
import Hero from '../pages/hero'
import Services from '../pages/services'
import About from '../pages/about'
import Review from '../pages/review'
import Contact from './Contact'
import Footer from '../components/footer'

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <About />
      <Review />
      <Contact />
      <Footer />
    </>
  )
}

export default Home 
