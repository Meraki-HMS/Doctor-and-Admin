"use client";

import { useState } from "react";
import ICD10Search from "./ICD10Search";
import TreatmentPlanForm from "./TreatmentPlanForm";

const initialFormData = {
  patientEmail: "",
  patientName: "",
  subjective: "",
  objective: "",
  assessment: "",
  icd10: null,
  plan: [], // This will hold treatment plan items
};

export default function DiagnosisForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
  if (!formData.patientEmail.trim()) newErrors.patientEmail = "Patient email is required";
    if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required";
    if (!formData.assessment.trim()) newErrors.assessment = "Assessment/Diagnosis is required";
    if (formData.plan.length === 0) newErrors.plan = "Treatment plan must have at least one item";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Format data for submission
  const submissionData = {
    patientEmail: formData.patientEmail,
        patientName: formData.patientName,
        primaryDiagnosis: formData.assessment,
        icd10Code: formData.icd10 ? formData.icd10.code : 'N/A',
        treatmentPlan: formData.plan.map(p => p.name).join(', '),
        status: 'active', // default status
        // You can also include subjective/objective notes if needed
    };
    
    onSubmit(submissionData);
    setFormData(initialFormData);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Patient Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient & Encounter Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient email *</label>
                    <input type="text" value={formData.patientEmail} onChange={(e) => setFormData(prev => ({ ...prev, patientEmail: e.target.value }))} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.patientEmail ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter or search patient email..."/>
                    {errors.patientEmail && <p className="text-red-600 text-sm mt-1">{errors.patientEmail}</p>}
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
                    <input type="text" value={formData.patientName} onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.patientName ? 'border-red-500' : 'border-gray-300'}`} placeholder="Patient's full name..."/>
                    {errors.patientName && <p className="text-red-600 text-sm mt-1">{errors.patientName}</p>}
                </div>
            </div>
        </div>

        {/* SOAP Notes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Clinical Notes (SOAP)</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">S: Subjective</label>
                    <textarea value={formData.subjective} onChange={(e) => setFormData(prev => ({ ...prev, subjective: e.target.value }))} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300" placeholder="Patient's complaints, history of present illness..."/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">O: Objective</label>
                    <textarea value={formData.objective} onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300" placeholder="Vital signs, physical exam findings..."/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">A: Assessment (Primary Diagnosis) *</label>
                    <textarea value={formData.assessment} onChange={(e) => setFormData(prev => ({ ...prev, assessment: e.target.value }))} rows={3} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.assessment ? 'border-red-500' : 'border-gray-300'}`} placeholder="Clinical diagnosis based on S & O..."/>
                    {errors.assessment && <p className="text-red-600 text-sm mt-1">{errors.assessment}</p>}
                </div>
                <ICD10Search onCodeSelect={(code) => setFormData(prev => ({...prev, icd10: code}))} />
            </div>
        </div>
        
        {/* Plan Section */}
        {errors.plan && <p className="text-red-600 text-sm mt-1">{errors.plan}</p>}
        <TreatmentPlanForm plan={formData.plan} setPlan={(newPlan) => setFormData(prev => ({...prev, plan: newPlan}))} />

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
            <button type="button" onClick={onCancel} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">Cancel</button>
            <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
                <i className="bi bi-check-circle"></i>Save Diagnosis & Plan
            </button>
        </div>
      </form>
    </div>
  );
}