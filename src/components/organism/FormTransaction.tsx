"use client";

import { Category, TransactionForm } from "@/types/transaction";
import React, { useState } from "react";

export default function FormTransaction() {
  const [formData, setFormData] = useState<TransactionForm>({
    description: "",
    price: 0,
    type: "income",
    category: Category.gaji,
    dateTransaction: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addNewTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("ini data form = ", formData);
      setFormData({
        description: "",
        price: 0,
        type: "income",
        category: Category.gaji,
        dateTransaction: "",
      });
    } catch (error) {
      console.log("an error occured = ", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={addNewTransaction} className="mt-4 flex flex-col gap-3">
      <div className="flex w-full gap-2">
        <button
          type="button"
          onClick={() => setFormData((prev) => ({ ...prev, type: "income" }))}
          className={`w-1/2 cursor-pointer rounded-lg border px-4 py-2 text-xs font-medium transition lg:text-sm ${
            formData.type === "income"
              ? "border-green-500 bg-green-500 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          💰 Pemasukan
        </button>

        <button
          type="button"
          onClick={() => setFormData((prev) => ({ ...prev, type: "expense" }))}
          className={`w-1/2 cursor-pointer rounded-lg border px-4 py-2 text-xs font-medium transition lg:text-sm ${
            formData.type === "expense"
              ? "border-red-500 bg-red-500 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          💸 Pengeluaran
        </button>
      </div>
      <div id="group-input">
        <label htmlFor="" className="text-sm font-medium lg:text-base">
          Deskripsi
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Gaji bulanan, Makan siang, dll"
          className="mt-1.5 w-full rounded-md border-2 border-gray-300 px-2.5 py-1.5 text-sm duration-100 focus:border-green-500 focus:outline-none lg:text-base"
        />
      </div>
      <div id="group-input">
        <label htmlFor="" className="text-sm font-medium lg:text-base">
          Jumlah (Rp) :
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1.5 w-full rounded-md border-2 border-gray-300 px-2.5 py-1.5 text-sm duration-100 focus:border-green-500 focus:outline-none lg:text-base"
        />
      </div>
      <div id="group-input">
        <label htmlFor="" className="text-sm font-medium lg:text-base">
          Kategori :
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1.5 w-full rounded-md border-2 border-gray-300 px-2.5 py-1.5 text-sm duration-100 focus:border-green-500 focus:outline-none lg:text-base"
        >
          <option value="">Pilih Kategori</option>
          <option value="gaji">Gaji</option>
          <option value="freelance">Freelance</option>
          <option value="investasi">Investasi</option>
          <option value="hadiah">Hadiah</option>
          <option value="makanan">Makanan</option>
          <option value="transportasi">Transportasi</option>
          <option value="belanja">Belanja</option>
          <option value="tagihan">Tagihan</option>
          <option value="hiburan">Hiburan</option>
          <option value="kesahatan">Kesehatan</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </div>
      <div id="group-input">
        <label htmlFor="" className="text-sm font-medium lg:text-base">
          Tanggal :
        </label>
        <input
          type="date"
          id="dateTransaction"
          name="dateTransaction"
          value={formData.dateTransaction}
          onChange={handleChange}
          className="mt-1.5 w-full rounded-md border-2 border-gray-300 px-2.5 py-1.5 text-sm duration-100 focus:border-green-500 focus:outline-none lg:text-base"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="">
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-green-500 py-2 text-center text-sm font-semibold text-white duration-200 hover:bg-green-500/80 lg:text-base"
        >
          {loading ? "loading..." : "Tambah Transaksi"}
        </button>
      </div>
    </form>
  );
}
