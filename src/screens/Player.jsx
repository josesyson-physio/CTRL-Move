import { useEffect, useState } from 'react';
import { go, Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { MOVES, routineById } from '../data/routines.js';
import { Icon, PlayGlyph, Ring, Segs, TopBar } from '../components/ui.jsx';

export default function Player({ id, postId }) {
  const { actions, toast } = useStore();
  const routine = routineById(id) || routineById('desk-reset');
  const moves = routine.moves.map((m) => ({ id: m, ...MOVES[m] }));
  const [i, setI] = useState(0);
  const [left, setLeft] = useState(moves[0].sec);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const m = moves[i];

  // Count down while running.
  useEffect(() => {
    if (!running) return undefined;
    const t = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(t);
  }, [running]);

  // When a move hits zero, advance or finish.
  useEffect(() => {
    if (!running || left > 0) return;
    if (i < moves.length - 1) {
      if (navigator.vibrate) navigator.vibrate(60);
      setI(i + 1);
      setLeft(moves[i + 1].sec);
    } else {
      setRunning(false);
      setDone(true);
    }
  }, [left, running]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!done) return;
    actions.completeRoutine(routine.id, postId);
    toast(postId ? '+45 XP · routine complete' : '+20 XP · routine complete');
    if (navigator.vibrate) navigator.vibrate(120);
  }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  const jump = (j) => { setI(j); setLeft(moves[j].sec); };

  if (m.locked) {
    return (
      <main className="screen dark">
        <TopBar title={m.name} close dark backTo="/relief" />
        <p className="mx mt24" style={{ color: 'var(--night-soft)' }}>This video guide is coming soon.</p>
      </main>
    );
  }

  if (done) {
    return (
      <main className="screen dark">
        <TopBar title={routine.name} close dark backTo="/home" />
        <section className="mx stack" style={{ marginTop: 48, gap: 12 }}>
          <span className="eyebrow" style={{ color: 'var(--lime)' }}>Routine complete</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--f-display)', fontSize: 44, fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1 }}>Nice reset. Your body noticed.</h1>
          <p style={{ margin: 0, fontSize: 15, color: 'var(--night-soft)', lineHeight: 1.5 }}>Log how you feel now so we can see what is working for you.</p>
        </section>
        <div className="stack mx" style={{ marginTop: 'auto', paddingBottom: 28 }}>
          <Link to="/track" className="btn lime block">Log how I feel</Link>
          <button className="btn ghost-dark block md" onClick={() => go('/home')}>Back to home</button>
        </div>
      </main>
    );
  }

  return (
    <main className="screen dark">
      <header className="topbar dark">
        <Link to="/relief" className="icon-btn" aria-label="Close routine"><Icon name="close" width={2} /></Link>
        <div className="grow">
          <div className="eyebrow">{routine.name} · Move {i + 1} of {moves.length}</div>
          <div className="mt8"><Segs count={moves.length} done={i} current={i} dark height={4} /></div>
        </div>
      </header>

      <div className="video-box mx mt18">
        {m.video ? (
          <video src={m.video} autoPlay={running} muted loop playsInline />
        ) : (
          <>
            <Icon name="video" size={40} color="#6B707A" width={1.5} />
            <span style={{ fontSize: 13, color: 'var(--night-text)' }}>Physio video for {m.name}</span>
          </>
        )}
        <span className="badge tag lime">Physio guided</span>
      </div>

      <section className="mx" style={{ marginTop: 22 }}>
        <span className="eyebrow">{m.tag} · {m.focus}</span>
        <h1 style={{ margin: '6px 0 0', fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.05 }}>{m.name}</h1>
        <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.55, color: 'var(--night-soft)', minHeight: 70 }}>{m.cue}</p>
      </section>

      <div style={{ marginTop: 'auto', padding: '0 20px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <Ring size={132} stroke={8} pct={(1 - left / m.sec) * 100} track="#23252A">
          <span style={{ fontFamily: 'var(--f-display)', fontSize: 40, fontWeight: 800, letterSpacing: '-.03em' }} aria-live="off">{left}s</span>
        </Ring>
        <div className="controls">
          <button className="ctl" onClick={() => jump(Math.max(0, i - 1))} aria-label="Previous move"><Icon name="prev" width={2} /></button>
          <button className="ctl main" onClick={() => setRunning(!running)} aria-label={running ? 'Pause' : 'Start'}>
            {running
              ? <svg width="26" height="26" viewBox="0 0 24 24" fill="#0C0D0F" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              : <PlayGlyph size={26} color="#0C0D0F" />}
          </button>
          <button className="ctl" onClick={() => (i < moves.length - 1 ? jump(i + 1) : (setRunning(false), setDone(true)))} aria-label="Next move"><Icon name="skip" width={2} /></button>
        </div>
        <div style={{ fontSize: 13, color: 'var(--night-text)' }}>
          {i < moves.length - 1 ? `Up next: ${moves[i + 1].name}` : 'Last move. Finish strong.'}
        </div>
      </div>
    </main>
  );
}
