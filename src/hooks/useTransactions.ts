import {
  addNewTransaction,
  deleteTransaction,
  getAllTransaction,
} from "@/services/finance";
import { Transaction, TransactionForm } from "@/types/transaction";
import { useCallback, useState } from "react";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransaction = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllTransaction();
      setTransactions(data.data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransaction = async (payload: TransactionForm) => {
    try {
      const newTransaction = await addNewTransaction(payload);

      setTransactions((prev) => [newTransaction, ...prev]);
      return newTransaction;
    } catch (error) {
      // console.log("an error occured = ", error);
      setError((error as Error).message);
      throw error;
    }
  };

  const removeTransaction = async (id: string) => {
    try {
      await deleteTransaction(id);
      console.log("Deleted category with id =", id);
      // await fetchCategories();
      setTransactions((prev) => prev.filter((trx) => trx.id !== id));
      console.log("After fetch, categories =", transactions);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return {
    transactions,
    loading,
    error,
    fetchTransaction,
    addTransaction,
    removeTransaction,
  };
}
