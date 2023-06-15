import './Home.css'
import NavBar from '../../components/NavBar/Navbar'
import React from 'react'
import Hero from "../../components/Hero/Hero"
import HeroLearner from "../../components/HeroLearner/HeroLearner"
import HeroEducator from "../../components/HeroEducator/HeroEducator"
import Footer from "../../components/Footer/Footer"

const Home = () => {
  return (
    <>
    <NavBar></NavBar>
    <Hero />
    <HeroLearner />
    <HeroEducator />
    <Footer />
    </>
  )
}

export default Home