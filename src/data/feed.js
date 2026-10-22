// Feed posts. Articles with `blocks` render as rich, illustrated guides in
// the reader (see Reader.jsx for the block types).

export const SEED_POSTS = [
  {
    id: 'stroke-recovery',
    type: 'article',
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
