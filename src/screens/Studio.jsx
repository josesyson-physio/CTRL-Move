import { useEffect, useRef, useState } from 'react';
import { go, Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { atTime, DEMO_TYPES, fmtDay, fmtTime, MOTIONS, nextDays, pickMotion, SAMPLE_INBOX } from '../data/care.js';
import { initialOf, physioName } from '../lib/people.js';
import { Icon, TabBar, TopBar } from '../components/ui.jsx';
import MotionFigure from '../components/MotionFigure.jsx';
import { ExerciseRow } from './PhysioProfile.jsx';

const AREAS = ['Neck', 'Shoulders', 'Upper back', 'Lower back', 'Wrists', 'Hips', 'Whole body'];

function PhysioGate({ title, children }) {
  const { s, actions, toast } = useStore();
  if (s.role === 'physio') return children;
  return (
    <main className="screen">
      <TopBar title={title} backTo="/profile" />
      <section className="card mx mt24 stack" style={{ gap: 14 }}>
        <span className="alert-ico" style={{ background: 'var(--ground)', color: 'var(--ink)' }}><Icon name="shield" size={24} /></span>
        <h2 className="h-section">For physiotherapists</h2>
        <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>
          The Studio is where physios publish story insights and Health Shots, build their exercise library, host group sessions and reply to members. Your licence is reviewed before anything goes public.
        </p>
        <button className="btn ink block" onClick={() => { actions.setRole('physio'); toast('Physio mode on · verification pending'); }}>I'm a physiotherapist</button>
      </section>
    </main>
  );
}

export default function Studio() {
  return <PhysioGate title="Physio Studio"><StudioHome /></PhysioGate>;
}

function StudioHome() {
  const { s, actions, toast } = useStore();
  const me = physioName('me', s);
  const mine = s.myPosts;
  const actionsGrid = [
    ['/feed/new?type=insight', 'Write a story insight', 'Guided story + ethics check', 'feed'],
    ['/feed/new?type=shot', 'Post a Health Shot', 'Up to 60 seconds', 'playCircle'],
    ['/studio/exercise', 'Add an exercise', 'AI, video or virtual demo', 'dumbbell'],
    ['/studio/group', 'Host a group session', 'Live class, set your seats', 'video'],
  ];

  return (
    <main className="screen">
      <header className="home-head">
        <h1 style={{ margin: 0, fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 800, letterSpacing: '-.03em' }}>Studio</h1>
        <Link to="/physio/me" className="icon-btn" aria-label="View my public profile"><Icon name="you" /></Link>
      </header>

      <section className="card dark mx mt14 row" style={{ padding: 18, borderRadius: 26, gap: 14 }}>
        <span className="post-av" style={{ width: 52, height: 52, fontSize: 22, background: 'var(--lime)', color: 'var(--ink)' }}>{initialOf(me)}</span>
        <span className="grow">
          <b style={{ display: 'block', fontFamily: 'var(--f-display)', fontSize: 19 }}>{me}</b>
          <span style={{ fontSize: 12, color: 'var(--night-text)' }}>Verification pending · posts are reviewed before going public</span>
        </span>
      </section>

      <section className="studio-grid mx mt12">
        {actionsGrid.map(([to, t, d, ic]) => (
          <Link key={to} to={to} className="studio-act">
            <span className="num-box" style={{ background: 'var(--ink)', color: 'var(--lime)' }}><Icon name={ic} size={20} /></span>
            <b>{t}</b><span>{d}</span>
          </Link>
        ))}
      </section>

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>Inbox</h2><span className="sub">Members start chats</span></div>
      <section className="card list mx">
        {SAMPLE_INBOX.map((t) => {
          const replies = (s.inbox || {})[t.id] || [];
          const last = replies.length ? replies[replies.length - 1] : t.msgs[t.msgs.length - 1];
          return (
            <Link key={t.id} to={`/studio/inbox/${t.id}`} className="routine-row">
              <span className="post-av" style={{ background: 'var(--ground)', color: 'var(--ink)', width: 44, height: 44 }}>{initialOf(t.member)}</span>
              <span className="grow">
                <b style={{ display: 'block', fontSize: 15 }}>{t.member}</b>
                <span className="sub" style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{last.from === 'physio' ? 'You: ' : ''}{last.text}</span>
              </span>
              {!replies.length && <span className="dot-new" aria-label="Needs a reply" />}
            </Link>
          );
        })}
      </section>
      <p className="muted mx mt8" style={{ fontSize: 12, lineHeight: 1.5 }}>You can reply to anyone who writes to you, but you can't message a member first. This keeps Ctrl+Move free of unsolicited selling.</p>

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>My exercise library</h2><Link to="/studio/exercise">Add</Link></div>
      {(s.library || []).length ? (
        <section className="card list mx">
          {s.library.map((x) => (
            <ExerciseRow key={x.id} x={x} right={<button className="icon-btn" aria-label={`Remove ${x.name}`} onClick={() => { actions.removeExercise(x.id); toast('Exercise removed'); }}><Icon name="close" size={16} width={2} /></button>} />
          ))}
        </section>
      ) : <EmptyRow text="Add your first exercise. Members can play it from your profile, and it appears in your session rooms." to="/studio/exercise" cta="Add exercise" />}

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>My group sessions</h2><Link to="/studio/group">Host</Link></div>
      {(s.groups || []).length ? (
        <section className="card list mx">
          {s.groups.map((g) => (
            <Link key={g.id} to={`/session/${g.id}`} className="routine-row">
              <span className="num-box" style={{ background: 'var(--ink)', color: 'var(--lime)' }}><Icon name="video" size={18} /></span>
              <span className="grow"><b style={{ display: 'block', fontSize: 15 }}>{g.title}</b><span className="sub">{fmtDay(g.when)} · {fmtTime(g.when)} · {g.seats} seats</span></span>
              <Icon name="next" size={18} width={2} />
            </Link>
          ))}
        </section>
      ) : <EmptyRow text="Run a live class for up to 30 members. Small groups keep form corrections possible." to="/studio/group" cta="Host a session" />}

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>My posts</h2><span className="sub">{mine.length}</span></div>
      {mine.length ? (
        <section className="card list mx">
          {mine.map((p) => (
            <Link key={p.id} to={p.type === 'shot' ? `/shots?i=${p.id}` : `/feed/${p.id}`} className="routine-row">
              <span className="grow"><b style={{ display: 'block', fontSize: 15 }}>{p.title}</b><span className="sub">{p.type === 'shot' ? 'Health Shot' : p.type === 'insight' ? 'Story insight' : 'Tip'}</span></span>
              <span className="tag warn">In review</span>
            </Link>
          ))}
        </section>
      ) : <p className="muted mx" style={{ fontSize: 14 }}>Nothing published yet.</p>}

      <div className="spacer" />
      <TabBar active="you" />
    </main>
  );
}

function EmptyRow({ text, to, cta }) {
  return (
    <section className="card mx row" style={{ gap: 12 }}>
      <span className="grow muted" style={{ fontSize: 14, lineHeight: 1.5 }}>{text}</span>
      <Link to={to} className="btn sm ink">{cta}</Link>
    </section>
  );
}

/* ---------- inbox thread (physio side) ---------- */
export function StudioThread({ id }) {
  return <PhysioGate title="Inbox"><Thread id={id} /></PhysioGate>;
}
function Thread({ id }) {
  const { s, actions } = useStore();
  const t = SAMPLE_INBOX.find((x) => x.id === id);
  const [text, setText] = useState('');
  const end = useRef(null);
  const msgs = t ? [...t.msgs, ...((s.inbox || {})[id] || [])] : [];
  useEffect(() => { if (end.current) end.current.scrollIntoView({ block: 'end' }); }, [msgs.length]);
  if (!t) return <main className="screen"><TopBar title="Inbox" backTo="/studio" /><p className="mx mt24 muted">Conversation not found.</p></main>;
  const send = () => { const v = text.trim(); if (!v) return; actions.physioReply(id, v); setText(''); };
  return (
    <main className="screen chat-screen">
      <TopBar title={t.member} sub="Started by the member" backTo="/studio" />
      <section className="chat-rules compact mx"><span className="eyebrow">Reply guidance</span><ul><li>Guide, don't diagnose. Suggest an assessment when you need one.</li><li>Red flags (numbness, weakness, chest pain): advise urgent care.</li></ul></section>
      <section className="chat-log mx">
        {msgs.map((m, i) => (
          <div key={i} className={'bubble ' + (m.from === 'physio' ? 'me' : 'them')}>{m.text}</div>
        ))}
        <div ref={end} />
      </section>
      <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <label htmlFor="reply" style={{ position: 'absolute', left: -9999 }}>Reply</label>
        <input id="reply" className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Reply" maxLength={600} autoComplete="off" />
        <button type="submit" className="send" aria-label="Send" disabled={!text.trim()}><Icon name="arrow" width={2.2} /></button>
      </form>
    </main>
  );
}

/* ---------- add exercise ---------- */
export function StudioExercise() {
  return <PhysioGate title="Add exercise"><AddExercise /></PhysioGate>;
}
function AddExercise() {
  const { actions, toast } = useStore();
  const [name, setName] = useState('');
  const [area, setArea] = useState('Neck');
  const [demo, setDemo] = useState('ai');
  const [cue, setCue] = useState('');
  const [motion, setMotion] = useState('chin-tuck');
  const [tempo, setTempo] = useState('slow');
  const [reps, setReps] = useState(10);
  const [sec, setSec] = useState(40);
  const [video, setVideo] = useState(null);
  const ai = pickMotion(`${name} ${cue} ${area}`);
  const shown = demo === 'ai' ? ai : motion;
  const ok = name.trim().length > 2 && cue.trim().length > 10 && (demo !== 'video' || video);

  const save = () => {
    if (!ok) return;
    actions.addExercise({ name: name.trim(), area, demo, motion: shown, tempo, reps, sec, cue: cue.trim(), videoUrl: demo === 'video' ? video.url : null });
    toast('Exercise added to your library');
    go('/studio');
  };

  return (
    <main className="screen">
      <TopBar title="Add an exercise" sub="To your library" backTo="/studio" close />
      <div className="seg-ctl small mx mt18" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }} role="group" aria-label="Demonstration type">
        {DEMO_TYPES.map((d) => <button key={d.id} className={demo === d.id ? 'on' : ''} aria-pressed={demo === d.id} onClick={() => setDemo(d.id)}>{d.name}</button>)}
      </div>
      <p className="muted mx mt8" style={{ fontSize: 13 }}>{DEMO_TYPES.find((d) => d.id === demo).hint}</p>

      <section className="card mx mt12 ex-preview">
        {demo === 'video' ? (
          <label className="drop" style={{ margin: 0, minHeight: 220 }}>
            <input type="file" accept="video/*" aria-label="Upload exercise video" onChange={(e) => {
              const f = e.target.files && e.target.files[0];
              if (f) setVideo({ url: URL.createObjectURL(f), name: f.name });
            }} />
            {video ? <video src={video.url} muted playsInline autoPlay loop /> : (
              <>
                <span style={{ width: 52, height: 52, borderRadius: 16, background: 'var(--ink)', display: 'grid', placeItems: 'center' }}><Icon name="upload" color="#4FE3C1" width={2} size={22} /></span>
                <b style={{ fontSize: 15 }}>Upload your demonstration</b>
                <span className="sub">MP4 or MOV · up to 60 s</span>
              </>
            )}
          </label>
        ) : (
          <div className="ex-preview-fig">
            <MotionFigure motion={shown} tempo={tempo} dark />
            <span className="tag lime">{demo === 'ai' ? `AI picked: ${MOTIONS[shown].name}` : MOTIONS[shown].name}</span>
          </div>
        )}
      </section>

      {demo === 'virtual' && (
        <>
          <div className="section-head"><h2 className="h-section" style={{ fontSize: 17 }}>Choose the movement</h2></div>
          <div className="motion-grid mx">
            {Object.entries(MOTIONS).map(([id, m]) => (
              <button key={id} className={'motion-opt' + (motion === id ? ' on' : '')} aria-pressed={motion === id} onClick={() => setMotion(id)}>
                <span><MotionFigure motion={id} dark tight size={56} /></span>{m.name}
              </button>
            ))}
          </div>
        </>
      )}

      <section className="card mx mt14 stack" style={{ gap: 14 }}>
        <div className="field">
          <label htmlFor="ex-name">Exercise name</label>
          <input id="ex-name" className="input" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder="e.g. Deep chin tucks" />
        </div>
        <div className="field">
          <label htmlFor="ex-cue">How to do it</label>
          <textarea id="ex-cue" className="textarea" rows={3} value={cue} onChange={(e) => setCue(e.target.value)} maxLength={400} placeholder="Clear, simple cues a member can follow alone" />
        </div>
        <div className="field">
          <span className="lbl">Body area</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {AREAS.map((a) => <button key={a} className={'pill' + (area === a ? ' on' : '')} style={{ height: 36, fontSize: 13 }} aria-pressed={area === a} onClick={() => setArea(a)}>{a}</button>)}
          </div>
        </div>
        <div className="grid2">
          <Stepper label="Reps" value={reps} set={setReps} min={1} max={30} />
          <Stepper label="Seconds" value={sec} set={setSec} min={10} max={180} step={5} />
        </div>
        {demo !== 'video' && (
          <div className="field">
            <span className="lbl">Tempo</span>
            <div className="seg-ctl small" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              {['slow', 'normal'].map((t) => <button key={t} className={tempo === t ? 'on' : ''} aria-pressed={tempo === t} onClick={() => setTempo(t)}>{t === 'slow' ? 'Slow' : 'Normal'}</button>)}
            </div>
          </div>
        )}
      </section>
      <div className="spacer" />
      <div className="dock"><button className="btn ink block" disabled={!ok} onClick={save}>{ok ? 'Add to my library' : demo === 'video' && !video ? 'Upload a video to continue' : 'Add a name and cues'}</button></div>
    </main>
  );
}

function Stepper({ label, value, set, min, max, step = 1 }) {
  return (
    <div className="field">
      <span className="lbl">{label}</span>
      <div className="stepper">
        <button aria-label={`Fewer ${label.toLowerCase()}`} onClick={() => set(Math.max(min, value - step))}>−</button>
        <b>{value}</b>
        <button aria-label={`More ${label.toLowerCase()}`} onClick={() => set(Math.min(max, value + step))}>+</button>
      </div>
    </div>
  );
}

/* ---------- host a group session ---------- */
export function StudioGroup() {
  return <PhysioGate title="Host a session"><AddGroup /></PhysioGate>;
}
const GTIMES = ['07:00', '07:30', '13:00', '18:00', '18:30', '19:00', '20:00'];
function AddGroup() {
  const { actions, toast } = useStore();
  const days = nextDays(7);
  const [title, setTitle] = useState('');
  const [area, setArea] = useState('Neck');
  const [day, setDay] = useState(0);
  const [time, setTime] = useState('19:00');
  const [mins, setMins] = useState(30);
  const [seats, setSeats] = useState(20);
  const ok = title.trim().length > 3;
  const save = () => {
    if (!ok) return;
    actions.addGroup({ title: title.trim(), area, when: atTime(days[day], time), mins, seats, level: 'All levels' });
    toast('Group session scheduled');
    go('/studio');
  };
  const chips = (list, val, set, fmt = (x) => x) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {list.map((x) => <button key={x} className={'pill' + (val === x ? ' on' : '')} style={{ height: 36, fontSize: 13 }} aria-pressed={val === x} onClick={() => set(x)}>{fmt(x)}</button>)}
    </div>
  );
  return (
    <main className="screen">
      <TopBar title="Host a group session" backTo="/studio" close />
      <section className="card mx mt18 stack" style={{ gap: 16 }}>
        <div className="field">
          <label htmlFor="g-title">Session title</label>
          <input id="g-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={50} placeholder="e.g. Desk Neck Reset" />
        </div>
        <div className="field"><span className="lbl">Focus</span>{chips(AREAS, area, setArea)}</div>
        <div className="field"><span className="lbl">Day</span>{chips(days.map((_, i) => i), day, setDay, (i) => days[i].toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' }))}</div>
        <div className="field"><span className="lbl">Time</span>{chips(GTIMES, time, setTime)}</div>
        <div className="field"><span className="lbl">Length</span>{chips([15, 20, 30, 45], mins, setMins, (m) => `${m} min`)}</div>
        <div className="field"><span className="lbl">Seats</span>{chips([10, 15, 20, 30], seats, setSeats)}</div>
      </section>
      <p className="muted mx mt12" style={{ fontSize: 12, lineHeight: 1.5 }}>Members reserve seats from Tele-therapy › Group. Keep groups small enough to correct form on camera.</p>
      <div className="spacer" />
      <div className="dock"><button className="btn ink block" disabled={!ok} onClick={save}>{ok ? `Schedule · ${fmtDay(atTime(days[day], time))}, ${time}` : 'Add a title'}</button></div>
    </main>
  );
}
