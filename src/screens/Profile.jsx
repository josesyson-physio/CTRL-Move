import { useState } from 'react';
import { go, Link } from '../lib/router.jsx';
import { BADGES, useStore } from '../lib/store.jsx';
import { dayKey, levelProgress, monthGrid } from '../lib/score.js';
import { Icon, Sheet, TabBar } from '../components/ui.jsx';

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function Profile() {
  const { s, actions, toast } = useStore();
  const [offset, setOffset] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const lvl = levelProgress(s.xp);
  const now = new Date();
  const view = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  const cells = monthGrid(view.getFullYear(), view.getMonth());
  const today = dayKey();
  const id = 'MP-' + String(Math.abs(hash(s.name || 'guest')) % 1000000).padStart(6, '0');

  const exportData = () => {
    const blob = new Blob([actions.exportData()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `ctrl-move-${today}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  return (
    <main className="screen">
      <header className="home-head">
        <h1 style={{ margin: 0, fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 800, letterSpacing: '-.03em' }}>You</h1>
        <Link to="/mission" className="icon-btn" aria-label="Our mission"><Icon name="spark" /></Link>
      </header>

      <section className="card dark mx mt14 row" style={{ padding: 20, borderRadius: 26, gap: 16 }}>
        <span style={{ width: 60, height: 60, borderRadius: 20, background: 'var(--lime)', color: 'var(--ink)', display: 'grid', placeItems: 'center', fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: 26, flex: '0 0 auto' }}>
          {(s.name || 'Y').slice(0, 1).toUpperCase()}
        </span>
        <div className="grow">
          <label htmlFor="name" className="sr-only" style={{ position: 'absolute', left: -9999 }}>Your name</label>
          <input id="name" value={s.name} placeholder="Add your name" onChange={(e) => actions.setName(e.target.value)} maxLength={30}
            style={{ background: 'transparent', border: 0, color: '#fff', fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 800, letterSpacing: '-.02em', padding: 0, width: '100%' }} />
          <div className="mono" style={{ fontSize: 12, color: 'var(--night-text)', marginTop: 4 }}>{s.role === 'physio' ? 'PHYSIO · VERIFICATION PENDING' : `PATIENT ID · ${id}`}</div>
          <div className="row" style={{ gap: 6, marginTop: 8, fontSize: 12, fontWeight: 700, color: 'var(--lime)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)' }} />{s.role === 'physio' ? 'Physio mode' : 'Active member'}
          </div>
        </div>
      </section>

      <section className="card mx mt12">
        <div className="row between" style={{ alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--f-display)', fontSize: 20, fontWeight: 800 }}>Level {lvl.level}</span>
          <span className="mono" style={{ fontSize: 12, color: 'var(--ink-2)' }}>{s.xp.toLocaleString()} / {lvl.next.toLocaleString()} XP</span>
        </div>
        <div className="bar mt12" style={{ height: 8 }}><i style={{ width: `${lvl.pct}%` }} /></div>
        <div className="badges mt18">
          {BADGES.map((b) => (
            <div key={b.id} className={'badge' + (b.ok(s) ? ' on' : '')}>
              <span className="m">{b.mark}</span>
              <span>{b.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card mx mt12" style={{ padding: 16 }}>
        <div className="row between">
          <h2 className="h-card" style={{ fontFamily: 'var(--f-display)' }}>{view.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h2>
          <div className="row" style={{ gap: 4 }}>
            <button className="icon-btn" style={{ background: 'var(--ground)', border: 0 }} aria-label="Previous month" onClick={() => setOffset(offset - 1)}><Icon name="back" size={16} width={2} /></button>
            <button className="icon-btn" style={{ background: 'var(--ground)', border: 0 }} aria-label="Next month" onClick={() => setOffset(Math.min(0, offset + 1))} disabled={offset >= 0}><Icon name="next" size={16} width={2} /></button>
          </div>
        </div>
        <div className="month">
          {DOW.map((d, i) => <span key={i} className="w">{d}</span>)}
          {cells.map((d, i) => {
            if (!d) return <span key={i} className="c" />;
            const k = dayKey(d);
            const cls = k === today ? 'today' : s.activeDays[k] ? 'active' : k > today ? 'future' : '';
            return <span key={i} className={'c ' + cls}><span>{d.getDate()}</span></span>;
          })}
        </div>
        <div className="legend" style={{ justifyContent: 'flex-start' }}>
          <span><i style={{ background: 'var(--lime)', border: '1px solid var(--ink)' }} />Active day</span>
          <span><i style={{ background: 'var(--ink)' }} />Today</span>
        </div>
      </section>

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 18 }}>Physical parameters</h2></div>
      <section className="card mx" style={{ padding: '0 16px' }}>
        <Param label="Height" placeholder="cm" value={s.params.height} onChange={(v) => actions.setParams({ height: v })} inputMode="numeric" />
        <Param label="Weight" placeholder="kg" value={s.params.weight} onChange={(v) => actions.setParams({ weight: v })} inputMode="numeric" />
        <Param label="Birthday" type="date" value={s.params.birthday} onChange={(v) => actions.setParams({ birthday: v })} />
        <div className="kv">
          <label htmlFor="p-sex"><span>Biological sex</span></label>
          <select id="p-sex" value={s.params.sex} onChange={(e) => actions.setParams({ sex: e.target.value })}>
            <option value="">Not set</option><option>Female</option><option>Male</option><option>Prefer not to say</option>
          </select>
        </div>
      </section>
      <p className="muted" style={{ margin: '8px 24px 0', fontSize: 12, lineHeight: 1.45 }}>Used to tailor routines, load and alerts. Stored only on this device.</p>

      <section className="card mx mt18" style={{ padding: '0 16px' }}>
        <button className="link-row" onClick={() => { actions.setRole(s.role === 'physio' ? 'user' : 'physio'); toast(s.role === 'physio' ? 'Switched to member mode' : 'Physio mode on · verification pending'); }}>
          {s.role === 'physio' ? 'Switch to member mode' : "I'm a physiotherapist"} <Icon name="next" size={18} width={2} />
        </button>
        <Link to="/consult" className="link-row">Share my progress with a physio <Icon name="next" size={18} width={2} /></Link>
        <button className="link-row" onClick={exportData}>Export my data <Icon name="download" size={18} /></button>
        <button className="link-row" style={{ color: 'var(--red)' }} onClick={() => setConfirm(true)}>Reset all data <Icon name="next" size={18} width={2} /></button>
      </section>
      <p className="muted" style={{ fontSize: 12, textAlign: 'center', margin: '18px 32px 0' }}>Ctrl+Move v1.0 · by MotionPlus Physio</p>
      <div className="spacer" />
      <TabBar active="you" />

      {confirm && (
        <Sheet labelledBy="reset-title" onClose={() => setConfirm(false)}>
          <h2 id="reset-title" className="h-section">Reset everything?</h2>
          <p className="muted" style={{ margin: 0, lineHeight: 1.5 }}>This clears your scans, pain logs, XP and badges on this device. Export first if you want a copy.</p>
          <div className="grid2">
            <button className="btn md" onClick={() => setConfirm(false)}>Cancel</button>
            <button className="btn md ink" style={{ background: 'var(--red)', borderColor: 'var(--red)' }} onClick={() => { actions.resetAll(); setConfirm(false); go('/'); }}>Reset</button>
          </div>
        </Sheet>
      )}
    </main>
  );
}

function Param({ label, value, onChange, placeholder = 'Not set', type = 'text', inputMode }) {
  const id = 'p-' + label.toLowerCase();
  return (
    <div className="kv">
      <label htmlFor={id}><span>{label}</span></label>
      <input id={id} type={type} value={value} placeholder={placeholder} inputMode={inputMode} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return h;
}
