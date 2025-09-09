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

export interface UserProfile {
  id: string;
  fullname: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
}
