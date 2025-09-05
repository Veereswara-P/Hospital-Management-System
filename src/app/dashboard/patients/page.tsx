import PatientForm from "@/features/patientManagement/PatientForm";
import PatientList from "@/features/patientManagement/PatientList";

export default function PatientsPage() {
  return (
    <div>
      <PatientForm />
      <PatientList />
    </div>
  );
}