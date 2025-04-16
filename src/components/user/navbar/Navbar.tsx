import { useState } from "react";
import { Home } from "lucide-react";
import character from "../../../assets/images/navbar/navbar_avatar.png";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between fixed left-0 top-0 w-full bg-white  z-50 p-4 md:px-10">
      <div className="flex justify-between items-center gap-x-4">
        <img src={character} alt="Logo" className="w-10 h-10 object-cover" />
        <button
          onClick={handleLogout}
          className="bg-red-300 hover:bg-red-400 px-4 py-2 rounded-full"
        >
          Logout
        </button>
      </div>

      <div className="hidden md:flex items-center space-x-6 bg-gray-300 px-6 py-2 rounded-full">
        <button
          className="p-2 rounded-full"
          aria-label="Home"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <Home className="w-5 h-5 text-black" />
        </button>
        <Link to="/learn" className="text-black">
          Learn
        </Link>
        <Link to="/leaderboard" className="text-black">
          Leaderboard
        </Link>
      </div>

      <div className="hidden md:flex space-x-3">
        <h1 className="bg-indigo-200 px-4 py-2 rounded-full">{user?.name}</h1>
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
            onClick={() => navigate("/dashboard")}
          >
            <Home className="w-5 h-5 text-black" />
          </button>
          <Link to="/learn" className="text-black">
            Learn
          </Link>
          <Link to="/leaderboard" className="text-black">
            Leaderboard
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
