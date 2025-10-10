const express = require("express");
const router = express.Router();
const {
  createPatientRecord,
  getPatientRecords,
  getSingleRecord,
  updatePatientRecord,
  deletePatientRecord,
  getDoctorPrescriptions,
} = require("../controllers/patientRecordController");

const { isLoggedIn } = require("../middleware/authMiddleware");

// ✅ Get all prescription records for a doctor
router.get(
  "/doctor/:doctorId/prescriptions",
  isLoggedIn,
  getDoctorPrescriptions
);

// ✅ Create a new patient record
router.post("/", isLoggedIn, createPatientRecord);

// ✅ Get all records for a patient
router.get("/patient/:patientId", isLoggedIn, getPatientRecords);

// ✅ Get single record by record ID
router.get("/:id", isLoggedIn, getSingleRecord);

// ✅ Update a record
router.put("/:id", isLoggedIn, updatePatientRecord);

// ✅ Delete a record
router.delete("/:id", isLoggedIn, deletePatientRecord);

module.exports = router;
