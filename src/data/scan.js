// Hardware Scan: six self-tests, one per body system.
// points: 3 = moving freely, 2 = some restriction, 1 = difficult or painful.
// `draft: true` marks tests written for the prototype. Replace them with the
// tests from the MotionPlus Hardware Scan document before launch.

export const SCAN = [
  {
    area: 'neck', title: 'Neck Turn Check', draft: true,
    body: 'Sit tall and slowly turn your head to look over each shoulder. Can you turn equally both ways without pain?',
    opts: [['Easy', 3, 45], ['Slight tightness', 2, 30], ['Difficult or painful', 1, 15]],
  },
  {
    area: 'shoulders', title: 'Shoulder Freedom Test',
    body: 'Place both hands behind your head. Can your elbows move comfortably backward?',
    opts: [['Easy', 3, 45], ['Slight tightness', 2, 30], ['Difficult or painful', 1, 15]],
  },
  {
    area: 'back', title: 'Seated Twist Check', draft: true,
    body: 'Sit tall with your arms crossed on your chest and rotate your upper body to each side. Does it feel even?',
    opts: [['Even and easy', 3, 45], ['One side tighter', 2, 30], ['Difficult or painful', 1, 15]],
  },
  {
    area: 'legs', title: 'Chair Escape Challenge',
    body: 'Stand up and sit down from your chair 5 times without using your hands.',
    opts: [['Very easy', 3, 45], ['Slight effort', 2, 30], ['Difficult', 1, 15]],
  },
  {
    area: 'wrists', title: 'Prayer Wrist Check', draft: true,
    body: 'Press your palms together in front of your chest, then slowly lower your hands until you feel a stretch. Is it comfortable?',
    opts: [['Comfortable', 3, 45], ['Some tightness', 2, 30], ['Difficult or painful', 1, 15]],
  },
  {
    area: 'eyes', title: 'Eye Reset',
    body: 'Look at an object about 6 metres (20 feet) away for 20 seconds. Then look back at your phone.',
    opts: [['Eyes feel refreshed', 3, 45], ['Slight strain', 2, 30], ['Eyes still feel tired', 1, 15]],
  },
];
