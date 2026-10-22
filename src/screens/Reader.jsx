import { Link } from '../lib/router.jsx';
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
  const saved = !!s.saved[p.id];
  const initial = p.author.replace('Dr. ', '').slice(0, 1);

  return (
    <main className="screen" style={{ background: '#fff' }}>
      <section className="art-hero">
        <div className="row between">
          <Link to="/feed" className="icon-btn" aria-label="Back to feed"><Icon name="back" width={2} /></Link>
          <button className="icon-btn" aria-pressed={saved} aria-label="Save" onClick={() => actions.save(p.id)}>
            <Icon name="bookmark" fill={saved ? '#4FE3C1' : 'none'} color={saved ? '#4FE3C1' : '#FFFFFF'} />
          </button>
        </div>
        <span className="eyebrow mt24" style={{ display: 'block', color: 'var(--lime)' }}>{p.tag || 'Guide'}{p.read ? ` · ${p.read} read` : ''}{p.reviewed ? ' · Medically reviewed' : ''}</span>
        <h1>{p.title}</h1>
        {p.caption && <p className="art-lead">{p.caption}</p>}
        <div className="row mt18" style={{ gap: 10 }}>
          <span className="post-av" style={{ background: 'var(--lime)', color: 'var(--ink)' }}>{initial}</span>
          <span>
            <span className="post-name" style={{ color: '#fff' }}>{p.author}{!p.pending && <Verified />}</span>
            <span style={{ display: 'block', fontSize: 13, color: 'var(--night-text)' }}>{p.role}</span>
          </span>
        </div>
      </section>

      <article className="reader art">
        {p.blocks ? p.blocks.map((b, i) => <Block key={i} b={b} />) : (
          (Array.isArray(p.body) ? p.body : String(p.body || '').split(/\n+/)).map((t, i) => <p key={i}>{t}</p>)
        )}
        <div className="art-foot">
          <span className="post-av" style={{ background: 'var(--ink)', color: 'var(--lime)' }}>{initial}</span>
          <span className="grow">
            <b style={{ display: 'block' }}>Written by {p.author}</b>
            <span className="sub" style={{ display: 'block', marginTop: 2 }}>For MotionPlus Physio · Ctrl+Move</span>
          </span>
        </div>
        <p className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}>This guide is for education. Every recovery plan should be set by your own medical and rehabilitation team.</p>
        <Link to="/consult" className="btn ink block mt14">Talk to a physiotherapist</Link>
      </article>
    </main>
  );
}

function Block({ b }) {
  switch (b.type) {
    case 'h':
      return <h2 className="art-h">{b.text}</h2>;
    case 'p':
      return <p>{b.text}</p>;
    case 'quote':
      return (
        <figure className="art-quote">
          <svg width="28" height="22" viewBox="0 0 28 22" aria-hidden="true"><path d="M0 22V13C0 5 4 1 11 0l1 3c-4 1-6 4-6 8h5v11zm16 0V13c0-8 4-12 11-13l1 3c-4 1-6 4-6 8h5v11z" fill="#4FE3C1" /></svg>
          <blockquote>{b.text}</blockquote>
        </figure>
      );
    case 'glance':
      return (
        <section className="art-glance" aria-label="At a glance">
          <span className="eyebrow">At a glance</span>
          {b.items.map((it, i) => (
            <div key={i} className="art-glance-row">
              <span className="num-box" style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--ink)', color: 'var(--lime)' }}>{i + 1}</span>
              <span><b>{it.k}</b><span>{it.v}</span></span>
            </div>
          ))}
        </section>
      );
    case 'paths':
      return (
        <figure className="art-fig" aria-label="Every stroke is different: some people recover quickly, some slowly, some need lifelong support">
          <svg viewBox="0 0 344 150" width="100%" aria-hidden="true">
            <circle cx="32" cy="75" r="26" fill="#0B1B2B" />
            <text x="32" y="79" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4FE3C1" fontFamily="var(--f-display)">Stroke</text>
            <path d="M60 70 C 110 30, 150 24, 196 24" stroke="#4FE3C1" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M60 75 C 110 75, 150 75, 196 75" stroke="#7FB6E8" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="10 6" />
            <path d="M60 80 C 110 120, 150 126, 196 126" stroke="#C9D3DC" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="3 7" />
            {b.items.map((t, i) => (
              <text key={t} x="204" y={[28, 79, 130][i]} fontSize="12" fontWeight="600" fill="#0B1B2B" fontFamily="var(--f-ui)">{t}</text>
            ))}
          </svg>
          <figcaption>Every stroke is different. Every path is valid.</figcaption>
        </figure>
      );
    case 'mythfact':
      return (
        <figure className="art-mf">
          <div className="mf myth">
            <span className="mf-tag"><Icon name="close" size={13} width={3} /> Myth</span>
            <p>{b.myth}</p>
          </div>
          <div className="mf-arrow" aria-hidden="true"><Icon name="arrow" width={2.4} /></div>
          <div className="mf fact">
            <span className="mf-tag"><Icon name="check" size={13} width={3} /> What we now know</span>
            <p>{b.fact}</p>
          </div>
        </figure>
      );
    case 'flow':
      return (
        <figure className="art-flow" aria-label={`People recover best when rehabilitation is: ${b.items.map((x) => x.d).join(' ')}`}>
          {b.items.map((it, i) => (
            <div key={it.t} className="flow-step">
              <div className="flow-node">
                <span className="flow-n">{i + 1}</span>
                <span><b>{it.t}</b><span>{it.d}</span></span>
              </div>
              <span className="flow-arrow" aria-hidden="true" />
            </div>
          ))}
          <div className="flow-end">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B1B2B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
            {b.end}
          </div>
        </figure>
      );
    case 'timeline':
      return (
        <ol className="art-tl">
          {b.stages.map((st, i) => (
            <li key={st.title} className="tl-item">
              <span className="tl-dot" style={{ background: ['#C9F3E8', '#8CEBD4', '#4FE3C1', '#0B1B2B'][i] }}>
                {i === 3 && <span style={{ color: '#4FE3C1', fontWeight: 800 }}>∞</span>}
              </span>
              <div className="tl-body">
                <span className="eyebrow">{st.when}</span>
                <h3>“{st.title}”</h3>
                <p>{st.text}</p>
                {st.wins && (
                  <div className="tl-wins">
                    {st.wins.map((w) => <span key={w} className="tl-win"><Icon name="check" size={12} width={3} />{w}</span>)}
                  </div>
                )}
                {st.transform && (
                  <div className="tl-transform">
                    <div className="tl-tf-head"><span>Instead of</span><span /><span>The goal becomes</span></div>
                    {st.transform.map(([a, z]) => (
                      <div key={a} className="tl-tf-row">
                        <span className="tf-a">{a}</span>
                        <Icon name="arrow" size={18} width={2.4} />
                        <span className="tf-z">{z}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      );
    case 'wave':
      return (
        <figure className="art-fig" aria-label="Recovery has good days and frustrating days">
          <svg viewBox="0 0 320 120" width="100%" aria-hidden="true">
            <path d="M10 92 C 40 92, 46 60, 72 66 S 104 98, 128 80 S 160 36, 186 52 S 214 78, 240 46 S 280 22, 310 20" fill="none" stroke="#4FE3C1" strokeWidth="4" strokeLinecap="round" />
            <circle cx="186" cy="52" r="5" fill="#0B1B2B" /><text x="168" y="34" fontSize="11.5" fontWeight="600" fill="#0B1B2B" fontFamily="var(--f-ui)">Good day</text>
            <circle cx="128" cy="80" r="5" fill="#9AA9B8" /><text x="96" y="108" fontSize="11.5" fontWeight="600" fill="#4A4F58" fontFamily="var(--f-ui)">Frustrating day</text>
            <path d="M10 112 H310" stroke="#E4E6EA" strokeWidth="2" />
          </svg>
          <figcaption>Good days and frustrating days are both part of the journey.</figcaption>
        </figure>
      );
    case 'closing':
      return (
        <section className="art-closing">
          <span className="eyebrow" style={{ color: 'var(--lime)' }}>{b.title}</span>
          <p className="art-closing-lead">{b.lead}</p>
          <p>{b.text}</p>
        </section>
      );
    default:
      return null;
  }
}
