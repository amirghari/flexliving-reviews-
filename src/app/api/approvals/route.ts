import { NextRequest, NextResponse } from 'next/server';
import { kvAvailable, kvGetApprovals, kvSetApproval, kvOverwriteAll } from '@/lib/kv';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!kvAvailable()) return NextResponse.json({ ok: true, map: {} });
    const map = await kvGetApprovals();
    return NextResponse.json({ ok: true, map });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message ?? 'read error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!kvAvailable()) return NextResponse.json({ ok: false, error: 'KV not configured' }, { status: 501 });
    const { listingId, reviewId, approved } = await req.json();
    if (!listingId || !reviewId) return NextResponse.json({ ok: false, error: 'missing ids' }, { status: 400 });
    await kvSetApproval(`${listingId}:${reviewId}`, !!approved);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message ?? 'write error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!kvAvailable()) return NextResponse.json({ ok: false, error: 'KV not configured' }, { status: 501 });
    const body = await req.json();
    const map = (body?.map ?? {}) as Record<string, boolean>;
    await kvOverwriteAll(map);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message ?? 'overwrite error' }, { status: 500 });
  }
}