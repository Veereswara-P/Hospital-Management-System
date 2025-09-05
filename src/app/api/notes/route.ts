import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const jsonFilePath = path.join(process.cwd(), 'data', 'notes.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const notes = JSON.parse(fileContents);
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading notes' }, { status: 500 });
  }
}