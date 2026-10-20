import { AREAS } from '../data/zones.js';
import { SCAN } from '../data/scan.js';

export const dayKey = (d = new Date()) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
export const daysAgoKey = (n) => dayKey(new Date(Date.now() - n * 86400000));

/* ---------- levels ---------- */
export const levelOf = (xp) => Math.floor(Math.sqrt(xp / 40)) + 1;
export const xpForLevel = (l) => (l - 1) * (l - 1) * 40;
export function levelProgress(xp) {
  const level = levelOf(xp);
  const base = xpForLevel(level);
  const next = xpForLevel(level + 1);
  return { level, base, next, pct: Math.round(((xp - base) / (next - base)) * 100) };
}

/* ---------- streak ---------- */
export function streakOf(activeDays) {
  const d = new Date();
  if (!activeDays[dayKey(d)]) {
    d.setDate(d.getDate() - 1);
    if (!activeDays[dayKey(d)]) return 0;
  }
  let s = 0;
  while (activeDays[dayKey(d)]) { s += 1; d.setDate(d.getDate() - 1); }
  return s;
}

/* ---------- scan score ---------- */
export function scanScore(scan) {
  if (!scan) return null;
  const pts = SCAN.reduce((sum, t) => sum + (scan.areas[t.area] || 1), 0);
  return Math.round((pts / (SCAN.length * 3)) * 100);
}

/*
 * System status: the latest Hardware Scan sets each body system's baseline
 * (3 → 100, 2 → 67, 1 → 33). Pain logged in the last 7 days pulls that system
 * down by 3 points per pain point on average. No scan → no status.
 */
export function systemStatus(state) {
  const scan = state.scans[state.scans.length - 1];
  if (!scan) return null;
  const since = daysAgoKey(6);
  const logs = state.painLogs.filter((l) => l.date >= since);
  const areas = AREAS.map((a) => {
    const pts = scan.areas[a.id];
    let v = pts ? Math.round((pts / 3) * 100) : 67;
    const ls = logs.filter((l) => l.areas.includes(a.id));
    if (ls.length) {
      const avg = ls.reduce((s, l) => s + l.pain, 0) / ls.length;
      v = Math.round(v - avg * 3);
    }
    return { ...a, v: Math.max(5, Math.min(100, v)) };
  });
  const total = Math.round(areas.reduce((s, a) => s + a.v, 0) / areas.length);
  const weak = areas.filter((a) => a.v < 60);
  const label = total >= 80 ? 'Optimised' : total >= 60 ? 'Optimisation needed' : 'Attention needed';
  const tone = total >= 80 ? 'good' : total >= 60 ? 'warn' : 'bad';
  let summary;
  if (!weak.length) summary = 'All systems moving well. Keep your movement breaks going.';
  else {
    const names = weak.map((a) => a.label.toLowerCase());
    const list = names.length === 1 ? names[0] : names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
    summary = `Early strain showing in your ${list}. A short reset is ready for your next break.`;
  }
  const daysSince = Math.round((Date.now() - scan.at) / 86400000);
  return { total, areas, weak, label, tone, summary, daysSince };
}

/* ---------- pain colours (lighter → darker as pain rises) ---------- */
export function painTone(p) {
  if (p <= 0) return { bg: '#C9CDD4', halo: 'rgba(201,205,212,.35)', text: '#4A4F58' };
  if (p <= 2) return { bg: '#FFC9AE', halo: 'rgba(255,201,174,.45)', text: '#8A3A12' };
  if (p <= 4) return { bg: '#FFA77A', halo: 'rgba(255,167,122,.4)', text: '#8A3A12' };
  if (p <= 6) return { bg: '#FF7A45', halo: 'rgba(255,122,69,.3)', text: '#A8360F' };
  if (p <= 8) return { bg: '#D9401F', halo: 'rgba(217,64,31,.25)', text: '#B5341A' };
  return { bg: '#8E1B0E', halo: 'rgba(142,27,14,.25)', text: '#8E1B0E' };
}
export const painLabel = (p) => (p === 0 ? 'No pain' : p <= 3 ? 'Mild' : p <= 6 ? 'Moderate' : p <= 8 ? 'Severe' : 'Critical');
export const comfortLabel = (c) => (c <= 3 ? 'Poor' : c <= 6 ? 'Fair' : c <= 8 ? 'Good' : 'Great');

/* ---------- calendar helpers ---------- */
export function weekDays(date = new Date()) {
  const d = new Date(date);
  const dow = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - dow);
  return Array.from({ length: 7 }, (_, i) => {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    return x;
  });
}

export function monthGrid(year, month) {
  const first = new Date(year, month, 1);
  const lead = first.getDay(); // Sunday-first grid
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let n = 1; n <= days; n++) cells.push(new Date(year, month, n));
  return cells;
}

export const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
};
