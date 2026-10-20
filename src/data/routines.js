import { BINGO_GUIDE } from './bingoGuide.js';
import { LINES } from './bingo.js';

// Quick Relief moves and routines.
// Add a physio video to any move with `video: 'https://…/clip.mp4'` and the
// player shows it automatically. `locked: true` shows "coming soon".

export const MOVES = {
  'cat-cow': { name: 'Cat Cow Pose', tag: 'Back', focus: 'Spine mobility', sec: 45, cue: 'On hands and knees, slowly round your back up, then let it dip down. Move with your breath.' },
  'giraffe-neck': { name: 'Giraffe Neck Stretch', tag: 'Neck', focus: 'Cervical tension', sec: 30, locked: true, cue: 'Video guide coming soon.' },
  'wrist-flexor': { name: 'Wrist Flexor Stretch', tag: 'Arms', focus: 'Tendinopathy relief', sec: 30, cue: 'Arm out, palm up. Gently pull your fingers back with the other hand until you feel a stretch. Switch sides.' },
  'spinal-twist': { name: 'Seated Spinal Twist', tag: 'Back', focus: 'Thoracic rotation', sec: 45, cue: 'Sit tall, hold the back of your chair, and rotate your upper body gently to one side. Keep your hips facing forward. Switch sides.' },
  'hamstring-reach': { name: 'Hamstring Reach', tag: 'Legs', focus: 'Posterior chain', sec: 60, cue: 'Sit on the edge of your chair with one leg straight, heel down. Hinge forward from the hips until you feel a stretch behind the thigh.' },
  'shoulder-rolls': { name: 'Cervical Shoulder Rolls', tag: 'Shoulders', focus: 'Scapular mobility', sec: 30, cue: 'Roll your shoulders up, back and down in slow circles. Then reverse the direction.' },
  'chin-tucks': { name: 'Deep Chin Tucks', tag: 'Neck', focus: 'Suboccipital release', sec: 30, cue: 'Sit tall. Draw your chin straight back, as if making a double chin. Hold 5 seconds, release, repeat.' },
  'calf-raises': { name: 'Eccentric Calf Raises', tag: 'Legs', focus: 'Calf strength', sec: 45, draft: true, cue: 'Rise up on both toes, then lower slowly on one leg over 3 seconds. Hold a desk for balance.' },
  'eye-reset': { name: 'Eye Reset', tag: 'Eyes', focus: '20-20-20 rule', sec: 20, cue: 'Look at something about 6 metres away for 20 seconds. Then blink slowly ten times.' },
};

// Single-move routines appear in the Quick Relief list, in this order.
export const RELIEF_LIST = ['cat-cow', 'giraffe-neck', 'wrist-flexor', 'spinal-twist', 'hamstring-reach', 'shoulder-rolls', 'chin-tucks', 'calf-raises'];

// Multi-move routines.
export const ROUTINES = {
  'desk-reset': { name: 'Desk reset', summary: 'Neck, wrists and eyes · 3 moves · about 1.5 min', moves: ['chin-tucks', 'wrist-flexor', 'eye-reset'] },
};

const toMove = (g, e) => ({ name: e.title, tag: g.name, focus: e.dose || 'Physio guided', sec: e.sec, cue: e.text });
const minutes = (moves) => Math.max(1, Math.round(moves.reduce((s, m) => s + m.sec, 0) / 60));

// Resolves a routine id to { id, name, summary, moves: [move objects] }.
//   'desk-reset'        a multi-move routine from ROUTINES
//   'chin-tucks'        a single move from MOVES
//   'bingo:<slug>'      the 5 exercises for one Pain Bingo symptom
//   'line:<n>'          one short exercise per symptom on bingo line n
export function routineById(id) {
  if (!id) return null;
  if (id.startsWith('bingo:')) {
    const g = BINGO_GUIDE.find((x) => x.slug === id.slice(6));
    if (!g) return null;
    const moves = g.exercises.map((e) => toMove(g, e));
    return { id, name: `${g.name} relief`, summary: `${moves.length} exercises · about ${minutes(moves)} min`, moves };
  }
  if (id.startsWith('line:')) {
    const line = LINES[Number(id.slice(5))];
    if (!line) return null;
    // One short exercise per symptom, never repeating one already in the routine.
    const used = new Set();
    const moves = line.map((i) => {
      const g = BINGO_GUIDE[i];
      const fresh = g.exercises.filter((x) => !used.has(x.title.toLowerCase()));
      const e = fresh.find((x) => x.sec <= 90) || fresh[0] || g.exercises[0];
      used.add(e.title.toLowerCase());
      return toMove(g, e);
    });
    return { id, name: 'Bingo line routine', summary: `${moves.length} moves · about ${minutes(moves)} min`, moves };
  }
  if (ROUTINES[id]) return { id, ...ROUTINES[id], moves: ROUTINES[id].moves.map((m) => ({ id: m, ...MOVES[m] })) };
  if (MOVES[id]) return { id, name: MOVES[id].name, summary: `${MOVES[id].focus} · ${MOVES[id].sec} s`, moves: [{ id, ...MOVES[id] }] };
  return null;
}

// Which routine helps which body system (used for recommendations).
export const AREA_ROUTINE = {
  neck: 'chin-tucks', shoulders: 'shoulder-rolls', back: 'spinal-twist',
  wrists: 'wrist-flexor', legs: 'hamstring-reach', eyes: 'eye-reset',
};
