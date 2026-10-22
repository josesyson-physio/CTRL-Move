// Posture Lab content: desk setup checkpoints, common posture patterns and
// micro-habits. General ergonomic guidance; review with the clinical team.

// Each checkpoint matches a numbered marker on the posture blueprint.
// x/y are the marker positions in the blueprint's 360×300 drawing.
export const CHECKPOINTS = [
  { id: 'screen', n: 1, x: 300, y: 62, title: 'Screen at eye level',
    body: 'The top of your screen sits at or just below eye level, about an arm’s length away. On a laptop, use a stand and a separate keyboard.' },
  { id: 'head', n: 2, x: 150, y: 96, title: 'Ears over shoulders',
    body: 'Keep your chin gently tucked so your head stacks over your shoulders instead of drifting toward the screen.' },
  { id: 'elbows', n: 3, x: 150, y: 168, title: 'Relaxed shoulders, elbows near 90°',
    body: 'Keyboard and mouse close to your body, forearms supported, shoulders down and wrists straight.' },
  { id: 'lumbar', n: 4, x: 88, y: 160, title: 'Lower back supported',
    body: 'Sit back into the chair so the backrest, or a small cushion, supports the natural inward curve of your lower back.' },
  { id: 'hips', n: 5, x: 178, y: 196, title: 'Hips level with or above knees',
    body: 'Adjust the seat height so your thighs are level or slope slightly down toward your knees.' },
  { id: 'feet', n: 6, x: 214, y: 270, title: 'Feet flat',
    body: 'Both feet rest flat on the floor, or on a footrest if the chair is high.' },
];

// Patterns link to the matching Pain Bingo guide (by slug).
export const PATTERNS = [
  { title: 'Forward head', aka: 'Tech neck', slug: 'tech-neck',
    body: 'The head drifts toward the screen, so the muscles at the back of the neck work harder all day. Often felt as neck stiffness and headaches at the base of the skull.' },
  { title: 'Rounded shoulders', aka: 'Upper-back tightness', slug: 'back-knots',
    body: 'Shoulders roll forward over the keyboard, tightening the chest and over-stretching the upper back. Often felt as knots between the shoulder blades.' },
  { title: 'Slumped sitting', aka: 'Slouching', slug: 'slouching',
    body: 'The pelvis tips back and the lower back flattens against the chair. Often felt as lower back ache after long sitting.' },
];

export const HABITS = [
  { title: 'Change position every 30–45 minutes', body: 'Your next posture is your best posture. No single position is right for hours.' },
  { title: 'Rest your eyes with 20-20-20', body: 'Every 20 minutes, look about 6 metres away for 20 seconds.' },
  { title: 'Stand for calls', body: 'Use phone and video calls as a cue to stand and move.' },
  { title: 'Reset with chin tucks', body: 'Ten slow chin tucks undo the forward-head drift of a long screen session.' },
];
