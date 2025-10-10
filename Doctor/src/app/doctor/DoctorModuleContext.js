"use client";

import { createContext } from 'react';

// This context will now provide navigation, appointment data, and a way to update that data.
export const DoctorModuleContext = createContext({
  handleNavigateToPrescription: () => console.error("Navigation function not provided"),
  appointments: [],
  setAppointments: () => console.error("setAppointments function not provided"),
  prescriptionContext: null,
  setPrescriptionContext: () => {},
});

