export interface ClinicalNote {
  id: string;
  patientId: string;
  note: string;
  author: string; // e.g., "Dr. Gupta"
  timestamp: string; // ISO Date String
  type: 'Note' | 'Alert';
}