import * as yup from "yup";

export const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email address is required")
    .email("Enter a valid email address"),
  password: yup.string().required("Password is required"),
});

export const createAccountValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email address is required")
    .email("Enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/[0-9]/, "Password must include a number")
    .matches(/[a-z]/, "Password must include a lowercase letter")
    .matches(/[A-Z]/, "Password must include a uppercase letter")
    .matches(
      /[$&+,:;=?@#|'<>.^*()%!-]/,
      "Password must include a special symbol"
    )
    .min(8, "Password should be at least 8 characters"),
});
