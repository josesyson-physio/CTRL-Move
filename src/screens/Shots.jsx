import { useEffect, useRef } from 'react';
import { go, Link, back as goBack } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { allShots, initialOf, physioName } from '../lib/people.js';
import { Icon } from '../components/ui.jsx';
import MotionFigure from '../components/MotionFigure.jsx';

// Health Shots: short vertical clips (60 s or less), one per screen.
export default function Shots({ start }) {
  const { s, actions } = useStore();
  const shots = allShots(s);
  const box = useRef(null);

  useEffect(() => {
    const i = shots.findIndex((x) => x.id === start);
    if (i > 0 && box.current) box.current.scrollTop = i * box.current.clientHeight;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="shots" ref={box} aria-label="Health Shots">
      {shots.map((sh) => {
        const name = sh.physio ? physioName(sh.physio, s) : sh.author;
        const liked = !!s.likes[sh.id];
        const saved = !!s.saved[sh.id];
        return (
          <section key={sh.id} className="shot" aria-label={sh.title}>
            <div className="shot-stage">
              {sh.mediaUrl ? (
                <video src={sh.mediaUrl} autoPlay muted loop playsInline />
              ) : (
                <div className="shot-fig"><MotionFigure motion={sh.motion} dark label={`Demonstration: ${sh.title}`} /></div>
              )}
            </div>
            <div className="shot-top">
              <button className="icon-btn dark" aria-label="Back" onClick={() => goBack('/feed')}><Icon name="back" width={2} /></button>
              <span className="shot-brand">Health Shots</span>
              {sh.sample ? <span className="tag shot-tag">Sample</span> : sh.pending ? <span className="tag shot-tag">In review</span> : <span style={{ width: 44 }} />}
            </div>
            <div className="shot-bar"><i style={{ animationDuration: `${sh.sec || 30}s` }} /></div>

            <div className="shot-rail">
              <button aria-pressed={liked} aria-label="Like" onClick={() => actions.like(sh.id)}>
                <Icon name="heart" size={26} fill={liked ? '#4FE3C1' : 'none'} color={liked ? '#4FE3C1' : '#fff'} />
                <span>{(sh.likes || 0) + (liked ? 1 : 0)}</span>
              </button>
              <button aria-pressed={saved} aria-label="Save" onClick={() => actions.save(sh.id)}>
                <Icon name="bookmark" size={26} fill={saved ? '#4FE3C1' : 'none'} color={saved ? '#4FE3C1' : '#fff'} />
                <span>Save</span>
              </button>
              {sh.physio && sh.physio !== 'me' && (
                <button aria-label={`Ask ${name}`} onClick={() => go(`/chat/${sh.physio}`)}>
                  <Icon name="comment" size={26} color="#fff" />
                  <span>Ask</span>
                </button>
              )}
            </div>

            <div className="shot-info">
              <Link to={sh.physio ? `/physio/${sh.physio}` : '/feed'} className="row" style={{ gap: 10 }}>
                <span className="post-av" style={{ background: 'var(--lime)', color: 'var(--ink)', width: 36, height: 36, fontSize: 14 }}>{initialOf(name)}</span>
                <b style={{ fontSize: 15 }}>{name}</b>
                <span className="tag shot-tag">{sh.tag}</span>
              </Link>
              <h2>{sh.title}</h2>
              {sh.beats && (
                <ol className="shot-beats">
                  {sh.beats.map((b, i) => <li key={i} style={{ animationDelay: `${i * 0.5}s` }}>{b}</li>)}
                </ol>
              )}
              {sh.caption && !sh.beats && <p style={{ margin: '8px 0 0', color: 'var(--night-soft)', fontSize: 14, lineHeight: 1.5 }}>{sh.caption}</p>}
              {sh.move && (
                <Link to={`/play/${sh.move}?post=${sh.id}`} className="btn lime md block mt14">
                  {s.tried[sh.id] ? 'Do it again' : 'Try this move'} {!s.tried[sh.id] && <span className="xp-tag">+25 XP</span>}
                </Link>
              )}
            </div>
          </section>
        );
      })}
    </main>
  );
}
