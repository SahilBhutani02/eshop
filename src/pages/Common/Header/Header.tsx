import { Link } from "react-router-dom";
import { HeaderRoutes } from "./HeaderRoutes";
import logo_light from "../../../assets/images/logo_light.png";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between shadow-lg h-20 items-center px-10 w-full">
      <ul>
        <Link to={`/`}>
          <img src={logo_light} alt="logo" className="h-[150px] w-[150px]" />
        </Link>
      </ul>

      <ul className="flex justify-between">
        {HeaderRoutes.filter(
          (val) => val.path !== "/login" && val.path !== "/signup"
        ).map((val, index) => (
          <li key={index}>
            <Link to={val.to} className="font-bold m-5">
              {val.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex justify-between">
        {HeaderRoutes.filter(
          (val) => val.path === "/login" || val.path === "/signup"
        ).map((val, index) => (
          <li key={index}>
            <Link to={val.to} className="font-bold m-5">
              {val.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
