import { useState } from 'react';
import { go } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { atTime, CONCERNS, fmtDay, nextDays, physioById, SESSION_TYPES, slotsFor } from '../data/care.js';
import { Icon, TopBar } from '../components/ui.jsx';

export default function Book({ id }) {
  const { actions, toast } = useStore();
  const p = physioById(id);
  const days = nextDays(7);
  const [type, setType] = useState('assess');
  const [day, setDay] = useState(0);
  const [time, setTime] = useState(null);
  const [concern, setConcern] = useState(null);
  const [note, setNote] = useState('');

  if (!p) return <main className="screen"><TopBar title="Book" backTo="/consult" /><p className="mx mt24 muted">This physio could not be found.</p></main>;

  const slots = slotsFor(p.id, days[day]);
  const ready = !!time;
  const submit = () => {
    if (!ready) return;
    const when = atTime(days[day], time);
    actions.requestBooking({ physio: p.id, type, when, concern, note: note.trim() });
    toast(`Requested · ${fmtDay(when)} at ${time}. The clinic will confirm.`);
    go('/consult?tab=my');
  };

  return (
    <main className="screen">
      <TopBar title="Book a tele-session" sub={`with ${p.name}`} backTo={`/physio/${p.id}`} />

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 18 }}>Session type</h2></div>
      <section className="stack mx" style={{ gap: 10 }}>
        {SESSION_TYPES.map((t) => (
          <button key={t.id} className={'choice' + (type === t.id ? ' on' : '')} aria-pressed={type === t.id} onClick={() => setType(t.id)}>
            <span className="grow"><b>{t.name}</b><span>{t.note}</span></span>
            <span className="choice-min">{t.mins} min</span>
          </button>
        ))}
      </section>

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 18 }}>Day</h2></div>
      <div className="h-scroll day-row" role="group" aria-label="Day">
        {days.map((d, i) => (
          <button key={i} className={'day-chip' + (i === day ? ' on' : '')} aria-pressed={i === day} onClick={() => { setDay(i); setTime(null); }}>
            <span>{d.toLocaleDateString(undefined, { weekday: 'short' })}</span>
            <b>{d.getDate()}</b>
          </button>
        ))}
      </div>

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 18 }}>Time</h2><span className="sub">Your local time</span></div>
      <section className="slot-grid mx" role="group" aria-label="Time">
        {slots.map((sl) => (
          <button key={sl.time} className={'slot' + (time === sl.time ? ' on' : '')} disabled={sl.taken} aria-pressed={time === sl.time} onClick={() => setTime(sl.time)}>
            {sl.taken ? <s>{sl.time}</s> : sl.time}
          </button>
        ))}
      </section>

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 18 }}>What would you like help with?</h2></div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }} className="mx">
        {CONCERNS.map((c) => (
          <button key={c} className={'pill' + (concern === c ? ' on' : '')} style={{ height: 36, fontSize: 13 }} aria-pressed={concern === c} onClick={() => setConcern(concern === c ? null : c)}>{c}</button>
        ))}
      </div>
      <div className="field mx mt14">
        <label htmlFor="bk-note">Anything your physio should know? (optional)</label>
        <textarea id="bk-note" className="textarea" rows={3} value={note} maxLength={400} onChange={(e) => setNote(e.target.value)} placeholder="Where it hurts, since when, what makes it worse" />
      </div>

      <p className="muted mx mt14" style={{ fontSize: 12, lineHeight: 1.5 }}>
        <Icon name="info" size={14} /> Your physio checks that online care suits you before confirming. Some problems need an in-clinic assessment first.
      </p>
      <div className="spacer" />
      <div className="dock">
        <button className="btn ink block" disabled={!ready} onClick={submit}>{ready ? `Request ${fmtDay(atTime(days[day], time))} · ${time}` : 'Choose a time'}</button>
      </div>
    </main>
  );
}
