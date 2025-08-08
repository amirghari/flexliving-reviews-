import { kv } from '@vercel/kv';

export function kvAvailable() {
  return !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;
}

export const APPROVALS_KEY = 'approvals:v1';

export async function kvGetApprovals(): Promise<Record<string, boolean>> {
  if (!kvAvailable()) return {};
  const map = await kv.get<Record<string, boolean>>(APPROVALS_KEY);
  return map || {};
}

export async function kvSetApproval(key: string, approved: boolean) {
  if (!kvAvailable()) return;
  const current = (await kvGetApprovals()) as Record<string, boolean>;
  if (approved) current[key] = true;
  else delete current[key];
  await kv.set(APPROVALS_KEY, current);
}

export async function kvOverwriteAll(map: Record<string, boolean>) {
  if (!kvAvailable()) return;
  await kv.set(APPROVALS_KEY, map);
}