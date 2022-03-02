import { ServerResponse } from "@/types";

const signIn = async (
  email: string,
  password: string
): Promise<ServerResponse> => {
  return (await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
  ).json()) as ServerResponse;
};

export default signIn;
