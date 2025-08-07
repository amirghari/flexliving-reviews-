// Client-side helpers for approvals in localStorage
export type ApprovalMap = Record<string, boolean>; // key: `${listingId}:${reviewId}`

const KEY = 'flexliving_approvals_v1';

export function getApprovals(): ApprovalMap {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

export function setApproval(listingId: string, reviewId: string, approved: boolean) {
  const k = `${listingId}:${reviewId}`;
  const m = getApprovals();
  if (approved) m[k] = true; else delete m[k];
  localStorage.setItem(KEY, JSON.stringify(m));
}

export function isApproved(listingId: string, reviewId: string): boolean {
  const m = getApprovals();
  return !!m[`${listingId}:${reviewId}`];
}

export function exportApprovals(): string {
  return JSON.stringify(getApprovals(), null, 2);
}

export function importApprovals(json: string) {
  const o = JSON.parse(json);
  localStorage.setItem(KEY, JSON.stringify(o));
}