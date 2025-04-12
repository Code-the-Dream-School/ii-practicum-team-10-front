import HomeNavbar from "../home_navbar/HomeNavbar";

const HeroSection: React.FC = () => {

  return (
    <div id="home" className="bg-white h-screen flex flex-col">
      <HomeNavbar/>
      <div className="flex flex-1 items-center justify-center text-center px-6">
        <div className="w-full">
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-gray-900">
            CRUSH YOUR NEXT CS INTERVIEW
          </h1>
          <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
            We make CS interviews easy
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;