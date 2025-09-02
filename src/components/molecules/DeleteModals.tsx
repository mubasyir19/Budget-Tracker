import { X } from "lucide-react";
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function DeleteModals({
  isOpen,
  title,
  children,
  onClose,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50`}
    >
      <div
        className="relative w-1/2 rounded-lg bg-white p-6 text-center md:w-fit"
        data-aos="fade-up"
      >
        <button onClick={onClose} className="absolute top-3 right-3">
          <X className="size-6 text-red-500" />
        </button>
        <h3 className="mt-4 text-3xl font-bold text-black">{title}</h3>
        <div className="my-4 text-center">{children}</div>
        {/* <button
          onClick={onClose}
          className="rounded-md bg-red-500 px-4 py-2 text-base font-semibold text-white"
        >
          Close
        </button> */}
      </div>
    </div>
  );
}
