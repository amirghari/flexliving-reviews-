import { NextRequest, NextResponse } from 'next/server';
import { HostawayReviewSchema, normalizeHostaway } from '@/lib/normalize';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items = Array.isArray(body) ? body : body?.result || [];
    const parsed = items.map((i: unknown) => HostawayReviewSchema.parse(i));
    const normalized = normalizeHostaway(parsed, 'api');
    return NextResponse.json({ ok: true, data: normalized });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message ?? 'Invalid payload' }, { status: 400 });
  }
}