"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }

    router.push(`/doctors?${params.toString()}`);
  };

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3 border-b">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Apollo</span>
              <span className="text-2xl font-bold text-red-600">24|7</span>
            </Link>
            <Link
              href="/doctors"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Find Doctors
            </Link>
          </div>
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search Doctors, Specialties, Conditions etc."
                className="pl-10 pr-4 py-2 border rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
            Login
          </button>
        </div>
        <div className="flex justify-center py-3">
          <div className="flex space-x-6 items-center">
            <Link
              href="/medicines"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Buy Medicines
            </Link>
            <Link
              href="/doctors"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Find Doctors
            </Link>
            <Link
              href="/lab-tests"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Lab Tests
            </Link>
            <Link
              href="/circle"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Circle Membership
            </Link>
            <Link
              href="/health-records"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Health Records
            </Link>
            <Link
              href="/diabetes"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Diabetes Reversal
            </Link>
            <div className="flex items-center">
              <Link
                href="/insurance"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Buy Insurance
              </Link>
              <span className="ml-1 bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-full">
                New
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
