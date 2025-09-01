"use client";

import { login } from "@/services/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(formData);

      console.log("form login = ", formData);
      console.log("isi response = ", response);

      toast.success("Berhasil Login");

      setFormData({
        username: "",
        password: "",
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setError((error as Error).message);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-fit w-full rounded-2xl bg-white/30 p-6 backdrop-blur-md md:w-1/2">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">💰 Budget Tracker</h1>
        <p className="mt-2 text-sm font-medium text-slate-300">
          Kelola keuangan Anda dengan mudah dan efektif
        </p>
      </div>
      <form onSubmit={handleSubmitLogin} className="my-8 space-y-4">
        <div id="group-input">
          <label htmlFor="" className="text-sm font-medium text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="jhon_doe"
            className="mt-1.5 w-full border-b border-gray-300 py-1.5 text-white duration-100 placeholder:text-gray-300 focus:border-white focus:outline-none"
          />
        </div>
        <div id="group-input">
          <label htmlFor="" className="text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Type your password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1.5 w-full border-b border-gray-300 py-1.5 text-white duration-100 placeholder:text-gray-300 focus:border-white focus:outline-none"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="">
          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-green-500 py-2 text-center text-sm font-semibold text-white duration-200 hover:bg-green-600"
          >
            {loading ? "Loading ..." : "Login"}
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-white">
        Belum punya akun?{" "}
        <Link href={`/register`} className="underline underline-offset-4">
          Daftar
        </Link>
      </p>
    </div>
  );
}
