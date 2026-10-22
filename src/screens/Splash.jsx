import { useState } from 'react';
import { go, Link } from '../lib/router.jsx';
import { useStore } from '../lib/store.jsx';
import { Icon } from '../components/ui.jsx';

export default function Splash() {
  const { actions } = useStore();
  const [name, setName] = useState('');

  const start = (role) => {
    actions.onboard({ name: name.trim(), role });
    go(role === 'physio' ? '/feed/new' : '/home');
  };

  return (
    <main className="screen dark splash">
      <svg className="waves" viewBox="0 0 390 420" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-20 300 C 60 220, 120 360, 200 270 S 340 200, 420 250" fill="none" stroke="#4FE3C1" strokeWidth="3" strokeLinecap="round" opacity=".9" />
        <path d="M-20 330 C 60 250, 120 390, 200 300 S 340 230, 420 280" fill="none" stroke="#fff" strokeWidth="1" opacity=".14" />
        <path d="M-20 360 C 60 280, 120 420, 200 330 S 340 260, 420 310" fill="none" stroke="#fff" strokeWidth="1" opacity=".08" />
      </svg>

      <div className="row between" style={{ position: 'relative' }}>
        <span className="eyebrow">Physio in your pocket</span>
        <Link to="/mission" className="eyebrow" style={{ color: '#4FE3C1', minHeight: 44, display: 'flex', alignItems: 'center' }}>Our mission</Link>
      </div>

      <div style={{ marginTop: 84, position: 'relative' }}>
        <img className="splash-mark" src="./logo-reverse.svg" alt="Ctrl+Move logo: a spine of keyboard keys standing upright inside a Ctrl key" />
        <div className="move"><span className="move-ctrl">Ctrl</span>+Move</div>
      </div>

      <div style={{ marginTop: 'auto', position: 'relative', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p className="tagline">Spot early strain at your desk, move at the right moment, and level up your body.</p>
        <label htmlFor="your-name" className="eyebrow" style={{ marginTop: 18 }}>What should we call you?</label>
        <input id="your-name" className="name-in" placeholder="Your first name" value={name} onChange={(e) => setName(e.target.value)} maxLength={30} autoComplete="given-name" />
        <button className="btn lime block" onClick={() => start('user')}>
          Get started <Icon name="arrow" size={18} width={2} />
        </button>
        <button className="btn ghost-dark block" onClick={() => start('physio')}>I'm a physiotherapist</button>
        <p style={{ margin: '6px 0 0', textAlign: 'center', fontSize: 12, color: 'var(--night-text)' }}>By MotionPlus Physio · Not a substitute for medical diagnosis</p>
      </div>
    </main>
  );
}
