// Mock database of specialists
export const specialistsData = [
  { id: "spec1", name: "Dr. Alan Grant", specialty: "Cardiology", hospital: "Meraki Hospital (Internal)", contact: "ext. 123" },
  { id: "spec2", name: "Dr. Ellie Sattler", specialty: "Neurology", hospital: "Meraki Hospital (Internal)", contact: "ext. 124" },
  { id: "spec3", name: "Dr. Ian Malcolm", specialty: "Orthopedics", hospital: "City General Hospital (External)", contact: "555-0101" },
  { id: "spec4", name: "Dr. John Hammond", specialty: "Pediatrics", hospital: "Meraki Hospital (Internal)", contact: "ext. 125" },
  { id: "spec5", name: "Dr. Sarah Harding", specialty: "Dermatology", hospital: "Westside Clinic (External)", contact: "555-0102" },
];

// Mock data for referral history
export const referralHistoryData = [
  {
    id: 1,
    referralId: "REF-001",
    patientId: "P001",
    patientName: "John Smith",
    referralDate: "2024-01-20",
    referredTo: "Dr. Alan Grant",
    specialty: "Cardiology",
    reason: "Patient presented with recurring chest pain and high blood pressure. Requires cardiac evaluation.",
    status: "completed", // pending, accepted, completed, rejected
    notes: "Dr. Grant's office has scheduled an ECG for next week."
  },
  {
    id: 2,
    referralId: "REF-002",
    patientId: "P003",
    patientName: "Robert Johnson",
    referralDate: "2024-01-22",
    referredTo: "Dr. Ian Malcolm",
    specialty: "Orthopedics",
    reason: "Follow-up for chronic arthritis and knee pain. Patient requires specialist consultation for potential knee replacement.",
    status: "accepted",
    notes: "Appointment scheduled for 2024-02-10 at City General."
  },
  {
    id: 3,
    referralId: "REF-003",
    patientId: "P004",
    patientName: "Sarah Chen",
    referralDate: "2024-01-25",
    referredTo: "Dr. John Hammond",
    specialty: "Pediatrics",
    reason: "Newborn checkup and vaccination schedule planning.",
    status: "pending",
    notes: "Awaiting confirmation from Dr. Hammond's office."
  }
];