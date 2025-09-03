export type TransactionType = "income" | "expense";

export enum Category {
  gaji = "gaji",
  freelance = "freelance",
  investasi = "investasi",
  hadiah = "hadiah",
  makanan = "makanan",
  transportasi = "transportasi",
  belanja = "belanja",
  tagihan = "tagihan",
  hiburan = "hiburan",
  kesehatan = "kesehatan",
  lainnya = "lainnya",
}

export interface TransactionForm {
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  transaction_date: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  transaction_date: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionStats {
  todayCount: number;
  monthCount: number;
  dailyAverage: number;
}
