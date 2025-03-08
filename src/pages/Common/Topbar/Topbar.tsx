
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

import logo_light from '../../../assets/images/logo_light.png'
import logo_dark from '../../../assets/images/logo_dark.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../components/context/ThemeContext";
import { login } from "../../../reduxStore/slices/loginSlice";
import { signup } from "../../../reduxStore/slices/signupSlice";
import { userType } from "../../../reduxStore/slices/userTypeSlice";
import { emptyWish } from "../../../reduxStore/slices/wishlistSlice";
import { emptyCart } from "../../../reduxStore/slices/cartSlice";


const Topbar: React.FC = () => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const loginDetails = useSelector((state: any) => state.login);
  const type = useSelector((state: any) => state.userType);
  const cart = useSelector((state: any) => state.cart);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    dispatch(login({}));
    dispatch(signup({}));
    dispatch(userType({ admin: false, user: false }));
    dispatch(emptyWish())
    dispatch(emptyCart())
    setDropdown(false);
   
  };

  const pathSegment = location?.pathname.split("/")[1];
  const capitalizedSegment = pathSegment
    ? pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1)
    : "";


  return (
    <header className={`p-5 w-full shadow-lg`}>
      {/* Admin Section */}
      {type.admin ? (
        <div className="flex items-center justify-between">
          <div>
            <span>{""}</span>
          </div>
          <div className="flex items-center space-x-4">
            {theme === "light" ? (
              <MdOutlineDarkMode
                className=" cursor-pointer "
                onClick={toggleTheme}
                size={24}
              />
            ) : (
              <CiLight
                className=" cursor-pointer "
                onClick={toggleTheme}
                size={24}
              />
            )}

            <p className="flex ">
              <span className="text-gray-50 text-lg font-semibold dark:text-gray-700 dark:bg-gray-50  bg-gray-700 rounded-full w-7 h-7  pl-2">
                A
              </span>
              <span className="text-sm font-semibold ml-2 mt-1">
                {loginDetails?.email}
              </span>
            </p>
          </div>
        </div>
      ) : (
        // User Section
        <div className="flex items-center justify-between">
          {location?.pathname !== "/products" ? (
           <div className="flex items-center justify-between h-[40px] ">
           <div className="overflow-hidden ">
             <Link to={`/products`}>
             {theme === "light" ? (
              <img src={logo_light} alt="logo" className="h-auto w-[120px]" />
            ) : (
              <img src={logo_dark} alt="logo" className="h-auto w-[120px]" />
            )}
             </Link>
           </div>
         
           <div className="ml-5">
             <Link to={`/products`}>
               <span className="font-bold">{"Home"}</span>
               <span className="font-bold">{` > `}</span>
             </Link>
             <span className="font-normal">{capitalizedSegment}</span>
           </div>
         </div>
         
          ) : (
            <div></div>
          )}

          <div className="flex items-center space-x-4">
            {/* Theme Toggle Icon */}
            {theme === "light" ? (
              <MdOutlineDarkMode
                className="cursor-pointer"
                onClick={toggleTheme}
                size={24}
              />
            ) : (
              <CiLight
                className="cursor-pointer"
                onClick={toggleTheme}
                size={24}
              />
            )}
            {/* Links for Wishlist and Cart */}
            <div className="flex space-x-4 text-gray-800 dark:text-white">
              <Link to="/wishlist">
                <FaRegHeart size={20} />
              </Link>
              <Link to="/cart" className="flex">
                <FaCartShopping size={20} />
                <sup>
                  {cart.length > 0 ? (
                    <span className="bg-gray-700 text-[white] ml-[-5px] px-2.5 py-[5px] rounded-[100px]">{cart.length}</span>
                  ) : (
                    ""
                  )}
                </sup>
              </Link>
            </div>

            {/* User Dropdown for Logged In User */}
            {loginDetails?.email && (
              <div className="relative" ref={dropdownRef}>
                {/* Profile icon and dropdown toggle */}
                <div
                  onClick={handleDropdown}
                  className="flex items-center cursor-pointer space-x-1"
                >
                  <span className="text-white dark:text-gray-700 dark:bg-white  bg-gray-700 font-semibold rounded-full h-8 w-8 flex items-center justify-center">
                    {loginDetails.email[0].toUpperCase()}
                  </span>
                </div>

                {/* Dropdown menu */}
                {dropdown && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg  text-gray-700 dark:text-white  dark:bg-gray-700 dark:border-gray-700">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 hover:rounded-t-lg dark:hover:bg-white dark:hover:text-gray-700"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 hover:bg-gray-100  dark:hover:bg-white dark:hover:text-gray-700 "
                      >
                        Orders
                      </Link>
                    </li>
                    <li
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer hover:rounded-b-lg  dark:hover:bg-white dark:hover:text-gray-700"
                    >
                      Logout
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar;
