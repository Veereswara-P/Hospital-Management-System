import { NextResponse, NextRequest } from 'next/server';
import { InventoryItem } from '@/types/pharmacy';
import path from 'path';
import { promises as fs } from 'fs';

const jsonFilePath = path.join(process.cwd(), 'data', 'inventory.json');

// GET function
export async function GET() {
  try {
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const inventory = JSON.parse(fileContents);
    return NextResponse.json(inventory);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading from database' }, { status: 500 });
  }
}

// POST function (Create)
export async function POST(request: Request) {
  try {
    const newItem: Omit<InventoryItem, 'id'> = await request.json();
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    let inventory: InventoryItem[] = JSON.parse(fileContents);
    const itemWithId: InventoryItem = { ...newItem, id: `MED${Date.now()}` };
    inventory.push(itemWithId);
    await fs.writeFile(jsonFilePath, JSON.stringify(inventory, null, 2));
    return NextResponse.json(itemWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error writing to database' }, { status: 500 });
  }
}

// PUT function (Update)
export async function PUT(request: Request) {
  try {
    const updatedItem: InventoryItem = await request.json();
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    let inventory: InventoryItem[] = JSON.parse(fileContents);
    const itemIndex = inventory.findIndex((item) => item.id === updatedItem.id);
    if (itemIndex === -1) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }
    inventory[itemIndex] = updatedItem;
    await fs.writeFile(jsonFilePath, JSON.stringify(inventory, null, 2));
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating item' }, { status: 500 });
  }
}

// DELETE function
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('id');
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    let inventory: InventoryItem[] = JSON.parse(fileContents);
    const updatedInventory = inventory.filter((item) => item.id !== itemId);
    if (inventory.length === updatedInventory.length) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }
    await fs.writeFile(jsonFilePath, JSON.stringify(updatedInventory, null, 2));
    return NextResponse.json({ message: 'Item deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting item' }, { status: 500 });
  }
}