import { User } from "lucide-react";
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-end">
      {/* <button className="relative">
        <Bell className="size-5 text-white" />
        <div className="bg-tersier absolute top-0 right-0 size-2 rounded-full"></div>
      </button> */}
      <div className="flex items-center gap-2 rounded-lg bg-white/30 px-3 py-1">
        <User className="size-5 text-white" />
        <p className="text-sm font-semibold text-white">Mahdy Mubasyir</p>
      </div>
    </nav>
  );
}
