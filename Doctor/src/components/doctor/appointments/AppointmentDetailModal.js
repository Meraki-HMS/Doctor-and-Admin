import React from "react";

// Helper function to get an icon based on file extension
const getFileIcon = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();
  switch (extension) {
    case "pdf":
      return "bi-file-earmark-pdf-fill text-red-500";
    case "jpg":
    case "jpeg":
    case "png":
      return "bi-file-earmark-image-fill text-blue-500";
    default:
      return "bi-file-earmark-fill text-gray-500";
  }
};

export default function AppointmentDetailModal({ appointment, onClose }) {
  if (!appointment) return null;

  const { patientName, patientDetails, date, time, type, sessionType } =
    appointment;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Appointment Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Patient Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
              Patient Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-900">
              <div>
                <strong>Name:</strong> {patientName || "N/A"}
              </div>
              <div>
                <strong>Age:</strong> {patientDetails?.age ?? "N/A"}
              </div>
              <div>
                <strong>Gender:</strong> {patientDetails?.gender || "N/A"}
              </div>
              <div>
                <strong>Contact:</strong>{" "}
                {patientDetails?.contact ? (
                  <a
                    href={`tel:${patientDetails.contact}`}
                    className="text-gray-900 underline-offset-2 hover:underline"
                  >
                    {patientDetails.contact}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
              <div className="sm:col-span-2">
                <strong>Email:</strong>{" "}
                {patientDetails?.email ? (
                  <a
                    href={`mailto:${patientDetails.email}`}
                    className="text-gray-900 underline-offset-2 hover:underline"
                  >
                    {patientDetails.email}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
              <div className="sm:col-span-2">
                <strong>Session Type:</strong>{" "}
                {patientDetails.sessionType || sessionType
                  ? patientDetails.sessionType || sessionType
                  : "N/A"}
              </div>
            </div>
          </div>

          {/* Appointment Details Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
              Appointment Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-900">
              <div>
                <strong>Date:</strong>{" "}
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div>
                <strong>Time:</strong> {time}
              </div>
              <div>
                <strong>Type of Appointment:</strong>{" "}
                <span className="capitalize">{type.replace("-", " ")}</span>
              </div>
              <div>
                <strong>Session Type:</strong>{" "}
                <span className="capitalize">{sessionType}</span>
              </div>
            </div>
          </div>

          {/* Medical History Files Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
              Medical History Files
            </h3>
            {patientDetails.medicalHistoryFiles &&
            patientDetails.medicalHistoryFiles.length > 0 ? (
              <div className="space-y-2">
                {patientDetails.medicalHistoryFiles.map((file, index) => (
                  <a
                    key={index}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <i
                      className={`bi ${getFileIcon(file.name)} text-2xl mr-3`}
                    ></i>
                    <span className="text-sm font-medium text-gray-800">
                      {file.name}
                    </span>
                    <i className="bi bi-box-arrow-up-right text-gray-400 ml-auto"></i>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No medical history files uploaded.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-4 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
