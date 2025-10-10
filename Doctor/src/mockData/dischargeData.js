export const dischargeSummaryData = [
  {
    id: 1,
    summaryId: "DS-001",
    patientId: "P001",
    patientName: "John Smith",
    admissionDate: "2024-01-10",
    dischargeDate: "2024-01-15",
    admittingDiagnosis: "Acute Myocardial Infarction",
    dischargeDiagnosis: "Stable Angina, Hypertension",
    proceduresPerformed: ["Coronary Angioplasty", "Stent Placement"],
    hospitalCourse: "Patient admitted with chest pain, diagnosed with AMI. Underwent successful angioplasty. Stable post-procedure and monitored for 5 days. Vitals stable upon discharge.",
    medicationsOnDischarge: [
      { name: "Aspirin", dosage: "81mg", frequency: "Once daily" },
      { name: "Atorvastatin", dosage: "40mg", frequency: "Once daily at bedtime" },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
    ],
    followUp: "Follow up with Dr. Alan Grant (Cardiology) in 2 weeks. Appointment scheduled for 2024-01-29.",
    status: "completed", // completed, draft
  },
  {
    id: 2,
    summaryId: "DS-002",
    patientId: "P002",
    patientName: "Maria Garcia",
    admissionDate: "2024-01-18",
    dischargeDate: "2024-01-22",
    admittingDiagnosis: "Exacerbation of Asthma",
    dischargeDiagnosis: "Asthma, well-controlled",
    proceduresPerformed: ["Nebulizer therapy", "Oxygen supplementation"],
    hospitalCourse: "Patient admitted with severe shortness of breath. Managed with continuous nebulization and steroids. Showed significant improvement over 4 days. Discharged with a new medication plan.",
    medicationsOnDischarge: [
      { name: "Fluticasone/Salmeterol Inhaler", dosage: "250/50 mcg", frequency: "Twice daily" },
      { name: "Montelukast", dosage: "10mg", frequency: "Once daily" },
    ],
    followUp: "Follow up with primary care physician in 1 week for review.",
    status: "completed",
  },
];