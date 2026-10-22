import { useState } from 'react';
import { go, Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { PHYSIOS } from '../data/physios.js';
import { fmtDay, fmtTime, SESSION_TYPES } from '../data/care.js';
import { allGroups, initialOf, physioName } from '../lib/people.js';
import { Icon, TabBar, TopBar } from '../components/ui.jsx';

const TABS = [['one', '1:1 sessions'], ['group', 'Group'], ['my', 'My sessions']];

// Tele-therapy hub: book 1:1 video sessions, reserve group sessions, and
// see what is coming up.
export default function Consult({ tab: initial }) {
  const { s } = useStore();
  const [tab, setTab] = useState(['one', 'group', 'my'].includes(initial) ? initial : 'one');

  return (
    <main className="screen">
      <TopBar title="Tele-therapy" sub="See a physio from anywhere" right={<Link to="/chat" className="icon-btn" aria-label="Chats"><Icon name="comment" /></Link>} />
      <div className="seg-ctl small mx mt18" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        {TABS.map(([id, label]) => <button key={id} className={tab === id ? 'on' : ''} aria-pressed={tab === id} onClick={() => setTab(id)}>{label}</button>)}
      </div>
      {tab === 'one' && <OneToOne />}
      {tab === 'group' && <Groups s={s} />}
      {tab === 'my' && <Mine s={s} />}
      <div className="spacer" />
      <TabBar active="home" />
    </main>
  );
}

function OneToOne() {
  return (
    <>
      <section className="card dark mx mt14" style={{ padding: 20, borderRadius: 26 }}>
        <span className="eyebrow" style={{ color: 'var(--lime)' }}>How tele-therapy works</span>
        <div className="tele-steps">
          {[['Pick a physio', 'Read their insights first if you like'], ['Choose a slot', 'Assessment, follow-up or desk check'], ['Clinic confirms', 'They check online care suits you'], ['Join from the app', 'Your exercises are ready in the room']].map(([t, d], i) => (
            <div key={t} className="tele-step"><span className="flow-n">{i + 1}</span><span><b>{t}</b><span>{d}</span></span></div>
          ))}
        </div>
      </section>
      <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>Physiotherapists</h2><span className="sub">{PHYSIOS.length} physios</span></div>
      <section className="card list mx">
        {PHYSIOS.map((d, i) => (
          <div key={d.id} className="routine-row">
            <Link to={`/physio/${d.id}`} className="row grow" style={{ gap: 14 }}>
              <span style={{ width: 48, height: 48, borderRadius: 16, background: i % 2 ? 'var(--line)' : 'var(--ink)', color: i % 2 ? 'var(--ink)' : '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: 19, flex: '0 0 auto' }}>{initialOf(d.name)}</span>
              <span className="grow"><b style={{ display: 'block', fontSize: 16 }}>{d.name}</b><span className="sub">View profile</span></span>
            </Link>
            <Link to={`/book/${d.id}`} className="btn sm ink">Book</Link>
          </div>
        ))}
      </section>
    </>
  );
}

function Groups({ s }) {
  const { actions, toast } = useStore();
  const groups = allGroups(s).filter((g) => g.when > Date.now() - 3600000);
  return (
    <>
      <p className="muted mx mt14" style={{ fontSize: 14, lineHeight: 1.5 }}>Live classes led by a physio, from home or your desk. Small groups, so your physio can still correct your form.</p>
      <section className="stack mx mt12" style={{ gap: 12 }}>
        {groups.map((g) => {
          const mine = !!(s.seats || {})[g.id];
          const taken = g.taken + (mine ? 1 : 0);
          const left = g.seats - taken;
          const host = physioName(g.physio, s);
          return (
            <article key={g.id} className="card group-card">
              <div className="row between" style={{ alignItems: 'flex-start' }}>
                <span>
                  <span className="eyebrow">{fmtDay(g.when)} · {fmtTime(g.when)} · {g.mins} min</span>
                  <b className="group-title">{g.title}</b>
                  <span className="sub" style={{ display: 'block' }}>with {host} · {g.area} · {g.level || 'All levels'}</span>
                </span>
                {g.sample ? <span className="tag">Sample</span> : g.physio === 'me' ? <span className="tag lime">You host</span> : null}
              </div>
              <div className="bar mt12" style={{ height: 6 }}><i style={{ width: `${(taken / g.seats) * 100}%` }} /></div>
              <div className="row between mt8"><span className="sub">{taken} of {g.seats} seats taken</span><span className="sub" style={{ fontWeight: 700, color: left <= 3 ? 'var(--red)' : undefined }}>{left} left</span></div>
              {g.physio !== 'me' && (
                <div className="grid2 mt14">
                  <button className={'btn sm ' + (mine ? '' : 'ink')} disabled={!mine && left <= 0}
                    onClick={() => { actions.toggleSeat(g.id); toast(mine ? 'Seat released' : `Seat reserved · ${g.title}, ${fmtDay(g.when)}`); }}>
                    {mine ? <><Icon name="check" size={16} width={2.5} /> Reserved</> : 'Reserve seat'}
                  </button>
                  <Link to={`/session/${g.id}`} className="btn sm" aria-disabled={!mine} style={mine ? undefined : { opacity: 0.5, pointerEvents: 'none' }}>Join room</Link>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </>
  );
}

function Mine({ s }) {
  const { actions, toast } = useStore();
  const bookings = (s.bookings || []).slice().sort((a, b) => a.when - b.when);
  const seats = allGroups(s).filter((g) => (s.seats || {})[g.id]);
  if (!bookings.length && !seats.length) {
    return (
      <section className="card mx mt14 stack" style={{ gap: 12, textAlign: 'center', alignItems: 'center', padding: 28 }}>
        <span className="num-box" style={{ background: 'var(--ink)', color: 'var(--lime)' }}><Icon name="video" /></span>
        <b style={{ fontSize: 17 }}>No sessions yet</b>
        <span className="muted" style={{ fontSize: 14, lineHeight: 1.5 }}>Book a 1:1 video session or reserve a seat in a group class.</span>
        <button className="btn ink sm" onClick={() => go('/consult?tab=one')}>Find a physio</button>
      </section>
    );
  }
  return (
    <section className="stack mx mt14" style={{ gap: 12 }}>
      {bookings.map((b) => {
        const type = SESSION_TYPES.find((t) => t.id === b.type) || SESSION_TYPES[0];
        return (
          <article key={b.id} className="card group-card">
            <span className="eyebrow">{fmtDay(b.when)} · {fmtTime(b.when)} · {type.mins} min</span>
            <b className="group-title">{type.name}</b>
            <span className="sub" style={{ display: 'block' }}>with {physioName(b.physio, s)}{b.concern ? ` · ${b.concern}` : ''}</span>
            <div className="status-pill mt12"><span />Requested · the clinic will confirm this time</div>
            <div className="grid2 mt14">
              <button className="btn sm" onClick={() => { actions.cancelBooking(b.id); toast('Request cancelled'); }}>Cancel</button>
              <Link to={`/session/${b.id}`} className="btn sm ink">Preview room</Link>
            </div>
          </article>
        );
      })}
      {seats.map((g) => (
        <article key={g.id} className="card group-card">
          <span className="eyebrow">{fmtDay(g.when)} · {fmtTime(g.when)} · {g.mins} min · group</span>
          <b className="group-title">{g.title}</b>
          <span className="sub" style={{ display: 'block' }}>with {physioName(g.physio, s)}</span>
          <Link to={`/session/${g.id}`} className="btn sm ink block mt14">Join room</Link>
        </article>
      ))}
    </section>
  );
}
