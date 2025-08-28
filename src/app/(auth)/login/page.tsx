import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="h-fit w-full rounded-2xl bg-white/30 p-6 backdrop-blur-md md:w-1/4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">💰 Budget Tracker</h1>
        <p className="mt-2 text-sm font-medium text-slate-300">
          Kelola keuangan Anda dengan mudah dan efektif
        </p>
      </div>
      <form className="my-8 space-y-4">
        <div id="group-input">
          <label htmlFor="" className="text-sm font-medium text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
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
            className="mt-1.5 w-full border-b border-gray-300 py-1.5 text-white duration-100 placeholder:text-gray-300 focus:border-white focus:outline-none"
          />
        </div>
        <div className="">
          <button className="w-full cursor-pointer rounded-md bg-green-500 py-2 text-center text-sm font-semibold text-white duration-200 hover:bg-green-600">
            Login
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
