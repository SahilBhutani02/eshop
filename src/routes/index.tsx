import Dashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import ResetPassword from "../pages/Auth/ResetPassword";
import Signup from "../pages/Auth/Signup";
import About from "../pages/Common/About";
import Contact from "../pages/Common/Contact";
import Home from "../pages/Common/Home";
import Products from "../pages/Common/Products";
import Cart from "../pages/User/Cart";
import EditProfile from "../pages/User/EditProfile";
import Orders from "../pages/User/Orders";
import ProductItem from "../pages/User/ProductItem";
import Wishlist from "../pages/User/Wishlist";



export const routes = () => [
  {
    path: "/login",
    element: <Login />,
    privateComponent: false,
    role: ["admin", "user"],
  },
  {
    path: "/signup",
    element: <Signup />,
    privateComponent: false,
    role: ["admin","user"],
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
    privateComponent: false,
    role: ["admin", "user"],
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
    privateComponent: false,
    role: ["admin", "user"],
  },
  {
    path: "/",
    element: <Home />,
    privateComponent: false,
    role: ["admin", "user"],
  },
  {
    path: "/about",
    element: <About />,
    privateComponent: false,
    role: ["admin", "user"],
  },
  {
    path: "/contact",
    element: <Contact />,
    privateComponent: false,
    role: ["admin", "user"],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    privateComponent: true,
    role: ["admin"],
  },
  {
    path: "/users",
    element: <Users />,
    privateComponent: true,
    role: ["admin"],
  },
  {
    path: "/products",
    element: <Products />,
    privateComponent: true,
    role: ["admin","user"],
  },
  {
    path: "/products/:id",
    element: <ProductItem />,
    privateComponent: true,
    role: ["admin","user"],
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
    privateComponent: true,
    role: ["user"],
  },
  {
    path: "/cart",
    element: <Cart />,
    privateComponent: true,
    role: ["user"],
  },
  {
    path: "/orders",
    element: <Orders />,
    privateComponent: true,
    role: ["user"],
  },
  {
    path: "/profile",
    element: <EditProfile />,
    privateComponent: true,
    role: ["user"],
  },
];
