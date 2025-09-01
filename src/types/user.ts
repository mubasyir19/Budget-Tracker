export interface dataLogin {
  username: string;
  password: string;
}

export interface dataRegister {
  fullname: string;
  email: string;
  username: string;
  password: string;
  role: "USER" | "ADMIN";
}
