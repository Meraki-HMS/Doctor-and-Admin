"use client";
import { useState } from "react";

export default function LabResultsView({ 
  reports, 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange, 
  priorityFilter, 
  onPriorityFilterChange, 
  onViewReport 
}) {
  const [sortBy, setSortBy] = useState("requestedDate");
  const [sortOrder, setSortOrder] = useState("desc");

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "completed", label: "Completed" }
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "routine", label: "Routine" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" }
  ];

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-700 border-green-200',
      processing: 'bg-blue-100 text-blue-700 border-blue-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    };
    return colors[status] || colors.pending;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      routine: 'bg-blue-100 text-blue-700'
    };
    return colors[priority] || colors.routine;
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: 'bi-check-circle-fill text-green-500',
      processing: 'bi-hourglass-split text-blue-500',
      pending: 'bi-clock text-yellow-500'
    };
    return icons[status] || 'bi-clock text-yellow-500';
  };

  const sortedReports = [...reports].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case "patientName":
        aValue = a.patientName.toLowerCase();
        bValue = b.patientName.toLowerCase();
        break;
      case "requestedDate":
        aValue = new Date(a.requestedDate);
        bValue = new Date(b.requestedDate);
        break;
      case "priority":
        const priorityOrder = { urgent: 3, high: 2, routine: 1 };
        aValue = priorityOrder[a.priority] || 0;
        bValue = priorityOrder[b.priority] || 0;
        break;
      default:
        aValue = a[sortBy];
        bValue = b[sortBy];
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div>
      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by patient name, report ID, or test name..."
              className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <i className="bi bi-search absolute left-3 top-3.5 text-gray-400"></i>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="requestedDate">Sort by Date</option>
            <option value="patientName">Sort by Name</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="space-y-4">
        {sortedReports.map((report) => (
          <div 
            key={report.id} 
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => onViewReport(report)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${
                  report.status === 'completed' ? 'bg-green-50 border-green-200' :
                  report.status === 'processing' ? 'bg-blue-50 border-blue-200' :
                  'bg-yellow-50 border-yellow-200'
                }`}>
                  <i className={`bi ${getStatusIcon(report.status)} text-xl`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{report.patientName}</h3>
                  <p className="text-sm text-gray-500">
                    ID: {report.patientId} • {report.reportId}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  {new Date(report.requestedDate).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-500">
                  {report.tests.length} test{report.tests.length !== 1 ? 's' : ''}
                </div>
                {report.completedDate && (
                  <div className="text-sm text-green-600 font-medium">
                    Completed: {new Date(report.completedDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>

            {/* Tests Preview */}
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {report.tests.slice(0, 4).map((test, index) => (
                  <span 
                    key={index} 
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      test.status === 'completed' ? 'bg-green-50 text-green-700 border border-green-200' :
                      test.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}
                  >
                    {test.name}
                    {test.status === 'completed' && test.result && (
                      <span className={`ml-1 ${
                        test.result === 'Normal' ? 'text-green-600' :
                        test.result === 'Abnormal' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        ({test.result})
                      </span>
                    )}
                  </span>
                ))}
                {report.tests.length > 4 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    +{report.tests.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Progress and Actions */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1">
                  <i className="bi bi-person-badge"></i>
                  {report.labTechnician || 'Technician not assigned'}
                </div>
                {report.verifiedBy && (
                  <div className="flex items-center gap-1 text-green-600">
                    <i className="bi bi-shield-check"></i>
                    Verified by {report.verifiedBy}
                  </div>
                )}
              </div>
              
              <button className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                View Details
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        ))}

        {sortedReports.length === 0 && (
          <div className="text-center py-12">
            <i className="bi bi-clipboard-x text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-500">No lab reports found</h3>
            <p className="text-gray-400 mt-1">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' 
                ? "Try adjusting your search or filters" 
                : "No lab test requests have been submitted yet"
              }
            </p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {sortedReports.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-800">{reports.length}</div>
              <div className="text-xs text-gray-500">Total Reports</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {reports.filter(r => r.status === 'completed').length}
              </div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">
                {reports.filter(r => r.status === 'processing').length}
              </div>
              <div className="text-xs text-gray-500">In Progress</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">
                {reports.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}