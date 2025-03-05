import { useEffect, useState } from "react";
import Header from "./Common/Header/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import { routes } from "../routes";
import { useSelector } from "react-redux";
import Topbar from "./Common/Topbar/Topbar";
import Sidebar from "./Common/Sidebar/Sidebar";
import Footer from "./Common/Footer";
import PrivateRoute from "../components/Auth/PrivateRoute";

function App() {
  const [appRoutes, setAppRoutes] = useState<any>([]);
  const user = useSelector((state: any) => state.login);
  const location = useLocation();



  useEffect(() => {
    const tempRoutes = routes().map((route, index) => {
      return (
        <Route
          path={route.path}
          key={index}
          element={
            route.privateComponent ? (
              <PrivateRoute role={route.role ?? []}>
                {route.element}
              </PrivateRoute>
            ) : (
              route.element
            )
          }
        />
      );
    });
    setAppRoutes(tempRoutes);
  }, []);


  return (
    <div className="min-h-screen flex flex-col">
      {Object.keys(user).length === 0 &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/forgotPassword" &&
        location.pathname !== "/resetPassword" && <Header />}

      {/* Main Layout Wrapper */}
      <div className="flex flex-grow">
        {Object.keys(user).length !== 0 &&
          location.pathname !== "/wishlist" &&
          location.pathname !== "/cart" &&
          location.pathname !== "/profile" &&
          location.pathname !== "/orders" &&
          !/^\/products\/\d+$/.test(location.pathname) &&
          (
            <aside className="dark:bg-gray-800 dark:text-white text-white bg-gray-800">
              <Sidebar />
            </aside>
          )}

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col">
          {Object.keys(user).length !== 0 && (
            <header className="dark:bg-gray-900  dark:border-b-2 dark:border-gray-800  text-black bg-white dark:text-white  shadow-lg">
              <Topbar />
            </header>
          )}

          {/* Routes and Main Content */}
          <main className="flex-grow dark:bg-gray-900 dark:text-white text-black bg-gray-100">
            <Routes>{appRoutes}</Routes>
          </main>
        </div>
      </div>

      {/* Footer - visible only on non-auth pages */}
      {Object.keys(user).length === 0 &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/forgotPassword" &&
        location.pathname !== "/resetPassword" && <Footer />}
    </div>
  );
}

export default App;
