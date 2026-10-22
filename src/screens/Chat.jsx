import { useEffect, useRef, useState } from 'react';
import { Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { PHYSIOS } from '../data/physios.js';
import { CHAT_RULES, CHAT_STARTERS, physioById } from '../data/care.js';
import { initialOf } from '../lib/people.js';
import { Icon, TabBar, TopBar } from '../components/ui.jsx';

const hhmm = (ms) => new Date(ms).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

// Member inbox: only conversations the member started.
export function ChatInbox() {
  const { s } = useStore();
  const threads = Object.entries(s.chats || {}).filter(([, m]) => m.length).sort((a, b) => b[1][b[1].length - 1].at - a[1][a[1].length - 1].at);

  return (
    <main className="screen">
      <TopBar title="Chats" sub="Your conversations with physios" backTo="/feed" />
      <Rules />
      {threads.length > 0 && (
        <section className="card list mx mt14">
          {threads.map(([id, msgs]) => {
            const p = physioById(id);
            const last = msgs[msgs.length - 1];
            return (
              <Link key={id} to={`/chat/${id}`} className="routine-row">
                <span className="post-av" style={{ background: 'var(--ink)', color: 'var(--lime)', width: 48, height: 48 }}>{initialOf(p ? p.name : 'P')}</span>
                <span className="grow">
                  <b style={{ display: 'block', fontSize: 15 }}>{p ? p.name : 'Physio'}</b>
                  <span className="sub" style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{last.from === 'me' ? 'You: ' : ''}{last.text}</span>
                </span>
                <span className="sub">{hhmm(last.at)}</span>
              </Link>
            );
          })}
        </section>
      )}
      <div className="section-head"><h2 className="h-section" style={{ fontSize: 18 }}>{threads.length ? 'Start another chat' : 'Start a chat'}</h2></div>
      <section className="card list mx">
        {PHYSIOS.filter((p) => !(s.chats || {})[p.id]).map((p) => (
          <Link key={p.id} to={`/chat/${p.id}`} className="routine-row">
            <span className="post-av" style={{ background: 'var(--ground)', color: 'var(--ink)', width: 44, height: 44 }}>{initialOf(p.name)}</span>
            <b className="grow" style={{ fontSize: 15 }}>{p.name}</b>
            <Icon name="comment" size={20} />
          </Link>
        ))}
      </section>
      <div className="spacer" />
      <TabBar active="feed" />
    </main>
  );
}

function Rules({ compact = false }) {
  return (
    <section className={'chat-rules mx' + (compact ? ' compact' : ' mt18')} aria-label="Chat ground rules">
      <span className="eyebrow">Ground rules</span>
      <ul>{CHAT_RULES.map((r) => <li key={r}>{r}</li>)}</ul>
    </section>
  );
}

export function ChatThread({ id }) {
  const { s, actions } = useStore();
  const p = physioById(id);
  const [text, setText] = useState('');
  const end = useRef(null);
  const msgs = (s.chats || {})[id] || [];

  useEffect(() => { if (end.current) end.current.scrollIntoView({ block: 'end' }); }, [msgs.length]);

  if (!p) return <main className="screen"><TopBar title="Chat" backTo="/chat" /><p className="mx mt24 muted">This physio could not be found.</p></main>;

  if (s.role === 'physio') {
    return (
      <main className="screen">
        <TopBar title={p.name} backTo="/studio" />
        <section className="card mx mt24 stack" style={{ gap: 12 }}>
          <h2 className="h-section">Members start chats</h2>
          <p className="muted" style={{ margin: 0, lineHeight: 1.55 }}>In physio mode you can reply to members who write to you, from your Studio inbox. Switch to member mode in your profile to try the member side.</p>
          <Link to="/studio" className="btn ink block">Open Studio inbox</Link>
        </section>
      </main>
    );
  }

  const send = (t) => {
    const v = (t || text).trim();
    if (!v) return;
    actions.sendChat(id, v, p.name);
    setText('');
  };

  return (
    <main className="screen chat-screen">
      <TopBar title={p.name} sub="Usually replies within 24 hours" backTo="/chat"
        right={<Link to={`/book/${id}`} className="icon-btn" aria-label={`Book a tele-session with ${p.name}`}><Icon name="video" /></Link>} />
      <Rules compact />
      <section className="chat-log mx" aria-live="polite">
        {msgs.length === 0 && (
          <div className="chat-empty">
            <span className="post-av" style={{ width: 64, height: 64, fontSize: 24, background: 'var(--ink)', color: 'var(--lime)' }}>{initialOf(p.name)}</span>
            <b>Ask {p.name} a question</b>
            <span className="muted">Describe what you feel, where, and since when. Your first message starts the chat.</span>
            <div className="chat-starters">
              {CHAT_STARTERS.map((c) => <button key={c} className="chip" onClick={() => send(c)}>{c}</button>)}
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={'bubble ' + (m.from === 'me' ? 'me' : 'them')}>
            {m.from === 'auto' && <span className="bubble-tag">Automatic reply</span>}
            {m.text}
            <span className="bubble-time">{hhmm(m.at)}</span>
          </div>
        ))}
        <div ref={end} />
      </section>
      <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <label htmlFor="chat-msg" className="sr-only" style={{ position: 'absolute', left: -9999 }}>Message</label>
        <input id="chat-msg" className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder={msgs.length ? 'Message' : 'Write your first message'} maxLength={600} autoComplete="off" />
        <button type="submit" className="send" aria-label="Send" disabled={!text.trim()}><Icon name="arrow" width={2.2} /></button>
      </form>
    </main>
  );
}
