import { ServerResponse, SignInResponseData, User } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import signInAction from "@/actions/auth/signIn";
import getNewAccessTokenAction, {
  TokenResponseData,
} from "@/actions/auth/getNewAccessToken";

interface Context {
  user: User | null;
  accessToken: String | null;
  signIn: (
    email: string,
    password: string
  ) => Promise<ServerResponse<SignInResponseData>>;
}

const DataContext = createContext<Context>({} as Context);

const useData = () => useContext(DataContext);

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Context["user"]>(null);
  const [accessToken, setAccessToken] = useState<Context["accessToken"]>(null);

  useEffect(() => {
    getNewAccessToken();
  }, []);

  useEffect(() => {
    console.log("👤 User changed!", user);
  }, [user]);

  useEffect(() => {
    console.log("🔑 Access token changed!", accessToken);
  }, [accessToken]);

  const signIn = async (
    email: string,
    password: string
  ): Promise<ServerResponse<SignInResponseData>> => {
    let response = await signInAction(email, password);
    if (response.type === "success") {
      setUser(response.data.user);
      setAccessToken(response.data.access_token);
    }
    return response;
  };

  const getNewAccessToken = async (): Promise<
    ServerResponse<TokenResponseData>
  > => {
    let response = await getNewAccessTokenAction();
    if (response.type === "success") {
      setAccessToken(response.data.access_token);
    }
    return response;
  };

  return (
    <DataContext.Provider value={{ user, accessToken, signIn } as Context}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, useData };
