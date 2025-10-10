"use client";
import { useEffect, useState } from "react";
// NOTE: Layout-related imports are removed.
import LabTestRequest from "../../../components/doctor/lab-reports/LabTestRequest";
import LabResultsView from "../../../components/doctor/lab-reports/LabResultsView";
// NOTE: The LabReportDetail component is now imported from its own file.
import LabReportDetail from "../../../components/doctor/lab-reports/LabReportDetail";


// Mock data for lab reports
const labReportsData = [
  {
    id: 1,
    reportId: "LAB-001",
    patientId: "P001",
    patientName: "John Smith",
    requestedDate: "2024-01-10",
    completedDate: "2024-01-12",
    status: "completed",
    priority: "routine",
    tests: [
      {
        id: 1,
        name: "Complete Blood Count (CBC)",
        category: "Hematology",
        result: "Normal",
        value: "Within normal limits",
        unit: "",
        normalRange: "",
        status: "completed"
      },
      {
        id: 2,
        name: "Lipid Profile",
        category: "Biochemistry",
        result: "Borderline High",
        value: "220 mg/dL",
        unit: "mg/dL",
        normalRange: "<200 mg/dL",
        status: "completed"
      }
    ],
    notes: "Routine health checkup",
    labTechnician: "Dr. Emily Chen",
    verifiedBy: "Dr. Michael Rodriguez"
  },
  {
    id: 2,
    reportId: "LAB-002",
    patientId: "P002",
    patientName: "Maria Garcia",
    requestedDate: "2024-01-14",
    completedDate: null,
    status: "pending",
    priority: "urgent",
    tests: [
      {
        id: 3,
        name: "Blood Glucose",
        category: "Biochemistry",
        result: "Pending",
        value: "",
        unit: "mg/dL",
        normalRange: "70-110 mg/dL",
        status: "in-progress"
      },
      {
        id: 4,
        name: "Liver Function Test",
        category: "Biochemistry",
        result: "Pending",
        value: "",
        unit: "",
        normalRange: "",
        status: "pending"
      }
    ],
    notes: "Follow-up for diabetes management",
    labTechnician: "",
    verifiedBy: ""
  },
  {
    id: 3,
    reportId: "LAB-003",
    patientId: "P003",
    patientName: "Robert Johnson",
    requestedDate: "2024-01-15",
    completedDate: null,
    status: "processing",
    priority: "high",
    tests: [
      {
        id: 5,
        name: "Thyroid Profile",
        category: "Endocrinology",
        result: "In Progress",
        value: "",
        unit: "",
        normalRange: "",
        status: "in-progress"
      }
    ],
    notes: "Thyroid function evaluation",
    labTechnician: "Dr. Emily Chen",
    verifiedBy: ""
  }
];

export default function LabReportsPage() {
  // NOTE: Layout-related state and hooks are removed.
  const [labReports, setLabReports] = useState([]);
  const [activeTab, setActiveTab] = useState("results"); // results, request
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    setLabReports(labReportsData);
  }, []);

  const handleNewTestRequest = (testRequestData) => {
    const newReport = {
      id: labReports.length + 1,
      reportId: `LAB-${String(labReports.length + 1).padStart(3, '0')}`,
      ...testRequestData,
      requestedDate: new Date().toISOString().split('T')[0],
      completedDate: null,
      status: "pending",
      tests: testRequestData.tests.map(test => ({
        ...test,
        status: "pending",
        result: "Pending",
        value: "",
        unit: "",
        normalRange: ""
      })),
      labTechnician: "",
      verifiedBy: ""
    };
    
    setLabReports(prev => [newReport, ...prev]);
    setActiveTab("results");
    
    console.log("Lab test request created:", newReport);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const filteredReports = labReports.filter(report => {
    const matchesSearch = 
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.tests.some(test => 
        test.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // NOTE: Loading and auth checks are removed as they are handled by the layout.

  return (
    <>
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        {/* Header Section */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Lab Reports</h1>
              <p className="text-gray-600 mt-2">
                Request lab tests and view patient results
              </p>
            </div>
            <button 
              onClick={() => setActiveTab("request")}
              className="mt-4 lg:mt-0 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <i className="bi bi-plus-lg"></i>
              New Test Request
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-800">{labReports.length}</div>
            <div className="text-sm text-gray-500">Total Reports</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">
              {labReports.filter(r => r.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-orange-600">
              {labReports.filter(r => r.status === 'pending' || r.status === 'processing').length}
            </div>
            <div className="text-sm text-gray-500">In Progress</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">
              {labReports.reduce((total, report) => total + report.tests.length, 0)}
            </div>
            <div className="text-sm text-gray-500">Tests Ordered</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("results")}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "results"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="bi bi-clipboard-data mr-2"></i>
                Test Results
              </button>
              <button
                onClick={() => setActiveTab("request")}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "request"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="bi bi-plus-circle mr-2"></i>
                Request Tests
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "results" && (
              <LabResultsView
                reports={filteredReports}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
                onViewReport={handleViewReport}
              />
            )}

            {activeTab === "request" && (
              <LabTestRequest
                onSubmit={handleNewTestRequest}
                onCancel={() => setActiveTab("results")}
              />
            )}
          </div>
        </div>
      </main>

      {/* Lab Report Detail Modal */}
      {selectedReport && (
        <LabReportDetail
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </>
  );
}
