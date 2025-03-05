import * as Yup from "yup";

const SignupSchema = Yup.object({
  fullName: Yup.string().required("Name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
      "Password must contain at least 1 uppercase letter, 1 number, and 1 special character"
    )
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched!")
    .required("Confirm Password is required"),
});

export default SignupSchema;
