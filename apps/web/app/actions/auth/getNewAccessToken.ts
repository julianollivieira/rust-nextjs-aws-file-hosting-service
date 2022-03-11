import { ServerResponse } from "@/types";

export interface TokenResponseData {
  access_token: string;
}

const getNewAccessToken = async (): Promise<
  ServerResponse<TokenResponseData>
> => {
  return (await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
      method: "GET",
    })
  ).json()) as ServerResponse<TokenResponseData>;
};

export default getNewAccessToken;
