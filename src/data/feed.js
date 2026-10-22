// Feed posts. Articles with `blocks` render as rich, illustrated guides in
// the reader (see Reader.jsx for the block types).

export const SEED_POSTS = [
  {
    id: 'tech-neck',
    type: 'article',
    art: 'techneck',
    author: 'Dr. Syson Jose S, PT',
    role: 'Physiotherapist',
    hoursAgo: 0,
    likes: 0,
    comments: 0,
    read: '7 min',
    tag: 'Pain care',
    cover: 'Tech\nneck',
    reviewed: true,
    title: 'Tech Neck: Reversing Cervical Spine Compression',
    caption: 'Biomechanical analysis of cellular posture strain and simple exercises to alleviate headaches and upper back pain.',
    blocks: [
      { type: 'glance', items: [
        { k: 'It’s the other 23 hours', v: 'The real problem is often what happens outside the one hour in the clinic.' },
        { k: 'Forward head, more work', v: 'The further your head moves forward, the harder your muscles, joints and discs work.' },
        { k: 'No magical pillow', v: 'The magic lies in changing how you move throughout the day.' },
      ] },
      { type: 'h', text: 'Reversing Cervical Spine Compression with Smart Rehabilitation' },
      { type: 'p', text: '"Why does my neck pain keep coming back even after taking physiotherapy, painkillers, or getting temporary relief?" This is one of the most common questions in today’s digital world.' },
      { type: 'p', text: 'You complete a therapy session. Your pain reduces. You feel fantastic. The next morning… The pain is back. Did the treatment fail? Not necessarily.' },
      { type: 'dayring', caption: 'The real problem often isn’t what happens during the one hour you spend in the clinic. It’s what happens during the other 23 hours.' },

      { type: 'h', text: 'Why It Matters' },
      { type: 'p', text: 'The average person now spends 6–10 hours every day looking down at a phone, laptop, or tablet. Your head weighs about 5 kg. When your neck bends forward, the force acting on your cervical spine increases.' },
      { type: 'headload' },
      { type: 'p', text: 'The further your head moves forward, the harder your muscles, joints, and discs have to work. Eventually, the body starts sending warning signals. That warning signal is pain.' },

      { type: 'h', text: 'Current Scientific Evidence' },
      { type: 'p', text: 'Modern research shows that persistent neck pain is rarely caused by one single factor. Instead, it is usually a combination of:' },
      { type: 'converge', to: 'Persistent neck pain', items: ['Prolonged poor posture', 'Reduced movement during the day', 'Weak deep neck muscles', 'Tight chest and shoulder muscles', 'Stress', 'Poor sleep', 'Lack of movement variety'] },
      { type: 'p', text: 'Most "Tech Neck" problems respond well to education, exercise, movement correction, and consistent habits.' },
      { type: 'quote', text: 'There is no magical pillow. There is no magical chair. The magic lies in changing how you move throughout the day.' },

      { type: 'h', text: 'Clinical Pearl' },
      { type: 'p', text: 'Pain relief is not the finish line. It is the beginning of recovery. The real goal is changing the habits that caused the pain in the first place.' },
      { type: 'flow', end: 'Movement behaviour changed', items: [
        { t: 'Pain relief', d: 'Not the finish line. The beginning of recovery.' },
        { t: 'Change the habits', d: 'The habits that caused the pain in the first place.' },
        { t: 'Change movement', d: 'A successful program doesn’t simply reduce symptoms.' },
      ] },

      { type: 'h', text: 'MotionPlus Protocol' },
      { type: 'p', text: 'At MotionPlus, we believe rehabilitation doesn’t end when the patient leaves the clinic. We follow a Clinic + Lifestyle + Technology approach.' },
      { type: 'triad', items: ['Clinic', 'Lifestyle', 'Technology'] },

      { type: 'h', text: 'AI Insight – Closing the 23-Hour Gap' },
      { type: 'p', text: 'Traditional rehabilitation shows us what happens inside the clinic. The future of rehabilitation tells us what happens outside the clinic. Imagine a smart rehabilitation system that can detect prolonged forward-head posture and remind you to reset your posture before pain begins.' },
      { type: 'flow', end: 'Reset before pain begins', items: [
        { t: 'Detect', d: 'Prolonged forward-head posture.' },
        { t: 'Remind', d: 'Reset your posture.' },
      ] },
      { type: 'cta', title: 'Start closing your 23-hour gap', text: 'Set up your desk in the Posture Lab and let the work-block timer remind you to move.', to: '/posture', label: 'Open Posture Lab' },
    ],
  },
  {
    id: 'stroke-recovery',
    type: 'article',
    art: 'stroke',
    author: 'Dr. Syson Jose S, PT',
    role: 'Physiotherapist',
    hoursAgo: 1,
    likes: 0,
    comments: 0,
    read: '12 min',
    tag: 'Recovery',
    cover: 'Stroke\nrecovery',
    reviewed: true,
    title: 'Stroke Recovery: Evidence-Based Milestones in Modern Rehab',
    caption: 'A comprehensive medical guide outlining post-stroke physical therapy protocols, neurological plasticity milestones, and home exercises.',
    blocks: [
      { type: 'glance', items: [
        { k: 'Every stroke is different', v: 'No one can predict exactly how much a person will recover.' },
        { k: 'The brain can learn again', v: 'It is far more capable of healing and adapting than we once believed.' },
        { k: 'No expiry date', v: 'Many people keep improving for months and even years.' },
      ] },
      { type: 'h', text: 'What Science Really Says About Healing After a Stroke' },
      { type: 'p', text: '"Will my loved one recover?" This is the first question almost every family asks after a stroke. The honest answer is: No one can accurately predict exactly how much a person will recover. Every stroke is different. Some people recover quickly. Some recover slowly. Some need lifelong support.' },
      { type: 'paths', items: ['Recover quickly', 'Recover slowly', 'Need lifelong support'] },
      { type: 'p', text: 'But modern rehabilitation has taught us one powerful lesson: The brain is far more capable of healing and adapting than we once believed.' },
      { type: 'quote', text: 'Recovery is not about waiting for a miracle. It is about creating thousands of opportunities for the brain to learn again.' },

      { type: 'h', text: 'Why This Matters' },
      { type: 'p', text: 'Many families lose hope because they believe recovery only happens during the first few weeks. That simply isn’t true. Today’s rehabilitation is based on science, not myths.' },
      { type: 'mythfact',
        myth: 'Recovery only happens during the first few weeks. Nothing improves after six months.',
        fact: 'Many people continue improving for months and even years with consistent rehabilitation, exercise, and an active lifestyle.' },

      { type: 'h', text: 'What Does Science Tell Us?' },
      { type: 'p', text: 'Doctors and therapists worldwide have discovered something encouraging. People recover best when rehabilitation is:' },
      { type: 'flow', end: 'Best recovery', items: [
        { t: 'Started early', d: 'As early as medically safe.' },
        { t: 'Meaningful', d: 'Focused on meaningful daily activities.' },
        { t: 'Consistent', d: 'Repeated consistently.' },
        { t: 'Supported', d: 'Supported by family.' },
        { t: 'Personal', d: 'Tailored to the individual, not copied from someone else’s treatment plan.' },
      ] },
      { type: 'p', text: 'Recovery isn’t about doing one magical exercise. It’s about doing the right things, consistently, over time.' },

      { type: 'h', text: 'Understanding the Recovery Journey' },
      { type: 'timeline', stages: [
        { when: 'The first month', title: 'The Body Is Waking Up',
          text: 'This stage is about helping the brain reconnect with the body. Small improvements can be huge victories.',
          wins: ['A finger moves', 'A shoulder lifts', 'Sits without support'] },
        { when: 'Months 2–3', title: 'Learning Again',
          text: 'The brain starts adapting faster. This is why regular therapy matters. The more meaningful practice the brain receives, the better it learns.',
          wins: ['Sitting balance', 'Standing', 'Walking with support', 'Hand movements', 'Speaking', 'Confidence'] },
        { when: 'Months 3–6', title: 'Building Independence',
          text: 'The focus changes from exercises to real life.',
          transform: [['Lifting a leg', 'Climbing stairs'], ['Squeezing a ball', 'Holding a cup']] },
        { when: 'Beyond 6 months', title: 'Recovery Doesn’t Have an Expiry Date',
          text: 'One of the biggest myths is: "Nothing improves after six months." Modern research says otherwise. Many people continue improving for months and even years with consistent rehabilitation, exercise, and an active lifestyle.',
          wins: ['Months', 'Years'] },
      ] },

      { type: 'h', text: 'The Emotional Side of Recovery' },
      { type: 'p', text: 'Recovery isn’t only physical. There will be good days. There will be frustrating days. Some mornings will feel full of hope. Some days may feel discouraging. That is completely normal.' },
      { type: 'wave' },
      { type: 'quote', text: 'One of the strongest medicines in rehabilitation isn’t found in a tablet. It’s encouragement.' },

      { type: 'closing', title: 'The Most Important Message',
        lead: 'A stroke changes life. It does not end it.',
        text: 'Science continues to prove that the human brain has an incredible ability to adapt, learn, and recover. Every small victory is evidence that hope and rehabilitation can work together.' },
    ],
  },
];

export const FEED_TABS = ['For you', 'Reels', 'Articles', 'Saved'];
