import { useEffect, useState } from 'react';
import { Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { DEMO_TYPES, MOTIONS } from '../data/care.js';
import { allLibrary, physioName } from '../lib/people.js';
import { Icon, PlayGlyph, Ring, TopBar } from '../components/ui.jsx';
import MotionFigure from '../components/MotionFigure.jsx';

// Plays one exercise from a physio's library.
export default function Exercise({ id }) {
  const { s, actions, toast } = useStore();
  const x = allLibrary(s).find((e) => e.id === id);
  const [left, setLeft] = useState(x ? x.sec : 0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const t = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (!running || left > 0) return;
    setRunning(false);
    setDone(true);
    actions.completeRoutine('lib:' + id);
    toast('+20 XP · exercise complete');
  }, [left, running]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!x) {
    return (
      <main className="screen"><TopBar title="Exercise" backTo="/consult" /><p className="mx mt24 muted">This exercise is no longer available.</p></main>
    );
  }
  const demo = DEMO_TYPES.find((d) => d.id === x.demo) || DEMO_TYPES[0];
  const who = physioName(x.physio, s);
  const demoNote = x.demo === 'ai' ? `AI demo · animated from ${who}'s cue (${MOTIONS[x.motion].name.toLowerCase()})`
    : x.demo === 'virtual' ? `Virtual demonstration set by ${who} · ${x.tempo} tempo` : `Video by ${who}`;

  return (
    <main className="screen dark">
      <TopBar title={x.name} sub={`${who} · ${x.area}`} dark close backTo={x.physio === 'me' ? '/studio' : `/physio/${x.physio}`} />
      <section className="ex-stage mx mt18">
        {x.demo === 'video' && x.videoUrl
          ? <video src={x.videoUrl} autoPlay muted loop playsInline controls />
          : <MotionFigure motion={x.motion} tempo={x.tempo} dark label={`${demo.name} of ${x.name}`} />}
        <span className="tag ex-demo">{demo.name}</span>
      </section>
      <p className="mx mt12" style={{ fontSize: 12, color: 'var(--night-text)', textAlign: 'center' }}>{demoNote}</p>

      <section className="row mx mt18" style={{ gap: 18, justifyContent: 'center' }}>
        <Ring size={108} stroke={8} pct={(1 - left / x.sec) * 100} label={`${left} seconds left`}>
          <span className="big-num" style={{ fontSize: 30 }}>{left}s</span>
        </Ring>
        <div className="stack" style={{ gap: 4 }}>
          <span className="eyebrow">Dose</span>
          <b style={{ fontSize: 18 }}>{x.reps} reps</b>
          <span style={{ fontSize: 13, color: 'var(--night-text)' }}>{x.tempo === 'slow' ? 'Slow and controlled' : 'Steady rhythm'}</span>
        </div>
      </section>

      <section className="card mx mt18" style={{ background: 'var(--night)', borderColor: 'var(--night-line)', color: '#fff' }}>
        <span className="eyebrow">How to do it</span>
        <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.55, color: 'var(--night-soft)' }}>{x.cue}</p>
        <p style={{ margin: '12px 0 0', fontSize: 12, lineHeight: 1.5, color: 'var(--night-text)' }}>Stop if it causes sharp pain, numbness or dizziness, and ask your physio.</p>
      </section>

      <div className="spacer" />
      <div className="mx" style={{ paddingBottom: 28 }}>
        {done ? (
          <div className="grid2">
            <button className="btn ghost-dark md" onClick={() => { setDone(false); setLeft(x.sec); setRunning(true); }}>Again</button>
            <Link to={x.physio === 'me' ? '/studio' : `/physio/${x.physio}`} className="btn lime md">Done</Link>
          </div>
        ) : (
          <button className="btn lime md block" onClick={() => setRunning(!running)}>
            {running ? 'Pause' : <><PlayGlyph size={16} color="#0B1B2B" /> {left < x.sec ? 'Resume' : 'Start'}</>}
          </button>
        )}
        {x.physio !== 'me' && <Link to={`/chat/${x.physio}`} className="btn text block mt8"><Icon name="comment" size={16} /> Ask {who} about this</Link>}
      </div>
    </main>
  );
}
