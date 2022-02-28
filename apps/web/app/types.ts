interface ServerResponse {
  type: "error" | "success";
  message: any;
}

export type { ServerResponse };
