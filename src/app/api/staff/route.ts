import { NextResponse, NextRequest } from 'next/server';
import { StaffMember } from '@/types/staff';
import path from 'path';
import { promises as fs } from 'fs';

const jsonFilePath = path.join(process.cwd(), 'data', 'staff.json');

// GET function to read all staff
export async function GET() {
  try {
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const staff = JSON.parse(fileContents);
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading from database' }, { status: 500 });
  }
}

// POST function to create a new staff member
export async function POST(request: Request) {
  try {
    const newStaffMember: Omit<StaffMember, 'id'> = await request.json();
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const staff: StaffMember[] = JSON.parse(fileContents);
    const staffWithId: StaffMember = { ...newStaffMember, id: `S${Date.now()}` };
    staff.push(staffWithId);
    await fs.writeFile(jsonFilePath, JSON.stringify(staff, null, 2));
    return NextResponse.json(staffWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error writing to database' }, { status: 500 });
  }
}

// PUT function to update a staff member
export async function PUT(request: Request) {
  try {
    const updatedStaffMember: StaffMember = await request.json();
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const staff: StaffMember[] = JSON.parse(fileContents);
    const staffIndex = staff.findIndex((s) => s.id === updatedStaffMember.id);

    if (staffIndex === -1) {
      return NextResponse.json({ message: 'Staff member not found' }, { status: 404 });
    }
    staff[staffIndex] = updatedStaffMember;
    await fs.writeFile(jsonFilePath, JSON.stringify(staff, null, 2));
    return NextResponse.json(updatedStaffMember, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating staff member' }, { status: 500 });
  }
}

// DELETE function to remove a staff member
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const staffId = searchParams.get('id');
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const staff: StaffMember[] = JSON.parse(fileContents);
    const updatedStaff = staff.filter((s) => s.id !== staffId);

    if (staff.length === updatedStaff.length) {
      return NextResponse.json({ message: 'Staff member not found' }, { status: 404 });
    }
    await fs.writeFile(jsonFilePath, JSON.stringify(updatedStaff, null, 2));
    return NextResponse.json({ message: 'Staff member deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting staff member' }, { status: 500 });
  }
}