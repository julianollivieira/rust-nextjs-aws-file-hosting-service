interface ServerResponse<T> {
  type: "error" | "success";
  data: T;
}

interface User {
  email: string;
  id: String;
}

export type { ServerResponse, User };
