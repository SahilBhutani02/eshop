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
          <h1 className="text-2xl font-bold mb-5">Forgot Password</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={ForgotPasswordSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {() => (
              <Form className="w-full flex flex-col gap-2.5">
                <div>
                  <label htmlFor="email" className="font-semibold mb-2">Email</label>
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

                <button
                  type="submit"
                  className=" h-10 bg-[#4a90e2] text-[white] text-base rounded cursor-pointer transition-[background-color] duration-[0.3s] border-[none] hover:bg-[#357abd] mt-5"
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
