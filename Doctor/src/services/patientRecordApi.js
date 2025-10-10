// import httpClient from "./httpClient";

// // Fetch prescription history for a doctor
// export async function fetchPrescriptionHistory(doctorId, token) {
//   return httpClient.get(
//     `/api/patient-records/doctor/${doctorId}/prescriptions`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// }
import httpClient from "./httpClient";

// Fetch prescription history for a doctor
export async function fetchPrescriptionHistory(doctorId, token) {
  return httpClient.get(
    `/patient-records/doctor/${doctorId}/prescriptions`, // removed /api
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

