import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { ok: false, error: 'Google Reviews integration not implemented in this MVP.' },
    { status: 501 }
  );
}