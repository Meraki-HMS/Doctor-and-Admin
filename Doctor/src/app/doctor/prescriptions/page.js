// File: src/app/doctor/prescriptions/page.js

"use client";
import { useEffect, useState, useContext } from "react";
import { DoctorModuleContext } from "../DoctorModuleContext";
import PrescriptionForm from "@/components/doctor/prescriptions/PrescriptionForm";
import PrescriptionHistory from "@/components/doctor/prescriptions/PrescriptionHistory";
import { fetchPrescriptionHistory } from "@/services/prescriptionHistoryApi";

// Removed static prescriptionsData. Will fetch from backend API.

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [activeTab, setActiveTab] = useState("history");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    prescriptionContext,
    setPrescriptionContext,
    appointments,
    setAppointments,
  } = useContext(DoctorModuleContext);

  // On mount, restore prescriptionContext from localStorage if missing
  useEffect(() => {
    if (!prescriptionContext && typeof window !== "undefined") {
      const stored = localStorage.getItem("prescriptionContext");
      if (stored) {
        setPrescriptionContext(JSON.parse(stored));
      }
    }
  }, [prescriptionContext, setPrescriptionContext]);

  // Load prescriptions from localStorage or fallback to mock data
  useEffect(() => {
    // Fetch prescription history from backend API
    async function loadPrescriptions() {
      // You may need to get doctorId and token from context or localStorage
      const doctorId = localStorage.getItem("doctorId");
      const token = localStorage.getItem("token");
      if (!doctorId || !token) return;
      try {
        const response = await fetchPrescriptionHistory(doctorId, token);
        setPrescriptions(response.data);
      } catch (err) {
        console.error("Failed to fetch prescription history", err);
      }
    }
    loadPrescriptions();
  }, []);

  // Save prescriptions to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined" && prescriptions.length > 0) {
      localStorage.setItem("prescriptions", JSON.stringify(prescriptions));
    }
  }, [prescriptions]);

  useEffect(() => {
    // Always show PrescriptionForm if prescriptionContext is set and has patientEmail
    if (prescriptionContext && prescriptionContext.patientEmail) {
      setActiveTab("new");
    }
  }, [prescriptionContext]);

  const handleNewPrescription = (prescriptionData) => {
    // Mark appointment as completed and persist
    if (prescriptionContext && prescriptionContext.id) {
      setAppointments((prev) => {
        const updated = prev.map((app) =>
          app.id === prescriptionContext.id
            ? { ...app, status: "completed" }
            : app
        );
        if (typeof window !== "undefined") {
          localStorage.setItem("appointments", JSON.stringify(updated));
        }
        return updated;
      });
    }
    // Create prescription with patient data from context
    const newPrescription = {
      id: prescriptions.length + 1,
      patientName: prescriptionData.patientName,
      patientEmail: prescriptionData.patientEmail,
      prescriptionId: `RX-2024-${String(prescriptions.length + 1).padStart(
        3,
        "0"
      )}`,
      date: new Date().toISOString().split("T")[0],
      status: "active",
      symptoms: prescriptionData.symptoms,
      diagnosis: prescriptionData.diagnosis,
      medicines: prescriptionData.medicines,
      tests: prescriptionData.tests,
      notes: prescriptionData.notes,
      followUpDate: prescriptionData.followUpDate,
      doctorName: "Dr. Sarah Wilson",
    };
    setPrescriptions((prev) => {
      const updated = [newPrescription, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem("prescriptions", JSON.stringify(updated));
      }
      return updated;
    });
    setActiveTab("history");
    // Clear prescriptionContext after creation and remove from localStorage
    setTimeout(() => {
      if (setPrescriptionContext) setPrescriptionContext(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("prescriptionContext");
      }
    }, 100);
    alert("Prescription created successfully!");
  };

  const handlePrintPrescription = (prescription) => {
    console.log("Printing prescription:", prescription);
    // Actual print functionality would be implemented here
  };

  const filteredPrescriptions = prescriptions.filter(
    (p) =>
      p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.diagnosis.some((d) =>
        d.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Prescriptions
              </h1>
              <p className="text-gray-600 mt-2">
                Manage and create patient prescriptions
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <button
                onClick={() => setActiveTab("new")}
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
              >
                <i className="bi bi-plus-lg"></i>
                New Prescription
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("history")}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === "history"
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="bi bi-clock-history mr-2"></i>
                Prescription History
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === "new"
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="bi bi-plus-circle mr-2"></i>
                New Prescription
              </button>
            </nav>
          </div>
          <div className="p-6">
            {activeTab === "history" && (
              <PrescriptionHistory
                prescriptions={filteredPrescriptions}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onView={setSelectedPrescription}
                onPrint={handlePrintPrescription}
              />
            )}
            {activeTab === "new" &&
              (prescriptionContext && prescriptionContext.patientEmail ? (
                <PrescriptionForm
                  initialPatientData={prescriptionContext}
                  onSubmit={handleNewPrescription}
                  onCancel={() => setActiveTab("history")}
                />
              ) : (
                <div className="text-center py-12 text-red-600 font-semibold">
                  No patient selected. Please start from an appointment.
                </div>
              ))}
          </div>
        </div>
      </main>

      {selectedPrescription && (
        <PrescriptionDetailModal
          prescription={selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
          onPrint={handlePrintPrescription}
        />
      )}
    </>
  );
}

// UPDATED: PrescriptionDetailModal with new fields
function PrescriptionDetailModal({ prescription, onClose, onPrint }) {
  if (!prescription) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Prescription Details
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPrint(prescription)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <i className="bi bi-printer"></i>
                Print
              </button>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Patient Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Patient Name
                </label>
                <p className="text-gray-900">{prescription.patientName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <p className="text-gray-900">{prescription.patientEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Prescription ID
                </label>
                <p className="text-gray-900">{prescription.prescriptionId}</p>
              </div>
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Symptoms
            </h3>
            <div className="flex flex-wrap gap-2">
              {prescription.symptoms.map((symptom, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>

          {/* Diagnosis */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Diagnosis
            </h3>
            <div className="flex flex-wrap gap-2">
              {prescription.diagnosis.map((diag, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                >
                  {diag}
                </span>
              ))}
            </div>
          </div>

          {/* Medicines */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Medicines
            </h3>
            <div className="space-y-3">
              {prescription.medicines.map((medicine, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {medicine.medicine_name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {medicine.dosage} • {medicine.frequency} •{" "}
                        {medicine.duration}
                      </p>
                      {medicine.instructions && (
                        <p className="text-sm text-blue-600 mt-1">
                          Instructions: {medicine.instructions}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tests */}
          {prescription.tests && prescription.tests.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Recommended Tests
              </h3>
              <div className="flex flex-wrap gap-2">
                {prescription.tests.map((test, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                  >
                    {test}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {prescription.notes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Notes & Instructions
              </h3>
              <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">
                {prescription.notes}
              </p>
            </div>
          )}

          {/* Follow-up */}
          {prescription.followUpDate && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Follow-up
              </h3>
              <p className="text-gray-700">
                Scheduled for:{" "}
                {new Date(prescription.followUpDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
