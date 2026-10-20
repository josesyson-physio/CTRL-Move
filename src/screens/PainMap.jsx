import { useState } from 'react';
import { go, Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { BACK, FRONT, findZone } from '../data/zones.js';
import { comfortLabel, painLabel, painTone } from '../lib/score.js';
import { BodyFigure, Icon, Sheet, TopBar } from '../components/ui.jsx';

export default function PainMap() {
  const { s, actions, toast } = useStore();
  const [view, setView] = useState('front');
  const [sel, setSel] = useState({});
  const [pain, setPain] = useState(3);
  const [comfort, setComfort] = useState(7);
  const [alertAt, setAlertAt] = useState(null);

  const tone = painTone(pain);
  const list = view === 'front' ? FRONT : BACK;
  const prefix = view === 'front' ? 'f:' : 'b:';
  const chosen = Object.keys(sel).filter((k) => sel[k]).map(findZone).filter(Boolean);
  const lastLog = s.painLogs[s.painLogs.length - 1];

  const submit = () => {
    if (!chosen.length) { toast('Tap at least one area on the body map'); return; }
    actions.logPain({ zones: chosen, pain, comfort });
    if (pain >= 8) { setAlertAt(pain); return; }
    toast('+10 XP · assessment saved');
    setSel({});
    go('/home');
  };

  return (
    <main className="screen">
      <TopBar title="Pain assessment" sub="Select your discomfort zones" right={
        <div style={{ minWidth: 52, height: 44, padding: '0 10px', borderRadius: 14, background: 'var(--ink)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} aria-label={`${chosen.length} zones selected`}>
          <b style={{ fontFamily: 'var(--f-display)', fontSize: 17, lineHeight: 1 }}>{chosen.length}</b>
          <span style={{ fontSize: 10, color: 'var(--night-text)' }}>zones</span>
        </div>
      } />

      <div className="seg-ctl mx mt18" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        <button className={view === 'front' ? 'on' : ''} aria-pressed={view === 'front'} onClick={() => setView('front')}>Front</button>
        <button className={view === 'back' ? 'on' : ''} aria-pressed={view === 'back'} onClick={() => setView('back')}>Back</button>
      </div>

      <section className="card mx mt12" style={{ borderRadius: 28, padding: '20px 0 16px' }}>
        <div className="map-stage">
          <BodyFigure view={view} />
          {list.map((z) => {
            const key = prefix + z.id;
            const on = !!sel[key];
            return (
              <button key={key} className="zone" aria-pressed={on} aria-label={z.label + (on ? ', selected' : '')}
                style={{ left: Math.round(z.x * 1.1 - 22), top: Math.round(z.y * 1.1 - 22) }}
                onClick={() => setSel({ ...sel, [key]: !on })}>
                <i style={on ? { width: 26, height: 26, background: tone.bg, borderColor: tone.bg, boxShadow: `0 0 0 6px ${tone.halo}` } : undefined} />
              </button>
            );
          })}
        </div>
        <p className="muted" style={{ margin: '10px 24px 0', fontSize: 13, textAlign: 'center' }}>Tap a zone to mark it. Switch to Back for spine, hips and hamstrings.</p>
      </section>

      {chosen.length > 0 && (
        <div className="mx mt14" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {chosen.map((z) => (
            <button key={z.key} className="chip" onClick={() => setSel({ ...sel, [z.key]: false })} aria-label={`Remove ${z.label}`}>
              {z.label} <Icon name="close" size={12} width={2.5} color="#4A4F58" />
            </button>
          ))}
        </div>
      )}

      <Level title="Pain level" sub="How intense is it right now?" value={pain} label={painLabel(pain)} labelColor={tone.text}
        onDown={() => setPain(Math.max(0, pain - 1))} onUp={() => setPain(Math.min(10, pain + 1))}
        fill={(i) => (i <= pain ? painTone(i).bg : undefined)} ends={['No pain', 'Unbearable']} />
      <Level title="Comfort level" sub="Overall mobility and ease" value={comfort} label={comfortLabel(comfort)}
        onDown={() => setComfort(Math.max(0, comfort - 1))} onUp={() => setComfort(Math.min(10, comfort + 1))}
        fill={(i) => (i <= comfort ? '#0C0D0F' : undefined)} ends={['Very stiff', 'Moving freely']} />

      {lastLog && (
        <p className="muted pad" style={{ fontSize: 13, marginTop: 14 }}>
          Last check: {lastLog.pain}/10 in {lastLog.zones.slice(0, 2).join(', ')}{lastLog.zones.length > 2 ? '…' : ''} on {new Date(lastLog.at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
        </p>
      )}

      <div className="spacer" />
      <div className="dock">
        <button className="btn ink block" onClick={submit}>Submit assessment <span className="xp-tag">+10 XP</span></button>
      </div>

      {alertAt && (
        <Sheet labelledBy="alert-title" onClose={() => { setAlertAt(null); go('/home'); }}>
          <div className="row" style={{ gap: 14, marginTop: 6 }}>
            <span className="alert-ico"><Icon name="alert" size={26} width={2} /></span>
            <div>
              <div className="eyebrow" style={{ color: 'var(--deep)', fontWeight: 700 }}>Severe pain detected</div>
              <h2 id="alert-title" style={{ margin: '4px 0 0', fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-.02em' }}>Pain at {alertAt} out of 10</h2>
            </div>
          </div>
          <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>
            This level of pain needs a professional look. We recommend booking a physiotherapy consultation soon, rather than pushing through exercises.
          </p>
          <div className="flags">
            <b style={{ fontSize: 14 }}>Get urgent medical care if you also have</b>
            <ul>
              <li>Numbness or weakness in an arm or leg</li>
              <li>Chest pain or shortness of breath</li>
              <li>Loss of bladder or bowel control</li>
              <li>Pain after a fall or injury, or with fever</li>
            </ul>
          </div>
          <div className="stack">
            <Link to="/consult?match=1" className="btn ink block"><Icon name="search" size={18} width={2} /> Find a physiotherapist</Link>
            <Link to="/relief" className="btn block md">Gentle relief, only if pain allows</Link>
            <button className="btn text" onClick={() => setAlertAt(null)}>Edit my answers</button>
          </div>
        </Sheet>
      )}
    </main>
  );
}

function Level({ title, sub, value, label, labelColor, onDown, onUp, fill, ends }) {
  return (
    <section className="card mx mt12 stack" style={{ gap: 14 }}>
      <div className="row between">
        <div>
          <div className="h-card">{title}</div>
          <div className="sub">{sub}</div>
        </div>
        <div className="stepper">
          <button onClick={onDown} aria-label={`Lower ${title.toLowerCase()}`}>−</button>
          <div className="val" aria-live="polite">
            <b>{value}</b>
            <span style={labelColor ? { color: labelColor } : undefined}>{label}</span>
          </div>
          <button onClick={onUp} aria-label={`Raise ${title.toLowerCase()}`}>+</button>
        </div>
      </div>
      <div className="scale" aria-hidden="true">
        {Array.from({ length: 10 }, (_, k) => <span key={k} style={{ background: fill(k + 1) }} />)}
      </div>
      <div className="scale-ends"><span>{ends[0]}</span><span>{ends[1]}</span></div>
    </section>
  );
}
