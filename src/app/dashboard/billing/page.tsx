import InvoiceForm from "@/features/billing/InvoiceForm";
import InvoiceList from "@/features/billing/InvoiceList";

export default function BillingPage() {
  return (
    <div>
      <InvoiceForm />
      <InvoiceList />
    </div>
  );
}