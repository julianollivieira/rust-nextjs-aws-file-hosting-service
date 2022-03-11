import type { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import {
  Text,
  Paper,
  TextInput,
  Box,
  Button,
  PasswordInput,
} from "@mantine/core";
import { useFormik } from "formik";
import Link from "@/components/Link";
import { signInValidationSchema } from "@/validations";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useData } from "@/hooks/useData";

const SignInPage: NextPage = () => {
  const router = useRouter();
  const notifications = useNotifications();
  const { signIn } = useData();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: async (values) => {
      const response = await signIn(values.email, values.password);
      if (response.type === "success") {
        notifications.showNotification({
          color: "green",
          title: "Signed in succesfully!",
          message: "Redirecting you...",
        });
        router.push("/home");
      } else {
        notifications.showNotification({
          color: "red",
          title: "Oops!",
          message: response.data,
        });
      }
    },
  });

  return (
    <Layout>
      <Text
        align="center"
        sx={{
          color: "#FFF",
          fontSize: 80,
          paddingTop: 20,
          paddingBottom: 20,
          fontWeight: 700,
        }}
      >
        Sign in
      </Text>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 75,
        }}
      >
        <Paper padding="lg" shadow="xs" sx={{ width: "400px" }}>
          <form onSubmit={formik.handleSubmit}>
            <TextInput
              name="email"
              label="Email address"
              placeholder="Your email address"
              autoComplete="email"
              error={formik.touched.email && formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange}
              sx={{ marginBottom: 15 }}
            />
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Your password"
              autoComplete="current-password"
              error={formik.touched.password && formik.errors.password}
              value={formik.values.password}
              onChange={formik.handleChange}
              sx={{ marginBottom: 30 }}
              visibilityToggleIcon={({ reveal }) =>
                reveal ? (
                  <EyeOffIcon style={{ width: 15 }} />
                ) : (
                  <EyeIcon style={{ width: 15 }} />
                )
              }
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="submit" color="blue">
                Sign in
              </Button>
              <Link
                href="/create-account"
                buttonProps={{ variant: "white", color: "blue" }}
              >
                I don&apos;t have an account yet
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Layout>
  );
};

export default SignInPage;
