import { useEffect } from 'react';
import { go, Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { scanScore } from '../lib/score.js';
import { AREAS } from '../data/zones.js';
import { AREA_ROUTINE } from '../data/routines.js';
import { Bolt, Icon, Ring } from '../components/ui.jsx';

export default function ScanResult() {
  const { s, actions, toast } = useStore();
  const scan = s.scans[s.scans.length - 1];
  useEffect(() => { if (!scan) go('/scan'); }, [scan]);
  if (!scan) return null;

  const score = scanScore(scan);
  const label = score >= 80 ? 'Optimised' : score >= 60 ? 'Optimisation needed' : 'Attention needed';
  const text = score >= 80
    ? 'Your body is moving well. Keep your movement breaks going to stay here.'
    : 'Your body is showing early signs of strain. A personalised routine can improve comfort and performance.';
  const rows = scan.answers.map((a) => ({ ...a, name: (AREAS.find((x) => x.id === a.area) || {}).label || a.area }));
  const weakest = rows.slice().sort((a, b) => a.points - b.points).filter((r) => r.points < 3);
  const focus = weakest.slice(0, 2).map((r) => r.name.toLowerCase());
  const routine = weakest.length ? AREA_ROUTINE[weakest[0].area] : 'desk-reset';
  const colorFor = (p) => (p >= 3 ? 'var(--ink)' : p === 2 ? 'var(--warm)' : 'var(--red)');
  const date = new Date(scan.at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }).toUpperCase();

  const claim = () => {
    if (!scan.claimed) { actions.claimScan(); toast(`+${scan.xp} XP claimed`); }
    go('/home');
  };

  return (
    <main className="screen night">
      <section style={{ padding: '20px 20px 34px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="row between" style={{ width: '100%' }}>
          <Link to="/home" className="icon-btn" aria-label="Close"><Icon name="close" width={2} /></Link>
          <span className="eyebrow">Scan result · {date}</span>
          <span style={{ width: 44 }} />
        </div>
        <div className="mt14">
          <Ring size={176} stroke={12} pct={score} label={`Hardware status ${score} percent`}>
            <span className="big-num" style={{ fontSize: 56 }}>{score}<span style={{ fontSize: 26, color: 'var(--night-text)' }}>%</span></span>
            <span style={{ fontSize: 12, color: 'var(--night-text)', marginTop: 6 }}>Hardware status</span>
          </Ring>
        </div>
        <h1 style={{ margin: '16px 0 0', fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-.02em' }}>{label}</h1>
        <p style={{ margin: '8px 12px 0', textAlign: 'center', fontSize: 14, lineHeight: 1.5, color: 'var(--night-soft)' }}>{text}</p>
      </section>

      <section style={{ flex: 1, background: '#fff', color: 'var(--ink)', borderRadius: '30px 30px 0 0', padding: '22px 20px 28px', display: 'flex', flexDirection: 'column' }}>
        <div className="row between" style={{ alignItems: 'baseline' }}>
          <h2 className="h-card">By area</h2>
          {focus.length > 0 && <span className="sub">Work on {focus.join(' and ')} first</span>}
        </div>
        <div className="mt8">
          {rows.map((r) => (
            <div className="result-row" key={r.area}>
              <span className="bar3" aria-hidden="true">
                <i style={{ background: colorFor(r.points) }} />
                <i style={{ background: r.points >= 2 ? colorFor(r.points) : undefined }} />
                <i style={{ background: r.points >= 3 ? colorFor(r.points) : undefined }} />
              </span>
              <span className="grow">
                <span style={{ display: 'block', fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                <span className="sub" style={{ display: 'block', marginTop: 0 }}>{r.label}</span>
              </span>
              <span className="mono" style={{ fontSize: 12, fontWeight: 700 }}>+{r.xp}</span>
            </div>
          ))}
        </div>
        <div className="stack mt20" style={{ marginTop: 'auto', paddingTop: 20 }}>
          <button className="btn lime block" onClick={claim}><Bolt size={16} color="#0C0D0F" />{scan.claimed ? 'Back to home' : `Claim ${scan.xp} XP and exit`}</button>
          <Link to={`/play/${routine}`} className="btn block md">Start my routine</Link>
        </div>
      </section>
    </main>
  );
}
