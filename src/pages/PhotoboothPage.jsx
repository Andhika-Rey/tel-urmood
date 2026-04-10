import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Download, RotateCcw, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import t, { T } from '../constants/translations';

// ── Canvas / template constants (1080 × 1920) ──
const CW = 1080;
const CH = 1920;

function IgIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Photo slot coordinates — measured via pixel-level alpha analysis of the
// border template PNGs.  Both border1.png and border2.png share this layout.
//
// The templates use TRANSPARENCY (alpha = 0) to mark the photo cutouts.
// Pixel analysis results (alpha transition boundaries):
//   Top slot transparent region:    y ≈ 76..804   x ≈ 62..1012
//   Bottom slot transparent region: y ≈ 1003..1843 x ≈ 67..1017
//
// We extend each slot by 4 px outward so photos bleed slightly under the
// border frame, guaranteeing zero white gaps at the edges.
const SLOTS = {
  top:    { x: 58, y: 72,   w: 958, h: 736 },
  bottom: { x: 63, y: 999,  w: 958, h: 849 },
};

const TEMPLATES = [
  { key: 'purple', src: '/border1.png' },
  { key: 'teal',   src: '/border2.png' },
];

// ── Helpers ──
function cropToFill(ctx, img, dx, dy, dw, dh) {
  const imgRatio = img.width / img.height;
  const slotRatio = dw / dh;
  let sx, sy, sw, sh;
  if (imgRatio > slotRatio) {
    sh = img.height;
    sw = sh * slotRatio;
    sx = (img.width - sw) / 2;
    sy = 0;
  } else {
    sw = img.width;
    sh = sw / slotRatio;
    sx = 0;
    sy = (img.height - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// ── Phases ──
const PHASE = {
  SELECT:   'select',   // pick template
  CAMERA1:  'camera1',  // live preview for photo 1
  PREVIEW1: 'preview1', // review photo 1
  CAMERA2:  'camera2',  // live preview for photo 2
  PREVIEW2: 'preview2', // review photo 2
  RESULT:   'result',   // final composed image
};

export default function PhotoboothPage() {
  const navigate = useNavigate();
  const { lang } = useLang();

  const [phase, setPhase] = useState(PHASE.SELECT);
  const [templateIdx, setTemplateIdx] = useState(0);
  const [photos, setPhotos] = useState([null, null]); // [top, bottom] as data URLs
  const [countdown, setCountdown] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [finalDataUrl, setFinalDataUrl] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  // ── Camera lifecycle ──
  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setCameraError(T(t.photobooth.cameraPermissionDenied, lang));
      } else {
        setCameraError(T(t.photobooth.cameraError, lang));
      }
    }
  }, [lang]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Clean up camera on unmount
  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  // ── Countdown + capture ──
  const runCountdownAndCapture = useCallback((slotIndex) => {
    let count = 3;
    setCountdown(count);

    const tick = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(tick);
        setCountdown(null);

        // Capture frame from video
        const video = videoRef.current;
        if (!video) return;
        const offscreen = document.createElement('canvas');
        offscreen.width = video.videoWidth;
        offscreen.height = video.videoHeight;
        const ctx = offscreen.getContext('2d');
        // Mirror horizontally (selfie mode)
        ctx.translate(offscreen.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0);
        const dataUrl = offscreen.toDataURL('image/jpeg', 0.92);

        setPhotos((prev) => {
          const copy = [...prev];
          copy[slotIndex] = dataUrl;
          return copy;
        });

        stopCamera();

        if (slotIndex === 0) {
          setPhase(PHASE.PREVIEW1);
        } else {
          setPhase(PHASE.PREVIEW2);
        }
      }
    }, 1000);
  }, [stopCamera]);

  // ── Compose final image ──
  const composeFinal = useCallback(async () => {
    try {
      const [photo1Img, photo2Img, borderImg] = await Promise.all([
        loadImage(photos[0]),
        loadImage(photos[1]),
        loadImage(TEMPLATES[templateIdx].src),
      ]);

      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = CW;
      canvas.height = CH;
      const ctx = canvas.getContext('2d');

      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, CW, CH);

      // Draw photos into their slots (crop-to-fill)
      cropToFill(ctx, photo1Img, SLOTS.top.x, SLOTS.top.y, SLOTS.top.w, SLOTS.top.h);
      cropToFill(ctx, photo2Img, SLOTS.bottom.x, SLOTS.bottom.y, SLOTS.bottom.w, SLOTS.bottom.h);

      // Draw border overlay on top
      ctx.drawImage(borderImg, 0, 0, CW, CH);

      const url = canvas.toDataURL('image/png');
      setFinalDataUrl(url);
      setPhase(PHASE.RESULT);
    } catch {
      // Fallback: just go to result anyway
      setPhase(PHASE.RESULT);
    }
  }, [photos, templateIdx]);

  // ── Phase transition handlers ──
  const handleSelectTemplate = (idx) => {
    setTemplateIdx(idx);
  };

  const handleStartCamera1 = async () => {
    setPhase(PHASE.CAMERA1);
    await startCamera();
  };

  const handleCapture1 = () => runCountdownAndCapture(0);

  const handleConfirmPhoto1 = async () => {
    setPhase(PHASE.CAMERA2);
    await startCamera();
  };

  const handleRetakePhoto1 = async () => {
    setPhotos((prev) => [null, prev[1]]);
    setPhase(PHASE.CAMERA1);
    await startCamera();
  };

  const handleCapture2 = () => runCountdownAndCapture(1);

  const handleConfirmPhoto2 = () => composeFinal();

  const handleRetakePhoto2 = async () => {
    setPhotos((prev) => [prev[0], null]);
    setPhase(PHASE.CAMERA2);
    await startCamera();
  };

  const handleRetakeAll = async () => {
    stopCamera();
    setPhotos([null, null]);
    setFinalDataUrl(null);
    setPhase(PHASE.CAMERA1);
    await startCamera();
  };

  const handleDownload = () => {
    if (!finalDataUrl) return;
    const a = document.createElement('a');
    a.href = finalDataUrl;
    a.download = 'tel-urmood-photobooth.png';
    a.click();
  };

  // ── Render ──
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-mint-pale via-white to-mint-pale" />
        <div className="absolute top-[15%] left-[25%] w-[500px] h-[500px] rounded-full bg-mint/25 blur-[120px]" />
        <div className="absolute bottom-[25%] right-[10%] w-[400px] h-[400px] rounded-full bg-teal/10 blur-[100px]" />
      </div>
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle, #4f9f96 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/40">
        <div className="max-w-6xl mx-auto px-8 h-18 flex items-center justify-between">
          <img src="/logo-himpunan.png" alt="Himpunan Mahasiswa Psikologi" className="h-14" />
          <button
            type="button"
            onClick={() => { stopCamera(); navigate('/result'); }}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            {T(t.photobooth.backToResults, lang)}
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-6 py-10 md:py-14">
        {/* Title */}
        <div className="text-center max-w-md mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {T(t.photobooth.title, lang)}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            {T(t.photobooth.subtitle, lang)}
          </p>
        </div>

        {/* ════════ PHASE: SELECT TEMPLATE ════════ */}
        {phase === PHASE.SELECT && (
          <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-[28px] shadow-card-lg border border-white/60 p-8">
            <h2 className="text-sm font-semibold text-gray-700 mb-5 text-center">
              {T(t.photobooth.selectTemplate, lang)}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {TEMPLATES.map((tmpl, i) => (
                <button
                  key={tmpl.key}
                  type="button"
                  onClick={() => handleSelectTemplate(i)}
                  className={`relative rounded-2xl overflow-hidden border-3 transition-all duration-200 cursor-pointer ${
                    templateIdx === i
                      ? 'border-purple shadow-card-md scale-[1.02]'
                      : 'border-transparent hover:border-gray-200 shadow-card-sm'
                  }`}
                >
                  <img
                    src={tmpl.src}
                    alt={T(t.photobooth[`template${tmpl.key.charAt(0).toUpperCase() + tmpl.key.slice(1)}`], lang)}
                    className="w-full aspect-[9/16] object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/40 to-transparent p-3">
                    <span className="text-xs font-semibold text-white">
                      {T(t.photobooth[`template${tmpl.key.charAt(0).toUpperCase() + tmpl.key.slice(1)}`], lang)}
                    </span>
                  </div>
                  {templateIdx === i && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-purple flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleStartCamera1}
              className="w-full inline-flex items-center justify-center gap-2 bg-purple hover:bg-purple-light active:bg-purple-dark text-white rounded-full px-8 py-3.5 text-sm font-semibold shadow-card-md hover:shadow-card-lg transition-all duration-200 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              {T(t.photobooth.startCamera, lang)}
            </button>
          </div>
        )}

        {/* ════════ CAMERA ERROR ════════ */}
        {cameraError && (phase === PHASE.CAMERA1 || phase === PHASE.CAMERA2) && (
          <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-[28px] shadow-card-lg border border-white/60 p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Camera className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">{cameraError}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => { setCameraError(null); startCamera(); }}
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold bg-purple hover:bg-purple-light text-white shadow-card-sm transition-all cursor-pointer"
              >
                {T(t.photobooth.tryAgain, lang)}
              </button>
              <button
                type="button"
                onClick={() => { stopCamera(); navigate('/result'); }}
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 shadow-card-sm transition-all cursor-pointer"
              >
                {T(t.photobooth.backToResults, lang)}
              </button>
            </div>
          </div>
        )}

        {/* ════════ CAMERA LIVE VIEW (shared for photo 1 & 2) ════════ */}
        {(phase === PHASE.CAMERA1 || phase === PHASE.CAMERA2) && !cameraError && (
          <div className="w-full max-w-md">
            {/* Status badge */}
            <div className="text-center mb-4">
              <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full bg-purple-soft text-purple">
                {phase === PHASE.CAMERA1
                  ? T(t.photobooth.photo1Label, lang)
                  : T(t.photobooth.photo2Label, lang)}
              </span>
            </div>

            {/* Video container */}
            <div className="relative bg-black rounded-[24px] overflow-hidden shadow-card-lg aspect-[4/3]">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />

              {/* Branded corner watermark */}
              <div className="absolute top-3 left-3 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-[10px] font-semibold text-purple tracking-wide">Tel-UrMood</span>
              </div>

              {/* Countdown overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className="w-28 h-28 rounded-full bg-white/90 shadow-card-lg flex items-center justify-center animate-pulse">
                    <span className="text-5xl font-bold text-purple tabular-nums">{countdown}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Capture button */}
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={phase === PHASE.CAMERA1 ? handleCapture1 : handleCapture2}
                disabled={countdown !== null}
                className="group relative w-18 h-18 rounded-full bg-white border-4 border-purple shadow-card-md hover:shadow-card-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-2 rounded-full bg-purple group-hover:bg-purple-light transition-colors" />
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center mt-3">
              {countdown !== null ? T(t.photobooth.preparing, lang) : T(t.photobooth.capture, lang)}
            </p>
          </div>
        )}

        {/* ════════ PREVIEW PHOTO 1 ════════ */}
        {phase === PHASE.PREVIEW1 && photos[0] && (
          <div className="w-full max-w-md">
            <div className="text-center mb-4">
              <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full bg-teal-soft text-teal">
                {T(t.photobooth.photoTaken, lang)} {T(t.photobooth.photo1Label, lang)}
              </span>
            </div>
            <div className="rounded-[24px] overflow-hidden shadow-card-lg mb-6">
              <img src={photos[0]} alt="Photo 1" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={handleRetakePhoto1}
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 shadow-card-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {T(t.photobooth.retake, lang)}
              </button>
              <button
                type="button"
                onClick={handleConfirmPhoto1}
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold bg-purple hover:bg-purple-light text-white shadow-card-md transition-all cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                {T(t.photobooth.photo2Label, lang)}
              </button>
            </div>
          </div>
        )}

        {/* ════════ PREVIEW PHOTO 2 ════════ */}
        {phase === PHASE.PREVIEW2 && photos[1] && (
          <div className="w-full max-w-md">
            <div className="text-center mb-4">
              <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full bg-teal-soft text-teal">
                {T(t.photobooth.photoTaken, lang)} {T(t.photobooth.photo2Label, lang)}
              </span>
            </div>
            <div className="rounded-[24px] overflow-hidden shadow-card-lg mb-6">
              <img src={photos[1]} alt="Photo 2" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={handleRetakePhoto2}
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 shadow-card-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {T(t.photobooth.retake, lang)}
              </button>
              <button
                type="button"
                onClick={handleConfirmPhoto2}
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold bg-purple hover:bg-purple-light text-white shadow-card-md transition-all cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                {T(t.photobooth.finalReady, lang)}
              </button>
            </div>
          </div>
        )}

        {/* ════════ FINAL RESULT ════════ */}
        {phase === PHASE.RESULT && (
          <div className="w-full max-w-md">
            <div className="text-center mb-4">
              <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full bg-teal-soft text-teal">
                {T(t.photobooth.finalReady, lang)}
              </span>
            </div>

            {finalDataUrl ? (
              <div className="rounded-[24px] overflow-hidden shadow-card-lg mb-6 bg-white">
                <img src={finalDataUrl} alt="Photobooth result" className="w-full aspect-[9/16] object-contain" />
              </div>
            ) : (
              <div className="rounded-[24px] bg-gray-100 aspect-[9/16] mb-6 flex items-center justify-center">
                <p className="text-sm text-gray-400">Composing...</p>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold bg-purple hover:bg-purple-light text-white shadow-card-md hover:shadow-card-lg transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {T(t.photobooth.download, lang)}
              </button>
              <button
                type="button"
                onClick={handleRetakeAll}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 shadow-card-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                {T(t.photobooth.retakeAll, lang)}
              </button>
            </div>

            {/* ── Instagram sharing CTA ── */}
            <div className="mt-8 rounded-2xl border-2 border-dashed border-purple/25 bg-purple/[0.03] px-5 py-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <IgIcon className="w-5 h-5 text-purple" />
                <span className="text-sm font-bold text-purple">
                  {T(t.photobooth.igCta, lang)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                {T(t.photobooth.igInstruction, lang)}
              </p>
              <p className="text-xs text-gray-400 mb-3">{T(t.photobooth.igTagLabel, lang)}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <a
                  href="https://instagram.com/psychology.telu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-purple/10 px-4 py-2 text-sm font-semibold text-purple hover:bg-purple/20 transition-colors no-underline"
                >
                  <IgIcon className="w-4 h-4" />
                  @psychology.telu
                </a>
                <a
                  href="https://instagram.com/komunitaspsychologytel_u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-purple/10 px-4 py-2 text-sm font-semibold text-purple hover:bg-purple/20 transition-colors no-underline"
                >
                  <IgIcon className="w-4 h-4" />
                  @komunitaspsychologytel_u
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Hidden canvas for compositing */}
        <canvas ref={canvasRef} className="hidden" />
      </main>
    </div>
  );
}
