// Care features: Health Shots, physio exercise libraries, tele-therapy
// slots, group sessions, chat rules and the story-insight template.
//
// Everything marked `sample: true` is placeholder content so the screens can
// be reviewed. Replace it with real content from each physio.

import { PHYSIOS } from './physios.js';

export const physioById = (id) => PHYSIOS.find((p) => p.id === id) || null;
export const shortName = (name) => name.replace('Dr. ', '');

/* ---------- animated demonstrations ---------- */
// Each motion is an animated figure. "AI demo" picks one from the words a
// physio writes; "Virtual demonstration" lets the physio pick it directly.
export const MOTIONS = {
  'chin-tuck': { name: 'Chin tuck', area: 'Neck', words: ['chin', 'tuck', 'neck', 'cervical', 'head'] },
  'shoulder-roll': { name: 'Shoulder roll', area: 'Shoulders', words: ['shoulder', 'roll', 'shrug', 'scapula', 'trapez'] },
  twist: { name: 'Seated twist', area: 'Upper back', words: ['twist', 'rotat', 'thoracic', 'spine', 'upper back'] },
  'arm-raise': { name: 'Overhead reach', area: 'Shoulders', words: ['reach', 'overhead', 'raise', 'arm', 'lat'] },
  'side-bend': { name: 'Side bend', area: 'Lower back', words: ['side', 'lateral', 'bend', 'waist', 'lower back'] },
  'sit-stand': { name: 'Sit to stand', area: 'Hips', words: ['squat', 'stand', 'knee', 'hip', 'leg', 'glute'] },
  wrist: { name: 'Wrist stretch', area: 'Wrists', words: ['wrist', 'forearm', 'hand', 'finger', 'mouse'] },
  breathe: { name: 'Breathing reset', area: 'Whole body', words: ['breath', 'breathe', 'diaphragm', 'relax', 'stress'] },
};

// Pick the best-matching motion for a piece of text (the "AI demo").
export function pickMotion(text) {
  const t = (text || '').toLowerCase();
  let best = 'breathe';
  let score = 0;
  Object.entries(MOTIONS).forEach(([id, m]) => {
    const n = m.words.reduce((s, w) => s + (t.includes(w) ? 1 : 0), 0);
    if (n > score) { score = n; best = id; }
  });
  return best;
}

export const DEMO_TYPES = [
  { id: 'ai', name: 'AI demo', hint: 'Ctrl+Move animates it from your written cue' },
  { id: 'video', name: 'My video', hint: 'Upload a clip of you demonstrating it' },
  { id: 'virtual', name: 'Virtual demo', hint: 'Pick a 3D-style figure, set tempo and reps' },
];

/* ---------- physio exercise libraries ---------- */
export const SEED_LIBRARY = [
  { id: 'jose-1', physio: 'jose', name: 'Deep chin tucks', area: 'Neck', demo: 'virtual', motion: 'chin-tuck', tempo: 'slow', reps: 10, sec: 40, cue: 'Sit tall. Glide your chin straight back, as if making a double chin. Hold 5 seconds, then release.' },
  { id: 'jose-2', physio: 'jose', name: 'Seated thoracic twist', area: 'Upper back', demo: 'ai', motion: 'twist', tempo: 'slow', reps: 8, sec: 45, cue: 'Cross your arms over your chest. Rotate your upper back to one side, breathe out, return. Switch sides.' },
  { id: 'jose-3', physio: 'jose', name: 'Box breathing reset', area: 'Whole body', demo: 'ai', motion: 'breathe', tempo: 'slow', reps: 6, sec: 60, cue: 'Breathe in for 4, hold for 4, out for 4, hold for 4. Let your shoulders drop on every breath out.' },
  { id: 'akhila-1', physio: 'akhila', name: 'Shoulder blade rolls', area: 'Shoulders', demo: 'virtual', motion: 'shoulder-roll', tempo: 'normal', reps: 10, sec: 30, cue: 'Roll your shoulders up, back and down in slow circles. Squeeze gently at the back.' },
  { id: 'akhila-2', physio: 'akhila', name: 'Overhead lat reach', area: 'Shoulders', demo: 'ai', motion: 'arm-raise', tempo: 'normal', reps: 8, sec: 40, cue: 'Reach both arms overhead, palms facing in. Stretch tall through your sides, then lower slowly.' },
  { id: 'venkaty-1', physio: 'venkaty', name: 'Desk sit-to-stand', area: 'Hips', demo: 'virtual', motion: 'sit-stand', tempo: 'normal', reps: 10, sec: 45, cue: 'Feet hip-width apart. Stand up without using your hands, then sit down slowly over 3 seconds.' },
  { id: 'venkaty-2', physio: 'venkaty', name: 'Standing side bend', area: 'Lower back', demo: 'ai', motion: 'side-bend', tempo: 'slow', reps: 6, sec: 40, cue: 'Stand tall, reach one arm overhead and bend gently to the opposite side. Breathe, then switch.' },
  { id: 'pavithran-1', physio: 'pavithran', name: 'Mouse-hand wrist stretch', area: 'Wrists', demo: 'virtual', motion: 'wrist', tempo: 'slow', reps: 5, sec: 30, cue: 'Arm out, palm up. Gently pull your fingers back until you feel a stretch. Hold 10 seconds, switch.' },
];
SEED_LIBRARY.forEach((x) => { x.sample = true; });

/* ---------- Health Shots ---------- */
// Short vertical clips (60 s or less). Sample shots use the animated figure
// until each physio uploads their own video.
export const SEED_SHOTS = [
  { id: 'shot-1', physio: 'jose', title: 'Your neck isn’t weak. It’s stuck.', beats: ['8 hours looking down at a screen', 'The deep neck muscles switch off', '10 chin tucks switch them back on'], motion: 'chin-tuck', move: 'chin-tucks', tag: 'Neck', sec: 30, views: 0 },
  { id: 'shot-2', physio: 'akhila', title: 'Shoulders up by your ears?', beats: ['Stress lives in your upper traps', 'Your shoulders creep up without you noticing', 'Roll them back and down, 10 times'], motion: 'shoulder-roll', move: 'shoulder-rolls', tag: 'Shoulders', sec: 30, views: 0 },
  { id: 'shot-3', physio: 'jose', title: 'The middle back is the foundation', beats: ['When it stiffens, your neck pays for it', 'Rotation is what desk work takes away', 'Give it back: a seated twist, both sides'], motion: 'twist', move: 'spinal-twist', tag: 'Upper back', sec: 45, views: 0 },
  { id: 'shot-4', physio: 'venkaty', title: 'Sitting is not the enemy. Staying is.', beats: ['Your hips adapt to the chair', 'Every 45 minutes, stand up', '10 slow sit-to-stands, no hands'], motion: 'sit-stand', move: 'hamstring-reach', tag: 'Hips', sec: 45, views: 0 },
  { id: 'shot-5', physio: 'pavithran', title: 'Mouse wrist is a load problem', beats: ['Thousands of small clicks a day', 'The forearm muscles never rest', 'A 30-second stretch, every hour'], motion: 'wrist', move: 'wrist-flexor', tag: 'Wrists', sec: 30, views: 0 },
];
SEED_SHOTS.forEach((x) => { x.sample = true; });

/* ---------- tele-therapy ---------- */
export const SESSION_TYPES = [
  { id: 'assess', name: 'First video assessment', mins: 30, note: 'Your physio finds the real cause and sets your plan.' },
  { id: 'follow', name: 'Follow-up session', mins: 20, note: 'Review progress and move your exercises forward.' },
  { id: 'posture', name: 'Desk posture check', mins: 15, note: 'Show your desk on camera and fix your setup together.' },
];

export const CONCERNS = ['Neck', 'Shoulders', 'Upper back', 'Lower back', 'Wrists', 'Hips', 'Knees', 'Headaches', 'Other'];

const TIMES = ['07:30', '09:00', '10:30', '12:00', '14:00', '16:30', '18:00', '19:30'];

// The next `n` days, starting tomorrow.
export function nextDays(n = 7) {
  const out = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 1; i <= n; i++) out.push(new Date(base.getTime() + i * 86400000));
  return out;
}

// Open slots for one physio on one day. A few are marked taken so the
// picker looks like a real calendar; this is replaced by the clinic's
// calendar once a backend exists.
export function slotsFor(physioId, day) {
  const seed = [...physioId].reduce((s, c) => s + c.charCodeAt(0), 0) + day.getDate();
  return TIMES.map((t, i) => ({ time: t, taken: (seed + i * 7) % 5 === 0 || (day.getDay() === 0 && i > 4) }));
}

export const atTime = (day, time) => {
  const [h, m] = time.split(':').map(Number);
  const d = new Date(day);
  d.setHours(h, m, 0, 0);
  return d.getTime();
};

/* ---------- group sessions ---------- */
function at(dayOffset, time) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return atTime(new Date(d.getTime() + dayOffset * 86400000), time);
}
export const SEED_GROUPS = [
  { id: 'g-neck', physio: 'akhila', title: 'Desk Neck Reset', area: 'Neck', when: at(1, '19:00'), mins: 30, seats: 20, taken: 13, level: 'All levels' },
  { id: 'g-back', physio: 'jose', title: 'Move Your Middle Back', area: 'Upper back', when: at(2, '07:30'), mins: 25, seats: 15, taken: 9, level: 'Beginner' },
  { id: 'g-lunch', physio: 'venkaty', title: 'Lunch-break Mobility', area: 'Whole body', when: at(3, '13:00'), mins: 15, seats: 30, taken: 22, level: 'All levels' },
  { id: 'g-wrist', physio: 'pavithran', title: 'Keyboard Hands & Wrists', area: 'Wrists', when: at(5, '18:30'), mins: 20, seats: 12, taken: 5, level: 'All levels' },
];
SEED_GROUPS.forEach((x) => { x.sample = true; });

export const fmtDay = (ms) => new Date(ms).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
export const fmtTime = (ms) => new Date(ms).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

/* ---------- chat ---------- */
export const CHAT_RULES = [
  'Only you can start a chat. Physios never message you first.',
  'For guidance and questions, not emergencies. In an emergency, call 112.',
  'A diagnosis needs a proper assessment. Your physio may suggest booking one.',
];

export const CHAT_STARTERS = ['My neck hurts after work. Where do I start?', 'Is this exercise safe for me?', 'Can I book a tele-session?'];

// A sample conversation a member started, so the physio inbox can be reviewed.
export const SAMPLE_INBOX = [
  { id: 'member-priya', member: 'Priya (sample member)', msgs: [
    { from: 'member', text: 'Hi Doctor, I get a stiff upper back by 4 pm every day. I work 9 hours at a laptop.', at: Date.now() - 3 * 3600000 },
  ] },
];

/* ---------- story insights (physio composer) ---------- */
export const STORY_BEATS = [
  { id: 'story', label: '1. The story', hint: 'A real moment people recognise. Anonymise anyone in it.', ph: 'Ravi, 32, works 10 hours a day at a laptop. Every evening his neck feels like concrete…', rows: 4 },
  { id: 'blame', label: '2. What people usually blame', hint: 'Comma separated. These are shown struck through.', ph: 'My pillow, my chair, weak muscles', rows: 1 },
  { id: 'real', label: '3. What’s really going on', hint: 'The real cause, in one or two plain sentences.', ph: 'Hours in one position, without moving.', rows: 2 },
  { id: 'science', label: '4. What the science says (made simple)', hint: 'No jargon. No promises.', ph: 'Research shows movement through the day reduces neck pain more than any single gadget…', rows: 3 },
  { id: 'rx', label: '5. The movement prescription', hint: 'What to do, how much, how often.', ph: '10 chin tucks, every 45 minutes of screen time', rows: 2 },
  { id: 'when', label: '6. When to see a physio', hint: 'Required. The red flags for this topic.', ph: 'Pain spreading into the arm, numbness, or pain that is worse each week.', rows: 2 },
];

export const ETHICS = [
  'No promised cures or guaranteed results.',
  'Any patient in the story is anonymised, or has given written consent.',
  'The guidance is evidence-informed and within my scope of practice.',
  'It says clearly when to see a professional.',
  'No product is presented as treatment.',
];

// Turn a finished story into the rich article blocks the Reader renders.
export function storyToBlocks(f) {
  const blame = (f.blame || '').split(',').map((x) => x.trim()).filter(Boolean);
  const blocks = [{ type: 'h', text: 'The story' }, { type: 'p', text: f.story }];
  if (blame.length && f.real) blocks.push({ type: 'rootcause', think: blame, real: f.real });
  else if (f.real) blocks.push({ type: 'quote', text: f.real });
  if (f.science) blocks.push({ type: 'h', text: 'What the science says' }, { type: 'p', text: f.science });
  if (f.rx) blocks.push({ type: 'medicine', rows: [['Prescription', f.rx]], note: 'Movement is medicine. Your physiotherapist sets the right dose for you.' });
  blocks.push({ type: 'whypt', title: 'Why physiotherapy works: movement is medicine', items: [
    { t: 'Assess', d: 'Find the real cause, not just where it hurts.' },
    { t: 'Move', d: 'Treat with the right movement, at the right dose.' },
    { t: 'Educate', d: 'Understand it, so you can change it for good.' },
  ] });
  if (f.when) blocks.push({ type: 'h', text: 'When to see a physio' }, { type: 'p', text: f.when });
  return blocks;
}
