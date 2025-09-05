import { NextResponse, NextRequest } from 'next/server';
import { Appointment } from '@/types/appointment';
import path from 'path';
import { promises as fs } from 'fs';

const jsonFilePath = path.join(process.cwd(), 'data', 'appointments.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const appointments = JSON.parse(fileContents);
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json({ message: 'Error reading from database' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newAppointment: Omit<Appointment, 'id'> = await request.json();
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const appointments: Appointment[] = JSON.parse(fileContents);
    const appointmentWithId: Appointment = { ...newAppointment, id: `A${Date.now()}` };
    appointments.push(appointmentWithId);
    await fs.writeFile(jsonFilePath, JSON.stringify(appointments, null, 2));
    return NextResponse.json(appointmentWithId, { status: 201 });
  } catch (error) {
    console.error('API POST Error:', error);
    return NextResponse.json({ message: 'Error writing to database' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedAppointment: Appointment = await request.json();
    if (!updatedAppointment.id) {
      return NextResponse.json({ message: 'Appointment ID is required' }, { status: 400 });
    }
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const appointments: Appointment[] = JSON.parse(fileContents);
    const appointmentIndex = appointments.findIndex((p) => p.id === updatedAppointment.id);
    if (appointmentIndex === -1) {
      return NextResponse.json({ message: 'Appointment not found' }, { status: 404 });
    }
    appointments[appointmentIndex] = updatedAppointment;
    await fs.writeFile(jsonFilePath, JSON.stringify(appointments, null, 2));
    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    console.error('API PUT Error:', error);
    return NextResponse.json({ message: 'Error updating appointment' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const appointmentId = searchParams.get('id');
    if (!appointmentId) {
      return NextResponse.json({ message: 'Appointment ID is required' }, { status: 400 });
    }
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const appointments: Appointment[] = JSON.parse(fileContents);
    const updatedAppointments = appointments.filter((p) => p.id !== appointmentId);
    if (appointments.length === updatedAppointments.length) {
      return NextResponse.json({ message: 'Appointment not found' }, { status: 404 });
    }
    await fs.writeFile(jsonFilePath, JSON.stringify(updatedAppointments, null, 2));
    return NextResponse.json({ message: 'Appointment deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('API DELETE Error:', error);
    return NextResponse.json({ message: 'Error deleting appointment' }, { status: 500 });
  }
}