import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { dayKey, levelOf, streakOf } from './score.js';
import { LINES, XP_PER_LINE, XP_PER_TILE } from '../data/bingo.js';

const KEY = 'ctrlmove.app.v1';

export const DEFAULT_STATE = () => ({
  v: 1,
  onboarded: false,
  name: '',
  role: 'user', // 'user' | 'physio'
  xp: 0,
  activeDays: {},
  painLogs: [],
  scans: [],
  challenges: [],
  moves: {}, // routines completed per day
  routinesDone: 0,
  linesTotal: 0,
  bingo: { date: null, marked: {}, tilesAwarded: {}, linesAwarded: {} },
  sit: { start: null, goal: 45, notified: false },
  booked: {},
  likes: {},
  saved: {},
  tried: {},
  myPosts: [],
  params: { height: '', weight: '', birthday: '', sex: '' },
  posture: {}, // desk setup checklist answers
  bookings: [], // tele-therapy requests
  seats: {}, // group sessions reserved
  chats: {}, // physioId -> messages (member always starts)
  inbox: {}, // physio mode: replies to member threads
  library: [], // physio mode: own exercise library
  groups: [], // physio mode: group sessions hosted
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT_STATE(), ...JSON.parse(raw) };
  } catch (e) { /* storage blocked: keep in memory */ }
  return DEFAULT_STATE();
}

export const BADGES = [
  { id: 'scan', mark: 'S1', name: 'First scan', ok: (s) => s.scans.length >= 1 },
  { id: 'flow3', mark: '3D', name: '3-day flow', ok: (s) => streakOf(s.activeDays) >= 3 },
  { id: 'line', mark: 'B1', name: 'Line clear', ok: (s) => s.linesTotal >= 1 },
  { id: 'track5', mark: 'P5', name: 'Pain tracker', ok: (s) => s.painLogs.length >= 5 },
  { id: 'moves5', mark: 'M5', name: 'Desk breaker', ok: (s) => s.routinesDone >= 5 },
  { id: 'muscle', mark: 'C8', name: 'Challenger', ok: (s) => s.challenges.length >= 1 },
  { id: 'flow7', mark: '7D', name: 'Week warrior', ok: (s) => streakOf(s.activeDays) >= 7 },
  { id: 'lvl5', mark: 'L5', name: 'Level 5', ok: (s) => levelOf(s.xp) >= 5 },
];

const StoreCtx = createContext(null);

export function StoreProvider({ children }) {
  const [state, setState] = useState(load);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }, [state]);

  const toast = useCallback((text) => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { id, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  // Apply a change, mark today active, and announce any new badges.
  const update = useCallback((fn, { active = true } = {}) => {
    setState((prev) => {
      let next = fn({ ...prev });
      if (active) next = { ...next, activeDays: { ...next.activeDays, [dayKey()]: true } };
      const newly = BADGES.filter((b) => !b.ok(prev) && b.ok(next));
      if (newly.length) setTimeout(() => newly.forEach((b) => toast(`Badge unlocked · ${b.name}`)), 0);
      const lvlBefore = levelOf(prev.xp);
      const lvlAfter = levelOf(next.xp);
      if (lvlAfter > lvlBefore) setTimeout(() => toast(`Level up · you're now level ${lvlAfter}`), 0);
      return next;
    });
  }, [toast]);

  const actions = useMemo(() => ({
    onboard: ({ name, role }) => update((s) => ({ ...s, onboarded: true, name: name || s.name, role: role || s.role })),
    setName: (name) => update((s) => ({ ...s, name }), { active: false }),
    setRole: (role) => update((s) => ({ ...s, role }), { active: false }),
    togglePosture: (id) => update((s) => ({ ...s, posture: { ...(s.posture || {}), [id]: !(s.posture || {})[id] } }), { active: false }),
    setParams: (params) => update((s) => ({ ...s, params: { ...s.params, ...params } }), { active: false }),
    addXP: (n) => update((s) => ({ ...s, xp: s.xp + n })),

    logPain: ({ zones, pain, comfort }) => {
      const areas = [...new Set(zones.map((z) => z.area))];
      update((s) => ({
        ...s,
        xp: s.xp + 10,
        painLogs: [...s.painLogs, { id: Date.now(), at: Date.now(), date: dayKey(), zones: zones.map((z) => z.label), areas, pain, comfort }],
      }));
    },

    saveScan: (answers) => {
      const areas = {};
      answers.forEach((a) => { areas[a.area] = a.points; });
      const xp = answers.reduce((s, a) => s + a.xp, 0);
      update((s) => ({ ...s, scans: [...s.scans, { at: Date.now(), date: dayKey(), areas, answers, xp, claimed: false }] }));
    },
    claimScan: () => update((s) => {
      const scans = s.scans.slice();
      const last = scans[scans.length - 1];
      if (!last || last.claimed) return s;
      scans[scans.length - 1] = { ...last, claimed: true };
      return { ...s, scans, xp: s.xp + last.xp };
    }),

    saveChallenge: (xp) => update((s) => ({ ...s, xp: s.xp + xp, challenges: [...s.challenges, { at: Date.now(), xp }] })),

    completeRoutine: (id, postId) => update((s) => {
      const k = dayKey();
      let xp = s.xp + 20;
      const tried = { ...s.tried };
      if (postId && !tried[postId]) { tried[postId] = true; xp += 25; }
      return { ...s, xp, tried, routinesDone: s.routinesDone + 1, moves: { ...s.moves, [k]: (s.moves[k] || 0) + 1 }, sit: { ...s.sit, start: s.sit.start ? Date.now() : null, notified: false } };
    }),

    startSit: () => update((s) => ({ ...s, sit: { ...s.sit, start: Date.now(), notified: false } }), { active: false }),
    stopSit: () => update((s) => ({ ...s, sit: { ...s.sit, start: null, notified: false } }), { active: false }),
    markSitNotified: () => update((s) => ({ ...s, sit: { ...s.sit, notified: true } }), { active: false }),

    // XP is earned once per tile and once per line each day, so resetting the
    // card can't be used to farm points.
    toggleTile: (i) => update((s) => {
      const today = dayKey();
      const b = s.bingo.date === today ? s.bingo : { date: today, marked: s.bingo.marked, tilesAwarded: {}, linesAwarded: {} };
      const marked = { ...b.marked, [i]: !b.marked[i] };
      const tilesAwarded = { ...b.tilesAwarded };
      const linesAwarded = { ...b.linesAwarded };
      let xp = 0;
      let newLines = 0;
      if (marked[i] && !tilesAwarded[i]) { tilesAwarded[i] = true; xp += XP_PER_TILE; }
      LINES.forEach((line, li) => {
        if (line.every((t) => marked[t]) && !linesAwarded[li]) { linesAwarded[li] = true; xp += XP_PER_LINE; newLines += 1; }
      });
      if (newLines) setTimeout(() => toast(`Bingo! +${xp} XP · relief routine unlocked`), 0);
      return { ...s, xp: s.xp + xp, linesTotal: s.linesTotal + newLines, bingo: { date: today, marked, tilesAwarded, linesAwarded } };
    }),
    newBingoCard: () => update((s) => ({ ...s, bingo: { ...s.bingo, marked: {} } }), { active: false }),

    book: (id) => update((s) => ({ ...s, booked: { ...s.booked, [id]: s.booked[id] ? null : Date.now() } }), { active: false }),
    like: (id) => update((s) => ({ ...s, likes: { ...s.likes, [id]: !s.likes[id] } }), { active: false }),
    save: (id) => update((s) => ({ ...s, saved: { ...s.saved, [id]: !s.saved[id] } }), { active: false }),
    requestBooking: (b) => update((s) => ({ ...s, bookings: [{ ...b, id: 'bk-' + Date.now(), at: Date.now(), status: 'requested' }, ...(s.bookings || [])] }), { active: false }),
    cancelBooking: (id) => update((s) => ({ ...s, bookings: (s.bookings || []).filter((b) => b.id !== id) }), { active: false }),
    toggleSeat: (id) => update((s) => ({ ...s, seats: { ...(s.seats || {}), [id]: !(s.seats || {})[id] } }), { active: false }),
    // Members start every chat. The first message gets an automatic, clearly
    // labelled acknowledgement until the physio replies.
    sendChat: (physioId, text, physioName) => update((s) => {
      const prev = (s.chats || {})[physioId] || [];
      const msgs = [...prev, { from: 'me', text, at: Date.now() }];
      if (!prev.length) msgs.push({ from: 'auto', text: `Thanks for reaching out. ${physioName || 'Your physio'} will reply here, usually within 24 hours. If this is urgent, call 112.`, at: Date.now() + 1 });
      return { ...s, chats: { ...(s.chats || {}), [physioId]: msgs } };
    }, { active: false }),
    physioReply: (threadId, text) => update((s) => ({ ...s, inbox: { ...(s.inbox || {}), [threadId]: [...((s.inbox || {})[threadId] || []), { from: 'physio', text, at: Date.now() }] } }), { active: false }),
    addExercise: (ex) => update((s) => ({ ...s, library: [{ ...ex, id: 'my-' + Date.now(), physio: 'me' }, ...(s.library || [])] }), { active: false }),
    removeExercise: (id) => update((s) => ({ ...s, library: (s.library || []).filter((x) => x.id !== id) }), { active: false }),
    addGroup: (g) => update((s) => ({ ...s, groups: [{ ...g, id: 'mg-' + Date.now(), physio: 'me', taken: 0 }, ...(s.groups || [])] }), { active: false }),
    publish: (post) => update((s) => ({ ...s, myPosts: [{ ...post, id: 'mine-' + Date.now(), at: Date.now(), likes: 0, comments: 0, pending: true }, ...s.myPosts] })),

    exportData: () => JSON.stringify(state, null, 2),
    resetAll: () => setState(DEFAULT_STATE()),
  }), [update, state]);

  const value = useMemo(() => ({ s: state, actions, toast, toasts }), [state, actions, toast, toasts]);
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export const useStore = () => useContext(StoreCtx);

// Re-render every `ms` while `on` is true (for timers).
export function useTicker(on, ms = 1000) {
  const [, setN] = useState(0);
  useEffect(() => {
    if (!on) return undefined;
    const t = setInterval(() => setN((n) => n + 1), ms);
    return () => clearInterval(t);
  }, [on, ms]);
}
