import UserForm from "@/features/admin/UserForm";
import UserList from "@/features/admin/UserList";

export default function AdminPage() {
  return (
    <div>
      <UserForm />
      <UserList />
    </div>
  );
}