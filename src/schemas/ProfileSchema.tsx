import * as Yup from "yup";

const ProfileSchema = (userData: any) =>
  Yup.object({
    fullName: Yup.string().required("Name is required"),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      )
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("Phone Number is required"),
    oldPassword: Yup.string()
      .required("Old Password is required")
      .test("match-old-password", "Old password is incorrect!", function (value) {
        return value === userData?.password; 
      }),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
        "Password must contain at least 1 uppercase letter, 1 number, and 1 special character"
      )
      .min(6, "Password must be at least 6 characters")
      .notOneOf([userData?.password], "New password cannot be the same as the old password!")
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched!")
      .required("Confirm Password is required"),
  });

export default ProfileSchema;
