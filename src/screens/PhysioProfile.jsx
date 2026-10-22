import { Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { SEED_POSTS } from '../data/feed.js';
import { DEMO_TYPES, fmtDay, fmtTime, physioById } from '../data/care.js';
import { allGroups, allLibrary, allShots, initialOf, physioName, postPhysio } from '../lib/people.js';
import { Icon, TopBar } from '../components/ui.jsx';
import ShotCard from '../components/ShotCard.jsx';
import MotionFigure from '../components/MotionFigure.jsx';

export const demoName = (id) => (DEMO_TYPES.find((d) => d.id === id) || DEMO_TYPES[0]).name;

export default function PhysioProfile({ id }) {
  const { s } = useStore();
  const known = id === 'me' || physioById(id);
  if (!known) {
    return (
      <main className="screen">
        <TopBar title="Physio" backTo="/consult" />
        <p className="mx mt24 muted">This physio could not be found.</p>
      </main>
    );
  }
  const name = physioName(id, s);
  const shots = allShots(s).filter((x) => x.physio === id);
  const lib = allLibrary(s).filter((x) => x.physio === id);
  const groups = allGroups(s).filter((g) => g.physio === id && g.when > Date.now());
  const posts = SEED_POSTS.filter((p) => postPhysio(p) === id);
  const me = id === 'me';

  return (
    <main className="screen">
      <TopBar title={name} sub="Physiotherapist" backTo="/consult" />

      <section className="card dark mx mt18" style={{ padding: 20, borderRadius: 26 }}>
        <div className="row" style={{ gap: 14 }}>
          <span className="post-av" style={{ width: 64, height: 64, fontSize: 26, background: 'var(--lime)', color: 'var(--ink)' }}>{initialOf(name)}</span>
          <div className="grow">
            <b style={{ display: 'block', fontFamily: 'var(--f-display)', fontSize: 22, letterSpacing: '-.02em' }}>{name}</b>
            <span style={{ fontSize: 13, color: 'var(--night-text)' }}>{me ? 'Your public profile · verification pending' : 'MotionPlus Physio · details coming soon'}</span>
          </div>
        </div>
        <div className="row mt14" style={{ gap: 18, fontSize: 13, color: 'var(--night-soft)' }}>
          <span><b style={{ color: '#fff' }}>{posts.length}</b> insights</span>
          <span><b style={{ color: '#fff' }}>{shots.length}</b> shots</span>
          <span><b style={{ color: '#fff' }}>{lib.length}</b> exercises</span>
        </div>
        {!me && (
          <div className="grid2 mt18">
            <Link to={`/chat/${id}`} className="btn ghost-dark sm"><Icon name="comment" size={18} /> Message</Link>
            <Link to={`/book/${id}`} className="btn lime sm"><Icon name="video" size={18} /> Book session</Link>
          </div>
        )}
      </section>

      {shots.length > 0 && (
        <>
          <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>Health Shots</h2></div>
          <div className="h-scroll">{shots.map((sh) => <ShotCard key={sh.id} sh={sh} s={s} />)}</div>
        </>
      )}

      <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>Exercise library</h2><span className="sub">{lib.length} exercises</span></div>
      {lib.length ? (
        <section className="card list mx">
          {lib.map((x) => <ExerciseRow key={x.id} x={x} />)}
        </section>
      ) : <p className="muted mx" style={{ fontSize: 14 }}>No exercises published yet.</p>}

      {groups.length > 0 && (
        <>
          <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>Group sessions</h2></div>
          <section className="card list mx">
            {groups.map((g) => (
              <Link key={g.id} to="/consult?tab=group" className="routine-row">
                <span className="num-box" style={{ background: 'var(--ink)', color: 'var(--lime)' }}><Icon name="video" size={18} /></span>
                <span className="grow"><b style={{ display: 'block', fontSize: 15 }}>{g.title}</b><span className="sub">{fmtDay(g.when)} · {fmtTime(g.when)} · {g.mins} min</span></span>
                <Icon name="next" size={18} width={2} />
              </Link>
            ))}
          </section>
        </>
      )}

      {posts.length > 0 && (
        <>
          <div className="section-head"><h2 className="h-section" style={{ fontSize: 20 }}>Insights</h2></div>
          <section className="card list mx">
            {posts.map((p) => (
              <Link key={p.id} to={`/feed/${p.id}`} className="routine-row">
                <span className="grow"><b style={{ display: 'block', fontSize: 15, lineHeight: 1.3 }}>{p.title}</b><span className="sub">{p.tag} · {p.read} read</span></span>
                <Icon name="next" size={18} width={2} />
              </Link>
            ))}
          </section>
        </>
      )}
      <div className="spacer" />
    </main>
  );
}

export function ExerciseRow({ x, right = null }) {
  return (
    <div className="routine-row">
      <Link to={`/ex/${x.id}`} className="row grow" style={{ gap: 14 }}>
        <span className="ex-thumb">
          {x.demo === 'video' && x.videoUrl ? <video src={x.videoUrl} muted playsInline preload="metadata" /> : <MotionFigure motion={x.motion} tempo={x.tempo} dark tight size={60} />}
        </span>
        <span className="grow">
          <b style={{ display: 'block', fontSize: 15 }}>{x.name}</b>
          <span className="sub" style={{ display: 'block' }}>{x.area} · {x.reps} reps · {x.sec}s</span>
          <span className="tag mt8" style={{ display: 'inline-block', marginTop: 6 }}>{demoName(x.demo)}</span>
        </span>
      </Link>
      {right}
    </div>
  );
}
