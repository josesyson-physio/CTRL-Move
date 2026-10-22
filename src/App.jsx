import { useEffect, useRef } from 'react';
import { go, match, useRoute } from './lib/router.jsx';
import { StoreProvider, useStore } from './lib/store.jsx';
import { Toasts, Wordmark } from './components/ui.jsx';
import { PILLARS } from './screens/Mission.jsx';
import Splash from './screens/Splash.jsx';
import Home from './screens/Home.jsx';
import PainMap from './screens/PainMap.jsx';
import Bingo from './screens/Bingo.jsx';
import Posture from './screens/Posture.jsx';
import BingoSymptom from './screens/BingoSymptom.jsx';
import Scan from './screens/Scan.jsx';
import ScanResult from './screens/ScanResult.jsx';
import Challenge from './screens/Challenge.jsx';
import Relief from './screens/Relief.jsx';
import Player from './screens/Player.jsx';
import Feed from './screens/Feed.jsx';
import Reader from './screens/Reader.jsx';
import PhysioUpload from './screens/PhysioUpload.jsx';
import Consult from './screens/Consult.jsx';
import Profile from './screens/Profile.jsx';
import Mission from './screens/Mission.jsx';
import Shots from './screens/Shots.jsx';
import PhysioProfile from './screens/PhysioProfile.jsx';
import Exercise from './screens/Exercise.jsx';
import { ChatInbox, ChatThread } from './screens/Chat.jsx';
import Book from './screens/Book.jsx';
import Session from './screens/Session.jsx';
import Studio, { StudioExercise, StudioGroup, StudioThread } from './screens/Studio.jsx';

function Screen() {
  const { path, query } = useRoute();
  const { s } = useStore();
  const device = useRef(null);

  useEffect(() => { if (device.current) device.current.scrollTop = 0; }, [path]);

  let el;
  let p;
  if (path === '/mission') el = <Mission />;
  else if (!s.onboarded || path === '/') el = s.onboarded ? <Home /> : <Splash />;
  else if (path === '/home') el = <Home />;
  else if (path === '/track') el = <PainMap />;
  else if (path === '/posture') el = <Posture />;
  else if (path === '/bingo') el = <Bingo />;
  else if ((p = match('/bingo/:slug', path))) el = <BingoSymptom slug={p.slug} />;
  else if (path === '/scan') el = <Scan />;
  else if (path === '/scan/result') el = <ScanResult />;
  else if (path === '/challenge') el = <Challenge />;
  else if (path === '/relief') el = <Relief />;
  else if ((p = match('/play/:id', path))) el = <Player key={p.id + (query.get('post') || '')} id={p.id} postId={query.get('post')} />;
  else if (path === '/feed') el = <Feed />;
  else if (path === '/feed/new') el = <PhysioUpload key={query.get('type') || ''} initialType={query.get('type')} />;
  else if (path === '/shots') el = <Shots start={query.get('i')} />;
  else if ((p = match('/feed/:id', path))) el = <Reader id={p.id} />;
  else if (path === '/consult') el = <Consult key={query.get('tab') || ''} tab={query.get('tab')} />;
  else if ((p = match('/physio/:id', path))) el = <PhysioProfile key={p.id} id={p.id} />;
  else if ((p = match('/ex/:id', path))) el = <Exercise key={p.id} id={p.id} />;
  else if (path === '/chat') el = <ChatInbox />;
  else if ((p = match('/chat/:id', path))) el = <ChatThread key={p.id} id={p.id} />;
  else if ((p = match('/book/:id', path))) el = <Book key={p.id} id={p.id} />;
  else if ((p = match('/session/:id', path))) el = <Session key={p.id} id={p.id} />;
  else if (path === '/studio') el = <Studio />;
  else if (path === '/studio/exercise') el = <StudioExercise />;
  else if (path === '/studio/group') el = <StudioGroup />;
  else if ((p = match('/studio/inbox/:id', path))) el = <StudioThread key={p.id} id={p.id} />;
  else if (path === '/profile') el = <Profile />;
  else el = <Home />;

  return <div className="device" ref={device}>{el}</div>;
}

// Desktop-only panel beside the phone frame.
function Vision() {
  return (
    <aside className="vision" aria-label="About Ctrl+Move">
      <Wordmark big />
      <h2>Preventive health, <em>one move</em> at a time.</h2>
      <p>Ctrl+Move is a physiotherapist in your pocket for people who work at desks. It spots early strain, nudges you to move before pain starts, and makes staying well feel like a game.</p>
      <div className="pillars">
        {PILLARS.map((x) => (
          <div className="pillar" key={x.t}><b>{x.t}</b><span>{x.d}</span></div>
        ))}
      </div>
      <div className="made">BY MOTIONPLUS PHYSIO · OPEN ON YOUR PHONE TO INSTALL</div>
    </aside>
  );
}

// Fires the "time to move" reminder when a work block ends.
function SitWatcher() {
  const { s, actions, toast } = useStore();
  useEffect(() => {
    if (!s.sit.start || s.sit.notified) return undefined;
    const check = () => {
      if (Date.now() - s.sit.start < s.sit.goal * 60000) return;
      actions.markSitNotified();
      toast('Time to move. Your 90-second desk reset is ready.');
      try {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Time to move', { body: 'Your desk reset is ready in Ctrl+Move.', icon: './icon.svg' });
        }
      } catch (e) { /* some browsers only allow notifications from a service worker */ }
      if (navigator.vibrate) navigator.vibrate([120, 80, 120]);
    };
    check();
    const t = setInterval(check, 10000);
    return () => clearInterval(t);
  }, [s.sit.start, s.sit.notified, s.sit.goal]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <div className="stage">
        <Vision />
        <Screen />
      </div>
      <SitWatcher />
      <Toasts />
    </StoreProvider>
  );
}

export { go };
