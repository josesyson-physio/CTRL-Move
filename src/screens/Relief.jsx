import { useState } from 'react';
import { Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { systemStatus } from '../lib/score.js';
import { AREA_ROUTINE, MOVES, RELIEF_LIST, ROUTINES } from '../data/routines.js';
import { Icon, PlayGlyph, TabBar, TopBar } from '../components/ui.jsx';

const FILTERS = ['All', 'Neck', 'Back', 'Arms', 'Shoulders', 'Legs'];

export default function Relief() {
  const { s } = useStore();
  const [filter, setFilter] = useState('All');
  const status = systemStatus(s);
  const weakest = status ? status.areas.slice().sort((a, b) => a.v - b.v)[0] : null;
  const recId = weakest && weakest.v < 70 ? AREA_ROUTINE[weakest.id] : 'desk-reset';
  const rec = ROUTINES[recId] || { name: MOVES[recId].name, summary: `${MOVES[recId].focus} · ${MOVES[recId].sec} s` };

  const items = RELIEF_LIST.map((id, i) => ({ id, num: String(i + 1).padStart(2, '0'), ...MOVES[id] }))
    .filter((m) => filter === 'All' || m.tag === filter);

  return (
    <main className="screen">
      <TopBar title="Quick Relief" sub="Clinically backed video guides" />

      <Link to={`/play/${recId}`} className="card dark mx mt18 stack" style={{ padding: 20, borderRadius: 28, gap: 16 }}>
        <div className="row between">
          <span className="eyebrow" style={{ color: 'var(--lime)' }}>Recommended for you</span>
          <span style={{ fontSize: 12, color: 'var(--night-text)' }}>{status ? 'From your scan' : 'Start here'}</span>
        </div>
        <div className="row between" style={{ alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 30, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05 }}>{rec.name}</div>
            <div style={{ fontSize: 14, color: 'var(--night-soft)', marginTop: 6 }}>{rec.summary}</div>
          </div>
          <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--lime)', display: 'grid', placeItems: 'center', flex: '0 0 auto' }}><PlayGlyph size={20} color="#0B1B2B" /></span>
        </div>
      </Link>

      <div className="card mx mt14 row" style={{ padding: '14px 16px', borderRadius: 18, alignItems: 'flex-start' }}>
        <Icon name="info" />
        <div className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}><b style={{ color: 'var(--ink)' }}>Expert advice.</b> Move slowly. Do not push through sharp or stabbing pain. Breathe throughout.</div>
      </div>

      <div className="pills mt18" role="group" aria-label="Filter routines">
        {FILTERS.map((f) => (
          <button key={f} className={'pill' + (f === filter ? ' on' : '')} aria-pressed={f === filter} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="section-head" style={{ marginTop: 20 }}>
        <h2 className="h-section" style={{ fontSize: 20 }}>Routines</h2>
        <span className="sub">{items.length} of {RELIEF_LIST.length}</span>
      </div>
      <section className="card list mx">
        {items.map((m) => (
          <div key={m.id} className={'routine-row' + (m.locked ? ' locked' : '')}>
            <span className="num-box">{m.num}</span>
            <span className="grow">
              <span className="row" style={{ gap: 8 }}>
                <b style={{ fontSize: 15 }}>{m.name}</b>
                <span className="tag">{m.tag}</span>
              </span>
              <span className="sub" style={{ display: 'block', marginTop: 3 }}>{m.locked ? 'Video guide coming soon' : `${m.focus} · ${m.sec} s`}</span>
            </span>
            {m.locked ? (
              <span className="round-btn locked" aria-label="Locked"><Icon name="lock" size={16} /></span>
            ) : (
              <Link to={`/play/${m.id}`} className="round-btn" aria-label={`Play ${m.name}`}><PlayGlyph size={16} color="#fff" /></Link>
            )}
          </div>
        ))}
      </section>
      <div className="spacer" />
      <TabBar active="play" />
    </main>
  );
}
