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

  const showPassword = () => {
    setDisplayPass(!displayPass);
  };

  const showConfirmPassword = () => {
    setDisplayConfirmPass(!displayConfirmPass);
  };

  const handleSubmit = (values: ResetPasswordFormValues) => {
    console.log(values);
    dispatch(
      signup({ ...userDetails, email: email, password: values.confirmPassword })
    );
    navigate(`/login`);
  };

  return (
    <div className="flex">
      <div className="w-[50%]">
        <div className="h-screen w-full overflow-hidden">
          <img src={image} alt="w-full h-full object-cover" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex items-center justify-center  w-[50%]">
        <div className="border bg-[#f8f9fa] w-full max-w-[400px] shadow-[10px_10px_10px_-1px_black] p-10 rounded-[10px] border-solid border-[black]">
          <h1 className="text-2xl font-bold mb-5">Reset Password </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={ResetPasswordSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {() => (
              <Form className="w-full flex flex-col gap-2.5">
                <div>
                  <label htmlFor="password"  className="font-semibold mb-2">Password</label>
                  <div className="relative flex items-center">
                    <Field
                      id="password"
                      name="password"
                      type={displayPass ? "text" : "password"}
                      placeholder="Enter password"
                       className="w-full border rounded text-base h-[35px] p-3 border-solid border-[#ced4da] focus:border-[#4a90e2] "
                    />
                    <label onClick={showPassword} className="absolute cursor-pointer right-1">
                      {!displayPass ? (
                        <FaRegEye color="black" />
                      ) : (
                        <FaRegEyeSlash color="black" />
                      )}
                    </label>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword"  className="font-semibold mb-2">Confirm Password</label>
                  <div className="relative flex items-center">
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={displayConfirmPass ? "text" : "password"}
                      placeholder="Enter Confirm Password"
                       className="w-full border rounded text-base h-[35px] p-3 border-solid border-[#ced4da] focus:border-[#4a90e2] "
                    />
                    <label
                      onClick={showConfirmPassword}
                      className="absolute cursor-pointer right-1"
                    >
                      {!displayConfirmPass ? (
                        <FaRegEye color="black" />
                      ) : (
                        <FaRegEyeSlash color="black" />
                      )}
                    </label>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button type="submit"  className=" h-10 bg-[#4a90e2] text-[white] text-base rounded cursor-pointer transition-[background-color] duration-[0.3s] border-[none] hover:bg-[#357abd] mt-5">
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
