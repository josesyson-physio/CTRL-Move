// Body map zones. x/y are in the 200×400 body figure's coordinates.
// `area` links each zone to one of the six body systems used in scoring.
// Front view: the person faces you, so screen-left is their RIGHT side.

export const AREAS = [
  { id: 'neck', label: 'Neck', short: 'Neck' },
  { id: 'shoulders', label: 'Shoulders', short: 'Shldr' },
  { id: 'back', label: 'Back', short: 'Back' },
  { id: 'wrists', label: 'Wrists', short: 'Wrist' },
  { id: 'legs', label: 'Hips and legs', short: 'Legs' },
  { id: 'eyes', label: 'Eyes', short: 'Eyes' },
];

export const FRONT = [
  { id: 'head', label: 'Head', x: 100, y: 30, area: 'neck' },
  { id: 'neck', label: 'Neck', x: 100, y: 66, area: 'neck' },
  { id: 'r-shoulder', label: 'Right shoulder', x: 66, y: 88, area: 'shoulders' },
  { id: 'l-shoulder', label: 'Left shoulder', x: 134, y: 88, area: 'shoulders' },
  { id: 'chest', label: 'Chest', x: 100, y: 110, area: 'shoulders' },
  { id: 'abdomen', label: 'Abdomen', x: 100, y: 160, area: 'back' },
  { id: 'r-elbow', label: 'Right elbow', x: 38, y: 160, area: 'wrists' },
  { id: 'l-elbow', label: 'Left elbow', x: 162, y: 160, area: 'wrists' },
  { id: 'r-wrist', label: 'Right wrist', x: 29, y: 226, area: 'wrists' },
  { id: 'l-wrist', label: 'Left wrist', x: 171, y: 226, area: 'wrists' },
  { id: 'hips', label: 'Hips', x: 100, y: 210, area: 'legs' },
  { id: 'r-knee', label: 'Right knee', x: 84, y: 310, area: 'legs' },
  { id: 'l-knee', label: 'Left knee', x: 116, y: 310, area: 'legs' },
  { id: 'r-ankle', label: 'Right ankle', x: 84, y: 380, area: 'legs' },
  { id: 'l-ankle', label: 'Left ankle', x: 116, y: 380, area: 'legs' },
];

export const BACK = [
  { id: 'neck', label: 'Neck', x: 100, y: 64, area: 'neck' },
  { id: 'l-shoulder', label: 'Left shoulder', x: 64, y: 88, area: 'shoulders' },
  { id: 'r-shoulder', label: 'Right shoulder', x: 136, y: 88, area: 'shoulders' },
  { id: 'upper-back', label: 'Upper back', x: 100, y: 104, area: 'back' },
  { id: 'mid-back', label: 'Mid back', x: 100, y: 142, area: 'back' },
  { id: 'lower-back', label: 'Lower back', x: 100, y: 178, area: 'back' },
  { id: 'l-elbow', label: 'Left elbow', x: 38, y: 160, area: 'wrists' },
  { id: 'r-elbow', label: 'Right elbow', x: 162, y: 160, area: 'wrists' },
  { id: 'glutes', label: 'Glutes', x: 100, y: 220, area: 'legs' },
  { id: 'l-hamstring', label: 'Left hamstring', x: 82, y: 264, area: 'legs' },
  { id: 'r-hamstring', label: 'Right hamstring', x: 118, y: 264, area: 'legs' },
  { id: 'l-calf', label: 'Left calf', x: 82, y: 346, area: 'legs' },
  { id: 'r-calf', label: 'Right calf', x: 118, y: 346, area: 'legs' },
];

export function findZone(key) {
  const [view, ...rest] = key.split(':');
  const id = rest.join(':');
  const list = view === 'b' ? BACK : FRONT;
  const z = list.find((q) => q.id === id);
  return z ? { ...z, key, view, label: z.label + (view === 'b' ? ' · back' : '') } : null;
}
