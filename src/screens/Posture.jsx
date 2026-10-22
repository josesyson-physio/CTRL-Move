import { useState } from 'react';
import { Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { CHECKPOINTS, HABITS, PATTERNS } from '../data/posture.js';
import { Icon, Segs, TabBar, TopBar } from '../components/ui.jsx';

// Spine keys drawn along the seated figure's back (cx, cy, rotation).
const SPINE = [[121, 108, -14], [117, 123, -12], [114, 138, -8], [112, 153, -3], [112, 168, 3], [114, 183, 9]];

export default function Posture() {
  const { s, actions } = useStore();
  const [sel, setSel] = useState('screen');
  const done = s.posture || {};
  const score = CHECKPOINTS.filter((c) => done[c.id]).length;
  const cur = CHECKPOINTS.find((c) => c.id === sel) || CHECKPOINTS[0];
  const verdict = score === 6 ? 'Desk set up for a healthy spine.' : score >= 4 ? 'Nearly there. Fix the remaining points today.' : 'A few changes will take real load off your neck and back.';

  return (
    <main className="screen">
      <TopBar title="Posture Lab" sub="Your desk posture blueprint" />

      <section className="card mx mt18" style={{ borderRadius: 28, padding: '18px 14px 16px' }}>
        <div className="row between" style={{ padding: '0 6px' }}>
          <span className="eyebrow">Seated blueprint</span>
          <span className="sub" style={{ marginTop: 0 }}>Tap a number</span>
        </div>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '360 / 300', marginTop: 8 }}>
          <svg viewBox="0 0 360 300" width="100%" height="100%" aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
            <line x1="16" y1="282" x2="344" y2="282" stroke="#E4E6EA" strokeWidth="2" strokeLinecap="round" />
            {/* desk, keyboard, monitor */}
            <rect x="196" y="150" width="150" height="8" rx="3" fill="#C9D3DC" />
            <rect x="326" y="158" width="8" height="124" rx="3" fill="#C9D3DC" />
            <rect x="206" y="144" width="40" height="6" rx="2" fill="#9AA9B8" />
            <rect x="300" y="118" width="6" height="32" fill="#9AA9B8" />
            <rect x="288" y="146" width="30" height="4" rx="2" fill="#9AA9B8" />
            <rect x="294" y="46" width="10" height="74" rx="3" fill="#0B1B2B" />
            {/* chair */}
            <rect x="60" y="106" width="14" height="88" rx="7" fill="#C9D3DC" />
            <rect x="64" y="192" width="112" height="12" rx="6" fill="#C9D3DC" />
            <rect x="116" y="204" width="8" height="58" fill="#C9D3DC" />
            <path d="M82 270h76" stroke="#C9D3DC" strokeWidth="6" strokeLinecap="round" />
            <circle cx="84" cy="276" r="5" fill="#C9D3DC" /><circle cx="156" cy="276" r="5" fill="#C9D3DC" />
            {/* eye line to the top of the screen */}
            <path d="M150 72 L294 52" stroke="#4FE3C1" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" />
            {/* seated figure */}
            <g stroke="#DCE3EA" strokeLinecap="round" fill="none">
              <path d="M120 102 C 112 128, 108 160, 112 194" strokeWidth="32" />
              <line x1="126" y1="90" x2="122" y2="104" strokeWidth="15" />
              <line x1="112" y1="196" x2="186" y2="196" strokeWidth="24" />
              <line x1="186" y1="198" x2="192" y2="266" strokeWidth="17" />
              <line x1="190" y1="273" x2="216" y2="273" strokeWidth="10" />
              <line x1="122" y1="114" x2="134" y2="160" strokeWidth="13" />
              <line x1="134" y1="161" x2="210" y2="147" strokeWidth="11" />
            </g>
            <circle cx="134" cy="72" r="19" fill="#DCE3EA" />
            <circle cx="142" cy="69" r="2.2" fill="#0B1B2B" />
            {/* spine of keys */}
            {SPINE.map(([cx, cy, r]) => (
              <g key={cy} transform={`rotate(${r} ${cx} ${cy})`}>
                <rect x={cx - 8} y={cy - 4} width="16" height="8" rx="3.2" fill="#0B1B2B" />
                <rect x={cx - 6.5} y={cy - 3} width="13" height="4.4" rx="2" fill="#4FE3C1" />
              </g>
            ))}
          </svg>
          {CHECKPOINTS.map((c) => {
            const on = c.id === sel;
            const ok = !!done[c.id];
            return (
              <button key={c.id} onClick={() => setSel(c.id)} aria-pressed={on} aria-label={`${c.n}. ${c.title}${ok ? ', done' : ''}`}
                style={{ position: 'absolute', left: `calc(${(c.x / 360) * 100}% - 22px)`, top: `calc(${(c.y / 300) * 100}% - 22px)`, width: 44, height: 44, padding: 0, border: 0, background: 'transparent', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
                <span style={{ width: on ? 30 : 24, height: on ? 30 : 24, borderRadius: '50%', display: 'grid', placeItems: 'center', fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: on ? 14 : 12,
                  background: ok ? 'var(--lime)' : 'var(--ink)', color: ok ? 'var(--ink)' : '#fff', boxShadow: on ? '0 0 0 5px rgba(79,227,193,.35)' : '0 2px 6px rgba(11,27,43,.25)', transition: 'all .15s ease' }}>
                  {ok ? <Icon name="check" size={13} width={3} /> : c.n}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ margin: '12px 6px 0', padding: 16, borderRadius: 18, background: 'var(--ground)' }}>
          <div className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
            <span className="num-box" style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--ink)', color: '#fff' }}>{cur.n}</span>
            <div className="grow">
              <b style={{ display: 'block', fontSize: 16, fontFamily: 'var(--f-display)' }}>{cur.title}</b>
              <p className="muted" style={{ margin: '4px 0 0', fontSize: 14, lineHeight: 1.5 }}>{cur.body}</p>
            </div>
          </div>
          <button className={'btn sm block mt12 ' + (done[cur.id] ? '' : 'ink')} onClick={() => actions.togglePosture(cur.id)} aria-pressed={!!done[cur.id]}>
            {done[cur.id] ? <><Icon name="check" size={16} width={2.5} /> Done at my desk</> : 'Mark as done at my desk'}
          </button>
        </div>
      </section>

      <section className="card dark mx mt14 stack" style={{ padding: 20, borderRadius: 26, gap: 12 }}>
        <div className="row between">
          <span className="eyebrow" style={{ color: 'var(--lime)' }}>Desk setup score</span>
          <span className="big-num" style={{ fontSize: 34 }}>{score}<span style={{ fontSize: 18, color: 'var(--night-text)' }}>/6</span></span>
        </div>
        <Segs count={6} done={score} dark height={6} />
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'var(--night-soft)' }}>{verdict}</p>
      </section>

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>Checklist</h2><span className="sub">{score} of 6 done</span></div>
      <section className="card list mx">
        {CHECKPOINTS.map((c) => (
          <button key={c.id} className="routine-row" onClick={() => { actions.togglePosture(c.id); setSel(c.id); }} aria-pressed={!!done[c.id]}
            style={{ width: '100%', background: 'none', border: 0, borderBottom: '1px solid var(--line)', textAlign: 'left', padding: '14px 0' }}>
            <span style={{ width: 28, height: 28, borderRadius: 9, flex: '0 0 auto', display: 'grid', placeItems: 'center', border: done[c.id] ? 0 : '1.5px solid #C9CDD4', background: done[c.id] ? 'var(--lime)' : 'transparent' }}>
              {done[c.id] && <Icon name="check" size={15} width={3} />}
            </span>
            <span className="grow">
              <b style={{ display: 'block', fontSize: 15 }}>{c.n}. {c.title}</b>
            </span>
          </button>
        ))}
      </section>

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>Common posture patterns</h2></div>
      <section className="stack mx" style={{ gap: 10 }}>
        {PATTERNS.map((p) => (
          <article key={p.slug} className="card" style={{ padding: 18 }}>
            <div className="row between" style={{ alignItems: 'flex-start' }}>
              <b style={{ fontSize: 17, fontFamily: 'var(--f-display)' }}>{p.title}</b>
              <span className="tag">{p.aka}</span>
            </div>
            <p className="muted" style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.55 }}>{p.body}</p>
            <Link to={`/bingo/${p.slug}`} className="row mt12" style={{ gap: 6, fontWeight: 700, fontSize: 14, minHeight: 44 }}>
              Open the 5 relief exercises <Icon name="arrow" size={16} width={2} />
            </Link>
          </article>
        ))}
      </section>

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>Micro-habits</h2></div>
      <section className="card mx" style={{ padding: '6px 18px' }}>
        {HABITS.map((h, i) => (
          <div key={h.title} className="pillar-row">
            <span className="n">{String(i + 1).padStart(2, '0')}</span>
            <span><b>{h.title}</b><span>{h.body}</span></span>
          </div>
        ))}
      </section>

      <p className="muted" style={{ fontSize: 12, lineHeight: 1.5, margin: '18px 28px 0', textAlign: 'center' }}>
        General posture guidance. If pain persists or spreads into your arms or legs, see a physiotherapist.
      </p>
      <div className="spacer" />
      <TabBar active="track" />
    </main>
  );
}
