import mock from '@/data/mockReviews.json';
import { slugify } from '@/lib/slug'

import {
  HostawayReviewSchema,
  normalizeHostaway,
  type NormalizedReview,
} from './normalize';

export type ReviewsResponse =
  | { ok: true; total: number; page: number; pageSize: number; data: NormalizedReview[] }
  | { ok: false; error: string };

export function getNormalizedMock(): NormalizedReview[] {
  const parsed = mock.result.map((r) => HostawayReviewSchema.parse(r));
  return normalizeHostaway(parsed, 'mock');
}

// robust date parse for "YYYY-MM-DD HH:mm:ss" or ISO strings
function parseReviewDate(s: string): Date {
  if (!s) return new Date(NaN);
  // Ensure "T" between date/time so JS parses it reliably
  const isoish = s.includes('T') ? s : s.replace(' ', 'T');
  return new Date(isoish);
}

export function applyFilters(
  data: NormalizedReview[],
  params: URLSearchParams
): NormalizedReview[] {
  let out = [...data];

  const sort = params.get('sort') ?? 'date_desc';
  const minRating = params.get('minRating');
  const q = params.get('q')?.toLowerCase();

  // Date range (inclusive)
  const fromStr = params.get('from'); // "YYYY-MM-DD"
  const toStr = params.get('to');     // "YYYY-MM-DD"

  const from = fromStr ? new Date(fromStr + 'T00:00:00') : null;
  const to = toStr ? new Date(toStr + 'T23:59:59.999') : null;

  const listingIdParam = params.get('listingId'); // this will be the slug from the URL
  if (listingIdParam) {
    const wantedSlug = slugify(listingIdParam);
    out = out.filter((r) => {
      const byExact = r.listingId && r.listingId === listingIdParam;
      const byNameSlug = r.listingName && slugify(r.listingName) === wantedSlug;
      return byExact || byNameSlug;
    });
  }

  // ---- apply ----
  if (minRating) out = out.filter((r) => (r.rating ?? 0) >= Number(minRating));

  if (from) out = out.filter((r) => {
    const d = parseReviewDate(r.submittedAt);
    return d >= from;
  });

  if (to) out = out.filter((r) => {
    const d = parseReviewDate(r.submittedAt);
    return d <= to;
  });

  if (q) {
    out = out.filter((r) =>
      (r.comment + ' ' + (r.guestName ?? '') + ' ' + (r.listingName ?? ''))
        .toLowerCase()
        .includes(q)
    );
  }

  // sort
  out.sort((a, b) => {
    switch (sort) {
      case 'date_asc':
        return +parseReviewDate(a.submittedAt) - +parseReviewDate(b.submittedAt);
      case 'rating_desc':
        return (b.rating ?? -1) - (a.rating ?? -1);
      case 'rating_asc':
        return (a.rating ?? -1) - (b.rating ?? -1);
      default:
        return +parseReviewDate(b.submittedAt) - +parseReviewDate(a.submittedAt);
    }
  });

  return out;
}