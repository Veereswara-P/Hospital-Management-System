import AppointmentForm from "@/features/appointmentManagement/AppointmentForm";
import AppointmentList from "@/features/appointmentManagement/AppointmentList";

export default function AppointmentsPage() {
  return (
    <div>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
}