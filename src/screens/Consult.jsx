import { useStore } from '../lib/store.jsx';
import { PHYSIOS } from '../data/physios.js';
import { TabBar, TopBar } from '../components/ui.jsx';

export default function Consult() {
  const { s, actions, toast } = useStore();

  return (
    <main className="screen">
      <TopBar title="Consult a physio" sub="Our physiotherapists" />

      <section className="card dark mx mt18 stack" style={{ padding: 20, borderRadius: 26, gap: 8 }}>
        <span className="eyebrow" style={{ color: 'var(--lime)' }}>Book a session</span>
        <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1.15 }}>Request a consult and the clinic will confirm a time with you.</div>
      </section>

      <div className="section-head" style={{ marginTop: 22 }}>
        <h2 className="h-section" style={{ fontSize: 20 }}>Physiotherapists</h2>
        <span className="sub">{PHYSIOS.length} physios</span>
      </div>

      <section className="card list mx">
        {PHYSIOS.map((d, i) => {
          const booked = !!s.booked[d.id];
          return (
            <div key={d.id} className="routine-row">
              <span style={{ width: 48, height: 48, borderRadius: 16, background: i % 2 ? 'var(--line)' : 'var(--ink)', color: i % 2 ? 'var(--ink)' : '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: 19, flex: '0 0 auto' }}>
                {d.name.replace('Dr. ', '').slice(0, 1)}
              </span>
              <b className="grow" style={{ fontSize: 16 }}>{d.name}</b>
              <button className={'btn sm ' + (booked ? '' : 'ink')} style={booked ? { borderColor: 'var(--ink)' } : undefined}
                onClick={() => { actions.book(d.id); if (!booked) toast(`Request sent to ${d.name}. The clinic will confirm a slot.`); }}>
                {booked ? 'Requested' : 'Request'}
              </button>
            </div>
          );
        })}
      </section>
      <div className="spacer" />
      <TabBar active="home" />
    </main>
  );
}
