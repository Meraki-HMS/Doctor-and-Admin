"use client";

import { useState } from "react";
import SpecialistSearch from "./SpecialistSearch";

const initialFormData = {
  patientEmail: "",
  patientName: "",
  referredTo: null, // This will hold the specialist object
  reason: "",
  priority: "routine", // routine, urgent
  notes: "",
};

export default function ReferralForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
  if (!formData.patientEmail.trim()) newErrors.patientEmail = "Patient email is required";
    if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required";
    if (!formData.referredTo) newErrors.referredTo = "A specialist must be selected";
    if (!formData.reason.trim()) newErrors.reason = "Reason for referral is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submissionData = {
      patientEmail: formData.patientEmail,
      patientName: formData.patientName,
      referredTo: formData.referredTo.name,
      specialty: formData.referredTo.specialty,
      reason: formData.reason,
      priority: formData.priority,
      notes: formData.notes,
    };
    
    onSubmit(submissionData);
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient email *</label>
                    <input type="text" value={formData.patientEmail} onChange={(e) => setFormData(prev => ({ ...prev, patientEmail: e.target.value }))} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.patientEmail ? 'border-red-500' : 'border-gray-300'}`} placeholder="Enter patient email"/>
                    {errors.patientEmail && <p className="text-red-600 text-sm mt-1">{errors.patientEmail}</p>}
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
                    <input type="text" value={formData.patientName} onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.patientName ? 'border-red-500' : 'border-gray-300'}`} placeholder="Patient's full name"/>
                    {errors.patientName && <p className="text-red-600 text-sm mt-1">{errors.patientName}</p>}
                </div>
            </div>
        </div>

        {/* Specialist Selection */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Specialist Details</h3>
            <SpecialistSearch onSpecialistSelect={(specialist) => setFormData(prev => ({...prev, referredTo: specialist}))} />
            {errors.referredTo && <p className="text-red-600 text-sm mt-1">{errors.referredTo}</p>}

            {formData.referredTo && (
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Selected Specialist:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><span className="text-gray-600">Name:</span> <strong className="text-gray-900">{formData.referredTo.name}</strong></div>
                        <div><span className="text-gray-600">Specialty:</span> <strong className="text-gray-900">{formData.referredTo.specialty}</strong></div>
                        <div><span className="text-gray-600">Hospital:</span> <strong className="text-gray-900">{formData.referredTo.hospital}</strong></div>
                        <div><span className="text-gray-600">Contact:</span> <strong className="text-gray-900">{formData.referredTo.contact}</strong></div>
                    </div>
                </div>
            )}
        </div>

        {/* Referral Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Referral Information</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Referral *</label>
                    <textarea value={formData.reason} onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))} rows={4} className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.reason ? 'border-red-500' : 'border-gray-300'}`} placeholder="Provide clinical justification for the referral..."/>
                    {errors.reason && <p className="text-red-600 text-sm mt-1">{errors.reason}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2"><input type="radio" name="priority" value="routine" checked={formData.priority === 'routine'} onChange={(e) => setFormData(prev => ({...prev, priority: e.target.value}))} className="text-green-600"/>Routine</label>
                        <label className="flex items-center gap-2"><input type="radio" name="priority" value="urgent" checked={formData.priority === 'urgent'} onChange={(e) => setFormData(prev => ({...prev, priority: e.target.value}))} className="text-green-600"/>Urgent</label>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                    <textarea value={formData.notes} onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300" placeholder="Include any supporting documents, recent lab results, or specific questions for the specialist..."/>
                </div>
            </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
            <button type="button" onClick={onCancel} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">Cancel</button>
            <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
                <i className="bi bi-send-check"></i>Submit Referral
            </button>
        </div>
      </form>
    </div>
  );
}