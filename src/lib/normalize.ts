import { z } from 'zod';
import { toISO, slugifyId } from './utils';

export const HostawayReviewSchema = z.object({
  id: z.number(),
  type: z.string(),
  status: z.string().optional().default('published'),
  rating: z.number().nullable().optional(),
  publicReview: z.string().optional().default(''),
  reviewCategory: z.array(z.object({ category: z.string(), rating: z.number() })).optional().default([]),
  submittedAt: z.string(),
  guestName: z.string().optional(),
  listingName: z.string(),
});

export type HostawayReview = z.infer<typeof HostawayReviewSchema>;

export type NormalizedReview = {
  id: string;
  listingId: string;
  listingName: string;
  type: string;
  channel: string;
  status: string;
  rating: number | null;
  categories: { key: string; rating: number }[];
  comment: string;
  submittedAt: string; // ISO
  guestName?: string;
  source: 'mock' | 'api';
};

export function normalizeHostaway(items: HostawayReview[], source: 'mock' | 'api' = 'mock'): NormalizedReview[] {
  return items.map((r) => ({
    id: String(r.id),
    listingName: r.listingName,
    listingId: slugifyId(r.listingName),
    type: r.type,
    channel: 'hostaway',
    status: r.status ?? 'published',
    rating: r.rating ?? null,
    categories: (r.reviewCategory ?? []).map((c) => ({ key: c.category, rating: c.rating })),
    comment: r.publicReview ?? '',
    submittedAt: toISO(r.submittedAt),
    guestName: r.guestName,
    source,
  }));
}