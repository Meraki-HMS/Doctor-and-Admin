"use client";

export default function SummaryHistory({ summaries, onSearchChange, searchTerm, onViewDetails }) {

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by patient name, ID, or diagnosis..."
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <i className="bi bi-search absolute left-3 top-3.5 text-gray-400"></i>
        </div>
      </div>
      
      <div className="space-y-4">
        {summaries.map((summary) => (
          <div key={summary.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
              <div className="md:col-span-2">
                <h4 className="font-semibold text-gray-800">{summary.patientName}</h4>
                <p className="text-sm text-gray-500">ID: {summary.patientId} | Summary ID: {summary.summaryId}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-700"><strong className="font-medium">Diagnosis:</strong> {summary.dischargeDiagnosis}</p>
              </div>
              <div className="md:col-span-1 text-right">
                <p className="text-sm font-semibold text-gray-800">Discharged:</p>
                <p className="text-sm text-gray-600">{new Date(summary.dischargeDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-700 border-green-200">
                    Completed
                </span>
                <div className="flex gap-2">
                    <button onClick={() => onViewDetails(summary)} className="text-sm font-medium text-blue-600 hover:underline">View Summary</button>
                    <button className="text-sm font-medium text-green-600 hover:underline">Download PDF</button>
                </div>
            </div>
          </div>
        ))}
      </div>

      {summaries.length === 0 && (
        <div className="text-center py-16">
            <i className="bi bi-file-earmark-text-fill text-5xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-500">No Summaries Found</h3>
            <p className="text-gray-400 mt-1">
                {searchTerm ? "Try adjusting your search." : "No discharge summaries have been created yet."}
            </p>
        </div>
      )}
    </div>
  );
}