"use client";

import { useState } from "react";

export default function DiagnosisHistory({ diagnoses, onSearchChange, searchTerm, onViewDetails }) {
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-700 border-green-200',
      stable: 'bg-blue-100 text-blue-700 border-blue-200',
      'follow-up': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };
  
  const sortedDiagnoses = [...diagnoses].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
    } else {
        return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by patient, diagnosis, or ICD-10 code..."
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <i className="bi bi-search absolute left-3 top-3.5 text-gray-400"></i>
        </div>
      </div>
      
      {/* Diagnosis Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('patientName')}>
                Patient <i className={`bi bi-arrow-${sortBy === 'patientName' ? (sortOrder === 'asc' ? 'up' : 'down') : 'down-up'}`}></i>
              </th>
              <th scope="col" className="px-6 py-3">
                Primary Diagnosis
              </th>
               <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('date')}>
                Date <i className={`bi bi-arrow-${sortBy === 'date' ? (sortOrder === 'asc' ? 'up' : 'down') : 'down-up'}`}></i>
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedDiagnoses.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.patientName}
                  <div className="text-xs text-gray-500">ID: {item.patientId}</div>
                </td>
                <td className="px-6 py-4">
                  {item.primaryDiagnosis}
                  <div className="text-xs text-gray-500">ICD-10: {item.icd10Code}</div>
                </td>
                 <td className="px-6 py-4">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                   <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    // onClick={() => onViewDetails(item)}
                    className="font-medium text-green-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedDiagnoses.length === 0 && (
        <div className="text-center py-12">
            <i className="bi bi-journal-medical text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-500">No Diagnosis Records Found</h3>
            <p className="text-gray-400 mt-1">
                {searchTerm ? "Try adjusting your search" : "No records have been created yet."}
            </p>
        </div>
      )}
    </div>
  );
}