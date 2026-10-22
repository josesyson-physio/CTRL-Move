# Content guide

Everything clinical in Ctrl+Move lives in `src/data/`. Change those files, push to `main`, and the live app updates.

Items marked `draft: true` were written for the prototype and are waiting for the MotionPlus clinical documents. Please replace or approve each one before a public launch.

| File | Controls | Waiting for documents |
|---|---|---|
| `scan.js` | The 6 Hardware Scan tests, their answer options, points (1–3) and XP | Levels 1, 3 and 5 are drafts (Neck Turn Check, Seated Twist Check, Prayer Wrist Check) |
| `challenges.js` | The 8 Muscle Challenges, targets and XP | Challenges 1, 2, 4 and 8 are drafts (Wall Sit, Desk Push-ups, Glute Bridge, Plank Hold) |
| `bingo.js` | The 25 Pain Bingo squares, XP per tile and line, symptoms that show a "see a doctor" note | Done: matches the "Bingo for Pain" document |
| `bingoGuide.js` | For each square: 5 exercises (instruction, dose, timer length), simple tips and safety advice | Done: from "Bingo for Pain". Timer lengths are estimated from each dose; adjust `sec` if needed |
| `routines.js` | Quick Relief moves (name, focus, duration, cue, optional `video` URL) and multi-move routines | Physio videos; Eccentric Calf Raises details; Giraffe Neck Stretch (currently "coming soon") |
| `physios.js` | Physiotherapists in Consult and the feed stories | Names only for now. Add specialty, experience, timings, fees and photo per physio when confirmed |
| `feed.js` | Seed posts in the feed | Every seed post is `sample: true`. Ask the named physio to approve it or replace it with their own |
| `zones.js` | Body map zones and which body system each belongs to | Review only |

## Scoring rules (in `src/lib/score.js`)

- **System status**: each body system starts from the latest Hardware Scan (3 points = 100, 2 = 67, 1 = 33). The average pain logged for that system in the last 7 days takes off 3 points per pain point. The status is the average of the six systems: 80 or above is *Optimised*, 60–79 is *Optimisation needed*, below 60 is *Attention needed*.
- **High-pain alert**: shown at pain 8/10 or above.
- **Levels**: level = ⌊√(XP ÷ 40)⌋ + 1.

These thresholds are starting points and need a physio's review.

## Adding a video to a routine

```js
// src/data/routines.js
'chin-tucks': { name: 'Deep Chin Tucks', …, video: 'https://your-cdn.com/chin-tucks.mp4' },
```

The player shows it automatically, muted and looping, while the timer runs.
