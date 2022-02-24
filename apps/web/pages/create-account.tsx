import type { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import { Text, Paper, TextInput, Box, Button } from "@mantine/core";
import { useFormik } from "formik";
import Link from "@/components/Link";
import { signInValidationSchema } from "@/validations";
import PasswordInputWithRequirements from "@/components/PasswordInputWithRequirements";

const CreateAccountPage: NextPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
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
        Create an account
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
              label="E-mailadres"
              placeholder="Jouw e-mailadres"
              autoComplete="email"
              error={formik.touched.email && formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange}
              sx={{ marginBottom: 15 }}
            />
            <PasswordInputWithRequirements
              name="password"
              label="Wachtwoord"
              placeholder="Jouw wachtwoord"
              autoComplete="new-password"
              description="Password must include at least one letter, number and special character"
              error={formik.touched.password && formik.errors.password}
              value={formik.values.password}
              onChange={formik.handleChange}
              sx={{ marginBottom: 30 }}
              toggleTabIndex={0}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="submit" color="blue">
                Create account
              </Button>
              <Link
                href="/sign-in"
                buttonProps={{ variant: "white", color: "blue" }}
              >
                I already have an account
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Layout>
  );
};

export default CreateAccountPage;
