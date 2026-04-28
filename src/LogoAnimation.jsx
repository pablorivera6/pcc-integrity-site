/* global React */
// LogoAnimation v5 — clean, professional, no diffuse pulsing glow.
// Replaced the "breathing red aura" with:
//   - a precise horizontal SCAN LINE that sweeps over the logo (like an industrial scanner / energization sweep)
//   - corner brackets that draw in when the logo settles (engineering target reticle)
//   - a one-shot expanding ring on each scan completion (clean, no diffuse pulse)
function LogoAnimation({ height = 480, lang = 'es' }) {
  const { useEffect, useRef, useState } = React;
  const wrapRef = useRef(null);
  const [tn, setTn] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const CYCLE = 8000;
    const loop = (t) => {
      const e = (t - start) % CYCLE;
      setTn(e / CYCLE);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  // Phases
  const enterT = clamp01(tn / 0.18);
  const ringT  = clamp01((tn - 0.05) / 0.20);
  const settle = clamp01((tn - 0.18) / 0.10) * (1 - clamp01((tn - 0.94) / 0.06));

  // Two scan sweeps: top→bottom in 0.30→0.55 and 0.65→0.90
  const scans = [0.30, 0.65].map(start => {
    const dur = 0.25;
    const p = clamp01((tn - start) / dur);
    return p > 0 && p < 1 ? p : null;
  });

  // Single expanding ring at the end of each scan
  const rings = [0.55, 0.90].map(start => {
    const dur = 0.10;
    const p = clamp01((tn - start) / dur);
    return p > 0 && p < 1 ? p : null;
  });

  const minDim = Math.min(size.w, size.h);
  const markH = Math.min(minDim * 0.74, 540);
  const markW = markH * 0.727;

  const enterScale = 0.85 + enterT * 0.15;
  const enterOp = enterT;

  // Brand red filter recipe — PNG stock red ≈ #d80831, target #d50032. Almost identical, no filter needed.
  const brandTint = 'saturate(1.0)';

  // Corner bracket size for the reticle around the logo
  const reticleSize = markH * 1.05;
  const bracketLen = 22;

  return (
    <div ref={wrapRef} style={{
      position:'relative', width:'100%', height: height,
      background:'radial-gradient(ellipse at 50% 50%, #1a1f27 0%, #0d1015 55%, #06080b 100%)',
      overflow:'hidden',
    }}>
      {/* Subtle blueprint grid */}
      <svg aria-hidden style={{
        position:'absolute', inset: 0, width:'100%', height:'100%',
        opacity: 0.05, pointerEvents:'none',
      }}>
        <defs>
          <pattern id="logoGridV5" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" stroke="#fff" strokeWidth="0.5" fill="none"/>
          </pattern>
          <radialGradient id="gridFadeV5" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0"/>
            <stop offset="55%" stopColor="#fff" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
          </radialGradient>
          <mask id="gridMaskV5">
            <rect width="100%" height="100%" fill="url(#gridFadeV5)"/>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#logoGridV5)" mask="url(#gridMaskV5)"/>
      </svg>

      {/* Concentric guide rings */}
      <div aria-hidden style={{
        position:'absolute', inset: 0, display:'flex', alignItems:'center', justifyContent:'center',
        opacity: ringT * (1 - clamp01((tn - 0.94) / 0.06)),
      }}>
        <div style={{
          position:'absolute',
          width: markH * 1.30, height: markH * 1.30,
          border:'1px solid rgba(213, 0, 50,0.22)',
          borderRadius:'50%',
        }}/>
        <div style={{
          position:'absolute',
          width: markH * 1.62, height: markH * 1.62,
          border:'1px dashed rgba(255,255,255,0.10)',
          borderRadius:'50%',
          animation:'pcc-spin 90s linear infinite',
        }}/>
      </div>

      {/* Engineering reticle — corner brackets that draw in when settled */}
      <div aria-hidden style={{
        position:'absolute', left:'50%', top:'50%',
        transform:`translate(-50%, -50%) scale(${0.96 + settle * 0.04})`,
        width: reticleSize, height: reticleSize,
        opacity: settle,
        pointerEvents:'none',
      }}>
        {[
          { top: 0, left: 0, borderTop: 1, borderLeft: 1 },
          { top: 0, right: 0, borderTop: 1, borderRight: 1 },
          { bottom: 0, left: 0, borderBottom: 1, borderLeft: 1 },
          { bottom: 0, right: 0, borderBottom: 1, borderRight: 1 },
        ].map((p, i) => (
          <div key={i} style={{
            position:'absolute', width: bracketLen, height: bracketLen,
            borderTop:    p.borderTop    ? '1.5px solid rgba(213, 0, 50,0.85)' : 'none',
            borderLeft:   p.borderLeft   ? '1.5px solid rgba(213, 0, 50,0.85)' : 'none',
            borderBottom: p.borderBottom ? '1.5px solid rgba(213, 0, 50,0.85)' : 'none',
            borderRight:  p.borderRight  ? '1.5px solid rgba(213, 0, 50,0.85)' : 'none',
            top: p.top, left: p.left, bottom: p.bottom, right: p.right,
          }}/>
        ))}
      </div>

      {/* Single expanding ring on scan completion (sharp, not diffuse) */}
      {rings.map((p, i) => p === null ? null : (
        <div key={`ring-${i}`} aria-hidden style={{
          position:'absolute', left:'50%', top:'50%',
          transform:`translate(-50%, -50%) scale(${0.7 + p * 1.4})`,
          width: markH * 1.2, height: markH * 1.2,
          borderRadius:'50%',
          border:`1.5px solid rgba(213, 0, 50,${(1 - p) * 0.6})`,
          pointerEvents:'none',
        }}/>
      ))}

      {/* THE OFFICIAL LOGO PNG — clean, no breathing glow. Steady drop-shadow only. */}
      <div style={{
        position:'absolute', left:'50%', top:'50%',
        transform:`translate(-50%, -50%) scale(${enterScale})`,
        width: markW, height: markH,
        opacity: enterOp,
        transition:'none',
      }}>
        <img src="assets/logo-pcc-mark.png?v=2" alt="PCC Integrity"
          style={{
            width:'100%', height:'100%', objectFit:'contain', display:'block',
            filter: `${brandTint} drop-shadow(0 0 14px rgba(213, 0, 50,${0.35 * settle}))`,
          }}/>

        {/* SCAN LINE — sweeps top→bottom over the logo. White, sharp, with a thin trail. */}
        {scans.map((p, i) => p === null ? null : (
          <div key={`scan-${i}`} aria-hidden style={{
            position:'absolute', left: 0, right: 0,
            top: `${p * 100}%`,
            height: 2,
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 100%)',
            boxShadow: '0 0 8px rgba(255,255,255,0.6), 0 0 18px rgba(213, 0, 50,0.4)',
            pointerEvents:'none',
          }}/>
        ))}

        {/* Trailing soft band behind the scan line */}
        {scans.map((p, i) => p === null ? null : (
          <div key={`trail-${i}`} aria-hidden style={{
            position:'absolute', left: 0, right: 0,
            top: `${Math.max(0, p * 100 - 8)}%`,
            height: `${Math.min(8, p * 100)}%`,
            background: 'linear-gradient(180deg, rgba(213, 0, 50,0) 0%, rgba(213, 0, 50,0.18) 100%)',
            pointerEvents:'none',
          }}/>
        ))}
      </div>

      {/* Wordmark beneath */}
      <div style={{
        position:'absolute', left: 0, right: 0,
        bottom: `calc(50% - ${markH * 0.5 + 80}px)`,
        textAlign:'center',
        opacity: settle,
        transform: `translateY(${(1 - settle) * 14}px)`,
        pointerEvents:'none',
      }}>
        <div style={{
          display:'inline-block',
          width: Math.max(40, markH * 0.34 * settle),
          height: 1, background:'rgba(213, 0, 50,0.65)',
          marginBottom: 22,
        }}/>
        <div style={{
          fontFamily:'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(22px, 2.4vw, 36px)',
          letterSpacing: '0.18em', color: '#fff', lineHeight: 1,
        }}>PCC INTEGRITY</div>
        <div style={{
          fontFamily:'var(--font-mono)',
          fontSize: 'clamp(9px, 0.75vw, 11px)',
          letterSpacing: '0.32em', textTransform:'uppercase',
          color:'rgba(255,255,255,0.55)', marginTop: 12, fontWeight: 600,
        }}>
          {lang === 'es' ? 'Protección Catódica · Est. 1978' : 'Cathodic Protection · Est. 1978'}
        </div>
      </div>

      <style>{`
        @keyframes pcc-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function HeroBackgroundCycle({ lang = 'es' }) {
  const { useState, useEffect } = React;
  const [scene, setScene] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const durations = [8000, 9000];
    const fadeOut = 800;
    const t1 = setTimeout(() => setFading(true), durations[scene] - fadeOut);
    const t2 = setTimeout(() => {
      setFading(false);
      setScene(s => (s + 1) % 2);
    }, durations[scene]);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [scene]);

  return (
    <div style={{ position:'absolute', inset: 0, overflow:'hidden' }}>
      <div style={{
        position:'absolute', inset: 0,
        opacity: scene === 0 ? (fading ? 0 : 1) : 0,
        transition: 'opacity 800ms var(--ease)',
      }}>
        <LogoAnimation height="100%" lang={lang}/>
      </div>
      <div style={{
        position:'absolute', inset: 0,
        opacity: scene === 1 ? (fading ? 0 : 1) : 0,
        transition: 'opacity 800ms var(--ease)',
      }}>
        <CorrosionAnimation height="100%"/>
      </div>
    </div>
  );
}

window.LogoAnimation = LogoAnimation;
window.HeroBackgroundCycle = HeroBackgroundCycle;
