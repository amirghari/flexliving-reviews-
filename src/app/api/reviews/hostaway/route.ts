import { NextRequest, NextResponse } from 'next/server';
import { getNormalizedMock, applyFilters } from '@/lib/hostaway';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const all = getNormalizedMock();
    const filtered = applyFilters(all, params);

    const page = Number(params.get('page') || 1);
    const pageSize = Number(params.get('pageSize') || 50);
    const start = (page - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);

    return NextResponse.json({
      ok: true,
      total: filtered.length,
      page,
      pageSize,
      data: pageData,
      source: 'mock',
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'Mock fetch failed' },
      { status: 500 }
    );
  }
}