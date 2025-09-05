export interface User {
  id: string;
  username: string;
  role: 'Admin' | 'Doctor' | 'Nurse' | 'Receptionist' | 'Lab Technician';
  // Note: In a real app, this would be a securely hashed password
  password?: string; 
  status: 'Active' | 'Disabled';
}