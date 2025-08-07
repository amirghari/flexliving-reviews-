import mock from '@/data/mockReviews.json';
import { HostawayReviewSchema, normalizeHostaway, NormalizedReview } from './normalize';

export type ReviewsResponse =
  | { ok: true; total: number; page: number; pageSize: number; data: NormalizedReview[] }
  | { ok: false; error: string };

export function getNormalizedMock(): NormalizedReview[] {
  const parsed = mock.result.map((r) => HostawayReviewSchema.parse(r));
  return normalizeHostaway(parsed, 'mock');
}

export function applyFilters(
  data: NormalizedReview[],
  params: URLSearchParams
): NormalizedReview[] {
  let out = [...data];
  const listingId = params.get('listingId');
  const channel = params.get('channel');
  const type = params.get('type');
  const status = params.get('status');
  const minRating = params.get('minRating');
  const from = params.get('from') ? new Date(params.get('from')!) : null;
  const to = params.get('to') ? new Date(params.get('to')!) : null;
  const q = params.get('q')?.toLowerCase();

  if (listingId) out = out.filter((r) => r.listingId === listingId);
  if (channel) out = out.filter((r) => r.channel === channel);
  if (type) out = out.filter((r) => r.type === type);
  if (status) out = out.filter((r) => r.status === status);
  if (minRating) out = out.filter((r) => (r.rating ?? 0) >= Number(minRating));
  if (from) out = out.filter((r) => new Date(r.submittedAt) >= from);
  if (to) out = out.filter((r) => new Date(r.submittedAt) <= to);
  if (q) out = out.filter((r) => (r.comment + ' ' + (r.guestName ?? '')).toLowerCase().includes(q));

  const sort = params.get('sort') ?? 'date_desc';
  out.sort((a, b) => {
    switch (sort) {
      case 'date_asc':
        return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      case 'rating_desc':
        return (b.rating ?? -1) - (a.rating ?? -1);
      case 'rating_asc':
        return (a.rating ?? -1) - (b.rating ?? -1);
      default:
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    }
  });

  return out;
}