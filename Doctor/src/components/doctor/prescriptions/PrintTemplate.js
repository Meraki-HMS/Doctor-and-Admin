"use client";

export default function PrintTemplate({ prescription, isPrintable = false }) {
  if (!prescription) return null;

  return (
    <div id={isPrintable ? "printable-prescription" : ""} className="bg-white p-8">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">MEDICAL PRESCRIPTION</h1>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="text-left">
            <p><strong>Hospital:</strong> City General Hospital</p>
            <p>123 Healthcare Avenue, Medical City</p>
          </div>
          <div className="text-right">
            <p><strong>Date:</strong> {new Date(prescription.date).toLocaleDateString()}</p>
            <p><strong>Prescription ID:</strong> {prescription.prescriptionId}</p>
          </div>
        </div>
      </div>

      {/* Patient Information */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
          PATIENT INFORMATION
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Name:</strong> {prescription.patientName}
          </div>
          <div>
            <strong>Patient ID:</strong> {prescription.patientId}
          </div>
          <div>
            <strong>Email:</strong> {prescription.patientEmail}
          </div>
          <div>
            <strong>Doctor:</strong> {prescription.doctorName || "Dr. Sarah Wilson"}
          </div>
        </div>
      </div>

      {/* Symptoms */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
          SYMPTOMS
        </h2>
        <div className="flex flex-wrap gap-2">
          {prescription.symptoms.map((symptom, index) => (
            <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded text-sm">
              {symptom}
            </span>
          ))}
        </div>
      </div>

      {/* Diagnosis */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
          DIAGNOSIS
        </h2>
        <div className="flex flex-wrap gap-2">
          {prescription.diagnosis.map((diag, index) => (
            <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm">
              {diag}
            </span>
          ))}
        </div>
      </div>

      {/* Medicines */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
          PRESCRIBED MEDICINES
        </h2>
        <div className="space-y-3">
          {prescription.medicines.map((medicine, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{medicine.medicine_name}</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div><strong>Dosage:</strong> {medicine.dosage}</div>
                    <div><strong>Frequency:</strong> {medicine.frequency}</div>
                    <div><strong>Duration:</strong> {medicine.duration}</div>
                    {medicine.instructions && (
                      <div><strong>Instructions:</strong> {medicine.instructions}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Tests */}
      {prescription.tests && prescription.tests.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            RECOMMENDED TESTS
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {prescription.tests.map((test, index) => (
              <li key={index} className="text-gray-700">{test}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Notes & Instructions */}
      {prescription.notes && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            ADDITIONAL NOTES & INSTRUCTIONS
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">{prescription.notes}</p>
        </div>
      )}

      {/* Follow-up */}
      {prescription.followUpDate && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            FOLLOW-UP
          </h2>
          <p className="text-gray-700">
            <strong>Next Appointment:</strong> {new Date(prescription.followUpDate).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 pt-6 border-t-2 border-gray-300">
        <div className="flex justify-between items-end">
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2 mt-8 w-48">
              <p className="font-bold">Dr. Sarah Wilson</p>
              <p className="text-sm text-gray-600">Cardiologist</p>
              <p className="text-sm text-gray-600">License: MED123456</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2 mt-8 w-48">
              <p className="font-bold">Patient Signature</p>
              <p className="text-sm text-gray-600">Date: ________________</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Notice */}
      <div className="text-center text-xs text-gray-500 mt-8">
        <p>This is a computer-generated prescription. No physical signature required.</p>
        <p>Generated on: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}