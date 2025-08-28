export enum TransactionType {
  income = "income",
  expsene = "expsene",
}
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
  price: number;
  type: TransactionType;
  category: Category;
  dateTransaction: string;
}
