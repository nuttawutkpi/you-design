import { join } from 'node:path';

export function projectShareDir(root: string, projectId: string): string {
  return join(root, '.od', 'shared', projectId);
}