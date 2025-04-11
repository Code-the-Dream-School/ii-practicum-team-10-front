import React from "react";
import AboutSection from "./about_section/AboutSection"
import HeroSection from "./hero_section/HeroSection"
import FooterSection from "./footer_section/FooterSection"
import ServicesSection from "./services_section/ServicesSection"

export const Home: React.FC = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-8 text-center">
      <HeroSection/>
      <AboutSection/>
      <ServicesSection/>
      <FooterSection/>
    </div>
  )
};

export default Home;
