import { Link, back as goBack } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';

/* ---------- icons (stroke, 24px grid) ---------- */
const PATHS = {
  home: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />,
  track: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></>,
  play: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16" /></>,
  feed: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
  you: <><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" /></>,
  back: <path d="M15 5l-7 7 7 7" />,
  next: <path d="M9 6l6 6-6 6" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  bell: <><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z" /><path d="M10 20.5a2 2 0 0 0 4 0" /></>,
  flame: <path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.4 2.4-5.2 3.6-8.3.4 1.9 1.4 3 2.6 3.6C12 7.6 13.2 5 15.5 3c-.2 3.4 3 5.7 3 10.6 0 4-2.7 7.4-6.5 7.4z" />,
  pulse: <path d="M22 12h-4l-3 8-6-16-3 8H2" />,
  scan: <><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" /><path d="M4 12h16" /></>,
  dumbbell: <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" />,
  playCircle: <><circle cx="12" cy="12" r="8.5" /><path d="M10 8.5v7l5.5-3.5z" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  refresh: <path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.7L4 15.5M4 20v-4.5h4.5" />,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  info: <><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 8v.01" /></>,
  alert: <><path d="M12 4 2.8 19.5a1 1 0 0 0 .9 1.5h16.6a1 1 0 0 0 .9-1.5z" /><path d="M12 10v4.5M12 17.5v.01" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  comment: <path d="M5 18.5V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8z" />,
  bookmark: <path d="M7 4h10v16l-5-3.5L7 20z" />,
  upload: <path d="M12 16V4m0 0-5 5m5-5 5 5M5 20h14" />,
  video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3" /></>,
  spark: <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" /></>,
  prev: <path d="M6 5v14M19 5l-9 7 9 7z" />,
  skip: <path d="M18 5v14M5 5l9 7-9 7z" />,
  shield: <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z" />,
  download: <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
};

export function Icon({ name, size = 20, color = 'currentColor', width = 1.8, fill = 'none', className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
      strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}

export const Bolt = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true"><path d="M13 3 5 13.5h6L10 21l8-10.5h-6z" /></svg>
);
export const PlayGlyph = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" /></svg>
);
export const Verified = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Verified physio">
    <circle cx="12" cy="12" r="10" fill="#0B1B2B" />
    <path d="m8 12.5 2.6 2.6L16.5 9" fill="none" stroke="#4FE3C1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- brand ---------- */
export function Wordmark({ dark = false, big = false }) {
  return (
    <span className={'wordmark' + (big ? ' big' : '') + (dark ? ' on-dark' : '')}>
      <img className="wm-mark" src="./logo-reverse.svg" alt="" aria-hidden="true" />
      <span className="wm-move"><span className="wm-ctrl">Ctrl</span>+Move</span>
    </span>
  );
}

/* ---------- headers ---------- */
export function TopBar({ title, sub, backTo = '/home', close = false, dark = false, right = null }) {
  return (
    <header className={'topbar' + (dark ? ' dark' : '')}>
      <button className="icon-btn" onClick={() => goBack(backTo)} aria-label={close ? 'Close' : 'Back'}>
        <Icon name={close ? 'close' : 'back'} width={2} />
      </button>
      <div className="topbar-text">
        <h1 className="h-screen">{title}</h1>
        {sub && <div className="sub">{sub}</div>}
      </div>
      {right}
    </header>
  );
}

/* ---------- bottom navigation ---------- */
const TABS = [
  { id: 'home', to: '/home', label: 'Home', icon: 'home' },
  { id: 'track', to: '/track', label: 'Track', icon: 'track' },
  { id: 'play', to: '/bingo', label: 'Play', icon: 'play' },
  { id: 'feed', to: '/feed', label: 'Feed', icon: 'feed' },
  { id: 'you', to: '/profile', label: 'You', icon: 'you' },
];

export function TabBar({ active }) {
  return (
    <nav className="tabbar" aria-label="Main">
      {TABS.map((t) => (
        <Link key={t.id} to={t.to} className={'tab' + (t.id === active ? ' on' : '')} aria-current={t.id === active ? 'page' : undefined}>
          <Icon name={t.icon} size={22} width={t.id === active ? 2 : 1.8} />
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

/* ---------- progress ---------- */
export function Ring({ size = 120, stroke = 10, pct = 0, color = '#4FE3C1', track = '#1B3249', children, label }) {
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const off = C * (1 - Math.max(0, Math.min(100, pct)) / 100);
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={C.toFixed(1)} strokeDashoffset={off.toFixed(1)} className="ring-val" />
      </svg>
      <div className="ring-center">{children}</div>
    </div>
  );
}

export function Segs({ count, done, current = -1, dark = false, height = 6 }) {
  return (
    <div className="segs" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={{ height }} className={'seg ' + (i < done ? 'done' : i === current ? 'now' : '') + (dark ? ' dark' : '')} />
      ))}
    </div>
  );
}

/* ---------- toasts & sheets ---------- */
export function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => <div key={t.id} className="toast">{t.text}</div>)}
    </div>
  );
}

export function Sheet({ children, onClose, labelledBy }) {
  return (
    <div className="sheet-root" onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}>
      <section className="sheet" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        <span className="grab" aria-hidden="true" />
        {children}
      </section>
    </div>
  );
}

/* ---------- body figure ---------- */
export function BodyFigure({ view = 'front', width = 220 }) {
  const h = width * 2;
  return (
    <svg width={width} height={h} viewBox="0 0 200 400" aria-hidden="true" className="body-figure">
      <g fill="#E4E6EA">
        <ellipse cx="100" cy="32" rx="20" ry="24" />
        <rect x="91" y="54" width="18" height="20" rx="6" />
        <path d="M60 84c0-7 6-12 13-12h54c7 0 13 5 13 12l-6 92c-1 12-5 22-7 30H73c-2-8-6-18-7-30z" />
        <rect x="38" y="80" width="18" height="82" rx="9" transform="rotate(9 47 80)" />
        <rect x="26" y="160" width="16" height="74" rx="8" transform="rotate(5 34 160)" />
        <rect x="144" y="80" width="18" height="82" rx="9" transform="rotate(-9 153 80)" />
        <rect x="158" y="160" width="16" height="74" rx="8" transform="rotate(-5 166 160)" />
        <ellipse cx="28" cy="244" rx="9" ry="12" />
        <ellipse cx="172" cy="244" rx="9" ry="12" />
        <rect x="70" y="194" width="60" height="32" rx="14" />
        <rect x="71" y="214" width="27" height="98" rx="13" />
        <rect x="102" y="214" width="27" height="98" rx="13" />
        <rect x="74" y="312" width="21" height="76" rx="10" />
        <rect x="105" y="312" width="21" height="76" rx="10" />
        <ellipse cx="84" cy="392" rx="13" ry="6" />
        <ellipse cx="116" cy="392" rx="13" ry="6" />
      </g>
      <g fill="none" stroke="#C9CDD4" strokeWidth="1.5" strokeLinecap="round">
        {view === 'back' ? (
          <>
            <path d="M100 76v128" />
            <ellipse cx="80" cy="106" rx="13" ry="18" />
            <ellipse cx="120" cy="106" rx="13" ry="18" />
            <path d="M74 206c8 8 18 10 26 4 8 6 18 4 26-4" />
          </>
        ) : (
          <>
            <path d="M78 98c8 6 36 6 44 0" />
            <path d="M100 126v56" />
          </>
        )}
      </g>
    </svg>
  );
}
