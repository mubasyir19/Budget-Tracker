"use client";

import TransactionItem from "../molecules/TransactionItem";
import { useTransactions } from "@/hooks/useTransactions";
import { useEffect, useState } from "react";
import DeleteModals from "../molecules/DeleteModals";
import { toast } from "sonner";
import { deleteTransaction } from "@/services/finance";

export default function ListTransaction() {
  const { transactions, loading, error, fetchTransaction } = useTransactions();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsModalDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedId) {
      try {
        await deleteTransaction(selectedId);
        await fetchTransaction();
      } catch (err) {
        toast.error("Gagal hapus data");
        console.error("Gagal menghapus:", err);
      } finally {
        setIsModalDeleteOpen(false);
        setSelectedId(null);
      }
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  return (
    <>
      <div className="mt-4 flex flex-col justify-between gap-3.5 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap lg:flex-nowrap">
          <div className="">
            <select className="mt-1.5 w-full rounded-md border-2 border-gray-300 px-2.5 py-1.5 text-sm duration-100 focus:border-green-500 focus:outline-none md:w-fit">
              <option value="">Semua Jenis</option>
              <option value="">Pemasukan</option>
              <option value="">Pengeluaran</option>
            </select>
          </div>
          <div className="">
            <select className="mt-1.5 w-full rounded-md border-2 border-gray-300 px-2.5 py-1.5 text-sm duration-100 focus:border-green-500 focus:outline-none md:w-fit">
              <option value="">Semua Kategori</option>
              <option value="">Gaji</option>
              <option value="">Freelance</option>
              <option value="">Investasi</option>
              <option value="">Hadiah</option>
              <option value="">Makanan</option>
              <option value="">Transportasi</option>
              <option value="">Belanja</option>
              <option value="">Tagihan</option>
              <option value="">Hiburan</option>
              <option value="">Kesehatan</option>
              <option value="">Lainnya</option>
            </select>
          </div>
          <div className="">
            <select className="mt-1.5 w-full rounded-md border-2 border-gray-300 px-2.5 py-1.5 text-sm duration-100 focus:border-green-500 focus:outline-none md:w-fit">
              <option value="">Hari Ini</option>
              <option value="">Minggu Ini</option>
              <option value="">Bulan Ini</option>
            </select>
          </div>
        </div>
        <div className="">
          <button
            onClick={fetchTransaction}
            className="w-full cursor-pointer rounded-md bg-green-500 px-4 py-1 text-center text-sm font-semibold text-white duration-200 hover:bg-green-500/80 lg:text-base"
          >
            Refresh
          </button>
        </div>
      </div>
      <div
        id="transaction-list"
        className="mt-4 space-y-3 overflow-y-auto lg:h-72"
      >
        {loading ? (
          <p className="text-center text-base font-semibold text-black lg:text-lg">
            Loading...
          </p>
        ) : error ? (
          <p className="text-base font-semibold text-red-500 lg:text-lg">
            {error}
          </p>
        ) : !transactions || transactions.length === 0 ? (
          <div className="my-4 text-center">
            <p className="text-xl md:text-2xl lg:text-4xl">🔍</p>
            <p className="text-base font-semibold text-black lg:text-lg">
              Tidak ada transaksi
            </p>
            <p className="text-xs lg:text-sm">
              Tidak ada transaksi yang sesuai dengan filter yang dipilih
            </p>
          </div>
        ) : (
          <div className="space-y-3 overflow-y-auto lg:h-72">
            {transactions.map((item) => (
              <TransactionItem
                key={item.id}
                id={item.id}
                category={item.category}
                dateTransaction={item.transaction_date}
                description={item.description}
                price={item.amount}
                transactionType={item.type}
                openModalDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>
      <DeleteModals
        isOpen={isModalDeleteOpen}
        title="Yakin hapus?"
        onClose={() => setIsModalDeleteOpen(false)}
      >
        <p className="mx-auto w-3/4">
          Ini akan menghapus data ini secara permanen. Anda tidak dapat
          membatalkan tindakan ini.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={confirmDelete}
            className="rounded-md bg-red-500 px-4 py-2 text-base font-semibold text-white"
          >
            Delete
          </button>
          <button
            onClick={() => setIsModalDeleteOpen(false)}
            className="rounded-md border border-black px-4 py-2 text-base font-semibold text-black"
          >
            Cancel
          </button>
        </div>
      </DeleteModals>
    </>
  );
}
