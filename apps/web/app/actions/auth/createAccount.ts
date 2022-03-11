import { ServerResponse } from "@/types";

export interface CreateAccountResponseData {
  message: string;
}

const createAccount = async (
  email: string,
  password: string
): Promise<ServerResponse<CreateAccountResponseData>> => {
  return (await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
  ).json()) as ServerResponse<CreateAccountResponseData>;
};

export default createAccount;
