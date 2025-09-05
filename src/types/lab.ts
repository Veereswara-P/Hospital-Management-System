export interface LabTest {
  id: string; // Auto-generated
  patientId: string;
  testType: string; // e.g., 'Complete Blood Count', 'Thyroid Panel'
  orderedBy: string; // Doctor's name or ID
  sampleId: string;
  testDate: string; // ISO string format
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  result?: string; // Optional field for the test result
}