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

export function routineById(id) {
  if (ROUTINES[id]) return { id, ...ROUTINES[id] };
  if (MOVES[id]) return { id, name: MOVES[id].name, summary: `${MOVES[id].focus} · ${MOVES[id].sec} s`, moves: [id] };
  return null;
}

// Which routine helps which body system (used for recommendations).
export const AREA_ROUTINE = {
  neck: 'chin-tucks', shoulders: 'shoulder-rolls', back: 'spinal-twist',
  wrists: 'wrist-flexor', legs: 'hamstring-reach', eyes: 'eye-reset',
};
