"use client";
import { useState, useEffect } from "react";

// Mock test database
const testDatabase = [
  // Hematology
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    category: "Hematology",
    description: "Evaluates overall health and detects disorders",
    duration: "2-4 hours",
    sample: "Blood",
    price: "$45",
    common: true
  },
  {
    id: 2,
    name: "Hemoglobin A1C",
    category: "Hematology",
    description: "Measures average blood sugar levels",
    duration: "24 hours",
    sample: "Blood",
    price: "$65",
    common: true
  },
  {
    id: 3,
    name: "Coagulation Profile",
    category: "Hematology",
    description: "Evaluates blood clotting function",
    duration: "4-6 hours",
    sample: "Blood",
    price: "$85",
    common: false
  },

  // Biochemistry
  {
    id: 4,
    name: "Basic Metabolic Panel",
    category: "Biochemistry",
    description: "Measures glucose, electrolyte, and kidney function",
    duration: "2-4 hours",
    sample: "Blood",
    price: "$55",
    common: true
  },
  {
    id: 5,
    name: "Liver Function Test",
    category: "Biochemistry",
    description: "Assesses liver health and function",
    duration: "4-6 hours",
    sample: "Blood",
    price: "$75",
    common: true
  },
  {
    id: 6,
    name: "Lipid Profile",
    category: "Biochemistry",
    description: "Measures cholesterol and triglycerides",
    duration: "24 hours",
    sample: "Blood",
    price: "$60",
    common: true
  },
  {
    id: 7,
    name: "Thyroid Profile",
    category: "Biochemistry",
    description: "Evaluates thyroid gland function",
    duration: "24 hours",
    sample: "Blood",
    price: "$95",
    common: true
  },

  // Microbiology
  {
    id: 8,
    name: "Urine Culture",
    category: "Microbiology",
    description: "Detects urinary tract infections",
    duration: "48-72 hours",
    sample: "Urine",
    price: "$45",
    common: true
  },
  {
    id: 9,
    name: "Blood Culture",
    category: "Microbiology",
    description: "Detects bloodstream infections",
    duration: "48-72 hours",
    sample: "Blood",
    price: "$75",
    common: false
  },

  // Immunology
  {
    id: 10,
    name: "HIV Test",
    category: "Immunology",
    description: "Screening for HIV infection",
    duration: "24 hours",
    sample: "Blood",
    price: "$35",
    common: false
  },
  {
    id: 11,
    name: "Hepatitis Panel",
    category: "Immunology",
    description: "Screens for hepatitis A, B, and C",
    duration: "48 hours",
    sample: "Blood",
    price: "$120",
    common: false
  }
];

const categories = [
  "All Tests",
  "Hematology",
  "Biochemistry", 
  "Microbiology",
  "Immunology",
  "Common Tests"
];

export default function TestCatalog({ onTestSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Tests");
  const [filteredTests, setFilteredTests] = useState([]);

  useEffect(() => {
    let results = testDatabase;

    // Filter by category
    if (selectedCategory === "Common Tests") {
      results = results.filter(test => test.common);
    } else if (selectedCategory !== "All Tests") {
      results = results.filter(test => test.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      results = results.filter(test =>
        test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTests(results);
  }, [searchTerm, selectedCategory]);

  const handleTestSelect = (test) => {
    onTestSelect(test);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Hematology: "bg-red-100 text-red-700",
      Biochemistry: "bg-blue-100 text-blue-700",
      Microbiology: "bg-green-100 text-green-700",
      Immunology: "bg-purple-100 text-purple-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tests by name, category, or description..."
              className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <i className="bi bi-search absolute left-3 top-3.5 text-gray-400"></i>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Test Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-1">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
            onClick={() => handleTestSelect(test)}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                {test.name}
              </h4>
              {test.common && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                  Common
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(test.category)}`}>
                {test.category}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {test.duration}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {test.description}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <i className="bi bi-droplet"></i>
                {test.sample}
              </span>
              <span className="font-medium text-gray-700">{test.price}</span>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <i className="bi bi-plus-lg"></i>
                Add to Request
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredTests.length === 0 && (
        <div className="text-center py-8">
          <i className="bi bi-search text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-500">No tests found</h3>
          <p className="text-gray-400 mt-1">
            Try adjusting your search or category filter
          </p>
        </div>
      )}

      {/* Test Count */}
      <div className="text-sm text-gray-500 text-center">
        Showing {filteredTests.length} of {testDatabase.length} tests
      </div>
    </div>
  );
}