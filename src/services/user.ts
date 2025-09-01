import { dataLogin, dataRegister } from "@/types/user";

export async function login(data: dataLogin) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BUDGET}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Gagal login");
  }

  return res.json();
}

export async function register(data: dataRegister) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BUDGET}/user/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed create account");
  }

  return res.json();
}
