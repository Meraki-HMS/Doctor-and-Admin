"use client";

import { useState } from "react";

const initialFormData = {
  patientId: "",
  patientName: "",
  admissionDate: "",
  admittingDiagnosis: "",
  dischargeDiagnosis: "",
  proceduresPerformed: "",
  hospitalCourse: "",
  medicationsOnDischarge: [],
  followUp: "",
};

const initialMedication = { name: "", dosage: "", frequency: "" };

export default function SummaryForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialFormData);
  const [medication, setMedication] = useState(initialMedication);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.patientId) newErrors.patientId = "Patient ID is required.";
    if (!formData.patientName) newErrors.patientName = "Patient name is required.";
    if (!formData.admissionDate) newErrors.admissionDate = "Admission date is required.";
    if (!formData.dischargeDiagnosis) newErrors.dischargeDiagnosis = "Discharge diagnosis is required.";
    if (!formData.hospitalCourse) newErrors.hospitalCourse = "Hospital course summary is required.";
    if (!formData.followUp) newErrors.followUp = "Follow-up instructions are required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMedication = () => {
    if (medication.name && medication.dosage && medication.frequency) {
      setFormData(prev => ({
        ...prev,
        medicationsOnDischarge: [...prev.medicationsOnDischarge, medication]
      }));
      setMedication(initialMedication);
    }
  };
  
  const handleRemoveMedication = (index) => {
    setFormData(prev => ({
        ...prev,
        medicationsOnDischarge: prev.medicationsOnDischarge.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Patient & Visit Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient & Visit Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID *</label>
                    <input type="text" value={formData.patientId} onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))} className={`w-full ${errors.patientId ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter patient ID"/>
                    {errors.patientId && <p className="text-red-500 text-sm mt-1">{errors.patientId}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
                    <input type="text" value={formData.patientName} onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))} className={`w-full ${errors.patientName ? 'border-red-500' : 'border-gray-300'}`} placeholder="Patient's full name"/>
                    {errors.patientName && <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>}
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admission Date *</label>
                    <input type="date" value={formData.admissionDate} onChange={(e) => setFormData(prev => ({ ...prev, admissionDate: e.target.value }))} className={`w-full ${errors.admissionDate ? 'border-red-500' : 'border-gray-300'}`}/>
                    {errors.admissionDate && <p className="text-red-500 text-sm mt-1">{errors.admissionDate}</p>}
                </div>
            </div>
        </div>

        {/* Diagnosis & Course */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Diagnosis & Hospital Course</h3>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Admitting Diagnosis</label>
                        <input type="text" value={formData.admittingDiagnosis} onChange={(e) => setFormData(prev => ({ ...prev, admittingDiagnosis: e.target.value }))} className="w-full border-gray-300" placeholder="Reason for admission..."/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Discharge Diagnosis *</label>
                        <input type="text" value={formData.dischargeDiagnosis} onChange={(e) => setFormData(prev => ({ ...prev, dischargeDiagnosis: e.target.value }))} className={`w-full ${errors.dischargeDiagnosis ? 'border-red-500' : 'border-gray-300'}`} placeholder="Final diagnosis..."/>
                        {errors.dischargeDiagnosis && <p className="text-red-500 text-sm mt-1">{errors.dischargeDiagnosis}</p>}
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Procedures Performed (if any)</label>
                    <textarea value={formData.proceduresPerformed} onChange={(e) => setFormData(prev => ({ ...prev, proceduresPerformed: e.target.value }))} rows={3} className="w-full border-gray-300" placeholder="List surgeries, therapies, etc..."/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brief Summary of Hospital Course *</label>
                    <textarea value={formData.hospitalCourse} onChange={(e) => setFormData(prev => ({ ...prev, hospitalCourse: e.target.value }))} rows={5} className={`w-full ${errors.hospitalCourse ? 'border-red-500' : 'border-gray-300'}`} placeholder="Summarize patient's journey from admission to discharge..."/>
                    {errors.hospitalCourse && <p className="text-red-500 text-sm mt-1">{errors.hospitalCourse}</p>}
                </div>
            </div>
        </div>
        
        {/* Medications on Discharge */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Medications on Discharge</h3>
            {formData.medicationsOnDischarge.length > 0 && (
                <div className="space-y-2 mb-4">
                    {formData.medicationsOnDischarge.map((med, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                            <p className="text-sm">{med.name} - {med.dosage} - {med.frequency}</p>
                            <button type="button" onClick={() => handleRemoveMedication(index)} className="text-red-500"><i className="bi bi-trash"></i></button>
                        </div>
                    ))}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                    <input type="text" value={medication.name} onChange={e => setMedication({...medication, name: e.target.value})} className="w-full" placeholder="e.g., Atorvastatin"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                    <input type="text" value={medication.dosage} onChange={e => setMedication({...medication, dosage: e.target.value})} className="w-full" placeholder="e.g., 40mg"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <input type="text" value={medication.frequency} onChange={e => setMedication({...medication, frequency: e.target.value})} className="w-full" placeholder="e.g., Once daily"/>
                </div>
            </div>
             <button type="button" onClick={handleAddMedication} className="mt-4 bg-blue-100 text-blue-700 px-4 py-2 text-sm rounded-lg hover:bg-blue-200">+ Add Medication</button>
        </div>

        {/* Follow-up */}
         <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Discharge & Follow-up Plan</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Instructions *</label>
                <textarea value={formData.followUp} onChange={(e) => setFormData(prev => ({ ...prev, followUp: e.target.value }))} rows={4} className={`w-full ${errors.followUp ? 'border-red-500' : 'border-gray-300'}`} placeholder="Details on diet, activity, wound care, and scheduled follow-up appointments..."/>
                {errors.followUp && <p className="text-red-500 text-sm mt-1">{errors.followUp}</p>}
            </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
            <button type="button" onClick={onCancel} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">Cancel</button>
            <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
                <i className="bi bi-check-circle"></i>Save & Finalize Summary
            </button>
        </div>
      </form>
    </div>
  );
}

// Add this basic styling to your global CSS file for the inputs to look cleaner
/*
input[type="text"], input[type="date"], textarea, select {
    @apply px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full;
}
*/