import httpClient from "./httpClient";

// Fetch prescription history for a doctor
export async function fetchPrescriptionHistory(doctorId, token) {
  return httpClient.get(
    `/api/patient-records/doctor/${doctorId}/prescriptions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
