import { NextResponse } from 'next/server';
import postgres from 'postgres';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not defined');
    }

    const sql = postgres(connectionString);
    const result = await sqlSELECT NOW();

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Neon Database',
      time: result[0].now,
    });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
      success: false,
      message: 'Failed to connect to Neon Database',
      error: errMessage,
    }, { status: 500 });
  }
}