export const doctorStats = {
  appointments: { value: "12", trend: "+2", positive: true },
  consultations: { value: "5", trend: "-1", positive: false },
  prescriptions: { value: "8", trend: "+3", positive: true },
  labReports: { value: "3", trend: "0", positive: true }
};

export const patientQueue = [
  {
    id: 1,
    patientId: "P001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    time: "09:00 AM",
    status: "waiting",
    priority: "high",
    condition: "Hypertension Follow-up",
    bloodPressure: "140/90",
    temperature: "98.6°F",
    waitingTime: "15 min"
  },
  {
    id: 2,
    patientId: "P002",
    name: "Maria Garcia",
    age: 32,
    gender: "Female",
    time: "09:15 AM",
    status: "in-consultation",
    priority: "urgent",
    condition: "Chest Pain",
    bloodPressure: "150/95",
    temperature: "99.1°F",
    waitingTime: "In Consultation"
  },
  {
    id: 3,
    patientId: "P003",
    name: "Robert Johnson",
    age: 68,
    gender: "Male",
    time: "09:30 AM",
    status: "waiting",
    priority: "medium",
    condition: "Diabetes Check",
    bloodPressure: "130/85",
    temperature: "98.4°F",
    waitingTime: "30 min"
  },
  {
    id: 4,
    patientId: "P004",
    name: "Sarah Chen",
    age: 29,
    gender: "Female",
    time: "09:45 AM",
    status: "waiting",
    priority: "routine",
    condition: "Pregnancy Checkup",
    bloodPressure: "120/80",
    temperature: "98.8°F",
    waitingTime: "45 min"
  }
];

export const todaySchedule = [
  {
    id: 1,
    patientId: "P005",
    patientName: "Emma Davis",
    time: "10:00 AM",
    type: "new-patient",
    typeLabel: "New Patient",
    location: "Room 201",
    duration: "30 min",
    isVideo: false,
    status: "confirmed",
    condition: "General Consultation",
    notes: "First visit, needs complete checkup"
  },
  {
    id: 2,
    patientId: "P006",
    patientName: "Michael Brown",
    time: "11:30 AM",
    type: "follow-up",
    typeLabel: "Follow-up",
    location: "Room 201",
    duration: "45 min",
    isVideo: true,
    status: "confirmed",
    condition: "Post-Surgery Check",
    notes: "Video consultation - remote patient"
  },
  {
    id: 3,
    patientId: "P007",
    patientName: "Lisa Wang",
    time: "02:15 PM",
    type: "consultation",
    typeLabel: "Consultation",
    location: "Room 205",
    duration: "30 min",
    isVideo: false,
    status: "confirmed",
    condition: "Cardiology Review",
    notes: "ECG results discussion"
  },
  {
    id: 4,
    patientId: "P008",
    patientName: "David Miller",
    time: "04:00 PM",
    type: "procedure",
    typeLabel: "Procedure",
    location: "OR-3",
    duration: "60 min",
    isVideo: false,
    status: "scheduled",
    condition: "Minor Surgery",
    notes: "Local anesthesia required"
  }
];

export const quickActions = [
  {
    id: "new-patient",
    icon: "bi bi-plus-circle",
    label: "New Patient",
    description: "Register new patient",
    color: "green",
    module: "patients"
  },
  {
    id: "write-prescription",
    icon: "bi bi-file-medical",
    label: "Write Rx",
    description: "Create prescription",
    color: "blue",
    module: "prescriptions"
  },
  {
    id: "lab-order",
    icon: "bi bi-clipboard-plus",
    label: "Lab Order",
    description: "Request lab tests",
    color: "purple",
    module: "lab-reports"
  },
  {
    id: "video-call",
    icon: "bi bi-camera-video",
    label: "Video Call",
    description: "Start consultation",
    color: "orange",
    module: "video-consult"
  },
  {
    id: "add-diagnosis",
    icon: "bi bi-journal-medical",
    label: "Add Diagnosis",
    description: "Record diagnosis",
    color: "red",
    module: "diagnosis"
  },
  {
    id: "discharge",
    icon: "bi bi-file-earmark-text",
    label: "Discharge",
    description: "Create summary",
    color: "indigo",
    module: "discharge"
  }
];