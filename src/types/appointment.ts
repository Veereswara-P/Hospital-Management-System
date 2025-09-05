export interface Appointment {
  id: string; // Auto-generated
  patientId: string; // Links to a patient
  doctorName: string;
  appointmentDate: string; // e.g., "2025-12-25T10:30:00"
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}