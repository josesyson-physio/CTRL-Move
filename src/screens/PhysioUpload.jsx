import { useEffect, useState } from 'react';
import { go } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { ROUTINES } from '../data/routines.js';
import { Icon, TopBar } from '../components/ui.jsx';

const TYPES = ['Reel', 'Article', 'Tip', 'Routine'];
const AREAS = ['Neck', 'Shoulders', 'Upper back', 'Lower back', 'Wrists', 'Hips', 'Eyes'];
const HINTS = {
  Reel: ['Upload video', 'MP4 or MOV · vertical · up to 90 s', 'video/*'],
  Article: ['Add cover image', 'JPG or PNG · 16:9', 'image/*'],
  Tip: ['Add image (optional)', 'Short tips show as text cards', 'image/*'],
  Routine: ['Upload move video', 'One clip per move · up to 60 s', 'video/*'],
};

export default function PhysioUpload() {
  const { s, actions, toast } = useStore();
  const [type, setType] = useState('Reel');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [zones, setZones] = useState({ Neck: true });
  const [routine, setRoutine] = useState(true);
  const [consent, setConsent] = useState(false);
  const [media, setMedia] = useState(null);

  useEffect(() => () => { if (media) URL.revokeObjectURL(media.url); }, [media]);

  if (s.role !== 'physio') {
    return (
      <main className="screen">
        <TopBar title="Post to the feed" backTo="/feed" />
        <section className="card mx mt24 stack" style={{ gap: 14 }}>
          <span className="alert-ico" style={{ background: 'var(--ground)', color: 'var(--ink)' }}><Icon name="shield" size={24} /></span>
          <h2 className="h-section">For physiotherapists</h2>
          <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>
            Verified physios share reels, routines and guides with every Ctrl+Move user. Switch your account to physio mode to start. Your license is reviewed before your posts go public.
          </p>
          <button className="btn ink block" onClick={() => { actions.setRole('physio'); toast('Physio mode on · verification pending'); }}>I'm a physiotherapist</button>
          <button className="btn text" onClick={() => go('/feed')}>Back to feed</button>
        </section>
      </main>
    );
  }

  const [label, hint, accept] = HINTS[type];
  const canPublish = consent && title.trim().length > 2;

  const publish = () => {
    if (!canPublish) return;
    const t = type.toLowerCase();
    actions.publish({
      type: t === 'routine' ? 'routine' : t,
      author: s.name ? `Dr. ${s.name}` : 'You',
      role: 'Physiotherapist',
      title: title.trim(),
      caption: caption.trim(),
      body: caption.trim(),
      tag: Object.keys(zones).filter((z) => zones[z]).join(', ') || 'General',
      read: t === 'article' ? `${Math.max(1, Math.round(caption.split(/\s+/).length / 200))} min` : undefined,
      routine: (t === 'reel' || t === 'routine') && routine ? 'desk-reset' : null,
      mediaUrl: media && media.kind === 'video' ? media.url : null,
    });
    toast('Posted · visible to you now, public after review');
    go('/feed');
  };

  return (
    <main className="screen">
      <TopBar title="New post" backTo="/feed" close sub={`Posting as ${s.name ? `Dr. ${s.name}` : 'you'} · verification pending`} />

      <div className="seg-ctl small mx mt18" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        {TYPES.map((t) => <button key={t} className={t === type ? 'on' : ''} aria-pressed={t === type} onClick={() => { setType(t); setMedia(null); }}>{t}</button>)}
      </div>

      <label className="drop mx mt14">
        <input type="file" accept={accept} aria-label={label} onChange={(e) => {
          const f = e.target.files && e.target.files[0];
          if (f) setMedia({ url: URL.createObjectURL(f), kind: f.type.startsWith('video') ? 'video' : 'image', name: f.name });
        }} />
        {media ? (
          media.kind === 'video' ? <video src={media.url} muted playsInline autoPlay loop /> : <img src={media.url} alt="Selected cover" />
        ) : (
          <>
            <span style={{ width: 52, height: 52, borderRadius: 16, background: 'var(--ink)', display: 'grid', placeItems: 'center' }}><Icon name="upload" color="#4FE3C1" width={2} size={22} /></span>
            <b style={{ fontSize: 15 }}>{label}</b>
            <span className="sub">{hint}</span>
          </>
        )}
      </label>

      <section className="card mx mt14 stack" style={{ gap: 14 }}>
        <div className="field">
          <label htmlFor="post-title">Title</label>
          <input id="post-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={90} placeholder="e.g. 3 moves to undo tech neck" />
        </div>
        <div className="field">
          <label htmlFor="post-caption">{type === 'Article' ? 'Article' : 'Guidance'}</label>
          <textarea id="post-caption" className="textarea" rows={type === 'Article' ? 8 : 3} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="What to do, and who it helps" />
        </div>
        <div className="field">
          <span className="lbl">Body areas</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {AREAS.map((a) => (
              <button key={a} className={'pill' + (zones[a] ? ' on' : '')} style={{ height: 36, fontSize: 13 }} aria-pressed={!!zones[a]} onClick={() => setZones({ ...zones, [a]: !zones[a] })}>{a}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="card mx mt12" style={{ padding: '4px 18px' }}>
        {(type === 'Reel' || type === 'Routine') && (
          <div className="row" style={{ minHeight: 60, borderBottom: '1px solid var(--line)' }}>
            <span className="grow">
              <b style={{ display: 'block', fontSize: 14 }}>Add a "Try it" routine</b>
              <span className="sub" style={{ display: 'block', marginTop: 0 }}>Users earn +25 XP completing {ROUTINES['desk-reset'].name.toLowerCase()}</span>
            </span>
            <button className="switch" role="switch" aria-checked={routine} aria-label="Add a Try it routine" onClick={() => setRoutine(!routine)} />
          </div>
        )}
        <label className="check">
          <input type="checkbox" checked={consent} onChange={() => setConsent(!consent)} />
          <span>I confirm this guidance is within my scope of practice and safe for a general desk-working audience.</span>
        </label>
      </section>

      <div className="spacer" />
      <div className="dock">
        <button className="btn ink block" disabled={!canPublish} onClick={publish}>{canPublish ? 'Publish to feed' : consent ? 'Add a title to publish' : 'Confirm to publish'}</button>
      </div>
    </main>
  );
}
