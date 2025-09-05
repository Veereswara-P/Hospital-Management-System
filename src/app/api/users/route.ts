import { NextResponse, NextRequest } from 'next/server';
import { User } from '@/types/user';
import path from 'path';
import { promises as fs } from 'fs';

const jsonFilePath = path.join(process.cwd(), 'data', 'users.json');

// GET, POST, PUT, DELETE functions for users...
// (This will be very similar to the other API route files you have created)
export async function GET() {
  try {
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const users = JSON.parse(fileContents);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading users' }, { status: 500 });
  }
}
// POST function (Create)
export async function POST(request: Request) {
  try {
    const newUser: Omit<User, 'id'> = await request.json();
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    let users: User[] = JSON.parse(fileContents);
    // Note: In a real app, the password should be securely hashed before saving.
    const userWithId: User = { ...newUser, id: `U${Date.now()}` };
    users.push(userWithId);
    await fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2));
    return NextResponse.json(userWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}

// PUT function (Update)
export async function PUT(request: Request) {
  try {
    const updatedUser: User = await request.json();
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    let users: User[] = JSON.parse(fileContents);
    const userIndex = users.findIndex((u) => u.id === updatedUser.id);
    if (userIndex === -1) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    users[userIndex] = updatedUser;
    await fs.writeFile(jsonFilePath, JSON.stringify(users, null, 2));
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }
}

// DELETE function
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    let users: User[] = JSON.parse(fileContents);
    const updatedUsers = users.filter((u) => u.id !== userId);
    if (users.length === updatedUsers.length) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    await fs.writeFile(jsonFilePath, JSON.stringify(updatedUsers, null, 2));
    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
  }
}
