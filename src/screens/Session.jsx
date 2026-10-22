import { useEffect, useRef, useState } from 'react';
import { Link, back as goBack } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { fmtDay, fmtTime, SESSION_TYPES } from '../data/care.js';
import { allGroups, allLibrary, initialOf, physioName } from '../lib/people.js';
import { Icon } from '../components/ui.jsx';
import { ExerciseRow } from './PhysioProfile.jsx';

// The tele-therapy room. Live video between devices needs a video service
// (see README); until then the room shows your own camera preview and the
// exercises your physio has prepared.
export default function Session({ id }) {
  const { s } = useStore();
  const booking = (s.bookings || []).find((b) => b.id === id);
  const group = allGroups(s).find((g) => g.id === id);
  const physio = booking ? booking.physio : group ? group.physio : null;
  const [stream, setStream] = useState(null);
  const [err, setErr] = useState('');
  const [mic, setMic] = useState(false);
  const vid = useRef(null);

  useEffect(() => { if (vid.current && stream) vid.current.srcObject = stream; }, [stream]);
  useEffect(() => () => { if (stream) stream.getTracks().forEach((t) => t.stop()); }, [stream]);

  if (!physio) {
    return <main className="screen dark"><div className="mx mt24"><button className="icon-btn" onClick={() => goBack('/consult')} aria-label="Back"><Icon name="back" width={2} /></button><p style={{ color: 'var(--night-soft)' }}>This session could not be found.</p></div></main>;
  }
  const name = physioName(physio, s);
  const title = booking ? (SESSION_TYPES.find((t) => t.id === booking.type) || SESSION_TYPES[0]).name : group.title;
  const when = booking ? booking.when : group.when;
  const lib = allLibrary(s).filter((x) => x.physio === physio).slice(0, 3);

  const camera = async () => {
    if (stream) { stream.getTracks().forEach((t) => t.stop()); setStream(null); return; }
    try {
      setErr('');
      const st = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      setStream(st);
    } catch (e) {
      setErr('Camera not available. Check your browser permissions.');
    }
  };

  return (
    <main className="screen dark">
      <header className="topbar dark">
        <button className="icon-btn" onClick={() => goBack('/consult?tab=my')} aria-label="Leave"><Icon name="close" width={2} /></button>
        <div className="topbar-text">
          <h1 className="h-screen">{title}</h1>
          <div className="sub">{fmtDay(when)} · {fmtTime(when)}{group ? ` · ${group.taken + 1} joining` : ''}</div>
        </div>
      </header>

      <section className="room mx mt18">
        <div className="room-main">
          <span className="post-av room-av">{initialOf(name)}</span>
          <b>{name}</b>
          <span>Waiting for your physio to join</span>
        </div>
        <div className="room-self">
          {stream ? <video ref={vid} autoPlay muted playsInline /> : <span>You</span>}
        </div>
      </section>
      {err && <p className="mx mt8" style={{ color: '#FFB4A3', fontSize: 13 }}>{err}</p>}

      <div className="room-ctl mt18">
        <button aria-pressed={mic} aria-label={mic ? 'Mute' : 'Unmute'} onClick={() => setMic(!mic)} className={mic ? 'on' : ''}><Icon name="pulse" size={22} /></button>
        <button aria-pressed={!!stream} aria-label={stream ? 'Turn camera off' : 'Turn camera on'} onClick={camera} className={stream ? 'on' : ''}><Icon name="video" size={22} /></button>
        <button aria-label="Leave session" className="leave" onClick={() => goBack('/consult?tab=my')}><Icon name="close" size={22} width={2.2} /></button>
      </div>

      <section className="card mx mt24" style={{ background: 'var(--night)', borderColor: 'var(--night-line)', color: '#fff', padding: '14px 16px' }}>
        <span className="eyebrow">Ready for this session</span>
        {lib.length ? lib.map((x) => <ExerciseRow key={x.id} x={x} />) : <p style={{ color: 'var(--night-soft)', fontSize: 14 }}>Your physio will share exercises during the session.</p>}
      </section>
      <p className="mx mt14" style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--night-text)' }}>
        Preview room. Live video with your physio switches on once Ctrl+Move is connected to its video service. Nothing from your camera leaves this device.
      </p>
      <div className="mx mt8" style={{ paddingBottom: 28 }}>
        <Link to={`/chat/${physio}`} className="btn ghost-dark block sm"><Icon name="comment" size={16} /> Message {name}</Link>
      </div>
    </main>
  );
}
