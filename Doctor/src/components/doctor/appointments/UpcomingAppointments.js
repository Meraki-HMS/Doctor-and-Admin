"use client";
import React, { useContext, useState, useEffect } from "react";
import { DoctorModuleContext } from "../../../app/doctor/DoctorModuleContext";
import AppointmentDetailModal from "./AppointmentDetailModal";

// Helper to format appointment type
const AppointmentTypeBadge = ({ type }) => {
  const styles = {
    virtual: "bg-blue-100 text-blue-700",
    "walk-in": "bg-green-100 text-green-700",
    offline: "bg-purple-100 text-purple-700",
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${
        styles[type] || "bg-gray-100 text-gray-700"
      }`}
    >
      {type?.replace("-", " ")}
    </span>
  );
};

// Helper to format session type
const SessionTypeBadge = ({ sessionType }) => {
  const styles = {
    Checkup: "bg-yellow-100 text-yellow-700",
    "Follow-Up": "bg-pink-100 text-pink-700",
    Therapy: "bg-indigo-100 text-indigo-700",
    Consultation: "bg-orange-100 text-orange-700",
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${
        styles[sessionType] || "bg-gray-100 text-gray-700"
      }`}
    >
      {sessionType}
    </span>
  );
};

export default function UpcomingAppointments({
  appointments,
  onViewDetails,
  onHandwritten,
}) {
  const { handleNavigateToPrescription } = useContext(DoctorModuleContext);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patientDocuments, setPatientDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const activeAppointments = appointments.filter(
    (app) => app.status.toLowerCase() !== "cancelled"
  );

  // ✅ Handle Prescription button
  const handlePrescription = (app) => {
    handleNavigateToPrescription({
      patient_id: app.patientId,
      appointment_id: app.id,
      patientName: app.patientName,
      patientEmail: app.patientEmail,
      doctor_id: app.doctorId,
      hospital_id: app.hospitalId,
      date: app.date,
      slotStart: app.slotStart,
      slotEnd: app.slotEnd,
      sessionType: app.sessionType,
      status: app.status,
    });
  };

 // ✅ Handle “View Details” with Cloudinary Fetch
    const handleViewDetails = async (app) => {
    setSelectedAppointment(app);
    setShowModal(true);

    try {
      const user = JSON.parse(localStorage.getItem("hmsUser"));
      const token = user?.token;

      if (!token) {
        alert("Doctor authentication expired. Please log in again.");
        return;
      }

      const patient_id = app.patientId;
      if (!patient_id) {
        alert("Cannot fetch uploads — patient ID missing.");
        return;
      }

      const res = await fetch(
        `http://localhost:3000/patient-uploads/${patient_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        let errMessage = `HTTP error! status: ${res.status}`;
        try {
          const err = await res.json();
          if (err?.message) errMessage = err.message;
        } catch {}
        console.warn("Patient uploads warning:", errMessage);
        // Instead of error, just show empty array
        setPatientDocuments([]);
        return;
      }

      const data = await res.json();

      // Flatten files from Cloudinary response
      const allFiles = (data.uploads || []).flatMap((upload) =>
        (upload.files || []).map((file) => ({
          url: file.file_url,
          type: file.file_type === "pdf" ? "application/pdf" : file.file_type || "",
          name: upload.diagnosis || "Patient Document",
        }))
      );

      if (allFiles.length === 0) {
        console.info("No patient documents found.");
      }

      setPatientDocuments(allFiles);
    } catch (error) {
      console.error("Failed to fetch patient documents:", error);
      setPatientDocuments([]);
    }
  };

// const handleViewDetails = async (app) => {
//   // 🧩 Normalize keys safely with multiple fallbacks
//   const normalizedApp = {
//     ...app,
//     patientName: app.patientName || app.name || "N/A",
//     patientEmail: app.patientEmail || app.email || "N/A",
//     patientPhone: app.patientPhone || app.phone || "N/A",
//     patientGender: app.patientGender || app.gender || "N/A",
//     patientAge: app.patientAge ?? app.age ?? "N/A",
//     department: app.department || app.specialization || "N/A",
//     reason: app.reason || app.description || "N/A",
//     type: app.appointmentType || app.type || "N/A",
//     slotStart: app.slotStart || app.startTime || "N/A",
//     slotEnd: app.slotEnd || app.endTime || "N/A",
//     slotDuration: app.slotDuration ?? app.duration ?? "N/A",
//     is_prescription: app.is_prescription ?? false,
//     createdAt: app.createdAt || app.created_at || null,
//   };

//   console.log("🩺 Normalized appointment for modal:", normalizedApp);

//   setSelectedAppointment(normalizedApp);
//   setShowModal(true);

//   // 🩻 Fetch patient documents from backend
//   try {
//     const user = JSON.parse(localStorage.getItem("hmsUser"));
//     const token = user?.token;

//     if (!token) {
//       alert("Doctor authentication expired. Please log in again.");
//       return;
//     }

//     const patient_id = app.patientId || app.patient_id;
//     if (!patient_id) {
//       alert("Cannot fetch uploads — patient ID missing.");
//       return;
//     }

//     const res = await fetch(
//       `http://localhost:3000/patient-uploads/${patient_id}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     if (!res.ok) {
//       console.warn("⚠️ Upload fetch failed:", res.status);
//       setPatientDocuments([]);
//       return;
//     }

//     const data = await res.json();

//     const allFiles = (data.uploads || []).flatMap((upload) =>
//       (upload.files || []).map((file) => ({
//         url: file.file_url,
//         type:
//           file.file_type === "pdf"
//             ? "application/pdf"
//             : file.file_type || "",
//         name: upload.diagnosis || "Patient Document",
//       }))
//     );

//     setPatientDocuments(allFiles);
//   } catch (error) {
//     console.error("❌ Failed to fetch patient documents:", error);
//     setPatientDocuments([]);
//   }
// };


  useEffect(() => {
    if (appointments && appointments.length > 0) {
      const uniquePatientIds = [
        ...new Set(appointments.map((app) => app.patientId)),
      ];
      localStorage.setItem("patientIds", JSON.stringify(uniquePatientIds));
    }
  }, [appointments]);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Upcoming Appointments
      </h2>

      {activeAppointments.length > 0 ? (
        <div className="space-y-4">
          {activeAppointments.map((app) => (
            <div
              key={app.id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                {/* Left Side */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-gray-500">
                    <i className="bi bi-person text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {app.patientName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                      <span className="flex items-center">
                        <i className="bi bi-calendar3 mr-1.5"></i>
                        {new Date(app.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center">
                        <i className="bi bi-clock mr-1.5"></i>
                        {app.time}
                      </span>
                    </div>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <AppointmentTypeBadge type={app.type} />
                      <SessionTypeBadge sessionType={app.sessionType} />
                    </div>
                  </div>
                </div>

                {/* Right Side: Buttons */}
                <div className="mt-4 sm:mt-0 flex-shrink-0 flex sm:flex-col items-center gap-2 self-end sm:self-start">
                  <button
                    onClick={() => handleViewDetails(app)}
                    className="px-4 py-2 w-full border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handlePrescription(app)}
                    className="bg-green-600 text-white px-4 py-2 w-full rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <i className="bi bi-file-earmark-medical"></i>
                    Prescription
                  </button>

                  <button
                    onClick={() => onHandwritten(app)}
                    className="bg-yellow-500 text-white px-4 py-2 w-full rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <i className="bi bi-pencil"></i>
                    Handwritten Prescription
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <i className="bi bi-calendar-check text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-500">
            No Upcoming Appointments
          </h3>
          <p className="text-gray-400 mt-1">
            All scheduled appointments will be displayed here.
          </p>
        </div>
      )}

      {/* Patient Documents Modal */}
      {showModal && selectedAppointment && (
        <AppointmentDetailModal
          appointment={selectedAppointment}
          patientDocuments={patientDocuments}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
