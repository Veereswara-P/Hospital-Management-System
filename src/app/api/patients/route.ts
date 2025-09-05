import { NextResponse, NextRequest } from 'next/server';
import { Patient } from '@/types/patient';
import path from 'path';
import { promises as fs } from 'fs';

const jsonFilePath = path.join(process.cwd(), 'data', 'patients.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const patients = JSON.parse(fileContents);
    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading from database' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newPatient: Omit<Patient, 'id'> = await request.json();
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const patients: Patient[] = JSON.parse(fileContents);
    const patientWithId: Patient = { ...newPatient, id: `P${Date.now()}` };
    patients.push(patientWithId);
    await fs.writeFile(jsonFilePath, JSON.stringify(patients, null, 2));
    return NextResponse.json(patientWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error writing to database' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedPatient: Patient = await request.json();
    if (!updatedPatient.id) {
      return NextResponse.json({ message: 'Patient ID is required for update' }, { status: 400 });
    }
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const patients: Patient[] = JSON.parse(fileContents);
    const patientIndex = patients.findIndex((p) => p.id === updatedPatient.id);
    if (patientIndex === -1) {
      return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
    }
    patients[patientIndex] = updatedPatient;
    await fs.writeFile(jsonFilePath, JSON.stringify(patients, null, 2));
    return NextResponse.json(updatedPatient, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating patient' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('id');
    if (!patientId) {
      return NextResponse.json({ message: 'Patient ID is required' }, { status: 400 });
    }
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const patients: Patient[] = JSON.parse(fileContents);
    const updatedPatients = patients.filter((p) => p.id !== patientId);
    if (patients.length === updatedPatients.length) {
      return NextResponse.json({ message: 'Patient not found' }, { status: 404 });
    }
    await fs.writeFile(jsonFilePath, JSON.stringify(updatedPatients, null, 2));
    return NextResponse.json({ message: 'Patient deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting patient' }, { status: 500 });
  }
}