import { useState } from "react";
import { Home } from "lucide-react";
import character from "../../../assets/images/navbar/navbar_avatar.png";
import { useNavigate } from "react-router-dom";

const HomeNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between fixed left-0 top-0 w-full bg-white  z-50 p-4 md:px-10">
      <div className="flex items-center">
        <img
          src={character}
          alt="Logo"
          className="w-10 h-10 object-cover cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div className="hidden md:flex items-center space-x-6 bg-gray-300 px-6 py-2 rounded-full">
        <button
          className="p-2 rounded-full"
          aria-label="Home"
          onClick={() => {
            const section = document.getElementById("home");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <Home className="w-5 h-5 text-black cursor-pointer" />
        </button>
        <a href="#about" className="text-black">
          about
        </a>
        <a href="#services" className="text-black">
          services
        </a>
      </div>

      <div className="hidden md:flex space-x-3">
        <button
          onClick={() => navigate("/signup")}
          className="bg-indigo-200 px-4 py-2 rounded-full"
        >
          sign up
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-green-200 px-4 py-2 rounded-full"
        >
          log in
        </button>
      </div>

      <button
        className="md:hidden text-black focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {isOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-4 md:hidden">
          <button
            className="p-2 rounded-full"
            aria-label="Home"
            onClick={() => {
              {
                const section = document.getElementById("home");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
          >
            <Home className="w-5 h-5 text-black" />
          </button>
          <a href="#about" className="text-black">
            about
          </a>
          <a href="#services" className="text-black">
            services
          </a>
          <button
            onClick={() => navigate("/signup")}
            className="bg-indigo-200 px-4 py-2 rounded-full"
          >
            sign up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-green-200 px-4 py-2 rounded-full"
          >
            log in
          </button>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;
