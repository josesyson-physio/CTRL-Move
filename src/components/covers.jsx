// Minimal cover illustrations for feed articles, in the Ctrl+Move palette.
// Use with a post's `art` key: <Cover art="stroke" />.

const MINT = '#4FE3C1';
const NAVY = '#0B1B2B';

function StrokeCover() {
  return (
    <svg viewBox="0 0 340 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A brain connected to a rising staircase by a dotted path">
      <rect width="340" height="200" fill={NAVY} />
      <circle cx="250" cy="88" r="78" fill="#132A40" />
      <circle cx="250" cy="88" r="56" fill="#17324C" />
      {/* rising steps */}
      {[[24, 18], [58, 34], [92, 52], [126, 72]].map(([x, h]) => (
        <g key={x}>
          <rect x={x} y={182 - h} width="28" height={h} rx="5" fill="#1B3249" />
          <rect x={x} y={182 - h} width="28" height="4" rx="2" fill={MINT} />
        </g>
      ))}
      <path d="M38 158 C 70 120, 120 96, 150 96 S 196 96, 206 98" fill="none" stroke={MINT} strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="140" cy="102" r="6" fill={MINT} />
      {/* brain */}
      <g fill="none" stroke={MINT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M250 40 C 225 32, 200 46, 202 68 C 186 74, 186 100, 202 108 C 202 128, 226 138, 250 130 C 274 138, 298 128, 298 108 C 314 100, 314 74, 298 68 C 300 46, 275 32, 250 40 Z" />
        <path d="M250 42 V128" opacity=".7" />
        <path d="M218 60 C 230 64, 234 76, 226 86" />
        <path d="M282 60 C 270 64, 266 76, 274 86" />
        <path d="M218 110 C 230 102, 240 106, 244 116" />
        <path d="M282 110 C 270 102, 260 106, 256 116" />
      </g>
      <g stroke="#2FB596" strokeWidth="1.5" opacity=".9">
        <line x1="226" y1="86" x2="244" y2="116" /><line x1="274" y1="86" x2="256" y2="116" /><line x1="226" y1="86" x2="274" y2="86" />
      </g>
      {[[226, 86], [274, 86], [244, 116], [256, 116], [218, 60], [282, 60]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4" fill="#A8F5E2" />)}
      <g fill={MINT}>
        <path d="M318 30l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
        <path d="M184 30l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" opacity=".7" />
      </g>
    </svg>
  );
}

function TechNeckCover() {
  const C = 2 * Math.PI * 40;
  return (
    <svg viewBox="0 0 340 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A head leaning forward over a phone, with an arrow back to upright posture, beside a ring showing 1 hour in clinic and 23 hours outside">
      <rect width="340" height="200" fill="#E3FAF4" />
      {/* 1h vs 23h ring */}
      <g transform="translate(74 98)">
        <circle r="40" fill="none" stroke="#C3EFE3" strokeWidth="13" />
        <circle r="40" fill="none" stroke={MINT} strokeWidth="13" strokeDasharray={`${(C * 23) / 24} ${C}`} transform="rotate(-75)" strokeLinecap="butt" />
        <circle r="40" fill="none" stroke={NAVY} strokeWidth="13" strokeDasharray={`${C / 24} ${C}`} transform="rotate(-90)" />
        <text y="5" textAnchor="middle" fontSize="20" fontWeight="800" fill={NAVY} fontFamily="var(--f-display)">23h</text>
      </g>
      <text x="74" y="166" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2C4560" fontFamily="var(--f-ui)" letterSpacing=".06em">OUTSIDE THE CLINIC</text>
      {/* ghost upright head */}
      <g fill="none" stroke={NAVY} strokeOpacity=".22" strokeWidth="2.5" strokeDasharray="5 5">
        <circle cx="200" cy="58" r="24" />
        <path d="M200 82 V128" />
      </g>
      {/* shoulders */}
      <path d="M156 150 C 170 134, 228 134, 246 150" fill="none" stroke={NAVY} strokeWidth="10" strokeLinecap="round" />
      {/* neck as spine keys, curving forward */}
      {[[203, 132, -18], [208, 120, -28], [215, 109, -36], [223, 99, -42]].map(([x, y, r]) => (
        <g key={y} transform={`rotate(${r} ${x} ${y})`}>
          <rect x={x - 9} y={y - 4.5} width="18" height="9" rx="3.5" fill={NAVY} />
          <rect x={x - 7} y={y - 3.2} width="14" height="4.6" rx="2" fill={MINT} />
        </g>
      ))}
      {/* forward head */}
      <circle cx="244" cy="80" r="24" fill={NAVY} />
      <circle cx="258" cy="78" r="2.6" fill={MINT} />
      {/* phone and eye line */}
      <path d="M260 84 L276 130" stroke={NAVY} strokeOpacity=".35" strokeWidth="2" strokeDasharray="3 5" />
      <g transform="rotate(-22 282 146)"><rect x="272" y="128" width="20" height="34" rx="5" fill={NAVY} /><rect x="275" y="132" width="14" height="24" rx="2" fill={MINT} opacity=".8" /></g>
      {/* reverse arrow */}
      <path d="M262 48 C 252 26, 222 22, 208 30" fill="none" stroke={MINT} strokeWidth="4" strokeLinecap="round" />
      <path d="M214 22 L205 32 L218 36" fill="none" stroke={MINT} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const COVERS = { stroke: StrokeCover, techneck: TechNeckCover };

export function Cover({ art }) {
  const C = COVERS[art];
  return C ? <C /> : null;
}

export const hasCover = (art) => !!COVERS[art];
