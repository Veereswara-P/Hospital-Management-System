import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { to, body } = await request.json();

    if (!to || !body) {
      return NextResponse.json({ message: 'Missing "to" or "body" field' }, { status: 400 });
    }

    // --- New Local Simulation Logic ---
    // Instead of calling an external service, we just log to the server console.
    console.log('\n\n===================================');
    console.log('  -- LOCAL SMS SIMULATOR --');
    console.log(`  Recipient: ${to}`);
    console.log(`  Message: ${body}`);
    console.log('===================================\n\n');
    // --- End of New Logic ---

    return NextResponse.json({ message: 'SMS simulated successfully in terminal' }, { status: 200 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to simulate SMS', error: errorMessage }, { status: 500 });
  }
}