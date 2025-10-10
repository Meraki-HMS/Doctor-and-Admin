"use client";
import { useState } from "react";
import TestCatalog from "./TestCatalog";

const initialFormData = {
  patientId: "",
  patientName: "",
  priority: "routine",
  tests: [],
  notes: "",
  urgency: "standard" // standard, urgent, stat
};

export default function LabTestRequest({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [selectedTests, setSelectedTests] = useState([]);

  const urgencyOptions = [
    { value: "standard", label: "Standard (24-48 hours)", color: "bg-blue-100 text-blue-700" },
    { value: "urgent", label: "Urgent (4-6 hours)", color: "bg-orange-100 text-orange-700" },
    { value: "stat", label: "STAT (Immediate)", color: "bg-red-100 text-red-700" }
  ];

  const priorityOptions = [
    { value: "routine", label: "Routine", color: "bg-blue-100 text-blue-700" },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-700" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-700" }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientId.trim()) newErrors.patientId = "Patient ID is required";
    if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required";
    if (selectedTests.length === 0) newErrors.tests = "At least one test is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTestSelect = (test) => {
    if (!selectedTests.find(t => t.id === test.id)) {
      setSelectedTests(prev => [...prev, { ...test }]);
    }
  };

  const handleTestRemove = (testId) => {
    setSelectedTests(prev => prev.filter(test => test.id !== testId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const submissionData = {
      ...formData,
      tests: selectedTests
    };

    onSubmit(submissionData);
    setFormData(initialFormData);
    setSelectedTests([]);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient ID *
              </label>
              <input
                type="text"
                value={formData.patientId}
                onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.patientId ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter patient ID"
              />
              {errors.patientId && (
                <p className="text-red-600 text-sm mt-1">{errors.patientId}</p>
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

        {/* Test Selection */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Test Selection</h3>
          
          {errors.tests && (
            <p className="text-red-600 text-sm mb-4">Please select at least one test</p>
          )}

          {/* Test Catalog */}
          <div className="mb-6">
            <TestCatalog onTestSelect={handleTestSelect} />
          </div>

          {/* Selected Tests */}
          {selectedTests.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-3">Selected Tests ({selectedTests.length})</h4>
              <div className="space-y-3">
                {selectedTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-800">{test.name}</span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                          {test.category}
                        </span>
                        <span className="text-sm text-gray-500">{test.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTestRemove(test.id)}
                      className="text-red-600 hover:text-red-800 p-2 transition-colors"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Priority & Urgency */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Priority & Timing</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Priority Level
              </label>
              <div className="space-y-2">
                {priorityOptions.map((option) => (
                  <label key={option.value} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value={option.value}
                      checked={formData.priority === option.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="flex-1 text-sm text-gray-700">{option.label}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${option.color}`}>
                      {option.value}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Turnaround Time
              </label>
              <div className="space-y-2">
                {urgencyOptions.map((option) => (
                  <label key={option.value} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="urgency"
                      value={option.value}
                      checked={formData.urgency === option.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="flex-1">
                      <div className="text-sm font-medium text-gray-700">{option.label.split(' (')[0]}</div>
                      <div className="text-xs text-gray-500">{option.label.split(' (')[1]?.replace(')', '')}</div>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Notes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Clinical Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Clinical Notes & Indications
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter clinical notes, indications for testing, relevant symptoms..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Provide relevant clinical information to assist the lab in processing and interpretation.
            </p>
          </div>

          {/* Special Instructions */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <textarea
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Any special handling requirements, fasting status, etc."
            />
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Request Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Patient:</span>
              <div className="font-semibold text-gray-800">{formData.patientName || 'Not specified'}</div>
            </div>
            <div>
              <span className="text-gray-600">Priority:</span>
              <div className="font-semibold text-gray-800 capitalize">{formData.priority}</div>
            </div>
            <div>
              <span className="text-gray-600">Tests Selected:</span>
              <div className="font-semibold text-gray-800">{selectedTests.length} tests</div>
            </div>
          </div>

          {selectedTests.length > 0 && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-blue-100">
              <div className="text-sm text-gray-600 mb-2">Selected Tests:</div>
              <div className="flex flex-wrap gap-1">
                {selectedTests.map((test, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    {test.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
          >
            <i className="bi bi-send-check"></i>
            Submit Test Request
          </button>
        </div>
      </form>
    </div>
  );
}