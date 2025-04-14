import React from "react";
import AboutSection from "../components/home/about_section/AboutSection"
import HeroSection from "../components/home/hero_section/HeroSection"
import ServicesSection from "../components/home/services_section/ServicesSection"

export const Home: React.FC = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-8 text-center">
      <HeroSection/>
      <AboutSection/>
      <ServicesSection/>
    </div>
  )
};

export default Home;
