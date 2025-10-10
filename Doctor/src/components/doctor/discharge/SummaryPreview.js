"use client";

import { useRef } from "react";

export default function SummaryPreview({ summary, onClose }) {
  const printRef = useRef();

  const handlePrint = () => {
    // This is a simple browser print. PDF generation can be added later.
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = `<style>@media print { body { -webkit-print-color-adjust: exact; } .no-print { display: none !important; } }</style>${printContent}`;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // To restore event listeners
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header with Actions */}
        <div className="p-6 border-b border-gray-200 no-print">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Discharge Summary Preview</h2>
                <div className="flex items-center gap-2">
                    <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"><i className="bi bi-printer"></i>Print</button>
                    <button onClick={onClose} className="text-gray-500 p-2 rounded-lg hover:bg-gray-100"><i className="bi bi-x-lg text-xl"></i></button>
                </div>
            </div>
        </div>

        {/* Printable Content */}
        <div className="overflow-y-auto p-6" ref={printRef}>
            {/* Hospital Header */}
            <div className="text-center mb-8 border-b-2 border-gray-300 pb-4">
                <h1 className="text-3xl font-bold text-gray-800">MERAKI HOSPITAL</h1>
                <p className="text-gray-600">Discharge Summary</p>
            </div>

            {/* Patient & Visit Info */}
            <div className="grid grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                    <h3 className="font-semibold text-gray-800 mb-2">PATIENT</h3>
                    <p><strong>Name:</strong> {summary.patientName}</p>
                    <p><strong>Patient ID:</strong> {summary.patientId}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-2">VISIT</h3>
                    <p><strong>Admission:</strong> {new Date(summary.admissionDate).toLocaleDateString()}</p>
                    <p><strong>Discharge:</strong> {new Date(summary.dischargeDate).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Diagnosis */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2 border-b pb-1">DIAGNOSIS</h3>
                <p><strong>Admitting:</strong> {summary.admittingDiagnosis}</p>
                <p><strong>Discharge:</strong> {summary.dischargeDiagnosis}</p>
            </div>

            {/* Hospital Course */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2 border-b pb-1">SUMMARY OF HOSPITAL COURSE</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{summary.hospitalCourse}</p>
            </div>
            
            {/* Procedures */}
            {summary.proceduresPerformed && (
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2 border-b pb-1">PROCEDURES PERFORMED</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{summary.proceduresPerformed}</p>
                </div>
            )}
            
            {/* Medications */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 border-b pb-1">MEDICATIONS ON DISCHARGE</h3>
                <table className="w-full text-sm">
                    <thead><tr className="bg-gray-100"><th className="px-4 py-2 text-left">Medication</th><th className="px-4 py-2 text-left">Dosage</th><th className="px-4 py-2 text-left">Frequency</th></tr></thead>
                    <tbody>
                        {summary.medicationsOnDischarge.map((med, index) => (
                            <tr key={index} className="border-b"><td className="px-4 py-2">{med.name}</td><td className="px-4 py-2">{med.dosage}</td><td className="px-4 py-2">{med.frequency}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Follow-up */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2 border-b pb-1">FOLLOW-UP PLAN</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{summary.followUp}</p>
            </div>
            
            {/* Signature */}
            <div className="mt-12 pt-6 border-t-2 border-gray-300">
                <div className="mb-4 pt-2 w-64"><p className="text-center text-sm text-gray-600 border-t border-gray-400">Doctor's Signature</p></div>
                <p className="font-semibold text-gray-800">Dr. Sarah Wilson</p>
                <p className="text-sm text-gray-600">Cardiologist</p>
            </div>
        </div>
      </div>
    </div>
  );
}