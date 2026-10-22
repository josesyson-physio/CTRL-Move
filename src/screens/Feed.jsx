import { useState } from 'react';
import { Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { FEED_TABS, SEED_POSTS } from '../data/feed.js';
import { PHYSIOS } from '../data/physios.js';
import { Icon, PlayGlyph, TabBar, Verified } from '../components/ui.jsx';
import { Cover, hasCover } from '../components/covers.jsx';
import ShotCard from '../components/ShotCard.jsx';
import { allShots } from '../lib/people.js';

const ago = (h) => (h < 1 ? 'now' : h < 24 ? `${h}h` : `${Math.round(h / 24)}d`);

export default function Feed() {
  const { s, actions } = useStore();
  const [tab, setTab] = useState('For you');
  const mine = s.myPosts.map((p) => ({ ...p, hoursAgo: Math.round((Date.now() - p.at) / 3600000) }));
  const all = [...mine, ...SEED_POSTS].filter((p) => p.type !== 'shot');
  const shots = allShots(s);
  const posts = tab === 'Health Shots' ? [] : all.filter((p) =>
    tab === 'For you' ? true : tab === 'Articles' ? p.type === 'article' || p.type === 'insight' : !!s.saved[p.id]);
  const shotList = tab === 'Saved' ? shots.filter((x) => s.saved[x.id]) : shots;

  return (
    <main className="screen">
      <header className="home-head">
        <h1 style={{ margin: 0, fontFamily: 'var(--f-display)', fontSize: 32, fontWeight: 800, letterSpacing: '-.03em' }}>Feed</h1>
        <span className="row" style={{ gap: 8 }}>
          <Link to="/chat" className="icon-btn" aria-label="Chats with physios"><Icon name="comment" /></Link>
          <Link to={s.role === 'physio' ? '/studio' : '/feed/new'} className="icon-btn" style={{ background: 'var(--ink)', borderColor: 'var(--ink)' }} aria-label="Create post (physios)">
            <Icon name="plus" color="#4FE3C1" width={2.2} />
          </Link>
        </span>
      </header>

      <section className="stories" aria-label="Physios">
        {PHYSIOS.slice(0, 6).map((p, i) => (
          <Link key={p.id} to={`/physio/${p.id}`} className="story">
            <span className={'ring-s' + (i < 3 ? ' new' : '')}>
              <span style={{ background: i % 2 ? '#fff' : 'var(--ink)', color: i % 2 ? 'var(--ink)' : '#fff' }}>{p.name.replace('Dr. ', '').slice(0, 1)}</span>
            </span>
            {p.name.replace('Dr. ', '')}
          </Link>
        ))}
      </section>

      <div className="seg-ctl small mx mt14" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        {FEED_TABS.map((t) => <button key={t} className={t === tab ? 'on' : ''} aria-pressed={t === tab} onClick={() => setTab(t)}>{t}</button>)}
      </div>

      {(tab === 'For you' || (tab === 'Saved' && shotList.length > 0)) && (
        <>
          <div className="section-head" style={{ marginTop: 20 }}>
            <h2 className="h-section" style={{ fontSize: 18 }}>Health Shots</h2>
            {tab === 'For you' && <button onClick={() => setTab('Health Shots')}>See all</button>}
          </div>
          <div className="h-scroll">{shotList.map((sh) => <ShotCard key={sh.id} sh={sh} s={s} />)}</div>
        </>
      )}
      {tab === 'Health Shots' && (
        <>
          <p className="muted mx mt14" style={{ fontSize: 14, lineHeight: 1.5 }}>Under 60 seconds. One problem, its real cause, and one move to fix it.</p>
          <div className="shot-grid mx mt12">{shots.map((sh) => <ShotCard key={sh.id} sh={sh} s={s} wide />)}</div>
        </>
      )}
      {tab !== 'Health Shots' && posts.length === 0 && shotList.length === 0 && (
        <p className="muted mx mt24" style={{ textAlign: 'center' }}>{tab === 'Saved' ? 'Tap the bookmark on a post to save it here.' : 'Nothing here yet.'}</p>
      )}

      {posts.map((p) => <Post key={p.id} p={p} s={s} actions={actions} />)}
      <div className="spacer" />
      <TabBar active="feed" />
    </main>
  );
}

function Post({ p, s, actions }) {
  const liked = !!s.likes[p.id];
  const saved = !!s.saved[p.id];
  const initial = p.author.replace('Dr. ', '').slice(0, 1);
  const head = (
    <div className="post-head">
      <span className="post-av" style={{ background: 'var(--ink)', color: 'var(--lime)' }}>{initial}</span>
      <span className="grow">
        <span className="post-name">{p.author}{!p.pending && <Verified />}</span>
        <span className="sub" style={{ display: 'block', marginTop: 0 }}>{p.role} · {ago(p.hoursAgo)}</span>
      </span>
      {p.pending ? <span className="tag warn">Pending review</span> : p.sample ? <span className="tag">Sample</span> : null}
    </div>
  );
  const actionsRow = (
    <div className="post-actions">
      <button className="act" aria-pressed={liked} aria-label="Like" onClick={() => actions.like(p.id)}>
        <Icon name="heart" size={22} fill={liked ? '#D9401F' : 'none'} color={liked ? '#D9401F' : '#0B1B2B'} />{p.likes + (liked ? 1 : 0)}
      </button>
      <span className="act" aria-label={`${p.comments} comments`}><Icon name="comment" size={22} />{p.comments}</span>
      <span className="grow" />
      <button className="act" aria-pressed={saved} aria-label="Save" onClick={() => actions.save(p.id)}>
        <Icon name="bookmark" size={22} fill={saved ? '#0B1B2B' : 'none'} />
      </button>
    </div>
  );

  if (p.type === 'tip') {
    return (
      <article className="card dark mx mt14" style={{ borderRadius: 26 }}>
        <div className="row" style={{ gap: 10 }}>
          <span className="post-av" style={{ background: 'var(--lime)', color: 'var(--ink)', width: 36, height: 36, fontSize: 14 }}>{initial}</span>
          <span className="grow" style={{ fontWeight: 700, fontSize: 14 }}>{p.author} <span style={{ fontWeight: 500, color: 'var(--night-text)' }}>· Quick tip · {ago(p.hoursAgo)}</span></span>
          {p.pending && <span className="tag warn">Pending</span>}
        </div>
        <p className="tip-text">{p.title}</p>
        {p.caption && <p style={{ margin: '8px 0 0', color: 'var(--night-soft)', fontSize: 14, lineHeight: 1.5 }}>{p.caption}</p>}
        <div className="row mt14"><Link to="/home" className="btn ghost-dark sm">Set a move timer</Link></div>
      </article>
    );
  }

  if (p.type === 'article' || p.type === 'insight') {
    return (
      <article className="card flush mx mt14" style={{ borderRadius: 26 }}>
        {head}
        {hasCover(p.art) ? (
          <Link to={`/feed/${p.id}`} className="feed-cover">
            <Cover art={p.art} />
            <span className="eyebrow">{p.tag} · {p.read} read</span>
          </Link>
        ) : (
          <Link to={`/feed/${p.id}`} className="article-cover" style={{ background: 'var(--lime)' }}>
            <span className="eyebrow" style={{ color: 'var(--ink)' }}>{p.tag} · {p.read} read</span>
            <span className="t">{p.cover || p.title.split(':')[0]}</span>
            {p.type === 'insight' && <span className="eyebrow" style={{ color: 'var(--ink)', marginTop: 10, display: 'block' }}>Story insight</span>}
          </Link>
        )}
        <div style={{ padding: '14px 16px 4px' }}>
          <div style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.3 }}>{p.title}</div>
          <p className="muted" style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.5 }}>{p.caption}</p>
        </div>
        {actionsRow}
        <div style={{ padding: '6px 16px 16px' }}><Link to={`/feed/${p.id}`} className="btn ink sm block">Read guide</Link></div>
      </article>
    );
  }

  // reel / routine
  const target = p.routine ? `/play/${p.routine}?post=${p.id}` : null;
  return (
    <article className="card flush mx mt14" style={{ borderRadius: 26 }}>
      {head}
      {p.mediaUrl ? (
        <video src={p.mediaUrl} controls playsInline style={{ width: '100%', height: 400, objectFit: 'cover', background: '#0F2236' }} />
      ) : (
        <Link to={target || '/feed'} className="reel">
          <span className="eyebrow" style={{ color: 'var(--lime)' }}>{p.type === 'routine' ? 'Routine' : 'Reel'}{p.length ? ` · ${p.length}` : ''}</span>
          <span className="t">{p.title}</span>
          <span className="p"><PlayGlyph size={20} color="#0B1B2B" /></span>
        </Link>
      )}
      {actionsRow}
      <p className="caption"><b>{p.author}</b> {p.caption}</p>
      {target && (
        <div style={{ padding: '14px 16px 16px' }}>
          <Link to={target} className="btn lime md block">
            {s.tried[p.id] ? 'Do it again' : 'Try this routine'} {!s.tried[p.id] && <span className="xp-tag">+25 XP</span>}
          </Link>
        </div>
      )}
      {!target && <div style={{ height: 16 }} />}
    </article>
  );
}
