import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../reduxStore/slices/loginSlice";
import { userType } from "../../../reduxStore/slices/userTypeSlice";
import { signup } from "../../../reduxStore/slices/signupSlice";
import { SidebarRoutes } from "./SidebarRoutes";
import FilterProducts from "../../User/FilterProducts";
import { FiLogOut } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import logo_dark from "../../../assets/images/logo_dark.png";
import { useContext } from "react";
import { SidebarContext } from "../../../components/context/SidebarContext";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const type = useSelector((state: any) => state.userType);
  const { sidebar, toggleSidebar } = useContext(SidebarContext);

  const handleLogout = () => {
    navigate("/");
    dispatch(login({}));
    dispatch(signup({}));
    dispatch(userType({ admin: false, user: false }));
  };

  return (
    <div
      className={`flex flex-col ${!sidebar ? "w-64" : "w-20 items-center"
        } h-screen `}
    >

      {type.admin && <button
        onClick={toggleSidebar}
        className={`absolute top-4 ${!sidebar ? "left-[237px]" : "left-[61px]"}
    p-2 bg-red-500 dark:bg-red-500 rounded-full transition-transform hover:scale-110 shadow-md`}
      >
        {sidebar ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />}
      </button>}

      {/* Logo Section */}
      <div className="mx-auto mb-2 w-auto h-[75px]">
        <Link to={`/dashboard`}>
          <img src={logo_dark} alt="logo" className={`w-auto ${!sidebar ? "h-[120px]  -mt-2" : "h-[80px] mt-2"}`} />
        </Link>
      </div>



      {type.admin ? (
        <div className="flex flex-col flex-grow">
          {/* Navigation Links */}
          <nav className="flex flex-col px-4 flex-grow">
            <ul className="space-y-2">
              {SidebarRoutes.map((val, index) => (
                <li key={index}>
                  <Link
                    to={val.to}
                    className="flex items-center py-2 px-4 rounded hover:bg-white hover:text-gray-800 dark:hover:bg-gray-900 dark:hover:text-white transition-colors"
                  >
                    <span className="mx-1">{val.icon}</span>
                    {!sidebar && <span className="mx-1">{val.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="px-4 mb-4">
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 flex items-center justify-center rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              <FiLogOut className="mr-2" /> {!sidebar && "Logout"}
            </button>
          </div>
        </div>
      ) : (
        <FilterProducts />
      )}
    </div>
  );
};

export default Sidebar;
