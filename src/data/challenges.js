// Muscle Challenge: eight strength checks.
// `draft: true` marks challenges written for the prototype. Replace them with
// the MotionPlus Muscle Challenge document before launch.

const GENERIC = [['Easy', 80], ['Slightly difficult', 60], ['Very difficult', 40], ["Couldn't finish", 20]];

export const CHALLENGES = [
  { title: 'Wall Sit', target: '30 s', draft: true, body: 'Back against a wall, slide down until your knees are bent, and hold for 30 seconds.', opts: GENERIC },
  { title: 'Desk Push-ups', target: '×10', draft: true, body: 'Hands on the edge of a sturdy desk, body straight. Do 10 slow push-ups.', opts: GENERIC },
  { title: 'Chair Rocket', target: '×10', body: 'Stand up and sit down 10 times without using your hands.', opts: GENERIC },
  { title: 'Glute Bridge', target: '×15', draft: true, body: 'Lie on your back with knees bent. Lift your hips 15 times, squeezing at the top.', opts: GENERIC },
  { title: 'Shoulder Reach', target: 'L + R', body: 'One hand reaches over the shoulder, the other behind the back. Can your fingers touch?', opts: [['Easily', 80], ['Almost', 60], ['Not close', 20]] },
  { title: 'Grip Power', target: '5 s', body: 'Squeeze your own fist with maximum effort for 5 seconds. How did it feel?', opts: [['Strong', 80], ['Moderate', 60], ['Weak', 40], ['Painful', 20]] },
  { title: 'Calf Booster', target: '×20', body: 'Perform 20 heel raises at a steady pace.', opts: [['Easy', 80], ['Slight fatigue', 60], ["Couldn't finish", 20]] },
  { title: 'Plank Hold', target: '20 s', draft: true, body: 'Hold a forearm plank for 20 seconds, keeping your back flat and breathing steadily.', opts: GENERIC },
];
