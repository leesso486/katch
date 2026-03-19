import { NextResponse } from 'next/server';
import postgres from 'postgres';

export async function GET() {
  try {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not defined");
    }

    const sql = postgres(connectionString);
    const result = await sql`SELECT NOW()`;

    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Neon Database',
      time: result[0].now,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to connect to Neon Database',
      error: error.message,
    }, { status: 500 });
  }
}
