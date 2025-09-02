import { TransactionForm } from "@/types/transaction";

export const getAllTransaction = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BUDGET}/finance/all`,
      {
        credentials: "include",
      },
    );

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error((error as Error).message || "Network error");
  }
};

export const addNewTransaction = async (input: TransactionForm) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BUDGET}/finance/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(input),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add data");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Network error");
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BUDGET}/finance/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to delete");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error((error as Error).message || "Network error");
  }
};
