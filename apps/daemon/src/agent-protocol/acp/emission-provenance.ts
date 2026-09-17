export type EmissionProvenance =
  | { kind: 'user-direct' }
  | { kind: 'tool-result'; toolCallId: string }
  | { kind: 'agent-synthesis'; parentIds: string[] };

export function isEmissionProvenance(value: unknown): value is EmissionProvenance {
  if (!value || typeof value !== 'object') return false;
  const v = value as { kind?: unknown };
  return v.kind === 'user-direct' || v.kind === 'tool-result' || v.kind === 'agent-synthesis';
}