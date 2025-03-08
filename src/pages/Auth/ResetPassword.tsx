import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ResetPasswordSchema from "../../schemas/ResetPasswordSchema";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../reduxStore/slices/signupSlice";
import image from "../../assets/images/login-office.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [displayPass, setDisplayPass] = useState(false);
  const [displayConfirmPass, setDisplayConfirmPass] = useState(false);

  const initialValues: ResetPasswordFormValues = {
    password: "",
    confirmPassword: "",
  };

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state: any) => state.signup);

  const email = location?.state?.values?.email || "";

  const handleSubmit = (values: ResetPasswordFormValues) => {
    console.log(values);
    dispatch(signup({ ...userDetails, email: email, password: values.confirmPassword }));
    navigate(`/login`);
  };

  return (
    <div className="flex h-screen dark:bg-gray-800">
      <div className="hidden md:block md:w-1/2">
        <img src={image} alt="Login" className="w-full h-full object-cover" />
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2 p-5 ">
        <div className="bg-[#f8f9fa] w-full max-w-md shadow-[10px_10px_10px_-1px_black] p-10 rounded-lg border border-black dark:bg-gray-700">
          <h1 className="text-2xl font-bold mb-5 text-center">Reset Password</h1>

          <Formik initialValues={initialValues} validationSchema={ResetPasswordSchema} onSubmit={handleSubmit}>
            {() => (
              <Form className="w-full flex flex-col gap-4">
                <div>
                  <label htmlFor="password" className="font-semibold mb-2 block">Password</label>
                  <div className="relative flex items-center">
                    <Field
                      id="password"
                      name="password"
                      type={displayPass ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full border rounded text-base h-10 p-2 border-gray-300 focus:border-blue-500 dark:text-black"
                    />
                    <span onClick={() => setDisplayPass(!displayPass)} className="absolute right-1 cursor-pointer">
                      {displayPass ? <FaRegEyeSlash color="black"/> : <FaRegEye color="black"/>}
                    </span>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="font-semibold mb-2 block">Confirm Password</label>
                  <div className="relative flex items-center">
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={displayConfirmPass ? "text" : "password"}
                      placeholder="Enter confirm password"
                      className="w-full border rounded text-base h-10 p-2 border-gray-300 focus:border-blue-500 dark:text-black"
                    />
                    <span onClick={() => setDisplayConfirmPass(!displayConfirmPass)} className="absolute right-1 cursor-pointer">
                      {displayConfirmPass ? <FaRegEyeSlash color="black" /> : <FaRegEye color="black"/>}
                    </span>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                </div>

                <button
                  type="submit"
                  className="h-10 bg-blue-500 text-white text-base rounded cursor-pointer transition duration-300 hover:bg-blue-700 mt-5"
                >
                  Continue
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
