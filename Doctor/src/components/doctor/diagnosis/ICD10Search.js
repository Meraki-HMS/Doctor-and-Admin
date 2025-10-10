"use client";

import { useState, useEffect } from "react";
import { icd10Codes } from "../../../mockData/diagnosisData"; // CORRECTED PATH

export default function ICD10Search({ onCodeSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = icd10Codes.filter(
        (item) =>
          item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  const handleSelect = (item) => {
    onCodeSelect(item);
    setSearchTerm(`${item.code} - ${item.description}`);
    setShowResults(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        ICD-10 Code Search
      </label>
      <div className="relative">
         <i className="bi bi-search absolute left-3 top-3.5 text-gray-400"></i>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by code or description..."
          className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto mt-1">
          {results.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="font-medium text-gray-800">{item.code}</div>
              <div className="text-sm text-gray-500">{item.description}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}