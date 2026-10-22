import { useStore } from '../lib/store.jsx';
import { SEED_POSTS } from '../data/feed.js';
import { Icon, TopBar, Verified } from '../components/ui.jsx';

export default function Reader({ id }) {
  const { s, actions } = useStore();
  const p = [...s.myPosts, ...SEED_POSTS].find((x) => x.id === id);
  if (!p) {
    return (
      <main className="screen">
        <TopBar title="Article" backTo="/feed" />
        <p className="mx mt24 muted">This post is no longer available.</p>
      </main>
    );
  }
  const body = Array.isArray(p.body) ? p.body : String(p.body || p.caption || '').split(/\n+/);
  const saved = !!s.saved[p.id];
  return (
    <main className="screen" style={{ background: '#fff' }}>
      <TopBar title="" backTo="/feed" right={
        <button className="icon-btn" aria-pressed={saved} aria-label="Save" onClick={() => actions.save(p.id)}>
          <Icon name="bookmark" fill={saved ? '#0B1B2B' : 'none'} />
        </button>
      } />
      <article className="reader pad mt20" style={{ paddingBottom: 48 }}>
        <span className="eyebrow">{p.tag || 'Guide'}{p.read ? ` · ${p.read} read` : ''}</span>
        <h1 className="mt12">{p.title}</h1>
        <div className="row mt14" style={{ gap: 10, marginBottom: 24 }}>
          <span className="post-av" style={{ background: 'var(--ink)', color: 'var(--lime)' }}>{p.author.replace('Dr. ', '').slice(0, 1)}</span>
          <span>
            <span className="post-name">{p.author}{!p.pending && <Verified />}</span>
            <span className="sub" style={{ display: 'block', marginTop: 0 }}>{p.role}</span>
          </span>
        </div>
        {body.map((para, i) => <p key={i}>{para}</p>)}
        <p className="muted" style={{ fontSize: 13 }}>General guidance only. If pain is severe, spreading, or comes with numbness or weakness, see a clinician.</p>
      </article>
    </main>
  );
}
