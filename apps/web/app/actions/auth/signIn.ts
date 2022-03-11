import { ServerResponse, User } from "@/types";

export interface SignInResponseData {
  user: User;
  access_token: string;
}

const signIn = async (
  email: string,
  password: string
): Promise<ServerResponse<SignInResponseData>> => {
  return (await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
  ).json()) as ServerResponse<SignInResponseData>;
};

export default signIn;
