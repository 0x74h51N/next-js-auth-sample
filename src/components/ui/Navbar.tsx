"use client";

import { useState, useRef } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import { logout } from "src/app/actions/auth";
import WeatherWidget from "./WeatherWidget";
import { useOutsideClick } from "src/hooks/useOutsideClick";

export default function Navbar({
  username,
  isAdmin,
}: {
  username: string;
  isAdmin: boolean;
}) {
  const [isDropdownOpen, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
  };

  useOutsideClick(dropdownRef, () => setDropdown(false));

  return (
    <nav className="cool-bg text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          {isAdmin ? "Admin" : "Customer"}
          {"  Dashboard"}
        </div>
        <div className="flex items-center space-x-4">
          <WeatherWidget />
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdown(!isDropdownOpen)}
              className="flex items-center space-x-2 hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-all ease-in-out duration-300"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <User className="h-6 w-6" />
              <span>{username}</span>
              <ChevronDown
                className={`transform transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute right-0 py-1 w-full bg-gray-500 hover:bg-red-800 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
                isDropdownOpen
                  ? "opacity-100 translate-y-0 max-h-40"
                  : "opacity-0 -translate-y-2 max-h-0"
              }`}
            >
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-sm text-left text-gray-200"
              >
                <LogOut className="h-4 w-4 inline-block mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
