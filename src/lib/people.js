import { PHYSIOS } from '../data/physios.js';
import { SEED_GROUPS, SEED_LIBRARY, SEED_SHOTS } from '../data/care.js';

// 'me' is the signed-in physio (physio mode).
export function physioName(id, s) {
  if (id === 'me') return s && s.name ? `Dr. ${s.name}` : 'You';
  const p = PHYSIOS.find((x) => x.id === id);
  return p ? p.name : 'Physio';
}
export const initialOf = (name) => name.replace('Dr. ', '').slice(0, 1).toUpperCase();

export const allLibrary = (s) => [...(s.library || []), ...SEED_LIBRARY];
export const allGroups = (s) => [...(s.groups || []), ...SEED_GROUPS].sort((a, b) => a.when - b.when);
export const allShots = (s) => [...s.myPosts.filter((p) => p.type === 'shot'), ...SEED_SHOTS];

// Which physio wrote a post (seed articles are by Dr. Syson Jose).
export const postPhysio = (p) => p.physio || (/jose/i.test(p.author || '') ? 'jose' : null);
