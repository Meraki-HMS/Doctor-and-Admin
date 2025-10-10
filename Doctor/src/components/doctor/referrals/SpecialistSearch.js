"use client";

import { useState, useEffect } from "react";
import { specialistsData } from "../../../mockData/referralData"; // CORRECTED PATH

export default function SpecialistSearch({ onSpecialistSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = specialistsData.filter(
        (spec) =>
          spec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          spec.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          spec.hospital.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  const handleSelect = (specialist) => {
    onSpecialistSelect(specialist);
    setSearchTerm("");
    setShowResults(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Find a Specialist *
      </label>
      <div className="relative">
        <i className="bi bi-search absolute left-3 top-3.5 text-gray-400"></i>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, specialty, or hospital..."
          className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto mt-1">
          {results.map((specialist) => (
            <button
              key={specialist.id}
              type="button"
              onClick={() => handleSelect(specialist)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="font-semibold text-gray-800">{specialist.name}</div>
              <div className="text-sm text-gray-500">
                {specialist.specialty} - {specialist.hospital}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
