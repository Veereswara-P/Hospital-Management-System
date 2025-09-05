export interface StaffMember {
  id: string; // Auto-generated
  firstName: string;
  lastName: string;
  role: 'Doctor' | 'Nurse' | 'Admin' | 'Technician';
  department: string;
  contactNumber: string;
  status: 'Active' | 'Inactive' | 'On Leave';
}