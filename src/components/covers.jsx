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


function ThoracicCover() {
  // Slumped spine (left) vs stacked, moving spine (right), drawn as keys.
  const slump = [[86, 150, 30], [94, 136, 24], [104, 124, 14], [116, 116, 2], [128, 112, -12]];
  const stack = [[250, 150, 4], [247, 136, 0], [245, 122, -4], [246, 108, -6], [249, 95, -10]];
  const key = (fill, top) => ([x, y, r]) => (
    <g key={`${x}-${y}`} transform={`rotate(${r} ${x} ${y})`}>
      <rect x={x - 12} y={y - 5.5} width="24" height="11" rx="4.5" fill={fill} />
      <rect x={x - 9.5} y={y - 4} width="19" height="5.5" rx="2.5" fill={top} />
    </g>
  );
  return (
    <svg viewBox="0 0 340 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A slumped spine beside an upright, moving spine, both drawn as keyboard keys">
      <rect width="340" height="200" fill="#0F2236" />
      <rect x="0" y="174" width="340" height="26" fill="#0B1B2B" />
      {/* chairs */}
      <path d="M56 168 h70 M62 120 v48" stroke="#1B3249" strokeWidth="8" strokeLinecap="round" />
      <path d="M222 168 h70 M226 108 v60" stroke="#1B3249" strokeWidth="8" strokeLinecap="round" />
      {/* slumped */}
      {slump.map(key('#2C4560', '#4A6382'))}
      <circle cx="146" cy="116" r="15" fill="#4A6382" />
      {/* stacked */}
      {stack.map(key('#0B1B2B', '#4FE3C1'))}
      <circle cx="254" cy="72" r="15" fill="#4FE3C1" />
      {/* movement arcs */}
      <path d="M282 60 C 296 76, 296 100, 284 116" fill="none" stroke="#4FE3C1" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 6" />
      <path d="M216 60 C 202 76, 202 100, 214 116" fill="none" stroke="#4FE3C1" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 6" />
      {/* arrow */}
      <path d="M170 140 H200" stroke="#A8F5E2" strokeWidth="3" strokeLinecap="round" />
      <path d="M193 133 L201 140 L193 147" fill="none" stroke="#A8F5E2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="96" y="191" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9AA9B8" fontFamily="var(--f-ui)" letterSpacing=".08em">FROZEN</text>
      <text x="252" y="191" textAnchor="middle" fontSize="10" fontWeight="700" fill="#4FE3C1" fontFamily="var(--f-ui)" letterSpacing=".08em">MOVING</text>
    </svg>
  );
}

function TeleRehabCover() {
  return (
    <svg viewBox="0 0 340 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A person exercising at home, connected to a physiotherapist on a phone">
      <rect width="340" height="200" fill="#132A40" />
      {/* home */}
      <path d="M40 96 L110 44 L180 96 V176 H40 Z" fill="#0F2236" stroke="#2C4560" strokeWidth="3" strokeLinejoin="round" />
      <path d="M58 176 h104" stroke="#2C4560" strokeWidth="3" />
      {/* person stretching, arms up */}
      <circle cx="110" cy="86" r="11" fill="#4FE3C1" />
      <path d="M92 74 L104 98 M128 74 L116 98" stroke="#4FE3C1" strokeWidth="6" strokeLinecap="round" />
      {[[110, 106], [110, 119], [110, 132], [110, 145]].map(([x, y]) => (
        <g key={y}><rect x={x - 9} y={y - 4.5} width="18" height="9" rx="3.5" fill="#0B1B2B" /><rect x={x - 7} y={y - 3.2} width="14" height="4.6" rx="2" fill="#4FE3C1" /></g>
      ))}
      <path d="M104 152 L96 174 M116 152 L124 174" stroke="#4FE3C1" strokeWidth="6" strokeLinecap="round" />
      {/* connection */}
      <path d="M186 104 C 214 84, 236 84, 252 92" fill="none" stroke="#A8F5E2" strokeWidth="2.5" strokeDasharray="3 7" strokeLinecap="round" />
      <g fill="none" stroke="#4FE3C1" strokeWidth="3" strokeLinecap="round">
        <path d="M206 64 a20 20 0 0 1 24 0" /><path d="M200 56 a30 30 0 0 1 36 0" opacity=".6" />
      </g>
      {/* phone with physio */}
      <rect x="252" y="48" width="64" height="118" rx="14" fill="#0B1B2B" stroke="#2C4560" strokeWidth="3" />
      <rect x="260" y="60" width="48" height="74" rx="8" fill="#4FE3C1" />
      <circle cx="284" cy="86" r="11" fill="#0B1B2B" />
      <path d="M266 126 C 270 108, 298 108, 302 126 Z" fill="#0B1B2B" />
      <circle cx="300" cy="68" r="4" fill="#D9401F" />
      <rect x="270" y="144" width="28" height="10" rx="5" fill="#4FE3C1" />
    </svg>
  );
}

function ErgonomicsCover() {
  return (
    <svg viewBox="0 0 340 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A balance scale where movement outweighs expensive equipment">
      <rect width="340" height="200" fill="#F2F5F7" />
      <g transform="translate(0 22)">
      <path d="M170 40 V150 M138 154 H202" stroke="#0B1B2B" strokeWidth="6" strokeLinecap="round" />
      <circle cx="170" cy="40" r="8" fill="#0B1B2B" />
      {/* beam tilted: right side down */}
      <g transform="rotate(12 170 48)">
        <path d="M70 48 H270" stroke="#0B1B2B" strokeWidth="6" strokeLinecap="round" />
        <path d="M82 48 L66 92 M82 48 L98 92 M258 48 L242 92 M258 48 L274 92" stroke="#9AA9B8" strokeWidth="2" />
        <path d="M58 92 H106 C 102 104, 62 104, 58 92 Z" fill="#C9D3DC" />
        <path d="M234 92 H282 C 278 104, 238 104, 234 92 Z" fill="#4FE3C1" />
        {/* chair on the light pan */}
        <path d="M70 90 V68 M70 80 H92 V90 M92 80 V90" stroke="#4A6382" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* walking figure on the heavy pan */}
        <circle cx="258" cy="56" r="7" fill="#0B1B2B" />
        <path d="M258 64 L256 78 M256 78 L250 90 M256 78 L264 90 M258 68 L250 74 M258 68 L266 72" stroke="#0B1B2B" strokeWidth="4" strokeLinecap="round" />
      </g>
      </g>
      <text x="74" y="160" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4A6382" fontFamily="var(--f-ui)" letterSpacing=".06em">EQUIPMENT</text>
      <text x="268" y="168" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0B1B2B" fontFamily="var(--f-ui)" letterSpacing=".06em">MOVEMENT</text>
    </svg>
  );
}

const COVERS = { stroke: StrokeCover, techneck: TechNeckCover, thoracic: ThoracicCover, telerehab: TeleRehabCover, ergonomics: ErgonomicsCover };

export function Cover({ art }) {
  const C = COVERS[art];
  return C ? <C /> : null;
}

export const hasCover = (art) => !!COVERS[art];
