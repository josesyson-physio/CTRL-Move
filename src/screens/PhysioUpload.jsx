import { useEffect, useState } from 'react';
import { go } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { MOVES } from '../data/routines.js';
import { ETHICS, MOTIONS, STORY_BEATS, storyToBlocks } from '../data/care.js';
import { physioName } from '../lib/people.js';
import { Icon, TopBar } from '../components/ui.jsx';
import MotionFigure from '../components/MotionFigure.jsx';

const TYPES = [['insight', 'Story insight'], ['shot', 'Health Shot'], ['tip', 'Quick tip']];
const AREAS = ['Neck', 'Shoulders', 'Upper back', 'Lower back', 'Wrists', 'Hips', 'Eyes', 'Whole body'];
const MOVE_LIST = Object.entries(MOVES).filter(([, m]) => !m.locked && !m.draft);

export default function PhysioUpload({ initialType }) {
  const { s, actions, toast } = useStore();
  const [type, setType] = useState(TYPES.some(([t]) => t === initialType) ? initialType : 'insight');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [area, setArea] = useState('Neck');
  const [story, setStory] = useState({});
  const [beats, setBeats] = useState(['', '', '']);
  const [motion, setMotion] = useState('chin-tuck');
  const [move, setMove] = useState('chin-tucks');
  const [media, setMedia] = useState(null);
  const [mediaErr, setMediaErr] = useState('');
  const [ethics, setEthics] = useState({});

  useEffect(() => () => { if (media) URL.revokeObjectURL(media.url); }, [media]);

  if (s.role !== 'physio') {
    return (
      <main className="screen">
        <TopBar title="Post to the feed" backTo="/feed" />
        <section className="card mx mt24 stack" style={{ gap: 14 }}>
          <span className="alert-ico" style={{ background: 'var(--ground)', color: 'var(--ink)' }}><Icon name="shield" size={24} /></span>
          <h2 className="h-section">For physiotherapists</h2>
          <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>
            Verified physios share story insights, Health Shots and tips with every Ctrl+Move member. Your licence is reviewed before your posts go public.
          </p>
          <button className="btn ink block" onClick={() => { actions.setRole('physio'); toast('Physio mode on · verification pending'); }}>I'm a physiotherapist</button>
          <button className="btn text" onClick={() => go('/feed')}>Back to feed</button>
        </section>
      </main>
    );
  }

  const author = physioName('me', s);
  const checks = type === 'tip' ? ETHICS.slice(0, 3) : ETHICS;
  const ethicsOk = checks.every((e) => ethics[e]);
  const missing = [];
  if (title.trim().length < 4) missing.push('a title');
  if (type === 'insight') ['story', 'real', 'when'].forEach((k) => { if (!(story[k] || '').trim()) missing.push(STORY_BEATS.find((b) => b.id === k).label.replace(/^\d\.\s/, '').toLowerCase()); });
  if (type === 'shot' && beats.filter((b) => b.trim()).length < 2) missing.push('two caption beats');
  if (type === 'tip' && caption.trim().length < 10) missing.push('the tip');
  const ready = !missing.length && ethicsOk;

  const pickVideo = (f) => {
    setMediaErr('');
    const url = URL.createObjectURL(f);
    const v = document.createElement('video');
    v.preload = 'metadata';
    v.onloadedmetadata = () => {
      if (v.duration > 61) { setMediaErr(`This clip is ${Math.round(v.duration)} s. Health Shots are 60 seconds or less.`); URL.revokeObjectURL(url); return; }
      setMedia({ url, sec: Math.round(v.duration) || 30 });
    };
    v.onerror = () => setMedia({ url, sec: 30 });
    v.src = url;
  };

  const publish = () => {
    if (!ready) return;
    const base = { physio: 'me', author, role: 'Physiotherapist', title: title.trim(), tag: area };
    if (type === 'insight') {
      const words = Object.values(story).join(' ').split(/\s+/).length;
      actions.publish({ ...base, type: 'insight', caption: caption.trim(), read: `${Math.max(2, Math.round(words / 180))} min`, blocks: storyToBlocks(story) });
    } else if (type === 'shot') {
      actions.publish({ ...base, type: 'shot', beats: beats.map((b) => b.trim()).filter(Boolean), motion, move, mediaUrl: media ? media.url : null, sec: media ? media.sec : 30 });
    } else {
      actions.publish({ ...base, type: 'tip', caption: caption.trim() });
    }
    toast('Submitted · visible to you now, public after review');
    go(type === 'shot' ? '/shots' : '/studio');
  };

  return (
    <main className="screen">
      <TopBar title="Create" backTo="/studio" close sub={`Posting as ${author} · verification pending`} />

      <div className="seg-ctl small mx mt18" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        {TYPES.map(([t, label]) => <button key={t} className={t === type ? 'on' : ''} aria-pressed={t === type} onClick={() => { setType(t); setEthics({}); }}>{label}</button>)}
      </div>

      {type === 'insight' && (
        <section className="card dark mx mt14" style={{ padding: 18, borderRadius: 22 }}>
          <span className="eyebrow" style={{ color: 'var(--lime)' }}>Tell it as a story</span>
          <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.55, color: 'var(--night-soft)' }}>People remember stories, not lectures. Follow the six beats: a moment they recognise, the real cause, the science in plain words, the movement prescription, and when to get help.</p>
        </section>
      )}

      {type === 'shot' && (
        <>
          <label className="drop mx mt14">
            <input type="file" accept="video/*" aria-label="Upload a Health Shot video" onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) pickVideo(f); }} />
            {media ? <video src={media.url} muted playsInline autoPlay loop /> : (
              <>
                <span style={{ width: 52, height: 52, borderRadius: 16, background: 'var(--ink)', display: 'grid', placeItems: 'center' }}><Icon name="upload" color="#4FE3C1" width={2} size={22} /></span>
                <b style={{ fontSize: 15 }}>Upload a vertical video</b>
                <span className="sub">60 seconds or less · or use an animated demo below</span>
              </>
            )}
          </label>
          {mediaErr && <p className="mx mt8" style={{ color: 'var(--red)', fontSize: 13 }}>{mediaErr}</p>}
          {!media && (
            <>
              <div className="section-head" style={{ marginTop: 18 }}><h2 className="h-section" style={{ fontSize: 17 }}>No video yet? Use an animated demo</h2></div>
              <div className="motion-grid mx">
                {Object.entries(MOTIONS).map(([id, m]) => (
                  <button key={id} className={'motion-opt' + (motion === id ? ' on' : '')} aria-pressed={motion === id} onClick={() => setMotion(id)}>
                    <span><MotionFigure motion={id} dark tight size={56} /></span>{m.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <section className="card mx mt14 stack" style={{ gap: 14 }}>
        <div className="field">
          <label htmlFor="post-title">{type === 'tip' ? 'Headline' : 'Title'}</label>
          <input id="post-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80}
            placeholder={type === 'shot' ? 'e.g. Your neck isn’t weak. It’s stuck.' : type === 'tip' ? 'e.g. The 20-20-20 rule for screen eyes' : 'e.g. Why your neck hurts by 4 pm'} />
        </div>
        {type === 'insight' && (
          <div className="field">
            <label htmlFor="post-sum">One-line summary</label>
            <input id="post-sum" className="input" value={caption} onChange={(e) => setCaption(e.target.value)} maxLength={140} placeholder="Shown under the title in the feed" />
          </div>
        )}
        {type === 'insight' && STORY_BEATS.map((b) => (
          <div key={b.id} className="field">
            <label htmlFor={`beat-${b.id}`}>{b.label}</label>
            <span className="sub" style={{ marginTop: -2 }}>{b.hint}</span>
            {b.rows === 1
              ? <input id={`beat-${b.id}`} className="input" value={story[b.id] || ''} onChange={(e) => setStory({ ...story, [b.id]: e.target.value })} placeholder={b.ph} />
              : <textarea id={`beat-${b.id}`} className="textarea" rows={b.rows} value={story[b.id] || ''} onChange={(e) => setStory({ ...story, [b.id]: e.target.value })} placeholder={b.ph} />}
          </div>
        ))}
        {type === 'shot' && (
          <div className="field">
            <span className="lbl">Three caption beats</span>
            <span className="sub" style={{ marginTop: -2 }}>Problem, cause, fix. They appear one by one on screen.</span>
            {beats.map((b, i) => (
              <input key={i} className="input" aria-label={`Beat ${i + 1}`} value={b} maxLength={60} onChange={(e) => setBeats(beats.map((x, j) => (j === i ? e.target.value : x)))}
                placeholder={['8 hours looking down at a screen', 'The deep neck muscles switch off', '10 chin tucks switch them back on'][i]} />
            ))}
          </div>
        )}
        {type === 'shot' && (
          <div className="field">
            <label htmlFor="shot-move">"Try this move" button</label>
            <select id="shot-move" className="select" value={move} onChange={(e) => setMove(e.target.value)}>
              {MOVE_LIST.map(([id, m]) => <option key={id} value={id}>{m.name}</option>)}
            </select>
          </div>
        )}
        {type === 'tip' && (
          <div className="field">
            <label htmlFor="post-caption">The tip</label>
            <textarea id="post-caption" className="textarea" rows={3} value={caption} maxLength={280} onChange={(e) => setCaption(e.target.value)} placeholder="One clear action anyone can take today" />
          </div>
        )}
        <div className="field">
          <span className="lbl">Body area</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {AREAS.map((a) => <button key={a} className={'pill' + (area === a ? ' on' : '')} style={{ height: 36, fontSize: 13 }} aria-pressed={area === a} onClick={() => setArea(a)}>{a}</button>)}
          </div>
        </div>
      </section>

      <section className="card mx mt12 ethics" aria-labelledby="ethics-h">
        <div className="row" style={{ gap: 10 }}>
          <span className="num-box" style={{ background: 'var(--ink)', color: 'var(--lime)', width: 36, height: 36, borderRadius: 11 }}><Icon name="shield" size={18} /></span>
          <span><b id="ethics-h" style={{ display: 'block' }}>Ethics check</b><span className="sub">Confirm every point to publish</span></span>
        </div>
        {checks.map((e) => (
          <label key={e} className="check">
            <input type="checkbox" checked={!!ethics[e]} onChange={() => setEthics({ ...ethics, [e]: !ethics[e] })} />
            <span>{e}</span>
          </label>
        ))}
      </section>

      <div className="spacer" />
      <div className="dock">
        <button className="btn ink block" disabled={!ready} onClick={publish}>
          {ready ? 'Submit for review' : missing.length ? `Add ${missing[0]}` : 'Complete the ethics check'}
        </button>
      </div>
    </main>
  );
}
