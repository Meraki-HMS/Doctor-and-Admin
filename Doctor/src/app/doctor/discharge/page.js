"use client";

import { useState, useEffect } from "react";
import { dischargeSummaryData } from "../../../mockData/dischargeData"; // CORRECTED PATH
import SummaryHistory from "../../../components/doctor/discharge/SummaryHistory";
import SummaryForm from "../../../components/doctor/discharge/SummaryForm";
import SummaryPreview from "../../../components/doctor/discharge/SummaryPreview";

export default function DischargePage() {
  const [summaries, setSummaries] = useState([]);
  const [activeTab, setActiveTab] = useState("history");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSummary, setSelectedSummary] = useState(null);

  useEffect(() => {
    setSummaries(dischargeSummaryData);
  }, []);
  
  const handleNewSummary = (summaryData) => {
    const newSummary = {
        id: summaries.length + 1,
        summaryId: `DS-${String(summaries.length + 1).padStart(3, '0')}`,
        ...summaryData,
        dischargeDate: new Date().toISOString().split('T')[0],
        status: 'completed'
    };
    setSummaries(prev => [newSummary, ...prev]);
    setActiveTab('history');
  };
  
  const filteredSummaries = summaries.filter(s => 
    s.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.summaryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.dischargeDiagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Discharge Summaries</h1>
              <p className="text-gray-600 mt-2">Create and manage patient discharge summaries.</p>
            </div>
            <button onClick={() => setActiveTab("new")} className="mt-4 lg:mt-0 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
              <i className="bi bi-plus-lg"></i> New Summary
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button onClick={() => setActiveTab("history")} className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === "history" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                <i className="bi bi-clock-history mr-2"></i> Summary History
              </button>
              <button onClick={() => setActiveTab("new")} className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${activeTab === "new" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                <i className="bi bi-file-earmark-plus mr-2"></i> Create New Summary
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "history" && (
              <SummaryHistory summaries={filteredSummaries} searchTerm={searchTerm} onSearchChange={setSearchTerm} onViewDetails={setSelectedSummary} />
            )}
            {activeTab === "new" && (
              <SummaryForm onSubmit={handleNewSummary} onCancel={() => setActiveTab("history")} />
            )}
          </div>
        </div>
      </main>
      
      {selectedSummary && (
        <SummaryPreview summary={selectedSummary} onClose={() => setSelectedSummary(null)} />
      )}
    </>
  );
}

