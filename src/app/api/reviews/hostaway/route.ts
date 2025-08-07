import { NextRequest, NextResponse } from 'next/server';
import { applyFilters, getNormalizedMock } from '@/lib/hostway';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const all = getNormalizedMock();
    const filtered = applyFilters(all, req.nextUrl.searchParams);

    const page = Number(req.nextUrl.searchParams.get('page') || 1);
    const pageSize = Number(req.nextUrl.searchParams.get('pageSize') || 50);
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return NextResponse.json({ ok: true, total: filtered.length, page, pageSize, data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message ?? 'Unknown error' }, { status: 500 });
  }
}