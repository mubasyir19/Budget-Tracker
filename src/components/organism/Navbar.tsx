import useUser from "@/hooks/useUser";
import { User } from "lucide-react";
import React, { useState } from "react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { user, isLoading, handleLogout } = useUser();

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="flex justify-end">
      {/* <button className="relative">
        <Bell className="size-5 text-white" />
        <div className="bg-tersier absolute top-0 right-0 size-2 rounded-full"></div>
      </button> */}
      <div className="relative">
        <button
          onClick={handleOpenMenu}
          className="flex items-center gap-2 rounded-lg bg-white/30 px-3 py-1.5"
        >
          <User className="size-5 text-white" />
          <p className="text-sm font-semibold text-white">
            {isLoading ? "Profile User" : user?.fullname}
          </p>
        </button>
        {openMenu && (
          <div className="absolute top-full w-full rounded-md bg-white p-1.5">
            <button
              onClick={handleLogout}
              className="w-full rounded-lg bg-red-500 py-1 text-center text-sm text-white"
            >
              logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
