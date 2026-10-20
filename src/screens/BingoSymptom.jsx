import { Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { BINGO_GUIDE } from '../data/bingoGuide.js';
import { Icon, PlayGlyph, TopBar } from '../components/ui.jsx';

const URGENT = /immediate|urgent|emergency/i;

export default function BingoSymptom({ slug }) {
  const { s, actions } = useStore();
  const index = BINGO_GUIDE.findIndex((g) => g.slug === slug);
  const g = BINGO_GUIDE[index];
  if (!g) {
    return (
      <main className="screen">
        <TopBar title="Pain Bingo" backTo="/bingo" />
        <p className="mx mt24 muted">We couldn't find that symptom.</p>
      </main>
    );
  }
  const marked = !!(s.bingo.marked || {})[index];
  const total = Math.max(1, Math.round(g.exercises.reduce((a, e) => a + e.sec, 0) / 60));
  const urgent = g.safety.when && URGENT.test(g.safety.when);
  const code = 'BINGO'[index % 5] + (Math.floor(index / 5) + 1);

  return (
    <main className="screen">
      <TopBar title={g.name} sub={g.aka || `Square ${code} · Pain Bingo`} backTo="/bingo" right={
        <button className={'btn sm ' + (marked ? 'ink' : '')} aria-pressed={marked} onClick={() => actions.toggleTile(index)} style={{ height: 44 }}>
          {marked ? <><Icon name="check" size={16} width={2.5} /> Marked</> : 'Mark'}
        </button>
      } />

      {urgent && (
        <div className="card mx mt18 row" style={{ background: '#FBE9E5', borderColor: '#FBE9E5', alignItems: 'flex-start' }}>
          <Icon name="alert" color="#8E1B0E" />
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: '#5C1409' }}>
            <b>Check the warning signs below first.</b> If any apply, get medical help now instead of doing these exercises.
          </p>
        </div>
      )}

      <Link to={`/play/bingo:${g.slug}`} className="card dark mx mt18 stack" style={{ padding: 20, borderRadius: 28, gap: 14 }}>
        <span className="eyebrow" style={{ color: 'var(--lime)' }}>Guided relief routine</span>
        <div className="row between" style={{ alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05 }}>{g.exercises.length} exercises</div>
            <div style={{ fontSize: 14, color: 'var(--night-soft)', marginTop: 6 }}>About {total} min · timed, step by step · +20 XP</div>
          </div>
          <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--lime)', display: 'grid', placeItems: 'center', flex: '0 0 auto' }}><PlayGlyph size={20} color="#0C0D0F" /></span>
        </div>
      </Link>

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>Exercises</h2><span className="sub">From your physio team</span></div>
      <section className="stack mx" style={{ gap: 10 }}>
        {g.exercises.map((e, i) => (
          <article key={e.title} className="card" style={{ padding: 16 }}>
            <div className="row" style={{ alignItems: 'flex-start', gap: 14 }}>
              <span className="num-box">{String(i + 1).padStart(2, '0')}</span>
              <div className="grow">
                <b style={{ fontSize: 15, display: 'block' }}>{e.title}</b>
                <p className="muted" style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.5 }}>{e.text}</p>
                {e.dose && <span className="tag mt8" style={{ display: 'inline-block', textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>{e.dose}</span>}
              </div>
            </div>
          </article>
        ))}
      </section>

      {g.tips.length > 0 && (
        <>
          <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>Simple tips</h2></div>
          <section className="card mx" style={{ padding: '6px 18px' }}>
            {g.tips.map((t) => (
              <div key={t} className="row" style={{ alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
                <span style={{ width: 22, height: 22, borderRadius: 7, background: 'var(--lime)', display: 'grid', placeItems: 'center', flex: '0 0 auto', marginTop: 1 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0C0D0F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                </span>
                <span style={{ fontSize: 14, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </section>
        </>
      )}

      {(g.safety.flags.length > 0 || g.safety.intro) && (
        <>
          <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>Safety advice</h2></div>
          <section className="card mx stack" style={{ gap: 12 }}>
            {g.safety.intro && <p className="muted" style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>{g.safety.intro}</p>}
            {g.safety.flags.length > 0 && (
              <div className="flags">
                <b style={{ fontSize: 14 }}>{(g.safety.when || 'Stop and consult a healthcare professional if you experience:').replace(/:$/, '')}</b>
                <ul>{g.safety.flags.map((f) => <li key={f}>{f}</li>)}</ul>
              </div>
            )}
            {g.safety.remember && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}><b>Remember:</b> {g.safety.remember}</p>}
            <Link to="/consult?match=1" className="btn md block">Talk to a physio</Link>
          </section>
        </>
      )}
      <div style={{ height: 32 }} />
    </main>
  );
}
