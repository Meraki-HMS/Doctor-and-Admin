"use client";
import { useState, useContext, useEffect } from "react";
import { DoctorModuleContext } from "../DoctorModuleContext";
import UpcomingAppointments from "../../../components/doctor/appointments/UpcomingAppointments";
import VirtualConsultation from "../../../components/doctor/appointments/VirtualConsultation";
import History from "../../../components/doctor/appointments/History";
import AppointmentDetailModal from "../../../components/doctor/appointments/AppointmentDetailModal";
import {
  getAppointmentWithPatientDetails,
  markPrescriptionGiven,
} from "../../../services/doctorAppointmentsApi";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loadingDetailId, setLoadingDetailId] = useState(null);
  const [historyDate, setHistoryDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [historyData, setHistoryData] = useState(null);

  const context = useContext(DoctorModuleContext);

  if (!context) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { appointments, setAppointments, handleNavigateToPrescription } =
    context;

  const handlePrescription = async (appointmentId) => {
    try {
      const user =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("hmsUser") || "{}")
          : null;
      await markPrescriptionGiven({
        hospitalId: user?.hospitalId,
        appointmentId,
      });
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === appointmentId ? { ...app, status: "completed" } : app
        )
      );
      const patientData = appointments.find((app) => app.id === appointmentId);
      if (patientData) {
        handleNavigateToPrescription(patientData);
      }
    } catch (e) {
      alert("Failed to mark prescription as given");
      console.error(e);
    }
  };

  const handleHandwritten = (appointmentId) => {
    setAppointments((prev) => {
      const updated = prev.map((app) =>
        app.id === appointmentId ? { ...app, status: "completed" } : app
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("appointments", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const now = new Date();

  // Upcoming appointments: scheduled in future
  const upcomingAppointments = appointments
    .filter((a) => new Date(`${a.date}T${a.slotStart}`) > now)
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.slotStart}`) - new Date(`${b.date}T${b.slotStart}`)
    );

  // Virtual consultation appointments: future only
  const virtualAppointments = appointments.filter(
    (a) => a.type === "virtual" && new Date(`${a.date}T${a.slotStart}`) > now
  );

  // History appointments: past appointments only
  const historyAppointments = appointments.filter(
    (a) => new Date(`${a.date}T${a.slotEnd}`) <= now
  );

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user =
          typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("hmsUser") || "{}")
            : null;
        if (!user?.hospitalId || !user?.doctorid) return;
        const { getDoctorAppointmentHistory } = await import(
          "../../../services/doctorAppointmentsApi"
        );
        const res = await getDoctorAppointmentHistory({
          hospitalId: user.hospitalId,
          doctorId: user.doctorid,
          date: historyDate,
        });
        setHistoryData(res?.history || null);
      } catch (e) {
        setHistoryData(null);
      }
    };
    if (activeTab === "history") fetchHistory();
  }, [activeTab, historyDate]);

  const handleViewDetails = async (app) => {
    try {
      setLoadingDetailId(app.id);
      const res = await getAppointmentWithPatientDetails({
        appointmentId: app.id,
      });
      const enriched = {
        ...app,
        patientDetails: {
          age: res.patient?.age || app.patientDetails?.age || "",
          gender: res.patient?.gender || app.patientDetails?.gender || "",
          contact: res.patient?.contact || app.patientDetails?.contact || "",
          email: res.patient?.email || app.patientDetails?.email || "",
          sessionType: app.sessionType,
          medicalHistoryFiles: app.patientDetails?.medicalHistoryFiles || [],
        },
      };
      setSelectedAppointment(enriched);
    } catch (e) {
      console.error(e);
      setSelectedAppointment(app);
    } finally {
      setLoadingDetailId(null);
    }
  };

  return (
    <>
      <main className="flex-1 p-4 lg:p-6 bg-gray-50/70">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Appointments
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your schedule and patient appointments
          </p>
        </div>
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-3 font-medium text-sm rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === "upcoming"
                  ? "bg-white border-gray-200 border-t border-x text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <i className="bi bi-calendar-check mr-2"></i>Upcoming Appointments
            </button>
            <button
              onClick={() => setActiveTab("virtual")}
              className={`px-4 py-3 font-medium text-sm rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === "virtual"
                  ? "bg-white border-gray-200 border-t border-x text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <i className="bi bi-camera-video mr-2"></i>Virtual Consultation
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-3 font-medium text-sm rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === "history"
                  ? "bg-white border-gray-200 border-t border-x text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <i className="bi bi-clock-history mr-2"></i>Appointment History
            </button>
          </nav>
        </div>
        <div className="bg-white p-6 rounded-b-2xl rounded-r-2xl shadow-sm border border-gray-200">
          {activeTab === "upcoming" && (
            <UpcomingAppointments
              appointments={upcomingAppointments}
              onViewDetails={handleViewDetails}
              onComplete={handlePrescription}
              onHandwritten={handleHandwritten}
            />
          )}
          {activeTab === "virtual" && (
            <VirtualConsultation appointments={virtualAppointments} />
          )}
          {activeTab === "history" && (
            <History
              appointments={historyAppointments}
              onViewDetails={handleViewDetails}
              historyDate={historyDate}
              setHistoryDate={setHistoryDate}
            />
          )}
        </div>
      </main>
      {selectedAppointment && (
        <AppointmentDetailModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </>
  );
}
