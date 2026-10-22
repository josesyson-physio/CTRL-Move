// Animated exercise demonstration. Used for "AI demo" and "Virtual demo"
// exercises and for Health Shots until a physio uploads their own video.
// Motions: chin-tuck, shoulder-roll, twist, arm-raise, side-bend,
// sit-stand, wrist, breathe. The spine is drawn as the Ctrl+Move key stack.

const KEYS = [94, 104, 114, 124, 134];

export default function MotionFigure({ motion = 'breathe', tempo = 'normal', dark = false, size = '100%', label, tight = false }) {
  const body = dark ? '#4FE3C1' : '#0B1B2B';
  const key = dark ? '#0B1B2B' : '#4FE3C1';
  const soft = dark ? 'rgba(79,227,193,.28)' : 'rgba(11,27,43,.12)';
  const wrist = motion === 'wrist';
  const dur = tempo === 'slow' ? '4.2s' : '2.6s';

  return (
    <svg className={`mfig mf-${motion}`} viewBox={tight ? '34 20 132 214' : '0 0 200 240'}
      {...(typeof size === 'number' ? { width: Math.round(size * (tight ? 132 / 214 : 200 / 240)), height: size } : {})}
      style={typeof size === 'number' ? { '--mf-dur': dur } : { '--mf-dur': dur, width: size }}
      role="img" aria-label={label || 'Animated exercise demonstration'}>
      <ellipse cx="100" cy="228" rx="54" ry="6" fill={soft} />
      {motion === 'sit-stand' && <rect x="62" y="176" width="76" height="8" rx="4" fill={soft} />}
      {motion === 'breathe' && <circle className="mf-pulse" cx="100" cy="112" r="46" fill="none" stroke={body} strokeWidth="2" strokeDasharray="3 7" opacity=".55" />}

      <g className="mf-legs" fill={body}>
        <rect x="80" y="146" width="17" height="80" rx="8.5" />
        <rect x="103" y="146" width="17" height="80" rx="8.5" />
      </g>

      <g className="mf-upper">
        <g className="mf-arm mf-arm-l">
          <path d="M72 88 L63 122 L61 156" fill="none" stroke={body} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {wrist ? (
          <g>
            <path d="M128 88 H174" stroke={body} strokeWidth="13" strokeLinecap="round" />
            <g className="mf-hand"><rect x="173" y="82" width="22" height="12" rx="6" fill={body} /></g>
          </g>
        ) : (
          <g className="mf-arm mf-arm-r">
            <path d="M128 88 L137 122 L139 156" fill="none" stroke={body} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        <path d="M70 80 Q100 72 130 80 L124 140 Q122 152 112 152 H88 Q78 152 76 140 Z" fill={body} />
        {KEYS.map((y) => (
          <rect key={y} x="92" y={y} width="16" height="7" rx="2.6" fill={key} />
        ))}
        <g className="mf-head">
          <rect x="93" y="62" width="14" height="18" rx="5" fill={body} />
          <circle cx="100" cy="46" r="19" fill={body} />
        </g>
      </g>
    </svg>
  );
}
