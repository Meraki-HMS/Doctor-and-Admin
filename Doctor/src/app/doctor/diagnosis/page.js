"use client";

import { useState, useEffect } from "react";
// The incorrect import has been removed.
import DiagnosisHistory from "../../../components/doctor/diagnosis/DiagnosisHistory";
import DiagnosisForm from "../../../components/doctor/diagnosis/DiagnosisForm";


// This is the local data being used, so no import is needed.
const diagnosisHistoryData = [
  {
    id: 1,
    diagnosisId: "D-001",
    patientId: "P001",
    patientName: "John Smith",
    date: "2024-01-15",
    primaryDiagnosis: "Hypertension Stage 2",
    icd10Code: "I10",
    treatmentPlan: "Medication (Lisinopril), Diet modification, Regular exercise.",
    status: "active",
  },
  {
    id: 2,
    diagnosisId: "D-002",
    patientId: "P002",
    patientName: "Maria Garcia",
    date: "2024-01-14",
    primaryDiagnosis: "Asthma with allergic rhinitis",
    icd10Code: "J45.909",
    treatmentPlan: "Inhaler (Salbutamol), Nasal Spray (Fluticasone).",
    status: "stable",
  },
  {
    id: 3,
    diagnosisId: "D-003",
    patientId: "P003",
    patientName: "Robert Johnson",
    date: "2024-01-08",
    primaryDiagnosis: "Type 2 Diabetes Mellitus",
    icd10Code: "E11.9",
    treatmentPlan: "Metformin, Blood sugar monitoring, Diet control.",
    status: "follow-up",
  },
];


export default function DiagnosisPage() {
  const [diagnoses, setDiagnoses] = useState([]);
  const [activeTab, setActiveTab] = useState("history"); // history, new
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setDiagnoses(diagnosisHistoryData);
  }, []);

  const handleNewDiagnosis = (diagnosisData) => {
    const newEntry = {
      id: diagnoses.length + 1,
      diagnosisId: `D-${String(diagnoses.length + 1).padStart(3, '0')}`,
      ...diagnosisData,
      date: new Date().toISOString().split("T")[0],
    };
    setDiagnoses((prev) => [newEntry, ...prev]);
    setActiveTab("history");
    console.log("New diagnosis created:", newEntry);
  };

  const filteredDiagnoses = diagnoses.filter(
    (d) =>
      d.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.icd10Code && d.icd10Code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="flex-1 p-4 lg:p-6 overflow-auto">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
              Diagnosis & Treatment
            </h1>
            <p className="text-gray-600 mt-2">
              Record patient diagnoses and manage treatment plans.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("new")}
            className="mt-4 lg:mt-0 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
          >
            <i className="bi bi-plus-lg"></i>
            New Diagnosis
          </button>
        </div>
      </div>
      
      {/* Tabs Navigation */}
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
              Diagnosis History
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "new"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <i className="bi bi-file-earmark-medical mr-2"></i>
              New Diagnosis
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "history" && (
            <DiagnosisHistory 
                diagnoses={filteredDiagnoses}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />
          )}
          {activeTab === "new" && (
            <DiagnosisForm
              onSubmit={handleNewDiagnosis}
              onCancel={() => setActiveTab("history")}
            />
          )}
        </div>
      </div>
    </main>
  );
}

