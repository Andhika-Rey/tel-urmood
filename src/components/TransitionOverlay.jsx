import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import transitionGif from '../assets/telkom-logo-animation.gif';

const DURATION = 4000; // ms — adjust to match GIF length

export default function TransitionOverlay({ onDone }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      onDone?.();
      navigate('/test');
    }, DURATION);
    return () => clearTimeout(timer);
  }, [navigate, onDone]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
      {/* Soft ambient glow behind image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-mint/30 blur-[100px]" />

      <div className="relative flex flex-col items-center gap-6">
        <img
          src={transitionGif}
          alt="Telkom University"
          className="w-48 h-48 md:w-56 md:h-56 object-contain"
        />
        <p className="text-sm text-gray-400 font-medium tracking-wide animate-pulse">
          Preparing your reflection...
        </p>
      </div>
    </div>
  );
}
