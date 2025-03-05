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
    <div className="flex">
      <div className="w-[50%]">
        <div className="h-screen w-full overflow-hidden">
          <img
            src={image}
            alt="w-full h-full object-cover"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-center justify-center  w-[50%]">
        <div className="border bg-[#f8f9fa] w-full max-w-[400px] shadow-[10px_10px_10px_-1px_black] p-10 rounded-[10px] border-solid border-[black]">
          <h1 className="text-2xl font-bold mb-5">Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {() => (
              <Form className="w-full flex flex-col gap-2.5">
                <div>
                  <label htmlFor="email" className="font-semibold mb-2">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    className="w-full border rounded text-base h-[35px] p-3 border-solid border-[#ced4da] focus:border-[#4a90e2]"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Field
                      id="password"
                      name="password"
                      type={displayPass ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full border rounded text-base h-[35px] p-3 border-solid border-[#ced4da] focus:border-[#4a90e2] "
                    />
                    <span
                      onClick={showPassword}
                      className="absolute cursor-pointer right-1"
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
                <div className="text-red-500 text-right">
                  <Link to="/forgotPassword">Forgot Password?</Link>
                </div>

                <button
                  type="submit"
                  className=" h-10 bg-[#4a90e2] text-[white] text-base rounded cursor-pointer transition-[background-color] duration-[0.3s] border-[none] hover:bg-[#357abd] mt-5"
                >
                  Login
                </button>
                <p className="text-[0.9rem] text-center mt-4">
                  Don't have an account?{" "}
                  <Link to={`/signup`} className="text-blue-500">
                    SignUp
                  </Link>
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
