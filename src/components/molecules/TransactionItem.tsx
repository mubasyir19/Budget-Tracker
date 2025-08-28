import { formatDate } from "@/helpers/formatDate";
import { formatRupiah } from "@/helpers/formatRupiah";
import { TransactionType } from "@/types/transaction";
import { Trash } from "lucide-react";
import React from "react";

interface Props {
  id: string;
  description: string;
  category: string;
  transactionType: TransactionType;
  dateTransaction: string;
  price: number;
}

export default function TransactionItem({
  id,
  description,
  category,
  transactionType,
  dateTransaction,
  price,
}: Props) {
  return (
    <div
      key={id}
      id="transaction-item"
      className={`${transactionType === "income" ? "border-primary" : "border-tersier"} flex flex-col justify-between gap-4 rounded-xl border-l-4 bg-[#f9f9f9] p-3.5 shadow-lg md:flex-row md:items-center`}
    >
      <div className="transaction-info">
        <div
          className={`${transactionType === "income" ? "text-primary" : "text-tersier"} text-lg font-semibold`}
        >
          {description}
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="bg-info/20 text-info rounded-xl px-2 py-0.5 text-xs capitalize">
            {category}
          </span>
          <span className="bg-secondary/20 text-secondary rounded-xl px-2 py-0.5 text-xs">
            {formatDate(dateTransaction)}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <div
          className={`${transactionType === "income" ? "text-primary" : "text-tersier"} text-xl font-bold`}
        >
          {transactionType === "income" ? "+" : "-"}
          {formatRupiah(price)}
        </div>
        <button className="cursor-pointer rounded border-none bg-[#f44336] p-2 text-xs text-white">
          <Trash className="size-4 text-white" />
        </button>
      </div>
    </div>
  );
}
