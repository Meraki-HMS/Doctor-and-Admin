"use client";
import { useState, useEffect } from "react";

const initialFormData = {
  patientEmail: "",
  patientName: "",
  symptoms: [""],
  diagnosis: [""],
  medicines: [],
  tests: [],
  notes: ""
};

const commonTests = [
  "Complete Blood Count (CBC)",
  "Lipid Profile", 
  "Liver Function Test",
  "Kidney Function Test",
  "Thyroid Profile",
  "Blood Glucose Test",
  "Urine Analysis",
  "ECG",
  "X-Ray Chest",
  "Ultrasound Abdomen",
  "CT Scan",
  "MRI",
  "Blood Pressure Monitoring",
  "Cholesterol Test"
];

export default function PrescriptionForm({ initialPatientData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialFormData);
  const [currentMedicine, setCurrentMedicine] = useState({
    medicine_name: "",
    dosage: "",
    frequency: "Once daily",
    duration: "",
    instructions: ""
  });
  const [customTest, setCustomTest] = useState("");
  const [errors, setErrors] = useState({});

  // Pre-fill form with initial patient data
  useEffect(() => {
    if (initialPatientData) {
      setFormData(prev => ({
        ...prev,
        patientEmail: initialPatientData.patientEmail || "",
        patientName: initialPatientData.patientName || ""
      }));
    }
  }, [initialPatientData]);

  const frequencyOptions = [
    "Once daily",
    "Twice daily", 
    "Three times daily",
    "Four times daily",
    "Every 6 hours",
    "Every 8 hours",
    "Every 12 hours",
    "As needed",
    "Before meals",
    "After meals",
    "At bedtime",
    "Weekly",
    "Monthly"
  ];

  const durationOptions = [
    "1 day", "2 days", "3 days", "5 days", "7 days", "10 days", 
    "14 days", "21 days", "30 days", "60 days", "90 days", 
    "As directed", "Until finished"
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientEmail.trim()) newErrors.patientEmail = "Patient email is required";
    if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required";
    
    // Validate symptoms - at least one symptom should have content
    const hasSymptoms = formData.symptoms.some(symptom => symptom.trim() !== "");
    if (!hasSymptoms) newErrors.symptoms = "At least one symptom is required";
    
    // Validate diagnosis - at least one diagnosis should have content
    const hasDiagnosis = formData.diagnosis.some(d => d.trim() !== "");
    if (!hasDiagnosis) newErrors.diagnosis = "At least one diagnosis is required";
    
    if (formData.medicines.length === 0) newErrors.medicines = "At least one medicine is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Symptom Management
  const handleSymptomChange = (index, value) => {
    const updatedSymptoms = [...formData.symptoms];
    updatedSymptoms[index] = value;
    setFormData(prev => ({ ...prev, symptoms: updatedSymptoms }));
  };

  const addSymptom = () => {
    setFormData(prev => ({ ...prev, symptoms: [...prev.symptoms, ""] }));
  };

  const removeSymptom = (index) => {
    if (formData.symptoms.length > 1) {
      const updatedSymptoms = formData.symptoms.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, symptoms: updatedSymptoms }));
    }
  };

  // Diagnosis Management
  const handleDiagnosisChange = (index, value) => {
    const updatedDiagnosis = [...formData.diagnosis];
    updatedDiagnosis[index] = value;
    setFormData(prev => ({ ...prev, diagnosis: updatedDiagnosis }));
  };

  const addDiagnosis = () => {
    setFormData(prev => ({ ...prev, diagnosis: [...prev.diagnosis, ""] }));
  };

  const removeDiagnosis = (index) => {
    if (formData.diagnosis.length > 1) {
      const updatedDiagnosis = formData.diagnosis.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, diagnosis: updatedDiagnosis }));
    }
  };

  // Medicine Management
  const handleAddMedicine = () => {
    if (!currentMedicine.medicine_name || !currentMedicine.dosage || !currentMedicine.duration) {
      alert("Please fill medicine name, dosage, and duration");
      return;
    }
    setFormData(prev => ({
      ...prev,
      medicines: [...prev.medicines, { ...currentMedicine }]
    }));
    setCurrentMedicine({ 
      medicine_name: "", 
      dosage: "", 
      frequency: "Once daily", 
      duration: "", 
      instructions: "" 
    });
  };

  const handleRemoveMedicine = (index) => {
    setFormData(prev => ({ 
      ...prev, 
      medicines: prev.medicines.filter((_, i) => i !== index) 
    }));
  };

  // Test Management
  const handleTestToggle = (test) => {
    setFormData(prev => ({
      ...prev,
      tests: prev.tests.includes(test) 
        ? prev.tests.filter(t => t !== test) 
        : [...prev.tests, test]
    }));
  };

  const addCustomTest = () => {
    if (customTest.trim() && !formData.tests.includes(customTest.trim())) {
      setFormData(prev => ({
        ...prev,
        tests: [...prev.tests, customTest.trim()]
      }));
      setCustomTest("");
    }
  };

  const removeTest = (testToRemove) => {
    setFormData(prev => ({
      ...prev,
      tests: prev.tests.filter(test => test !== testToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Clean up empty symptoms and diagnosis
    const cleanedFormData = {
      ...formData,
      symptoms: formData.symptoms.filter(s => s.trim() !== ""),
      diagnosis: formData.diagnosis.filter(d => d.trim() !== "")
    };
    
    onSubmit(cleanedFormData);
    setFormData(initialFormData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Email *
              </label>
              <input
                type="email"
                value={formData.patientEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, patientEmail: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.patientEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="patient@example.com"
              />
              {errors.patientEmail && (
                <p className="text-red-600 text-sm mt-1">{errors.patientEmail}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name *
              </label>
              <input
                type="text"
                value={formData.patientName}
                onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.patientName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter patient name"
              />
              {errors.patientName && (
                <p className="text-red-600 text-sm mt-1">{errors.patientName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Symptoms</h3>
          {errors.symptoms && (
            <p className="text-red-600 text-sm mb-3">{errors.symptoms}</p>
          )}
          <div className="space-y-3">
            {formData.symptoms.map((symptom, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={symptom}
                  onChange={(e) => handleSymptomChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={`Symptom ${index + 1}`}
                />
                {formData.symptoms.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSymptom(index)}
                    className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSymptom}
            className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-medium flex items-center gap-2"
          >
            <i className="bi bi-plus-lg"></i>
            Add Symptom
          </button>
        </div>

        {/* Diagnosis */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Diagnosis</h3>
          {errors.diagnosis && (
            <p className="text-red-600 text-sm mb-3">{errors.diagnosis}</p>
          )}
          <div className="space-y-3">
            {formData.diagnosis.map((diag, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={diag}
                  onChange={(e) => handleDiagnosisChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={`Diagnosis ${index + 1}`}
                />
                {formData.diagnosis.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDiagnosis(index)}
                    className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addDiagnosis}
            className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-medium flex items-center gap-2"
          >
            <i className="bi bi-plus-lg"></i>
            Add More Diagnosis
          </button>
        </div>

        {/* Medicines */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Medicines</h3>
          
          {errors.medicines && (
            <p className="text-red-600 text-sm mb-3">{errors.medicines}</p>
          )}

          {/* Medicine Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medicine Name *
              </label>
              <input
                type="text"
                value={currentMedicine.medicine_name}
                onChange={(e) => setCurrentMedicine(prev => ({ ...prev, medicine_name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter medicine name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dosage *
              </label>
              <input
                type="text"
                value={currentMedicine.dosage}
                onChange={(e) => setCurrentMedicine(prev => ({ ...prev, dosage: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 1 tablet, 10ml"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frequency
              </label>
              <select
                value={currentMedicine.frequency}
                onChange={(e) => setCurrentMedicine(prev => ({ ...prev, frequency: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {frequencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <select
                value={currentMedicine.duration}
                onChange={(e) => setCurrentMedicine(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select duration</option>
                {durationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Instructions
            </label>
            <input
              type="text"
              value={currentMedicine.instructions}
              onChange={(e) => setCurrentMedicine(prev => ({ ...prev, instructions: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Special instructions (optional)"
            />
          </div>

          <button
            type="button"
            onClick={handleAddMedicine}
            className="w-full bg-green-100 text-green-600 py-3 rounded-lg hover:bg-green-200 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <i className="bi bi-plus-lg"></i>
            Add Medicine to Prescription
          </button>

          {/* Added Medicines List */}
          {formData.medicines.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-3">Added Medicines:</h4>
              <div className="space-y-2">
                {formData.medicines.map((medicine, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <span className="font-medium">{medicine.medicine_name}</span>
                      <span className="text-sm text-gray-600 ml-2">
                        {medicine.dosage} • {medicine.frequency} • {medicine.duration}
                      </span>
                      {medicine.instructions && (
                        <div className="text-sm text-gray-500 mt-1">
                          Instructions: {medicine.instructions}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommended Tests */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Tests</h3>
          
          {/* Common Tests */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Common Tests:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {commonTests.map((test) => (
                <label key={test} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.tests.includes(test)}
                    onChange={() => handleTestToggle(test)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{test}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Custom Test */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Custom Test:
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={customTest}
                onChange={(e) => setCustomTest(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter custom test name"
              />
              <button
                type="button"
                onClick={addCustomTest}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Custom
              </button>
            </div>
          </div>

          {/* Selected Tests */}
          {formData.tests.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-3">Selected Tests:</h4>
              <div className="flex flex-wrap gap-2">
                {formData.tests.map((test) => (
                  <span key={test} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {test}
                    <button
                      type="button"
                      onClick={() => removeTest(test)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notes and Instructions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes & Instructions</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes, Instructions & Follow-up Information
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter any additional instructions, follow-up advice, medication precautions, or other important notes for the patient..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
          >
            <i className="bi bi-file-medical"></i>
            Create Prescription
          </button>
        </div>
      </form>
    </div>
  );
}