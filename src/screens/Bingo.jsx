import { useState } from 'react';
import { Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { BINGO, BINGO_FLAGS, LINES, XP_PER_LINE, XP_PER_TILE } from '../data/bingo.js';
import { BINGO_GUIDE } from '../data/bingoGuide.js';
import { Icon, PlayGlyph, TabBar, TopBar } from '../components/ui.jsx';

const COLS = ['B', 'I', 'N', 'G', 'O'];

export default function Bingo() {
  const { s, actions } = useStore();
  const [showAll, setShowAll] = useState(false);
  const marked = s.bingo.marked || {};
  const done = LINES.filter((l) => l.every((i) => marked[i]));
  const firstLine = LINES.findIndex((l) => l.every((i) => marked[i]));
  const markedIdx = BINGO.map((_, i) => i).filter((i) => marked[i]);
  const guideIdx = showAll ? [...markedIdx, ...BINGO.map((_, i) => i).filter((i) => !marked[i])] : markedIdx;
  const inLine = new Set(done.flat());
  const best = Math.max(...LINES.map((l) => l.filter((i) => marked[i]).length));
  const count = Object.values(marked).filter(Boolean).length;
  const xp = count * XP_PER_TILE + done.length * XP_PER_LINE;
  const flagged = BINGO.filter((label, i) => marked[i] && BINGO_FLAGS.includes(label));

  return (
    <main className="screen">
      <TopBar title="Pain Bingo" sub="Identify symptoms · unlock relief therapy" right={
        <button className="icon-btn" onClick={actions.newBingoCard} aria-label="Clear card"><Icon name="refresh" /></button>
      } />

      <section className="card dark mx mt18" style={{ padding: '18px 8px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <Stat n={xp} l="Card XP" lime />
        <Stat n={done.length} l="Bingo wins" divider />
        <Stat n={<>{done.length}<span style={{ color: 'var(--ink-3)' }}>/12</span></>} l="Lines cleared" />
      </section>

      <section className="card mt12" style={{ margin: '12px 16px 0', padding: '14px 10px 12px', borderRadius: 26 }}>
        <div className="bingo-head">{COLS.map((c) => <span key={c}>{c}</span>)}</div>
        <div className="bingo">
          {BINGO.map((label, i) => {
            const on = !!marked[i];
            const line = inLine.has(i);
            return (
              <button key={i} lang="en" className={'tile' + (line ? ' line' : on ? ' on' : '')} aria-pressed={on} onClick={() => actions.toggleTile(i)}>
                <span className="c">{COLS[i % 5]}{Math.floor(i / 5) + 1}</span>
                <span className="t">{label}</span>
              </button>
            );
          })}
        </div>
        <div className="legend">
          <span><i style={{ background: 'var(--ink)' }} />Marked</span>
          <span><i style={{ background: 'var(--lime)', border: '1px solid var(--ink)' }} />Completed line</span>
        </div>
      </section>

      {flagged.length > 0 && (
        <div className="card mx mt12 row" style={{ background: '#FBE9E5', borderColor: '#FBE9E5', alignItems: 'flex-start' }}>
          <Icon name="alert" color="#8E1B0E" />
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: '#5C1409' }}>
            <b>{flagged.join(' and ')}</b> can have causes beyond desk strain. Read the warning signs in its guide below. If it is new, persistent or severe, please speak to a doctor.
          </p>
        </div>
      )}

      {done.length > 0 ? (
        <Link to={`/play/line:${firstLine}`} className="card lime mx mt12 row" style={{ padding: '16px 18px', gap: 14 }}>
          <span style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--ink)', display: 'grid', placeItems: 'center' }}><PlayGlyph color="#4FE3C1" /></span>
          <span className="grow">
            <span className="mono" style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '.08em' }}>LINE CLEARED · +{XP_PER_LINE} XP</span>
            <span style={{ display: 'block', fontWeight: 700, fontSize: 15, marginTop: 2 }}>Relief routine unlocked</span>
          </span>
          <Icon name="next" width={2} />
        </Link>
      ) : (
        <div className="card mx mt12" style={{ borderStyle: 'dashed', borderColor: '#C9CDD4', fontSize: 14, color: 'var(--ink-2)' }}>
          Mark {5 - best} more in a row, column or diagonal to unlock a relief routine.
        </div>
      )}

      <div className="section-head">
        <h2 className="h-section" style={{ fontSize: 20 }}>Symptom guides</h2>
        <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Marked only' : 'Show all 25'}</button>
      </div>
      {guideIdx.length === 0 ? (
        <p className="muted mx" style={{ margin: '0 20px', fontSize: 14, lineHeight: 1.5 }}>Mark a symptom to get its 5 physio exercises, tips and safety advice. Or tap <b>Show all 25</b> to browse.</p>
      ) : (
        <section className="card list mx">
          {guideIdx.map((i) => {
            const g = BINGO_GUIDE[i];
            return (
              <Link key={g.slug} to={`/bingo/${g.slug}`} className="routine-row">
                <span className="num-box" style={marked[i] ? { background: 'var(--ink)', color: '#fff' } : undefined}>{'BINGO'[i % 5]}{Math.floor(i / 5) + 1}</span>
                <span className="grow">
                  <b style={{ fontSize: 15, display: 'block' }}>{BINGO[i]}</b>
                  <span className="sub" style={{ display: 'block', marginTop: 2 }}>{g.exercises.length} exercises · tips · safety advice</span>
                </span>
                <Icon name="next" width={2} />
              </Link>
            );
          })}
        </section>
      )}

      <section className="card mx mt12">
        <div className="row between">
          <h2 className="h-card">Clinical guide</h2>
          <span className="tag">Patient education</span>
        </div>
        <ol className="steps">
          <li><b>01</b>Tap the squares that match symptoms you feel. Open any symptom for its exercises.</li>
          <li><b>02</b>Complete any horizontal, vertical or diagonal line to get a Bingo.</li>
          <li><b>03</b>Each Bingo unlocks a physio-approved stretch sequence.</li>
          <li><b>04</b>Log your pain afterwards to see your progress.</li>
        </ol>
      </section>
      <div className="spacer" />
      <TabBar active="play" />
    </main>
  );
}

function Stat({ n, l, lime, divider }) {
  return (
    <div style={{ textAlign: 'center', borderLeft: divider ? '1px solid var(--night-line)' : 0, borderRight: divider ? '1px solid var(--night-line)' : 0 }}>
      <div style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 800, color: lime ? 'var(--lime)' : '#fff' }}>{n}</div>
      <div style={{ fontSize: 12, color: 'var(--night-text)', marginTop: 2 }}>{l}</div>
    </div>
  );
}
