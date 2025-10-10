"use client";
import React, { useState } from "react";
import { DoctorModuleContext } from "./DoctorModuleContext";
import DoctorSidebar from "../../components/doctor/layout/DoctorSidebar";
import DoctorTopBar from "../../components/doctor/layout/DoctorTopBar";
import { useDoctorAuth } from "../../hooks/useDoctorAuth";
import { useMobileDetection } from "../../hooks/useMobileDetection";
import {
  getDoctorAppointments,
  getDoctorAppointmentHistory,
  getDoctorProfile,
} from "../../services/doctorAppointmentsApi";

export default function DoctorLayout({ children }) {
  const { user, loading, isAuthenticated } = useDoctorAuth();
  const { isMobile } = useMobileDetection();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(null);

  // Fetch appointments on load
  React.useEffect(() => {
    const load = async () => {
      if (!user) return;
      try {
        const res = await getDoctorAppointments({
          hospitalId: user.hospitalId,
          doctorId: user.doctorid,
        });
        // normalize for UI list
        const list = (res.appointments || []).map((a) => {
          const normalizedDate = (() => {
            try {
              if (!a.date) return "";
              // a.date may be already YYYY-MM-DD or a Date/ISO string
              const d =
                typeof a.date === "string" &&
                a.date.length === 10 &&
                a.date.includes("-")
                  ? a.date
                  : new Date(a.date).toISOString().split("T")[0];
              return d;
            } catch {
              return a.date || "";
            }
          })();
          return {
            id: a._id,
            patientEmail: a.patientEmail || "",
            patientName: a.patientName || a.patient_name || "",
            date: normalizedDate,
            time:
              a.slotStart && a.slotEnd
                ? `${a.slotStart} - ${a.slotEnd}`
                : a.time || "",
            slotStart: a.slotStart || "",
            slotEnd: a.slotEnd || "",
            type: (a.appointmentType || "walk-in").toLowerCase(),
            sessionType: a.sessionType || a.reason || "Consultation",
            status: (a.status || "scheduled").toLowerCase(),
            patientDetails: {
              age: a.age || "",
              gender: a.gender || "",
              contact: a.contact || "",
              email: a.patientEmail || "",
              sessionType: a.sessionType || "",
              medicalHistoryFiles: [],
            },
          };
        });
        setAppointments(list);
      } catch (e) {
        console.error("Failed to load appointments", e);
      }
    };
    load();
  }, [user]);

  // Fetch doctor profile
  React.useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getDoctorProfile();
        setProfile(res?.doctor || res || null);
      } catch (e) {
        // ignore silently
      }
    };
    if (isAuthenticated) loadProfile();
  }, [isAuthenticated]);

  const [prescriptionContext, setPrescriptionContext] = useState(null);

  // Navigation function for prescription
  const handleNavigateToPrescription = (patientData) => {
    setPrescriptionContext(patientData);
    // Persist context for reload/redirect
    if (typeof window !== "undefined") {
      localStorage.setItem("prescriptionContext", JSON.stringify(patientData));
      window.location.href = "/doctor/prescriptions";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Doctor Portal...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  return (
    <DoctorModuleContext.Provider
      value={{
        handleNavigateToPrescription,
        appointments,
        setAppointments,
        prescriptionContext,
        setPrescriptionContext,
        user: profile
          ? { ...user, name: profile?.name || user?.email?.split("@")[0] }
          : user,
      }}
    >
      <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Sidebar Overlay for Mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Doctor Sidebar */}
        <div
          className={`
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          ${isMobile ? "fixed inset-y-0 z-50 w-64" : "relative"}
          transition-transform duration-300 ease-in-out
        `}
        >
          <DoctorSidebar
            open={sidebarOpen}
            setOpen={setSidebarOpen}
            user={
              profile
                ? { ...user, name: profile?.name || user?.email?.split("@")[0] }
                : user
            }
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navigation Bar */}
          <DoctorTopBar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            user={
              profile
                ? { ...user, name: profile?.name || user?.email?.split("@")[0] }
                : user
            }
          />
          {/* Render children (doctor modules) */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </DoctorModuleContext.Provider>
  );
}
