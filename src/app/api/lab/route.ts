import { NextResponse, NextRequest } from 'next/server';
import { LabTest } from '@/types/lab';
import path from 'path';
import { promises as fs } from 'fs';

const jsonFilePath = path.join(process.cwd(), 'data', 'lab_tests.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const labTests = JSON.parse(fileContents);
    return NextResponse.json(labTests);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading from database' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newTest: Omit<LabTest, 'id'> = await request.json();
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    let tests: LabTest[] = JSON.parse(fileContents);
    const testWithId: LabTest = { ...newTest, id: `LT${Date.now()}` };
    tests.push(testWithId);
    await fs.writeFile(jsonFilePath, JSON.stringify(tests, null, 2));
    return NextResponse.json(testWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating lab test' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedTest: LabTest = await request.json();
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    let tests: LabTest[] = JSON.parse(fileContents);
    const testIndex = tests.findIndex((t) => t.id === updatedTest.id);
    if (testIndex === -1) {
      return NextResponse.json({ message: 'Test not found' }, { status: 404 });
    }
    tests[testIndex] = updatedTest;
    await fs.writeFile(jsonFilePath, JSON.stringify(tests, null, 2));
    return NextResponse.json(updatedTest, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating lab test' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const testId = searchParams.get('id');
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    let tests: LabTest[] = JSON.parse(fileContents);
    const updatedTests = tests.filter((t) => t.id !== testId);
    if (tests.length === updatedTests.length) {
      return NextResponse.json({ message: 'Test not found' }, { status: 404 });
    }
    await fs.writeFile(jsonFilePath, JSON.stringify(updatedTests, null, 2));
    return NextResponse.json({ message: 'Test deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting lab test' }, { status: 500 });
  }
}