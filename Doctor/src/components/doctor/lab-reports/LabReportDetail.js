"use client";

export default function LabReportDetail({ report, onClose, onDownload }) {
  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-700 border-green-200',
      processing: 'bg-blue-100 text-blue-700 border-blue-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || colors.pending;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-red-100 text-red-700 border-red-200',
      high: 'bg-orange-100 text-orange-700 border-orange-200',
      routine: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    return colors[priority] || colors.routine;
  };

  const getTestStatusColor = (status) => {
    const colors = {
      completed: 'text-green-600',
      'in-progress': 'text-blue-600',
      pending: 'text-yellow-600'
    };
    return colors[status] || 'text-gray-600';
  };

  const getResultColor = (result) => {
    const colors = {
      Normal: 'text-green-600 bg-green-50 border-green-200',
      Abnormal: 'text-red-600 bg-red-50 border-red-200',
      'Borderline High': 'text-orange-600 bg-orange-50 border-orange-200',
      'Borderline Low': 'text-yellow-600 bg-yellow-50 border-yellow-200',
      'Pending': 'text-gray-600 bg-gray-50 border-gray-200'
    };
    return colors[result] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(report);
    } else {
      console.log("Downloading report:", report.reportId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Lab Report Details</h2>
              <p className="text-gray-600">Comprehensive test results and analysis</p>
            </div>
            <div className="flex items-center gap-2">
              {report.status === 'completed' && (
                <button
                  onClick={handleDownload}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                >
                  <i className="bi bi-download"></i>
                  Download PDF
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className="bi bi-x-lg text-xl"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto p-6">
          {/* Report Header Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Patient Information */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <i className="bi bi-person-circle text-blue-600"></i>
                Patient Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium text-gray-800">{report.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient ID:</span>
                  <span className="font-medium text-gray-800">{report.patientId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Report ID:</span>
                  <span className="font-medium text-gray-800">{report.reportId}</span>
                </div>
              </div>
            </div>
            {/* Report Status */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <i className="bi bi-clipboard-check text-green-600"></i>
                Report Status
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                    {report.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Priority:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(report.priority)}`}>
                    {report.priority.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Requested:</span>
                  <span className="font-medium text-gray-800">
                    {new Date(report.requestedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            {/* Laboratory Information */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <i className="bi bi-building text-purple-600"></i>
                Laboratory Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Technician:</span>
                  <span className="font-medium text-gray-800">
                    {report.labTechnician || 'Not assigned'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verified By:</span>
                  <span className="font-medium text-gray-800">
                    {report.verifiedBy || 'Pending verification'}
                  </span>
                </div>
                {report.completedDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-medium text-green-600">
                      {new Date(report.completedDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Test Results Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <i className="bi bi-clipboard-data text-blue-600"></i>
              Test Results & Analysis
            </h3>
            <div className="space-y-6">
              {report.tests.map((test) => (
                <div key={test.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">{test.name}</h4>
                      <p className="text-sm text-gray-500">{test.category}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTestStatusColor(test.status)}`}>
                        {test.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {test.status === 'completed' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">Result:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getResultColor(test.result)}`}>
                            {test.result}
                          </span>
                        </div>
                        {test.value && (
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Value:</span>
                            <span className="font-semibold text-gray-800">
                              {test.value} {test.unit}
                            </span>
                          </div>
                        )}
                        {test.normalRange && (
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Normal Range:</span>
                            <span className="font-semibold text-gray-800">{test.normalRange}</span>
                          </div>
                        )}
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="font-semibold text-blue-800 mb-2">Clinical Interpretation</h5>
                        <p className="text-sm text-blue-700">
                          {test.result === 'Normal'
                            ? 'Results are within normal reference ranges. No immediate clinical concerns noted.'
                            : test.result === 'Abnormal'
                            ? 'Results are outside normal reference ranges. Clinical correlation recommended.'
                            : 'Results require clinical correlation with patient symptoms and history.'
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
