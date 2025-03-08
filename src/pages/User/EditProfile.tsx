import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../reduxStore/slices/signupSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ProfileSchema from "../../schemas/ProfileSchema";
import { useNavigate } from "react-router-dom";

interface ProfileFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  oldPassword: string;
}

const EditProfile: React.FC = () => {
  const [displayPass, setDisplayPass] = useState(false);
  const [displayConfirmPass, setDisplayConfirmPass] = useState(false);
  const [displayOldPass, setDisplayOldPass] = useState(false);

  const userData = useSelector((state: any) => state.signup);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const initialValues: ProfileFormValues = {
    fullName: userData?.fullName,
    email: userData?.email,
    phoneNumber: userData?.phoneNumber,
    password: "",
    confirmPassword: "",
    oldPassword: "",
  };

  const showPassword = () => {
    setDisplayPass(!displayPass);
  };

  const showConfirmPassword = () => {
    setDisplayConfirmPass(!displayConfirmPass);
  };

  const showOldPassword = () => {
    setDisplayOldPass(!displayOldPass);
  };

  const handleSubmit = (values: ProfileFormValues) => {
    dispatch(signup(values));
    alert("Profile Updated")
    navigate("/products")
    
  };

  return (
    <>
      <h1 className="text-2xl font-bold my-5 ml-11 ">Edit Profile</h1>
      <div className="container p-6 mx-auto bg-white  dark:bg-gray-800 dark:text-gray-200 rounded-lg mb-5">
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema(userData)}
          onSubmit={(values) => handleSubmit(values)}
        >
          {() => (
            <Form className="w-full flex flex-col gap-2.5">
              <div>
                <label htmlFor="fullName" className="font-semibold mb-2">
                  Full Name
                </label>
                <Field
                  id="fullName"
                  name="fullName"
                  type="fullName"
                  placeholder="Enter Full Name"
                  className="w-full border rounded text-base h-[35px] p-3 border-solid border-[#ced4da] focus:border-[#4a90e2] dark:bg-gray-600"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="font-semibold mb-2">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="text"
                  disabled
                  placeholder="Enter email"
                  className="w-full border rounded text-base h-[35px] p-3 border-solid border-[#ced4da] focus:border-[#4a90e2] dark:bg-gray-600"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="font-semibold mb-2">
                  Phone Number
                </label>
                <Field
                  id="phoneNumber"
                  name="phoneNumber"
                  type="phoneNumber"
                  placeholder="Enter Phone Number"
                  className="w-full border rounded text-base h-[35px] p-3 border-solid border-[#ced4da] focus:border-[#4a90e2] dark:bg-gray-600"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="oldPassword"
                  className="font-semibold mb-2"
                >
                  Old Password
                </label>
                <div className="relative flex items-center">
                  <Field
                    id="oldPassword"
                    name="oldPassword"
                    type={displayOldPass ? "text" : "password"}
                    placeholder="Enter Old Password"
                    className="w-full border rounded text-base h-[35px] p-3 border-solid border-[#ced4da] focus:border-[#4a90e2] dark:bg-gray-600"
                  />
                  <label
                    onClick={showOldPassword}
                    className="absolute cursor-pointer right-1"
                  >
                    {!displayOldPass ? (
                      <FaRegEye color="black dark:white" />
                    ) : (
                      <FaRegEyeSlash color="black dark:white" />
                    )}
                  </label>
                </div>
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="font-semibold mb-2">
                  New Password
                </label>
                <div className="relative flex items-center">
                  <Field
                    id="password"
                    name="password"
                    type={displayPass ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full border rounded text-base h-[35px] p-3 border-solid border-[#ced4da] focus:border-[#4a90e2] dark:bg-gray-600"
                  />
                  <label
                    onClick={showPassword}
                    className="absolute cursor-pointer right-1"
                  >
                    {!displayPass ? (
                      <FaRegEye color="black dark:white" />
                    ) : (
                      <FaRegEyeSlash color="black dark:white" />
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
                <label
                  htmlFor="confirmPassword"
                  className="font-semibold mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type={displayConfirmPass ? "text" : "password"}
                    placeholder="Enter Confirm Password"
                    className="w-full border rounded text-base h-[35px] p-3 border-solid border-[#ced4da] focus:border-[#4a90e2] dark:bg-gray-600"
                  />
                  <label
                    onClick={showConfirmPassword}
                    className="absolute cursor-pointer right-1"
                  >
                    {!displayConfirmPass ? (
                      <FaRegEye color="black dark:white" />
                    ) : (
                      <FaRegEyeSlash color="black dark:white" />
                    )}
                  </label>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className=" h-10 bg-[#4a90e2] mx-auto w-200 text-[white] text-base rounded cursor-pointer transition-[background-color] duration-[0.3s] border-[none] hover:bg-[#357abd] mt-5"
              >
                Update Profile
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditProfile;
