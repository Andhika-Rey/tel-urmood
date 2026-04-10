import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import transitionGif from '../assets/telkom-logo-animation.gif';
import { useLang } from '../contexts/LanguageContext';
import t, { T } from '../constants/translations';

const PLAY_DURATION = 4000; // ms — how long the GIF plays after it's loaded

export default function TransitionOverlay({ onDone }) {
  const navigate = useNavigate();
  const { lang } = useLang();
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // Preload the GIF — only start the timer once it's fully loaded
  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true); // fallback: proceed even on error
    img.src = transitionGif;
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => {
      onDone?.();
      navigate('/test');
    }, PLAY_DURATION);
    return () => clearTimeout(timer);
  }, [loaded, navigate, onDone]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
      {/* Soft ambient glow behind image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-mint/30 blur-[100px]" />

      <div className="relative flex flex-col items-center gap-6">
        {loaded ? (
          <img
            ref={imgRef}
            src={transitionGif}
            alt="Telkom University"
            className="w-48 h-48 md:w-56 md:h-56 object-contain"
          />
        ) : (
          <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            <div className="w-10 h-10 border-3 border-teal/30 border-t-teal rounded-full animate-spin" />
          </div>
        )}
        <p className="text-sm text-gray-400 font-medium tracking-wide animate-pulse">
          {loaded ? T(t.transition.preparing, lang) : T(t.transition.loading, lang)}
        </p>
      </div>
    </div>
  );
}
