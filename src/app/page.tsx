"use client";

import FormTransaction from "@/components/organism/FormTransaction";
import ListTransaction from "@/components/organism/ListTransaction";
import Navbar from "@/components/organism/Navbar";
import { formatRupiah } from "@/helpers/formatRupiah";
import { useSummary } from "@/hooks/useSummary";

export default function Home() {
  const { summary } = useSummary();

  return (
    <>
      <div className="rounded-lg">
        <section className="rounded-t-lg bg-green-500 p-6">
          <Navbar />
          <div className="mt-4 text-center">
            <h1 className="text-3xl font-bold text-white">💰 Budget Tracker</h1>
            <p className="mt-2 text-sm font-medium text-white">
              Kelola keuangan Anda dengan mudah dan efektif
            </p>
          </div>
          <div className="mt-5 rounded-xl bg-white/30 py-6">
            <h1 className="text-center text-2xl font-semibold text-white">
              Saldo: {formatRupiah(summary?.balance || 0)}
            </h1>
            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-around">
              <div className="text-center">
                <p className="text-base font-medium text-white">
                  Total Pemasukan:
                </p>
                <p className="text-primary text-base font-bold">
                  {formatRupiah(summary?.totalIncome || 0)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-base font-medium text-white">
                  Total Pengeluaran:
                </p>
                <p className="text-tersier text-base font-bold">
                  {formatRupiah(summary?.totalExpense || 0)}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-background rounded-b-lg p-6">
          <div className="flex flex-col items-stretch gap-4 md:flex-row">
            <div className="w-full rounded-xl bg-white p-4 shadow-xl md:w-1/3">
              <h2 className="text-xl font-semibold text-black">
                📝 Tambah Transaksi
              </h2>
              <hr className="border-primary my-2 border-2" />
              <FormTransaction />
            </div>
            <div className="flex-1 rounded-xl bg-white p-4 shadow-xl">
              <h2 className="text-xl font-semibold text-black">
                📊 Riwayat Transaksi
              </h2>
              <hr className="border-primary my-2 border-2" />
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="from-info to-secondary flex items-center justify-center rounded-xl bg-linear-to-br py-3">
                  <div className="text-center">
                    <p className="text-base font-medium text-white">
                      Transaksi Hari Ini
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">0</p>
                  </div>
                </div>
                <div className="from-info to-secondary flex items-center justify-center rounded-xl bg-linear-to-br py-3">
                  <div className="text-center">
                    <p className="text-base font-medium text-white">
                      Transaksi Bulan Ini
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">0</p>
                  </div>
                </div>
                <div className="from-info to-secondary flex items-center justify-center rounded-xl bg-linear-to-br py-3">
                  <div className="text-center">
                    <p className="text-base font-medium text-white">
                      Rata-rata Harian
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">0</p>
                  </div>
                </div>
              </div>
              {/* <div className="mt-4 flex flex-col gap-2 md:flex-row md:flex-wrap lg:flex-nowrap">
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
                </div> */}
              <ListTransaction />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
