import { NextResponse, NextRequest } from 'next/server';
import { Invoice } from '@/types/billing';
import path from 'path';
import { promises as fs } from 'fs';

const jsonFilePath = path.join(process.cwd(), 'data', 'invoices.json');

// GET function
export async function GET() {
  try {
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const invoices = JSON.parse(fileContents);
    return NextResponse.json(invoices);
  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json({ message: 'Error reading from database' }, { status: 500 });
  }
}

// POST, PUT, DELETE functions should also have try...catch blocks like the one above.
// Here is the complete file with all functions correctly handled.

export async function POST(request: Request) {
  try {
    const newInvoice: Omit<Invoice, 'id'> = await request.json();
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    let invoices: Invoice[] = JSON.parse(fileContents);
    const invoiceWithId: Invoice = { ...newInvoice, id: `INV${Date.now()}` };
    invoices.push(invoiceWithId);
    await fs.writeFile(jsonFilePath, JSON.stringify(invoices, null, 2));
    return NextResponse.json(invoiceWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error writing to database' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedInvoice: Invoice = await request.json();
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    let invoices: Invoice[] = JSON.parse(fileContents);
    const invoiceIndex = invoices.findIndex(inv => inv.id === updatedInvoice.id);
    if (invoiceIndex === -1) {
      return NextResponse.json({ message: 'Invoice not found' }, { status: 404 });
    }
    invoices[invoiceIndex] = updatedInvoice;
    await fs.writeFile(jsonFilePath, JSON.stringify(invoices, null, 2));
    return NextResponse.json(updatedInvoice, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating invoice' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const invoiceId = searchParams.get('id');
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    let invoices: Invoice[] = JSON.parse(fileContents);
    const updatedInvoices = invoices.filter(inv => inv.id !== invoiceId);
    if (invoices.length === updatedInvoices.length) {
      return NextResponse.json({ message: 'Invoice not found' }, { status: 404 });
    }
    await fs.writeFile(jsonFilePath, JSON.stringify(updatedInvoices, null, 2));
    return NextResponse.json({ message: 'Invoice deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting invoice' }, { status: 500 });
  }
}