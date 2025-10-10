"use client";

import { useState, useEffect } from "react";
import { referralHistoryData } from "../../../mockData/referralData"; // CORRECTED PATH
import ReferralHistory from "../../../components/doctor/referrals/ReferralHistory";
import ReferralForm from "../../../components/doctor/referrals/ReferralForm";

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState([]);
  const [activeTab, setActiveTab] = useState("history");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setReferrals(referralHistoryData);
  }, []);

  const handleNewReferral = (referralData) => {
    const newReferral = {
      id: referrals.length + 1,
      referralId: `REF-${String(referrals.length + 1).padStart(3, '0')}`,
      ...referralData,
      referralDate: new Date().toISOString().split("T")[0],
      status: 'pending',
    };
    setReferrals((prev) => [newReferral, ...prev]);
    setActiveTab("history");
  };

  const filteredReferrals = referrals.filter(
    (r) =>
      r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.referredTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 p-4 lg:p-6 overflow-auto">
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
              Patient Referrals
            </h1>
            <p className="text-gray-600 mt-2">
              Create and track referrals to specialist doctors.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("new")}
            className="mt-4 lg:mt-0 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
          >
            <i className="bi bi-plus-lg"></i>
            New Referral
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "history"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <i className="bi bi-clock-history mr-2"></i>
              Referral History
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "new"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <i className="bi bi-send-plus mr-2"></i>
              Create New Referral
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "history" && (
            <ReferralHistory
              referrals={filteredReferrals}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          )}
          {activeTab === "new" && (
            <ReferralForm
              onSubmit={handleNewReferral}
              onCancel={() => setActiveTab("history")}
            />
          )}
        </div>
      </div>
    </main>
  );
}
