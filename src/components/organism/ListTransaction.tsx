"use client";

import TransactionItem from "../molecules/TransactionItem";
import { useTransactions } from "@/hooks/useTransactions";
import { useEffect, useState } from "react";
import DeleteModals from "../molecules/DeleteModals";
import { toast } from "sonner";
import { deleteTransaction } from "@/services/finance";
import { TransactionStats } from "@/types/transaction";

export default function ListTransaction() {
  const { transactions, loading, error, fetchTransaction } = useTransactions();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    period: "",
  });
  const [stats, setStats] = useState<TransactionStats>({
    todayCount: 0,
    monthCount: 0,
    dailyAverage: 0,
  });

  const filteredTransactions =
    transactions.filter((transaction) => {
      const matchesType = !filters.type || transaction.type === filters.type;
      const matchesCategory =
        !filters.category || transaction.category === filters.category;

      const transactionDate = new Date(transaction.transaction_date);
      const now = new Date();

      let matchesPeriod = true;
      if (filters.period === "Hari Ini") {
        matchesPeriod = transactionDate.toDateString() === now.toDateString();
      } else if (filters.period === "Minggu Ini") {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        matchesPeriod = transactionDate >= weekStart;
      } else if (filters.period === "Bulan Ini") {
        matchesPeriod =
          transactionDate.getMonth() === now.getMonth() &&
          transactionDate.getFullYear() === now.getFullYear();
      }

      return matchesType && matchesCategory && matchesPeriod;
    }) || [];

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsModalDeleteOpen(true);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
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
    if (!transactions) return;

    const now = new Date();
    const today = now.toDateString();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Today's transactions
    const todayTransactions = transactions.filter(
      (t) => new Date(t.transaction_date).toDateString() === today,
    );

    // This month's transactions
    const monthTransactions = transactions.filter((t) => {
      const date = new Date(t.transaction_date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    // Daily average for this month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dailyAverage = monthTransactions.length / daysInMonth;

    setStats({
      todayCount: todayTransactions.length,
      monthCount: monthTransactions.length,
      dailyAverage: Math.round(dailyAverage * 100) / 100,
    });
  }, [transactions]);

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="from-info to-secondary flex items-center justify-center rounded-xl bg-linear-to-br py-3">
          <div className="text-center">
            <p className="text-base font-medium text-white">
              Transaksi Hari Ini
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {loading ? "..." : stats.todayCount}
            </p>
          </div>
        </div>
        <div className="from-info to-secondary flex items-center justify-center rounded-xl bg-linear-to-br py-3">
          <div className="text-center">
            <p className="text-base font-medium text-white">
              Transaksi Bulan Ini
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {loading ? "..." : stats.monthCount}
            </p>
          </div>
        </div>
        <div className="from-info to-secondary flex items-center justify-center rounded-xl bg-linear-to-br py-3">
          <div className="text-center">
            <p className="text-base font-medium text-white">Rata-rata Harian</p>
            <p className="mt-2 text-xl font-semibold text-white">
              {loading ? "..." : stats.dailyAverage}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-between gap-3.5 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap lg:flex-nowrap">
          <div className="">
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="mt-1.5 w-full rounded-md border-2 border-gray-300 px-2.5 py-1.5 text-sm duration-100 focus:border-green-500 focus:outline-none md:w-fit"
            >
              <option value="">Semua Jenis</option>
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>
          <div className="">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="mt-1.5 w-full rounded-md border-2 border-gray-300 px-2.5 py-1.5 text-sm duration-100 focus:border-green-500 focus:outline-none md:w-fit"
            >
              <option value="">Semua Kategori</option>
              <option value="gaji">Gaji</option>
              <option value="freelance">Freelance</option>
              <option value="investasi">Investasi</option>
              <option value="hadiah">Hadiah</option>
              <option value="makanan">Makanan</option>
              <option value="transportasi">Transportasi</option>
              <option value="belanja">Belanja</option>
              <option value="tagihan">Tagihan</option>
              <option value="hiburan">Hiburan</option>
              <option value="kesehatan">Kesehatan</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
          <div className="">
            <select
              value={filters.period}
              onChange={(e) => handleFilterChange("period", e.target.value)}
              className="mt-1.5 w-full rounded-md border-2 border-gray-300 px-2.5 py-1.5 text-sm duration-100 focus:border-green-500 focus:outline-none md:w-fit"
            >
              <option value="">Semua Periode</option>
              <option value="Hari Ini">Hari Ini</option>
              <option value="Minggu Ini">Minggu Ini</option>
              <option value="Bulan Ini">Bulan Ini</option>
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
            {filteredTransactions.map((item) => (
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
