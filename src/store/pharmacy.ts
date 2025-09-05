export interface InventoryItem {
  id: string; // Auto-generated
  name: string;
  batchNumber: string;
  quantity: number;
  supplier: string;
  expiryDate: string; // e.g., "2026-12-31"
}