import { Link } from '../lib/router.jsx';
import { physioName } from '../lib/people.js';
import MotionFigure from './MotionFigure.jsx';
import { PlayGlyph } from './ui.jsx';

// A 9:16 thumbnail that opens the Health Shots viewer at this shot.
export default function ShotCard({ sh, s, wide = false }) {
  const name = sh.physio ? physioName(sh.physio, s) : sh.author;
  return (
    <Link to={`/shots?i=${sh.id}`} className={'shot-card' + (wide ? ' wide' : '')} aria-label={`Health Shot: ${sh.title}, by ${name}`}>
      {sh.mediaUrl ? <video src={sh.mediaUrl} muted playsInline preload="metadata" /> : <span className="sc-fig"><MotionFigure motion={sh.motion} dark /></span>}
      <span className="sc-len"><PlayGlyph size={10} color="#0B1B2B" />{sh.sec || 30}s</span>
      <span className="sc-text">
        <b>{sh.title}</b>
        <span>{name}</span>
      </span>
    </Link>
  );
}
