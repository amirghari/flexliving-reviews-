// Approvals: local cache + optional server persistence via /api/approvals

export type ApprovalMap = Record<string, boolean>; // key: `${listingId}:${reviewId}`
const KEY = 'flexliving_approvals_v1';

function getLocal(): ApprovalMap {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
function setLocal(map: ApprovalMap) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(map));
}

export function isApproved(listingId: string, reviewId: string): boolean {
  const m = getLocal();
  return !!m[`${listingId}:${reviewId}`];
}

export function exportApprovals(): string {
  return JSON.stringify(getLocal(), null, 2);
}

export function importApprovals(json: string) {
  const o = JSON.parse(json);
  setLocal(o);
  // try server overwrite, but don't crash UI if it fails
  fetch('/api/approvals', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ map: o }) })
    .catch(() => {});
}

// NEW: fetch server map on app start (call this from dashboard page once)
export async function syncApprovalsFromServer() {
  try {
    const res = await fetch('/api/approvals', { cache: 'no-store' });
    const j = await res.json();
    if (j?.ok && j.map) {
      // merge server → local
      const local = getLocal();
      setLocal({ ...local, ...j.map });
    }
  } catch { /* ignore */ }
}

// Call this to toggle + persist
export async function setApproval(listingId: string, reviewId: string, approved: boolean) {
  const k = `${listingId}:${reviewId}`;
  const m = getLocal();
  if (approved) m[k] = true; else delete m[k];
  setLocal(m);

  // best-effort server persist
  fetch('/api/approvals', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ listingId, reviewId, approved }),
  }).catch(() => {});
}