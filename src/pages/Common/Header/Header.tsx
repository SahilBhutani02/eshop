import { Link } from "react-router-dom";
import { HeaderRoutes } from "./HeaderRoutes";
import logo_light from "../../../assets/images/logo_light.png";
import logo_dark from "../../../assets/images/logo_dark.png";
import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { ThemeContext } from "../../../components/context/ThemeContext";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  return (
    <div className="flex justify-between shadow-lg h-20 items-center px-10 w-full bg-white relative dark:bg-gray-800 dark:text-white">
      <Link to={`/`}>
        <img src={theme == "light" ? logo_light : logo_dark} alt="logo" className="h-[150px] w-auto" />
      </Link>

      <div className="hidden md:flex space-x-6">
        {HeaderRoutes.filter(
          (val) => val.path !== "/login" && val.path !== "/signup"
        ).map((val, index) => (
          <Link key={index} to={val.to} className="font-bold m-2">
            {val.name}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex space-x-6">
        {HeaderRoutes.filter(
          (val) => val.path === "/login" || val.path === "/signup"
        ).map((val, index) => (
          <Link key={index} to={val.to} className="font-bold m-2">
            {val.name}
          </Link>
        ))}
      </div>


      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>


      {mobileMenuOpen && (
        <div className="absolute top-20 right-0 w-[180px] bg-white  flex flex-col rounded-lg p-5 space-y-4 md:hidden dark:bg-gray-800">
          {HeaderRoutes.map((val, index) => (
            <Link
              key={index}
              to={val.to}
              className="font-md text-lg "
              onClick={() => setMobileMenuOpen(false)}
            >
              {val.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
