import { useState } from 'react';
import { go } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { CHALLENGES } from '../data/challenges.js';
import { Bolt, Ring, Segs, TopBar } from '../components/ui.jsx';

export default function Challenge() {
  const { actions, toast } = useStore();
  const [idx, setIdx] = useState(0);
  const [xp, setXp] = useState(0);
  const finished = idx >= CHALLENGES.length;
  const c = CHALLENGES[Math.min(idx, CHALLENGES.length - 1)];

  const claim = () => {
    actions.saveChallenge(xp);
    toast(`+${xp} XP · challenge complete`);
    go('/home');
  };

  return (
    <main className="screen dark">
      <TopBar title="Muscle Challenge" close dark right={<span className="xp-pill"><Bolt />{xp}</span>} />
      <div className="mx mt20">
        <Segs count={CHALLENGES.length} done={idx} current={idx} dark />
        <div className="mono mt8" style={{ fontSize: 11, color: 'var(--night-text)' }}>
          {finished ? 'COMPLETE' : `CHALLENGE ${String(idx + 1).padStart(2, '0')} / ${String(CHALLENGES.length).padStart(2, '0')}`}
        </div>
      </div>

      {!finished ? (
        <>
          <section className="mx" style={{ marginTop: 28 }} key={idx}>
            <h2 style={{ margin: 0, fontFamily: 'var(--f-display)', fontSize: 40, fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1 }}>{c.title}</h2>
            <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.55, color: 'var(--night-soft)' }}>{c.body}</p>
          </section>
          <div className="target mx mt20">
            <div>
              <div className="eyebrow">Target</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 48, fontWeight: 800, letterSpacing: '-.04em', color: 'var(--lime)' }}>{c.target}</div>
            </div>
            <Ring size={76} stroke={6} pct={(idx / CHALLENGES.length) * 100} track="#22364D">
              <span className="mono" style={{ fontSize: 12, fontWeight: 700 }}>{idx}/{CHALLENGES.length}</span>
            </Ring>
          </div>
          <div className="mx mt20" style={{ fontSize: 13, fontWeight: 700, color: 'var(--night-text)' }}>How did it go?</div>
          <div className="stack mx mt12" style={{ gap: 8, paddingBottom: 28 }}>
            {c.opts.map(([label, gain]) => (
              <button key={label} className="opt" onClick={() => { setXp(xp + gain); setIdx(idx + 1); }}>
                <span className="lbl">{label}</span>
                <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--lime)' }}>+{gain} XP</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <section className="mx stack" style={{ marginTop: 40, gap: 12 }}>
            <span className="eyebrow" style={{ color: 'var(--lime)' }}>All {CHALLENGES.length} cleared</span>
            <h2 style={{ margin: 0, fontFamily: 'var(--f-display)', fontSize: 44, fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1 }}>Your muscles beat it.</h2>
            <p style={{ margin: 0, fontSize: 15, color: 'var(--night-soft)', lineHeight: 1.5 }}>{xp} XP earned this round. Come back tomorrow to beat your score.</p>
          </section>
          <div className="stack mx" style={{ marginTop: 'auto', paddingBottom: 28 }}>
            <button className="btn lime block" onClick={claim}>Claim {xp} XP</button>
            <button className="btn ghost-dark block md" onClick={() => { setIdx(0); setXp(0); }}>Play again</button>
          </div>
        </>
      )}
    </main>
  );
}
