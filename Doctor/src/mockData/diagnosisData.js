// Mock database of ICD-10 codes
export const icd10Codes = [
  { code: "I10", description: "Essential (primary) hypertension" },
  { code: "J45.909", description: "Unspecified asthma, uncomplicated" },
  { code: "E11.9", description: "Type 2 diabetes mellitus without complications" },
  { code: "J02.9", description: "Acute pharyngitis, unspecified (Sore throat)" },
  { code: "R51", description: "Headache" },
  { code: "M54.5", description: "Low back pain" },
  { code: "K21.9", description: "Gastro-esophageal reflux disease without esophagitis" },
  { code: "A60.0", description: "Herpesviral infection of genitalia and urogenital tract" },
  { code: "Z00.00", description: "Encounter for general adult medical examination without abnormal findings" },
  { code: "R05", description: "Cough" },
];

// Mock database of common treatments and procedures
export const commonTreatments = {
  medications: [
    { id: "med1", name: "Lisinopril 10mg", category: "Medication" },
    { id: "med2", name: "Metformin 500mg", category: "Medication" },
    { id: "med3", name: "Amoxicillin 500mg", category: "Medication" },
    { id: "med4", name: "Ibuprofen 400mg", category: "Medication" },
  ],
  procedures: [
    { id: "proc1", name: "ECG", category: "Procedure" },
    { id: "proc2", name: "X-Ray Chest", category: "Procedure" },
    { id: "proc3", name: "Wound dressing", category: "Procedure" },
  ],
  therapies: [
    { id: "ther1", name: "Physical Therapy", category: "Therapy" },
    { id: "ther2", name: "Cognitive Behavioral Therapy (CBT)", category: "Therapy" },
  ],
  lifestyle: [
    { id: "life1", name: "Low-sodium diet", category: "Lifestyle" },
    { id: "life2", name: "Increase fluid intake", category: "Lifestyle" },
    { id: "life3", name: "Regular exercise (30 mins/day)", category: "Lifestyle" },
  ],
};