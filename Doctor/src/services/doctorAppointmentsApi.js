import http from "./httpClient";

const API_BASE = ""; // base handled by http client

export async function getDoctorAppointments({ hospitalId, doctorId }) {
  const url = `/doctors/${hospitalId}/${doctorId}/appointments`;
  const { data } = await http.get(url);
  return data;
}

export async function getDoctorAppointmentsByDate({
  hospitalId,
  doctorId,
  date,
}) {
  const url = `/doctors/${hospitalId}/${doctorId}/appointments/by-date`;
  const { data } = await http.get(url, { params: { date } });
  return data;
}

export async function getDoctorAppointmentHistory({
  hospitalId,
  doctorId,
  date,
}) {
  const url = `/doctors/${hospitalId}/${doctorId}/history`;
  const { data } = await http.get(url, { params: { date } });
  return data;
}

export async function getAppointmentWithPatientDetails({ appointmentId }) {
  const url = `/doctors/appointments/${appointmentId}/details`;
  const { data } = await http.get(url);
  return data;
}

export async function markPrescriptionGiven({ hospitalId, appointmentId }) {
  const url = `/doctors/appointment/${hospitalId}/${appointmentId}/prescription`;
  const { data } = await http.put(url);
  return data;
}

export async function getDoctorProfile() {
  const { data } = await http.get(`/doctors/profile`);
  return data;
}
