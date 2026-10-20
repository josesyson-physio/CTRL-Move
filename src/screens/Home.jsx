import { Link, go } from '../lib/router.jsx';
import { useStore, useTicker } from '../lib/store.jsx';
import { dayKey, greeting, levelProgress, streakOf, systemStatus, weekDays } from '../lib/score.js';
import { SEED_POSTS } from '../data/feed.js';
import { AREAS } from '../data/zones.js';
import { Bolt, Icon, TabBar, Wordmark } from '../components/ui.jsx';

const DOW = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function Home() {
  const { s, actions } = useStore();
  const status = systemStatus(s);
  const lvl = levelProgress(s.xp);
  const streak = streakOf(s.activeDays);
  const movesToday = s.moves[dayKey()] || 0;
  const today = dayKey();
  const month = new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  useTicker(!!s.sit.start, 1000);
  const goalMs = s.sit.goal * 60000;
  const elapsed = s.sit.start ? Date.now() - s.sit.start : 0;
  const left = Math.max(0, goalMs - elapsed);
  const mm = String(Math.floor(left / 60000)).padStart(2, '0');
  const ss = String(Math.floor((left % 60000) / 1000)).padStart(2, '0');
  const due = s.sit.start && left === 0;

  const insights = SEED_POSTS.filter((p) => p.type === 'article');
  const dateLine = new Date().toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });

  return (
    <main className="screen">
      <header className="home-head">
        <Wordmark />
        <div className="row" style={{ gap: 8 }}>
          <Link to="/mission" className="icon-btn" aria-label="Our mission"><Icon name="spark" /></Link>
          <Link to="/profile" className="avatar-btn" aria-label="Your profile">{(s.name || 'You').slice(0, 1).toUpperCase()}</Link>
        </div>
      </header>

      <section className="pad mt24">
        <div className="eyebrow">{dateLine}{streak ? ` · Day ${streak} streak` : ''}</div>
        <h1 className="h-hero">{greeting()}{s.name ? `, ${s.name}` : ''}</h1>
        <p className="muted" style={{ margin: '8px 0 0', fontSize: 15 }}>Ready to pick up your recovery program?</p>
      </section>

      {status ? (
        <section className="card dark status-card mx mt20">
          <div className="row between">
            <span className="eyebrow">System status</span>
            <span style={{ fontSize: 12, color: 'var(--night-text)' }}>
              {status.daysSince === 0 ? 'Scanned today' : `Last scan ${status.daysSince} day${status.daysSince === 1 ? '' : 's'} ago`}
            </span>
          </div>
          <div className="row" style={{ alignItems: 'flex-end', gap: 14 }}>
            <div className="big-num" style={{ fontSize: 76 }}>{status.total}<span style={{ fontSize: 36, color: 'var(--night-text)' }}>%</span></div>
            <span className={'status-pill ' + status.tone} style={{ marginBottom: 6 }}><span className="dot" />{status.label}</span>
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'var(--night-soft)' }}>{status.summary}</p>
          <div className="sys-bars">
            {status.areas.map((a) => (
              <div className="sys-bar" key={a.id}>
                <span className="v">{a.v}</span>
                <div className="track"><div className="fill" style={{ height: Math.round(a.v * 0.56), background: a.v < 60 ? 'var(--warm)' : 'var(--lime)' }} /></div>
                <span className="l">{a.short}</span>
              </div>
            ))}
          </div>
          <div className="grid2" style={{ gap: 10 }}>
            <Link to="/scan" className="btn lime md">Run scan <Icon name="arrow" size={18} width={2} /></Link>
            <Link to="/track" className="btn ghost-dark md">Log pain</Link>
          </div>
        </section>
      ) : (
        <section className="card dark status-card mx mt20">
          <span className="eyebrow">System status</span>
          <div className="row" style={{ alignItems: 'flex-end', gap: 14 }}>
            <div className="big-num" style={{ fontSize: 76, color: 'var(--night-3)' }}>--<span style={{ fontSize: 36 }}>%</span></div>
          </div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--night-soft)' }}>
            Run your first 60-second Hardware Scan. We'll score your {AREAS.length} body systems and spot early strain before it turns into pain.
          </p>
          <div className="grid2" style={{ gap: 10 }}>
            <Link to="/scan" className="btn lime md">Start scan <Icon name="arrow" size={18} width={2} /></Link>
            <Link to="/track" className="btn ghost-dark md">Log pain</Link>
          </div>
        </section>
      )}

      <section className="grid3 mx mt14">
        <div className="card stat">
          <Icon name="flame" color="#D9401F" />
          <div className="n">{streak} day{streak === 1 ? '' : 's'}</div>
          <div className="l">Streak</div>
        </div>
        <div className="card stat">
          <Bolt size={20} color="#0C0D0F" />
          <div className="n">{s.xp.toLocaleString()}</div>
          <div className="l">XP · Level {lvl.level}</div>
        </div>
        <div className="card stat">
          <Icon name="pulse" />
          <div className="n">{movesToday}/6</div>
          <div className="l">Moves today</div>
        </div>
      </section>

      <section className="card mx mt14" style={{ padding: 16 }}>
        <div className="row between">
          <h2 className="h-card" style={{ fontFamily: 'var(--f-display)' }}>{month}</h2>
          <Link to="/profile" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', minHeight: 44, display: 'flex', alignItems: 'center' }}>View month</Link>
        </div>
        <div className="week">
          {weekDays().map((d, i) => {
            const k = dayKey(d);
            const cls = k === today ? 'today' : s.activeDays[k] ? 'done' : '';
            return (
              <div className={'day ' + cls} key={k}>
                <span className="d">{DOW[i]}</span>
                <span className="n">{d.getDate()}</span>
                <span className="dot" />
              </div>
            );
          })}
        </div>
      </section>

      <section className="card mx mt14 stack" style={{ gap: 14 }}>
        <div className="row between">
          <div>
            <div className="eyebrow">{s.sit.start ? (due ? 'Time to move' : 'Next move in') : 'Work block'}</div>
            <div className="timer-num">{s.sit.start ? `${mm}:${ss}` : `${s.sit.goal}:00`}</div>
            <div className="sub">{s.sit.start ? `You've been seated ${Math.floor(elapsed / 60000)} min` : 'We nudge you to move every 45 minutes'}</div>
          </div>
          {s.sit.start ? (
            <Link to="/play/desk-reset" className={'btn sm ' + (due ? 'lime' : 'ink')} style={{ height: 50 }}>Move now</Link>
          ) : (
            <button className="btn sm ink" style={{ height: 50 }} onClick={() => {
              actions.startSit();
              if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
            }}>Start</button>
          )}
        </div>
        <div className="bar"><i style={{ width: s.sit.start ? `${Math.min(100, (elapsed / goalMs) * 100)}%` : '0%' }} /></div>
        {s.sit.start && <button className="btn text" style={{ alignSelf: 'flex-start', padding: 0 }} onClick={actions.stopSit}>Stop work block</button>}
      </section>

      <Link to="/track" className="card mx mt14 row between" style={{ padding: 20 }}>
        <div className="stack" style={{ gap: 6, maxWidth: 190 }}>
          <span className="eyebrow">Pain area</span>
          <span style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1.1 }}>Where does it hurt today?</span>
          <span className="row" style={{ gap: 6, fontWeight: 700, fontSize: 14, marginTop: 8 }}>Start check <Icon name="arrow" size={16} width={2} /></span>
        </div>
        <svg width="96" height="130" viewBox="0 0 200 270" aria-hidden="true">
          <ellipse cx="100" cy="30" rx="19" ry="23" fill="#E4E6EA" />
          <rect x="91" y="51" width="18" height="16" rx="6" fill="#E4E6EA" />
          <path d="M60 78c0-6 5-10 12-10h56c7 0 12 4 12 10l-6 86c-1 12-5 24-7 32H73c-2-8-6-20-7-32z" fill="#E4E6EA" />
          <rect x="38" y="74" width="18" height="78" rx="9" fill="#E4E6EA" transform="rotate(10 47 74)" />
          <rect x="144" y="74" width="18" height="78" rx="9" fill="#E4E6EA" transform="rotate(-10 153 74)" />
          <rect x="72" y="200" width="25" height="70" rx="12" fill="#E4E6EA" />
          <rect x="103" y="200" width="25" height="70" rx="12" fill="#E4E6EA" />
          <circle cx="100" cy="60" r="14" fill="#D9401F" fillOpacity=".85" />
          <circle cx="100" cy="60" r="22" fill="none" stroke="#D9401F" strokeOpacity=".35" strokeWidth="2" />
          <circle cx="152" cy="150" r="11" fill="#FF8A5B" />
        </svg>
      </Link>

      <div className="section-head">
        <h2 className="h-section">Play and check</h2>
        <span className="eyebrow">Earn XP</span>
      </div>
      <section className="grid2 mx">
        <Tool to="/bingo" icon="play" title="Pain Bingo" sub="Gamified symptom tracker" meta="5×5 · 12 lines" />
        <Tool to="/scan" icon="scan" title="Hardware Scan" sub="Know your body in 60 s" meta="6 levels" />
        <Tool to="/challenge" icon="dumbbell" title="Muscle Challenge" sub="Can your muscles beat it?" meta="8 challenges" />
        <Tool to="/relief" icon="playCircle" title="Quick Relief" sub="Guided physio routines" meta="8 routines" />
      </section>

      <Link to="/consult" className="card mx mt12 row" style={{ padding: 16, gap: 14 }}>
        <span className="avatars">
          <span style={{ background: 'var(--ink)', color: '#fff' }}>J</span>
          <span style={{ background: 'var(--ink-2)', color: '#fff' }}>A</span>
          <span style={{ background: 'var(--lime)' }}>V</span>
        </span>
        <span className="grow">
          <b style={{ display: 'block', fontSize: 16 }}>Consult a physio</b>
          <span className="sub" style={{ display: 'block' }}>Book an expert session</span>
        </span>
        <Icon name="next" width={2} />
      </Link>

      <section className="card dark mx mt14 row" style={{ padding: 20, gap: 14 }}>
        <div className="grow">
          <div style={{ fontWeight: 700, fontSize: 16 }}>Find a specialist near you</div>
          <div style={{ fontSize: 13, color: 'var(--night-text)', marginTop: 4, lineHeight: 1.4 }}>Matched to your symptoms and location</div>
        </div>
        <button className="btn lime sm" style={{ height: 48 }} onClick={() => go('/consult?match=1')}>Find</button>
      </section>

      <div className="section-head">
        <h2 className="h-section">Clinical insights</h2>
        <Link to="/feed">See all</Link>
      </div>
      <section className="h-scroll">
        {insights.map((p, i) => (
          <Link key={p.id} to={`/feed/${p.id}`} className="card flush insight">
            <div className={'cover ' + (i % 2 ? 'lime' : 'night')}>
              <span className="eyebrow">{p.tag}</span>
              <span className="t">{p.cover}</span>
            </div>
            <div style={{ padding: '14px 16px 16px' }}>
              <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>{p.title}</div>
              <div className="sub" style={{ marginTop: 8 }}>{p.read} read · {p.author}</div>
            </div>
          </Link>
        ))}
      </section>

      <p className="muted" style={{ fontSize: 12, textAlign: 'center', margin: '24px 32px 20px', lineHeight: 1.5 }}>
        Ctrl+Move supports self-checks and early warnings. It does not diagnose. See a clinician for severe or worsening pain.
      </p>
      <TabBar active="home" />
    </main>
  );
}

function Tool({ to, icon, title, sub, meta }) {
  return (
    <Link to={to} className="card tool">
      <span className="ico"><Icon name={icon} size={22} /></span>
      <span>
        <b>{title}</b>
        <span className="s">{sub}</span>
        <span className="m">{meta}</span>
      </span>
    </Link>
  );
}
