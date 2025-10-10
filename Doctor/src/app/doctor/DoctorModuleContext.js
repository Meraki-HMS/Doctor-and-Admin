// "use client";

// import { createContext } from 'react';

// // This context will now provide navigation, appointment data, and a way to update that data.
// export const DoctorModuleContext = createContext({
//   handleNavigateToPrescription: () => console.error("Navigation function not provided"),
//   appointments: [],
//   setAppointments: () => console.error("setAppointments function not provided"),
//   prescriptionContext: null,
//   setPrescriptionContext: () => {},
// });

"use client";
import { createContext, useState } from "react";

export const DoctorModuleContext = createContext(null);

export function DoctorModuleProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [prescriptionContext, setPrescriptionContext] = useState(null);

  // Track prescription tab in PrescriptionsPage
  const [prescriptionTab, setPrescriptionTab] = useState("history"); // "history" or "new"

  const value = {
    appointments,
    setAppointments,
    prescriptionContext,
    setPrescriptionContext,
    prescriptionTab,
    setPrescriptionTab,
  };

  return (
    <DoctorModuleContext.Provider value={value}>
      {children}
    </DoctorModuleContext.Provider>
  );
}
