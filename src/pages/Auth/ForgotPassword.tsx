import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ForgotPasswordSchema from "../../schemas/ForgotPasswordSchema";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/login-office.jpg";

interface ForgotPasswordFormValue {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: ForgotPasswordFormValue = {
    email: "",
  };

  const handleSubmit = (values: ForgotPasswordFormValue) => {
    console.log(values);
    navigate(`/resetPassword`, { state: { values } });
  };

  return (
    <div className="flex h-screen dark:bg-gray-800">
      <div className="hidden md:block md:w-1/2">
        <img src={image} alt="Login" className="w-full h-full object-cover" />
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2 p-5 ">
        <div className="bg-[#f8f9fa] w-full max-w-md shadow-[10px_10px_10px_-1px_black] p-10 rounded-lg border border-black dark:bg-gray-700">
          <h1 className="text-2xl font-bold mb-5 text-center">Forgot Password</h1>

          <Formik initialValues={initialValues} validationSchema={ForgotPasswordSchema} onSubmit={handleSubmit}>
            {() => (
              <Form className="w-full flex flex-col gap-4">
                <div>
                  <label htmlFor="email" className="font-semibold mb-2 block">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    className="w-full border rounded text-base h-10 p-2 border-gray-300 focus:border-blue-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
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

export default ForgotPassword;