// // src/app/api/reviews/hostaway/raw/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { fetchHostawayLive } from '@/lib/hostaway';

// export const dynamic = 'force-dynamic';

// export async function GET(req: NextRequest) {
//   try {
//     // We’ll just fetch-live then return the raw array we normalize from.
//     const params = req.nextUrl.searchParams;
//     // Call the same fetch used in route.ts but return pre-normalized content:
//     const res = await fetch(
//       (process.env.HOSTAWAY_BASE_URL ?? 'https://api.hostaway.com/v1/reviews') +
//         (params.size ? `?${params.toString()}` : ''),
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HOSTAWAY_API_KEY ?? ''}`,
//           'Content-Type': 'application/json',
//           ...(process.env.HOSTAWAY_ACCOUNT_ID
//             ? { 'X-Account-Id': process.env.HOSTAWAY_ACCOUNT_ID }
//             : {}),
//         },
//         cache: 'no-store',
//       }
//     );

//     if (!res.ok) {
//       const text = await res.text();
//       return NextResponse.json(
//         { ok: false, status: res.status, error: text },
//         { status: res.status }
//       );
//     }

//     const json = await res.json();
//     return NextResponse.json(json);
//   } catch (e: any) {
//     return NextResponse.json({ ok: false, error: e?.message }, { status: 500 });
//   }
// }
