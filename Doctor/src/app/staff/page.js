"use client";
import { useState } from "react";
import mockData from "./mockdata";

export default function StaffDirectory() {
  const [activeRole, setActiveRole] = useState("doctor");
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const roleBasedStaff = mockData.filter((staff) => staff.role === activeRole);

  const filteredList = roleBasedStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(search.toLowerCase()) &&
      (departmentFilter ? staff.department === departmentFilter : true)
  );

  const uniqueDepartments = [
    ...new Set(roleBasedStaff.map((s) => s.department)),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
            Staff Directory
          </h1>
          <p className="text-gray-600 mb-6">
            Find and connect with our healthcare professionals
          </p>

          {/* Navbar Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1.5 rounded-xl w-full">
            {["doctor", "nurse", "ambulance"].map((role) => (
              <button
                key={role}
                onClick={() => {
                  setActiveRole(role);
                  setSearch("");
                  setDepartmentFilter("");
                }}
                className={`flex-1 py-3 px-4 text-sm font-medium capitalize transition-all duration-300 rounded-lg ${
                  activeRole === role
                    ? "bg-[#2563eb] text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                {role === "doctor"
                  ? "Doctors"
                  : role === "nurse"
                  ? "Nurses"
                  : "Ambulance"}
              </button>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
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
              </div>
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-gray-700"
              />
            </div>
            <div className="md:w-64">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-gray-700"
              >
                <option value="">All Departments</option>
                {uniqueDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Staff Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredList.map((staff) => (
            <div
              key={staff.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-[#2563eb] hover:translate-y-[-4px] group"
              onClick={() => {
                setSelectedStaff(staff);
                setSelectedDate("");
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center overflow-hidden group-hover:from-blue-200 group-hover:to-cyan-200 transition-colors">
                    <img
                      src={staff.photo}
                      alt={staff.name}
                      className="w-18 h-18 rounded-full object-cover"
                    />
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white ${
                      staff.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {staff.name}
                </h2>
                <p className="text-sm text-gray-600 font-medium mb-1">
                  {staff.department}
                </p>
                <p className="text-xs text-gray-500 mb-2">{staff.contact}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    staff.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {staff.available ? "Available" : "Not Available"}
                </span>
                <div className="mt-4 text-xs text-[#2563eb] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Profile →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedStaff && (
          <div
            className="fixed inset-0 bg-blue-100 bg-opacity-80 flex justify-center items-center z-50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedStaff(null)}
          >
            <div
              className="bg-white p-6 rounded-2xl w-full max-w-md relative shadow-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedStaff(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-gray-100 rounded-full p-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center overflow-hidden mb-6">
                  <img
                    src={selectedStaff.photo}
                    alt={selectedStaff.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedStaff.name}
                </h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full capitalize">
                    {selectedStaff.role}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedStaff.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedStaff.available ? "Available" : "Not Available"}
                  </span>
                </div>

                {/* Details */}
                <div className="w-full bg-gray-50 rounded-xl p-5 mt-4 text-left">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Department
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedStaff.department}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Contact
                      </p>
                      <p className="text-sm text-gray-900">
                        {selectedStaff.contact}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Email
                      </p>
                      <p className="text-sm text-gray-900 break-words">
                        {selectedStaff.email || "N/A"}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Experience
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedStaff.experience || "N/A"} years
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Shift
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedStaff.shift || "N/A"}
                        </p>
                      </div>
                    </div>
                    {selectedStaff.qualifications && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          Qualifications
                        </p>
                        <p className="text-sm text-gray-900">
                          {selectedStaff.qualifications}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Appointment Selector for Doctors */}
                {selectedStaff.role === "doctor" && (
                  <div className="w-full mt-6 text-left">
                    <h3 className="text-md font-semibold text-gray-800 mb-3 border-b pb-2">
                      Appointment Schedule
                    </h3>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Date to View Appointments
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <input
                          type="date"
                          className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {selectedDate && (
                      <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 className="text-md font-semibold text-blue-800 mb-3 flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Appointments on {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </h4>
                        
                        {selectedStaff.appointments &&
                        selectedStaff.appointments[selectedDate] ? (
                          <ul className="space-y-3">
                            {selectedStaff.appointments[selectedDate].map(
                              (appt, idx) => (
                                <li
                                  key={idx}
                                  className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
                                >
                                  <div>
                                    <p className="font-medium text-gray-900">{appt.patient}</p>
                                    <p className="text-xs text-gray-500">{appt.reason}</p>
                                  </div>
                                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                    {appt.time}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <div className="text-center py-4 bg-white rounded-lg border border-gray-200">
                            <svg
                              className="w-8 h-8 mx-auto text-gray-300 mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                            <p className="text-sm text-gray-500">
                              No appointments scheduled for this date
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
