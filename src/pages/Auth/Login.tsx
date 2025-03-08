import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoginSchema from "../../schemas/LoginSchema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reduxStore/slices/loginSlice";
import { userType } from "../../reduxStore/slices/userTypeSlice";
import image from "../../assets/images/login-office.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [displayPass, setDisplayPass] = useState(false);
  const userData = useSelector((state: any) => state.signup);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const showPassword = () => {
    setDisplayPass(!displayPass);
  };

  const handleSubmit = (values: LoginFormValues) => {
    if (values.email == "admin@gmail.com" && values.password == "Admin@123") {
      dispatch(login(values));
      dispatch(userType({ admin: true, user: false }));
      navigate(`/dashboard`);
    } else if (
      values.email === userData.email &&
      values.password === userData.password
    ) {
      dispatch(login(values));
      dispatch(userType({ admin: false, user: true }));
      navigate(`/products`);
    } else {
      alert("Invalid Creds!");
    }
  };

  return (
    <div className="flex h-screen dark:bg-gray-800">
      <div className="hidden md:block md:w-1/2">
        <img
          src={image}
          alt="Login Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2 p-6 md:p-10 ">
        <div className="border bg-[#f8f9fa] w-full max-w-md shadow-[10px_10px_10px_-1px_black] p-10 rounded-lg border border-black dark:bg-gray-700">
          <h1 className="text-2xl font-bold mb-5 text-center">Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {() => (
              <Form className="w-full flex flex-col gap-4">
                <div>
                  <label htmlFor="email" className="font-semibold block mb-2">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    className="w-full border rounded h-10 p-3 border-gray-300 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="font-semibold block mb-2">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Field
                      id="password"
                      name="password"
                      type={displayPass ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full border rounded h-10 p-3 border-gray-300 focus:border-blue-500 dark:text-black"
                    />
                    <span
                      onClick={showPassword}
                      className="absolute right-1 cursor-pointer"
                    >
                      {!displayPass ? (
                        <FaRegEye color="black" />
                      ) : (
                        <FaRegEyeSlash color="black" />
                      )}
                    </span>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="text-right text-sm text-blue-500">
                  <Link to="/forgotPassword">Forgot Password?</Link>
                </div>

                <button
                  type="submit"
                  className="h-10 bg-blue-500 text-white text-base rounded transition duration-300 hover:bg-blue-700"
                >
                  Login
                </button>
                <p className="text-sm text-center mt-4">
                  Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;