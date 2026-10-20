// Pain Bingo card: 25 symptoms in reading order (B1, I1, N1 … O5).
// Matches the MotionPlus "Bingo for Pain" document; each square's exercises,
// tips and safety advice live in bingoGuide.js at the same index.

export const BINGO = [
  'Neck stiffness', 'Dry eyes', 'Wrist pain', 'Shoulder ache', 'Tension headache',
  'Lower back pain', 'Slouching', 'Eye strain', 'Stiff fingers', 'Tight hamstrings',
  'Tech neck', 'Fatigue', 'Limited rotation', 'Sore wrists', 'Back knots',
  'Brain fog', 'Dry eyes+', 'Numbness', 'Anxiety', 'Burning eyes',
  'Low energy', 'Jaw tension', 'Racing heart', 'Cold hands', 'Exhaustion',
];

// Symptoms that should prompt a medical check rather than a game.
export const BINGO_FLAGS = ['Numbness', 'Racing heart'];

export const XP_PER_TILE = 5;
export const XP_PER_LINE = 50;

export const LINES = (() => {
  const L = [];
  for (let r = 0; r < 5; r++) L.push([0, 1, 2, 3, 4].map((c) => r * 5 + c));
  for (let c = 0; c < 5; c++) L.push([0, 1, 2, 3, 4].map((r) => r * 5 + c));
  L.push([0, 6, 12, 18, 24], [4, 8, 12, 16, 20]);
  return L;
})();
