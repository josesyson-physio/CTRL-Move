import { useEffect, useMemo, useState } from 'react';
import { useStore } from '../lib/store.jsx';
import { PHYSIO_FILTERS, PHYSIOS } from '../data/physios.js';
import { Icon, TabBar, TopBar } from '../components/ui.jsx';

export default function Consult({ autoMatch }) {
  const { s, actions, toast } = useStore();
  const [filter, setFilter] = useState('All');
  const [matched, setMatched] = useState(false);

  const recent = s.painLogs.slice(-3);
  const areas = [...new Set(recent.flatMap((l) => l.areas))];
  const zoneChips = [...new Set(recent.flatMap((l) => l.zones))].slice(0, 4);

  // Best match: the physio whose focus areas overlap most with recent pain.
  const bestId = useMemo(() => {
    if (!areas.length) return 'venkaty';
    let best = null; let score = -1;
    PHYSIOS.forEach((p) => {
      const sc = p.areas.filter((a) => areas.includes(a)).length;
      if (sc > score) { best = p.id; score = sc; }
    });
    return best;
  }, [areas.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (autoMatch) setMatched(true); }, [autoMatch]);

  let list = PHYSIOS.filter((p) => filter === 'All' || p.cat === filter);
  if (matched && filter === 'All') list = [...list.filter((p) => p.id === bestId), ...list.filter((p) => p.id !== bestId)];

  return (
    <main className="screen">
      <TopBar title="Consult a physio" sub="Verified clinical experts" />

      <section className="card dark mx mt18 stack" style={{ padding: 20, borderRadius: 26, gap: 14 }}>
        <div className="row" style={{ gap: 10 }}>
          <Icon name="spark" color="#C6F432" />
          <span className="eyebrow" style={{ color: 'var(--lime)' }}>Intelligent matching</span>
        </div>
        <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1.15 }}>Match with the best therapist for your symptoms</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {zoneChips.length ? zoneChips.map((z) => (
            <span key={z} style={{ height: 28, padding: '0 10px', borderRadius: 999, background: 'var(--night-3)', fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}>{z}</span>
          )) : <span style={{ fontSize: 13, color: 'var(--night-text)' }}>Log your pain first for a sharper match.</span>}
        </div>
        <button className="btn lime md" onClick={() => { setMatched(true); setFilter('All'); }}>{matched ? 'Matched · best fit shown first' : 'Match me'}</button>
      </section>

      <div className="pills mt18" role="group" aria-label="Filter specialists">
        {PHYSIO_FILTERS.map((f) => <button key={f} className={'pill' + (f === filter ? ' on' : '')} aria-pressed={f === filter} onClick={() => setFilter(f)}>{f}</button>)}
      </div>

      <div className="section-head" style={{ marginTop: 20 }}>
        <h2 className="h-section" style={{ fontSize: 20 }}>Available specialists</h2>
        <span className="sub">{list.length} physios</span>
      </div>

      <div className="stack mx" style={{ gap: 12 }}>
        {list.map((d, i) => {
          const isBest = matched && d.id === bestId;
          const booked = !!s.booked[d.id];
          return (
            <article key={d.id} className="card stack" style={{ padding: 16, gap: 14, borderColor: isBest ? 'var(--ink)' : undefined }}>
              {isBest && <span className="tag lime" style={{ alignSelf: 'flex-start' }}>Best match for you</span>}
              <div className="row" style={{ alignItems: 'flex-start', gap: 14 }}>
                <span style={{ width: 52, height: 52, borderRadius: 16, background: i % 2 ? 'var(--line)' : 'var(--ink)', color: i % 2 ? 'var(--ink)' : '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: 20, flex: '0 0 auto' }}>
                  {d.name.replace('Dr. ', '').slice(0, 1)}
                </span>
                <div className="grow">
                  <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                    <b style={{ fontSize: 16 }}>{d.name}</b>
                    <span className="tag">{d.tag}</span>
                  </div>
                  <div className="sub" style={{ marginTop: 4, lineHeight: 1.4 }}>{d.spec}</div>
                  <div className="row" style={{ gap: 4, marginTop: 6, fontSize: 13, fontWeight: 700 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#0C0D0F" aria-hidden="true"><path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" /></svg>
                    {d.rating} <span style={{ fontWeight: 500, color: 'var(--ink-2)' }}>({d.reviews})</span>
                  </div>
                </div>
              </div>
              <div style={{ height: 1, background: 'var(--line)' }} />
              <div className="row">
                <div className="grow">
                  <div className="eyebrow" style={{ fontSize: 10 }}>Available</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{d.hours}</div>
                </div>
                <div>
                  <div className="eyebrow" style={{ fontSize: 10 }}>Fee</div>
                  <div style={{ fontSize: 15, fontWeight: 800, marginTop: 2 }}>{d.fee}</div>
                </div>
                <button className={'btn sm ' + (booked ? '' : 'ink')} style={booked ? { borderColor: 'var(--ink)' } : undefined}
                  onClick={() => { actions.book(d.id); if (!booked) toast(`Request sent to ${d.name}. The clinic will confirm a slot.`); }}>
                  {booked ? 'Requested' : 'Book'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <div className="spacer" />
      <TabBar active="home" />
    </main>
  );
}
