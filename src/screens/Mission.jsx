import { Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { Icon, Wordmark } from '../components/ui.jsx';

export const PILLARS = [
  { t: 'Detect early', d: 'A 60-second Hardware Scan and a body map turn vague stiffness into a score you can see change, before it becomes an injury.' },
  { t: 'Move on time', d: 'A work-block timer nudges you to stand at the right moment, with guided resets that fit between meetings.' },
  { t: 'Guided by real physios', d: 'Every routine and article comes from licensed physiotherapists, and one tap books a consultation when you need more.' },
  { t: 'Make it a habit', d: 'XP, streaks, Pain Bingo and challenges make prevention something you want to come back to every day.' },
];

export default function Mission() {
  const { s } = useStore();
  return (
    <main className="screen">
      <section className="night mission-hero" style={{ background: 'var(--night-0)', color: '#fff' }}>
        <div className="row between">
          <Link to={s.onboarded ? '/home' : '/'} className="icon-btn" aria-label="Back"><Icon name="back" width={2} /></Link>
          <Wordmark dark />
        </div>
        <div className="eyebrow mt24" style={{ color: 'var(--lime)' }}>Our mission</div>
        <h1>Take <em>control</em> before pain takes it from you.</h1>
        <p>Most musculoskeletal pain from desk work builds quietly, over months of sitting still. Healthcare usually meets it only once it hurts. Ctrl+Move moves that moment earlier, to when a two-minute change still makes the difference.</p>
      </section>

      <section className="card mx" style={{ marginTop: -18, position: 'relative' }}>
        <div className="eyebrow">The shift</div>
        <div className="shift mt12">
          <div style={{ background: 'var(--ground)' }}><b style={{ display: 'block', marginBottom: 4 }}>From</b>Treating injuries after they happen</div>
          <Icon name="arrow" width={2} />
          <div style={{ background: 'var(--lime)' }}><b style={{ display: 'block', marginBottom: 4 }}>To</b>Spotting strain early and moving before it turns into pain</div>
        </div>
      </section>

      <div className="section-head"><h2 className="h-section">How we do it</h2></div>
      <section className="card mx" style={{ padding: '4px 18px' }}>
        {PILLARS.map((p, i) => (
          <div className="pillar-row" key={p.t}>
            <span className="n">{String(i + 1).padStart(2, '0')}</span>
            <span><b>{p.t}</b><span>{p.d}</span></span>
          </div>
        ))}
      </section>

      <section className="card dark mx mt14" style={{ borderRadius: 26 }}>
        <div className="eyebrow" style={{ color: 'var(--lime)' }}>Built by clinicians</div>
        <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.6, color: 'var(--night-soft)' }}>
          Ctrl+Move is made by MotionPlus Physio, a physiotherapy and rehabilitation group with clinics across Shimoga, Hyderabad and Bijapur. The same clinicians who treat these injuries every day write the routines you'll use.
        </p>
      </section>

      <p className="muted" style={{ fontSize: 12, lineHeight: 1.5, margin: '18px 28px 0', textAlign: 'center' }}>
        Ctrl+Move is a wellness and early-warning tool. It does not diagnose or replace a clinician.
      </p>
      <div style={{ padding: '20px var(--gutter) 32px' }}>
        <Link to={s.onboarded ? '/scan' : '/'} className="btn ink block">{s.onboarded ? 'Run my Hardware Scan' : 'Get started'}</Link>
      </div>
    </main>
  );
}
