"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  clinic: string;
  location: string;
  fee: number;
  discount?: string;
  cashback?: string;
  consultationMode: string[];
  availability?: string;
  languages: string[];
  gender?: string;
  rating?: number;
  facilities?: string[];
  imageUrl?: string;
  onlineFee?: number;
  onlineAvailability?: string;
  inPersonAvailability?: string;
}
interface FilterState {
  experience: string;
  fee: string;
  language: string;
  location: string;
  gender: string;
  mode: string;
}
interface PaginationState {
  page: number;
  total: number;
  totalPages: number;
}
interface DoctorsPageProps {
  searchParams?: { search?: string; page?: string };
}
const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const hasInPerson = doctor.consultationMode?.includes("In-Person");
  const hasOnline = doctor.consultationMode?.includes("Online");
  const isOnlineOnly = hasOnline && !hasInPerson;
  const doctorImage =
    doctor.imageUrl ||
    `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        <div className="flex-shrink-0 relative w-16 h-16">
          <Image
            src={doctorImage}
            alt={doctor.name}
            width={64}
            height={64}
            className="rounded-full object-cover border-2 border-blue-100"
            unoptimized={true}
          />
        </div>
        <div className="flex-1 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {doctor.name}
                </h2>
                <p className="text-gray-600 text-sm">{doctor.specialization}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {doctor.experience} YEARS • {doctor.qualification}
                </p>
              </div>
              {doctor.rating && (
                <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="text-xs ml-1 font-medium">
                    {doctor.rating}
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs mt-2">
              <span className="font-semibold">{doctor.clinic}</span> •
              {doctor.location}
            </p>
            {doctor.languages && doctor.languages.length > 0 && (
              <p className="text-xs mt-1 text-gray-600">
                Speaks: {doctor.languages.join(", ")}
              </p>
            )}
          </div>
          <div
            className={`flex flex-col ${
              isOnlineOnly ? "w-full md:w-1/3" : "min-w-[180px]"
            }`}
          >
            <div className="text-right">
              <p className="text-xl font-bold">₹{doctor.fee}</p>
              {doctor.discount && (
                <p className="text-green-600 text-xs">{doctor.discount}</p>
              )}
              {doctor.cashback && (
                <p className="text-green-600 text-xs">{doctor.cashback}</p>
              )}
            </div>
            <div
              className={`flex ${
                isOnlineOnly ? "flex-col" : "flex-col gap-2"
              } mt-2 w-full`}
            >
              {hasOnline && (
                <div className="border border-blue-100 rounded p-2">
                  <p className="text-xs text-gray-500 text-right">
                    📖 ₹
                    {doctor.onlineFee !== undefined
                      ? doctor.onlineFee
                      : doctor.fee - 100}
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-14 py-3 rounded text-xs w-full transition-colors">
                    Consult Online
                  </button>
                  <p className="text-[10px] text-gray-500 mt-1 text-right">
                    Available {doctor.onlineAvailability || "in 54 minutes"}
                  </p>
                </div>
              )}
              {hasInPerson && (
                <div className="border border-blue-100 rounded p-2">
                  <p className="text-xs text-gray-500 text-right">
                    📖 ₹{doctor.fee}
                  </p>
                  <button className="border border-blue-600 hover:bg-blue-50 text-blue-600 px-3 py-1 rounded text-xs w-full transition-colors">
                    Visit Doctor
                  </button>
                  <p className="text-[10px] text-gray-500 mt-1 text-right">
                    Available {doctor.inPersonAvailability || "at 08:00 AM"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function DoctorsPage({ searchParams }: DoctorsPageProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    experience: "",
    fee: "",
    language: "",
    location: "",
    gender: "",
    mode: "",
  });
  const [pagination, setPagination] = useState<PaginationState>({
    page: parseInt(searchParams?.page as string) || 1,
    total: 0,
    totalPages: 1,
  });

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchParams?.search) {
        queryParams.append("search", searchParams.search as string);
      }
      if (filters.experience) {
        const [minExp, maxExp] = filters.experience.split("-");
        queryParams.append("minExp", minExp);
        if (maxExp) queryParams.append("maxExp", maxExp);
      }
      if (filters.fee) {
        const [minFee, maxFee] = filters.fee.split("-");
        queryParams.append("minFee", minFee);
        if (maxFee) queryParams.append("maxFee", maxFee);
      }
      if (filters.language) queryParams.append("language", filters.language);
      if (filters.location) queryParams.append("location", filters.location);
      if (filters.gender) queryParams.append("gender", filters.gender);
      if (filters.mode) queryParams.append("mode", filters.mode);
      queryParams.append("page", pagination.page.toString());
      const response = await axios.get(`/api/doctor?${queryParams.toString()}`);
      if (response.data && response.data.doctors) {
        setDoctors(response.data.doctors);
        setPagination({
          page: response.data.currentPage,
          total: response.data.total,
          totalPages: response.data.totalPages,
        });
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  }, [searchParams, filters, pagination.page]);
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);
  useEffect(() => {
    const handleRouteChange = () => {
      fetchDoctors();
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [fetchDoctors]);
  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };
  const clearFilters = () => {
    setFilters({
      experience: "",
      fee: "",
      language: "",
      location: "",
      gender: "",
      mode: "",
    });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 pt-28 pb-10">
      <div className="text-sm text-gray-600 mb-2">
        Home &gt; Doctors &gt; General Physicians
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Consult General Physicians Online - Internal Medicine Specialists
          <span className="text-gray-600">({pagination.total} doctors)</span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow h-fit sticky top-32">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-blue-600 text-sm hover:underline"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Experience (Years)</h3>
                <div className="space-y-2">
                  {["0-5", "6-10", "11-15"].map((exp) => (
                    <label key={exp} className="flex items-center">
                      <input
                        type="radio"
                        name="experience"
                        checked={filters.experience === exp}
                        className="mr-2"
                        onChange={() => handleFilterChange("experience", exp)}
                      />
                      {exp}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Fees (₹)</h3>
                <div className="space-y-2">
                  {["100-500", "500-1000", "1000-2000"].map((fee) => (
                    <label key={fee} className="flex items-center">
                      <input
                        type="radio"
                        name="fee"
                        checked={filters.fee === fee}
                        className="mr-2"
                        onChange={() => handleFilterChange("fee", fee)}
                      />
                      {fee}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Language</h3>
                <div className="space-y-2">
                  {["English", "Hindi", "Telugu"].map((lang) => (
                    <label key={lang} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.language === lang}
                        className="mr-2"
                        onChange={() => handleFilterChange("language", lang)}
                      />
                      {lang}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="text-center py-8">Loading doctors...</div>
          ) : doctors.length > 0 ? (
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">
                No doctors found matching your criteria
              </p>
            </div>
          )}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8 items-center gap-2">
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    page: Math.max(1, prev.page - 1),
                  }))
                }
                disabled={pagination.page === 1}
                className={`px-4 py-2 rounded-md ${
                  pagination.page === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                }`}
              >
                &lt; Prev
              </button>
              {Array.from(
                { length: Math.min(5, pagination.totalPages) },
                (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.page <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.page >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.page - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() =>
                        setPagination((prev) => ({ ...prev, page: pageNum }))
                      }
                      className={`mx-1 px-4 py-2 rounded-md ${
                        pagination.page === pageNum
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    page: Math.min(pagination.totalPages, prev.page + 1),
                  }))
                }
                disabled={pagination.page === pagination.totalPages}
                className={`px-4 py-2 rounded-md ${
                  pagination.page === pagination.totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                }`}
              >
                Next &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
