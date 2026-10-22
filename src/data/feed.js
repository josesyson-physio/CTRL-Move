// Seed posts for the physio feed. `sample: true` posts are placeholders
// written for the prototype; ask each physio to review or replace them.

export const SEED_POSTS = [
  {
    id: 'p-reel-1', type: 'reel', sample: true, author: 'Dr. Pavithran', role: 'Physiotherapist',
    hoursAgo: 2, likes: 312, comments: 24, routine: 'desk-reset', length: '0:45',
    title: '3 moves to undo tech neck',
    caption: 'Chin tucks, wrist stretch and an eye reset. Do them between calls, not after the pain starts.',
  },
  {
    id: 'p-art-1', type: 'article', sample: true, author: 'Dr. Venkaty', role: 'Physiotherapist',
    hoursAgo: 26, likes: 188, comments: 9, read: '6 min', tag: 'Posture', cover: 'Desk\nsetup',
    title: 'Thoracic Alignment: Posture Tips for Ergonomic Desk Setups',
    caption: 'Simple desk adjustments that ease shoulder knots and neck stiffness during long work days.',
    body: [
      'Most desk pain is not caused by one bad posture. It comes from holding any posture for too long.',
      'Set your screen so the top edge is at or slightly below eye level, about an arm’s length away. If you use a laptop all day, a stand and a separate keyboard make a real difference.',
      'Keep your elbows close to your sides at roughly a right angle, with wrists straight while you type. Your feet should rest flat on the floor or on a footrest.',
      'Then forget about perfect posture and change position often. A short movement break every 30 to 45 minutes does more for your upper back than sitting “correctly” for hours.',
      'If stiffness lasts more than a couple of weeks, or pain spreads into your arm or hand, book a physiotherapy assessment.',
    ],
  },
  {
    id: 'p-tip-1', type: 'tip', sample: true, author: 'Dr. Jose', role: 'Quick tip', hoursAgo: 72, likes: 241, comments: 12,
    title: 'Your next posture is your best posture. Change position every 30 to 45 minutes.',
  },
  {
    id: 'p-art-2', type: 'article', sample: true, author: 'Dr. Yaseen', role: 'Physiotherapist',
    hoursAgo: 96, likes: 157, comments: 6, read: '7 min', tag: 'Cervical', cover: 'Tech\nneck',
    title: 'Tech Neck: Reversing Cervical Spine Compression',
    caption: 'Why looking down at screens loads your neck, and the small habits that undo it.',
    body: [
      'Every time your head drifts forward to look at a screen, the muscles at the back of your neck work harder to hold it up.',
      'Over a day, that adds up to stiffness, headaches at the base of the skull, and tight shoulders.',
      'Bring the screen up to your eyes rather than your eyes down to the screen. Hold your phone higher, and raise your monitor.',
      'Chin tucks are the simplest reset: sit tall, draw your chin straight back, hold for five seconds, and repeat ten times.',
      'Numbness, tingling or weakness in the arms is not tech neck. See a clinician promptly if you notice it.',
    ],
  },
];

export const FEED_TABS = ['For you', 'Reels', 'Articles', 'Saved'];
