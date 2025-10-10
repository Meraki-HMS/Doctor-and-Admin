"use client";
import { useState } from "react";
import PrescriptionPreview from "./PrescriptionPreview";

export default function PrescriptionHistory({ prescriptions, searchTerm, onSearchChange, onView, onPrint }) {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const handlePreview = (prescription) => {
    setSelectedPrescription(prescription);
    setShowPreview(true);
  };

  const handlePrint = (prescription) => {
    setSelectedPrescription(prescription);
    setShowPreview(true);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search prescriptions by patient name, ID, diagnosis, or symptoms..."
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <i className="bi bi-search absolute left-3 top-3.5 text-gray-400"></i>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <i className="bi bi-file-medical text-purple-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{prescription.patientName}</h3>
                    <p className="text-sm text-gray-500">
                      Email: {prescription.patientEmail} • {prescription.prescriptionId}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      prescription.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {prescription.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(prescription.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500">{prescription.medicines.length} medicines</div>
                {prescription.followUpDate && (
                  <div className="text-sm text-orange-600">
                    Follow-up: {new Date(prescription.followUpDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>

            {/* Symptoms Preview */}
            <div className="mb-2">
              <div className="flex flex-wrap gap-1">
                {prescription.symptoms.slice(0, 2).map((symptom, index) => (
                  <span key={index} className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs">
                    {symptom}
                  </span>
                ))}
                {prescription.symptoms.length > 2 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    +{prescription.symptoms.length - 2} more symptoms
                  </span>
                )}
              </div>
            </div>

            {/* Diagnosis */}
            <div className="mb-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Diagnosis:</span> {prescription.diagnosis.join(", ")}
              </p>
            </div>

            {/* Medicines Preview */}
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {prescription.medicines.slice(0, 3).map((medicine, index) => (
                  <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                    {medicine.medicine_name} {medicine.dosage}
                  </span>
                ))}
                {prescription.medicines.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    +{prescription.medicines.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Notes Preview */}
            {prescription.notes && (
              <div className="mb-3">
                <p className="text-sm text-gray-600 line-clamp-2">
                  <span className="font-medium">Notes:</span> {prescription.notes}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => onView(prescription)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                View Details
              </button>
              <button
                onClick={() => handlePreview(prescription)}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <i className="bi bi-eye"></i>
                Preview
              </button>
            </div>
          </div>
        ))}

        {prescriptions.length === 0 && (
          <div className="text-center py-12">
            <i className="bi bi-file-medical text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-500">No prescriptions found</h3>
            <p className="text-gray-400 mt-1">
              {searchTerm ? "Try adjusting your search" : "Create your first prescription"}
            </p>
          </div>
        )}
      </div>

      {/* Prescription Preview Modal */}
      {showPreview && selectedPrescription && (
        <PrescriptionPreview
          prescription={selectedPrescription}
          onPrint={() => {
            onPrint(selectedPrescription);
            setShowPreview(false);
          }}
          onClose={() => {
            setShowPreview(false);
            setSelectedPrescription(null);
          }}
        />
      )}
    </div>
  );
}