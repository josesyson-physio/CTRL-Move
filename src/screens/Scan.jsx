import { useState } from 'react';
import { go } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { SCAN } from '../data/scan.js';
import { AREAS } from '../data/zones.js';
import { Bolt, Segs, TopBar } from '../components/ui.jsx';

export default function Scan() {
  const { actions } = useStore();
  const [answers, setAnswers] = useState([]);
  const level = answers.length;
  const t = SCAN[Math.min(level, SCAN.length - 1)];
  const xp = answers.reduce((s, a) => s + a.xp, 0);
  const area = AREAS.find((a) => a.id === t.area);

  const answer = (label, points, gain) => {
    const next = [...answers, { area: t.area, title: t.title, label, points, xp: gain }];
    if (next.length === SCAN.length) {
      actions.saveScan(next);
      go('/scan/result');
      return;
    }
    setAnswers(next);
  };

  return (
    <main className="screen">
      <TopBar title="Hardware Scan" close right={<span className="xp-pill"><Bolt />{xp} XP</span>} />

      <div className="mx mt20">
        <Segs count={SCAN.length} done={level} current={level} />
        <div className="row between mt8 mono" style={{ fontSize: 11, color: 'var(--ink-2)' }}>
          <span>BODY · 60 S</span><span>LEVEL {level + 1} / {SCAN.length}</span>
        </div>
      </div>

      <section className="card mx mt18 stack" style={{ padding: 22, borderRadius: 28, gap: 14 }} key={level}>
        <div className="row between">
          <span className="mono" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', color: 'var(--ink-2)' }}>LEVEL {String(level + 1).padStart(2, '0')}</span>
          <span className="chip" style={{ height: 28, fontSize: 12 }}>{area ? area.label : ''}</span>
        </div>
        <h2 className="q-title">{t.title}</h2>
        <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>{t.body}</p>
        <div style={{ height: 1, background: 'var(--line)' }} />
        <div style={{ fontSize: 13, fontWeight: 700 }}>How did it feel?</div>
        <div className="stack" style={{ gap: 8 }}>
          {t.opts.map(([label, points, gain]) => (
            <button key={label} className="opt" onClick={() => answer(label, points, gain)}>
              <span className="pips" aria-hidden="true">
                <i className="on" style={{ height: 6 }} />
                <i className={points >= 2 ? 'on' : ''} style={{ height: 11 }} />
                <i className={points >= 3 ? 'on' : ''} style={{ height: 16 }} />
              </span>
              <span className="lbl">{label}</span>
              <span className="xp-tag" style={{ background: 'var(--ink)', color: 'var(--lime)' }}>+{gain}</span>
            </button>
          ))}
        </div>
      </section>

      <div style={{ marginTop: 'auto', padding: '16px 20px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <button className="btn text" onClick={() => answer('Skipped', 2, 0)}>Skip this test</button>
        <p className="muted" style={{ margin: 0, fontSize: 12, textAlign: 'center' }}>Move gently. Stop if you feel sharp or shooting pain.</p>
      </div>
    </main>
  );
}
