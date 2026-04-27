/* global React */
const { useState, useEffect, useRef } = React;

// ---------- Shared primitives ----------
function Container({ children, style, wide }) {
  return (
    <div style={{
      maxWidth: wide ? 1440 : 1280, margin: '0 auto',
      padding: '0 32px',
      ...style
    }}>{children}</div>
  );
}

function Eyebrow({ children, color, dark, style }) {
  return (
    <div style={{
      fontFamily: 'var(--font-body)',
      fontSize: 11.5, fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: color || (dark ? 'rgba(255,255,255,0.68)' : 'var(--accent)'),
      marginBottom: 16,
      display: 'inline-flex', alignItems: 'center', gap: 10,
      ...style,
    }}>
      <span style={{ width: 18, height: 1, background: 'currentColor', opacity: 0.5 }}/>
      {children}
    </div>
  );
}

function Button({ variant = 'primary', size = 'md', children, onClick, icon, iconLeft, style, full }) {
  const base = {
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: size === 'sm' ? 12.5 : 13.5,
    padding: size === 'sm' ? '8px 16px' : '13px 22px',
    borderRadius: 2,
    border: '1px solid transparent',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    transition: 'background 150ms var(--ease), color 150ms var(--ease), border-color 150ms var(--ease), transform 150ms var(--ease)',
    display: full ? 'flex' : 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 10,
    width: full ? '100%' : undefined,
  };
  const variants = {
    primary:   { background: 'var(--accent)', color: '#fff' },
    secondary: { background: 'transparent', color: 'var(--fg-1)', borderColor: 'var(--pcc-ink)' },
    ghost:     { background: 'transparent', color: 'var(--fg-1)' },
    onDark:    { background: '#fff', color: 'var(--fg-1)' },
    outlineDark:{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' },
    outlineRed:{ background: 'transparent', color: 'var(--accent)', borderColor: 'var(--accent)' },
  };
  return (
    <button
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={e => {
        if (variant === 'primary') e.currentTarget.style.background = 'var(--accent-deep)';
        if (variant === 'secondary') { e.currentTarget.style.background = 'var(--pcc-ink)'; e.currentTarget.style.color = '#fff'; }
        if (variant === 'ghost') e.currentTarget.style.background = 'var(--bg-2)';
        if (variant === 'outlineRed') { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }
        if (variant === 'outlineDark') { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--pcc-ink)'; e.currentTarget.style.borderColor = '#fff'; }
      }}
      onMouseLeave={e => {
        Object.assign(e.currentTarget.style, base, variants[variant], style || {});
      }}
    >
      {iconLeft && <i data-lucide={iconLeft} width="16" height="16"></i>}
      {children}
      {icon && <i data-lucide={icon} width="16" height="16"></i>}
    </button>
  );
}

function Tag({ children, dark }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 10.5,
      background: dark ? 'rgba(255,255,255,0.1)' : 'var(--bg-3)',
      color: dark ? 'rgba(255,255,255,0.8)' : 'var(--fg-2)',
      padding: '4px 10px', borderRadius: 2, letterSpacing: '0.04em',
      textTransform: 'uppercase', fontWeight: 500,
    }}>{children}</span>
  );
}

function LogoMark({ size = 32, variant = 'red' }) {
  const src = variant === 'white'
    ? 'assets/logo-pcc-inverted.png'
    : 'assets/logo-pcc-mark.png';
  return <img src={src} alt="PCC Integrity" style={{ height: size, width: 'auto', display: 'block' }}/>;
}

// ---------- Stock-like placeholder image — industrial B/W feel ----------
function IndustrialImage({ kind, height, style, label, dim = 0.55 }) {
  // kind: pipeline | marine | power | industrial | refinery | rectifier | welder | offshore | soil | inspection
  const scenes = {
    pipeline: { c1:'#3a3f48', c2:'#1a1e24', accent:'#8a9099' },
    marine:   { c1:'#3c4751', c2:'#1c2229', accent:'#6f7a85' },
    power:    { c1:'#323841', c2:'#181c22', accent:'#7a8290' },
    industrial:{ c1:'#3a3e44', c2:'#1a1d22', accent:'#808892' },
    refinery: { c1:'#2f333a', c2:'#15181d', accent:'#6c7480' },
    rectifier:{ c1:'#2c3238', c2:'#13161b', accent:'#6f7885' },
    welder:   { c1:'#42352c', c2:'#1a1410', accent:'#d08a3a' },
    offshore: { c1:'#3a4651', c2:'#1b232c', accent:'#7d8894' },
    soil:     { c1:'#423a30', c2:'#1d1914', accent:'#9a8770' },
    inspection:{c1:'#363b42', c2:'#171b21', accent:'#848b95' },
  };
  const s = scenes[kind] || scenes.pipeline;
  const seed = kind.length;

  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: `linear-gradient(160deg, ${s.c1} 0%, ${s.c2} 100%)`,
      height, ...style,
    }}>
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{ display:'block', position:'absolute', inset:0, filter:'grayscale(0.6) contrast(1.05)' }}>
        <defs>
          <linearGradient id={`sky-${kind}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.c1} stopOpacity="0.6"/>
            <stop offset="100%" stopColor={s.c2} stopOpacity="1"/>
          </linearGradient>
          <pattern id={`hatch-${kind}`} width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M0 6 L6 0" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="800" height="500" fill={`url(#sky-${kind})`}/>
        <rect width="800" height="500" fill={`url(#hatch-${kind})`}/>

        {kind === 'pipeline' && <>
          {/* horizon + ground */}
          <rect x="0" y="0" width="800" height="320" fill={`url(#sky-${kind})`} opacity="0.6"/>
          <path d="M0 320 L800 320 L800 500 L0 500 Z" fill="rgba(28,30,34,0.85)"/>
          <path d="M0 320 L800 320" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6"/>
          {/* distant tank farm on horizon */}
          <g fill="rgba(20,22,26,0.9)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6">
            <rect x="540" y="282" width="48" height="38"/>
            <ellipse cx="564" cy="282" rx="24" ry="5" fill="rgba(40,44,50,0.9)"/>
            <rect x="600" y="290" width="36" height="30"/>
            <ellipse cx="618" cy="290" rx="18" ry="4" fill="rgba(40,44,50,0.9)"/>
            <rect x="648" y="286" width="42" height="34"/>
            <ellipse cx="669" cy="286" rx="21" ry="5" fill="rgba(40,44,50,0.9)"/>
          </g>
          {/* large foreground pipeline running diagonally with strong perspective */}
          <g>
            {/* pipe shadow */}
            <path d="M-20 410 Q400 380 820 290 L820 340 Q400 430 -20 460 Z" fill="rgba(0,0,0,0.55)"/>
            {/* main pipe body */}
            <path d="M-20 400 Q400 370 820 280 L820 320 Q400 410 -20 440 Z" fill="#3a3f47"/>
            {/* top highlight */}
            <path d="M-20 400 Q400 370 820 280" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none"/>
            <path d="M-20 405 Q400 375 820 285" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none"/>
            {/* bottom shade */}
            <path d="M-20 440 Q400 410 820 320" stroke="rgba(0,0,0,0.5)" strokeWidth="2" fill="none"/>
            {/* weld seams across the pipe */}
            {[80, 220, 360, 500, 640].map((x, i) => {
              // approximate y based on curve
              const t = (x + 20) / 840;
              const yTop = 400 + (280 - 400) * (t * t * 0.9 + t * 0.1);
              const yBot = 440 + (320 - 440) * (t * t * 0.9 + t * 0.1);
              return <ellipse key={i} cx={x} cy={(yTop+yBot)/2} rx={3} ry={(yBot-yTop)/2 + 2} fill="rgba(255,255,255,0.08)" stroke="rgba(0,0,0,0.4)" strokeWidth="0.8"/>;
            })}
          </g>
          {/* anode + CP marker */}
          <g>
            <rect x="220" y="430" width="60" height="14" fill={s.accent} opacity="0.85" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6"/>
            <line x1="250" y1="430" x2="250" y2="395" stroke={s.accent} strokeWidth="1.5"/>
            <circle cx="250" cy="392" r="4" fill={s.accent}/>
          </g>
        </>}

        {kind === 'marine' && <>
          {/* sky */}
          <rect x="0" y="0" width="800" height="280" fill={`url(#sky-${kind})`}/>
          {/* horizon line + distant ship */}
          <line x1="0" y1="280" x2="800" y2="280" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6"/>
          <g fill="rgba(20,22,26,0.85)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5">
            <path d="M540 268 L640 268 L630 278 L550 278 Z"/>
            <rect x="568" y="252" width="32" height="16"/>
            <rect x="582" y="244" width="10" height="8"/>
          </g>
          {/* sea */}
          <path d="M0 280 L800 280 L800 500 L0 500 Z" fill="rgba(28,38,48,0.85)"/>
          <g stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" fill="none">
            <path d="M0 310 Q150 305 300 310 T600 310 T800 308"/>
            <path d="M0 340 Q200 334 400 340 T800 338"/>
            <path d="M0 380 Q180 372 360 380 T720 378 T800 376"/>
          </g>
          {/* offshore platform/jetty deck */}
          <g>
            <rect x="80" y="240" width="640" height="14" fill="#2a2e33" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6"/>
            {/* deck rail */}
            <g stroke="rgba(255,255,255,0.3)" strokeWidth="0.6">
              <line x1="80" y1="240" x2="720" y2="240"/>
              <line x1="80" y1="232" x2="720" y2="232"/>
              {Array.from({length: 32}).map((_, i) => <line key={i} x1={90 + i*20} y1="232" x2={90 + i*20} y2="240"/>)}
            </g>
          </g>
          {/* steel piles into water */}
          {Array.from({length: 9}).map((_, i) => {
            const x = 110 + i * 75;
            return <g key={i}>
              <rect x={x-6} y={254} width={12} height={210} fill="#1c2026" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6"/>
              {/* waterline corrosion band */}
              <rect x={x-7} y={300} width={14} height={18} fill={s.accent} opacity="0.45"/>
              {/* anode bracelet underwater */}
              <rect x={x-9} y={360} width={18} height={8} fill="#7a8590" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4"/>
            </g>;
          })}
        </>}

        {kind === 'power' && <>
          {/* sky */}
          <rect x="0" y="0" width="800" height="380" fill={`url(#sky-${kind})`} opacity="0.7"/>
          <path d="M0 380 L800 380 L800 500 L0 500 Z" fill="rgba(26,30,36,0.85)"/>
          {/* lattice transmission tower (clear silhouette) */}
          <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" fill="none" strokeLinecap="square">
            {/* main legs */}
            <path d="M180 380 L260 80 L340 380"/>
            <path d="M210 380 L260 80 L310 380"/>
            {/* horizontal cross arms */}
            <path d="M180 140 L340 140"/>
            <path d="M160 200 L360 200"/>
            <path d="M150 260 L370 260"/>
            <path d="M140 320 L380 320"/>
            {/* lattice X braces */}
            {[140, 200, 260, 320].map((y, i) => <g key={i}>
              <path d={`M${200 + (380-y)*0.05} ${y} L${320 - (380-y)*0.05} ${y+60}`}/>
              <path d={`M${320 - (380-y)*0.05} ${y} L${200 + (380-y)*0.05} ${y+60}`}/>
            </g>)}
            {/* insulators */}
            <g strokeWidth="2">
              <line x1="200" y1="140" x2="200" y2="158"/>
              <line x1="320" y1="140" x2="320" y2="158"/>
              <line x1="180" y1="200" x2="180" y2="220"/>
              <line x1="340" y1="200" x2="340" y2="220"/>
            </g>
          </g>
          {/* 2nd smaller tower further away */}
          <g stroke="rgba(255,255,255,0.3)" strokeWidth="0.9" fill="none">
            <path d="M580 380 L630 160 L680 380"/>
            <path d="M600 380 L630 160 L660 380"/>
            <path d="M580 220 L680 220"/>
            <path d="M572 260 L688 260"/>
            <path d="M564 300 L696 300"/>
          </g>
          {/* power lines sweeping across */}
          <g stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" fill="none">
            <path d="M200 158 Q420 200 600 178"/>
            <path d="M260 158 Q420 220 630 178"/>
            <path d="M320 158 Q420 240 660 178"/>
          </g>
          {/* small substation in distance */}
          <g stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" fill="rgba(20,22,26,0.8)">
            <rect x="430" y="350" width="90" height="30"/>
            <line x1="438" y1="350" x2="438" y2="335"/>
            <line x1="450" y1="350" x2="450" y2="335"/>
            <line x1="462" y1="350" x2="462" y2="335"/>
          </g>
        </>}

        {kind === 'industrial' && <>
          {/* sky */}
          <rect x="0" y="0" width="800" height="360" fill={`url(#sky-${kind})`} opacity="0.7"/>
          <path d="M0 360 L800 360 L800 500 L0 500 Z" fill="rgba(26,28,32,0.9)"/>
          {/* big storage tanks (very recognizable) */}
          <g stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="rgba(45,50,58,0.95)">
            {/* tank 1 large */}
            <ellipse cx="180" cy="200" rx="120" ry="22" fill="rgba(60,66,74,1)"/>
            <rect x="60" y="200" width="240" height="160"/>
            <ellipse cx="180" cy="360" rx="120" ry="14" fill="rgba(20,22,26,1)"/>
            {/* tank bands */}
            <line x1="60" y1="240" x2="300" y2="240"/>
            <line x1="60" y1="280" x2="300" y2="280"/>
            <line x1="60" y1="320" x2="300" y2="320"/>
            {/* stairs spiral */}
            <path d="M300 360 L300 200" strokeWidth="1.2"/>
            {Array.from({length: 8}).map((_, i) => <line key={i} x1="300" y1={360 - i*22} x2="320" y2={360 - i*22 - 4} strokeWidth="0.6"/>)}

            {/* tank 2 medium */}
            <ellipse cx="450" cy="240" rx="80" ry="16" fill="rgba(60,66,74,1)"/>
            <rect x="370" y="240" width="160" height="120"/>
            <ellipse cx="450" cy="360" rx="80" ry="10" fill="rgba(20,22,26,1)"/>
            <line x1="370" y1="280" x2="530" y2="280"/>
            <line x1="370" y1="320" x2="530" y2="320"/>

            {/* tank 3 small */}
            <ellipse cx="640" cy="270" rx="60" ry="13" fill="rgba(60,66,74,1)"/>
            <rect x="580" y="270" width="120" height="90"/>
            <ellipse cx="640" cy="360" rx="60" ry="8" fill="rgba(20,22,26,1)"/>
            <line x1="580" y1="305" x2="700" y2="305"/>
            <line x1="580" y1="335" x2="700" y2="335"/>
          </g>
          {/* connecting pipework foreground */}
          <g stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none">
            <path d="M0 420 L260 420 L260 380 L420 380 L420 420 L580 420 L580 390 L800 390"/>
          </g>
          <g stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none">
            <path d="M0 432 L800 432"/>
          </g>
          {/* small CP marker */}
          <g>
            <rect x="320" y="445" width="40" height="10" fill={s.accent} opacity="0.85"/>
            <line x1="340" y1="445" x2="340" y2="430" stroke={s.accent} strokeWidth="1.4"/>
          </g>
        </>}

        {kind === 'refinery' && <>
          <g stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="rgba(25,28,33,0.7)">
            {[[80,200,50,260],[150,230,40,230],[220,180,55,280],[300,210,42,250],[370,160,60,300],[460,200,48,260],[540,180,52,280],[620,220,44,240],[700,190,50,270]].map(([x,y,w,h],i) => (
              <g key={i}>
                <rect x={x} y={y} width={w} height={h}/>
                <ellipse cx={x + w/2} cy={y} rx={w/2} ry={8} fill="rgba(20,22,26,0.9)"/>
              </g>
            ))}
          </g>
          <g stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" fill="none">
            <path d="M0 400 L800 400"/>
            <path d="M0 430 L800 430"/>
            <path d="M0 460 L800 460"/>
          </g>
        </>}

        {kind === 'rectifier' && <>
          <rect x="280" y="120" width="240" height="300" fill="rgba(30,34,40,0.85)" stroke="rgba(255,255,255,0.3)"/>
          <rect x="310" y="150" width="180" height="140" fill="rgba(15,18,22,0.9)"/>
          <g stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" fill="none">
            {Array.from({length: 8}).map((_,i) => <line key={i} x1="320" y1={160 + i*16} x2="480" y2={160 + i*16}/>)}
          </g>
          <circle cx="340" cy="320" r="14" fill={s.accent} opacity="0.7"/>
          <circle cx="400" cy="320" r="14" fill="#8a9099" opacity="0.6"/>
          <circle cx="460" cy="320" r="14" fill="#5a6069" opacity="0.5"/>
          <rect x="320" y="360" width="160" height="30" fill="rgba(20,22,26,0.9)" stroke="rgba(255,255,255,0.2)"/>
        </>}

        {kind === 'offshore' && <>
          <g stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="rgba(25,28,33,0.8)">
            <rect x="250" y="100" width="300" height="180"/>
            <line x1="250" y1="280" x2="200" y2="460"/>
            <line x1="380" y1="280" x2="370" y2="460"/>
            <line x1="420" y1="280" x2="430" y2="460"/>
            <line x1="550" y1="280" x2="600" y2="460"/>
            <line x1="200" y1="370" x2="600" y2="370"/>
            <line x1="210" y1="420" x2="590" y2="420"/>
            <rect x="350" y="40" width="30" height="60"/>
            <rect x="420" y="60" width="30" height="40"/>
          </g>
          <path d="M0 440 L800 440 L800 500 L0 500 Z" fill="rgba(20,22,26,0.7)"/>
        </>}

        {kind === 'welder' && <>
          <g fill="rgba(25,28,33,0.8)" stroke="rgba(255,255,255,0.25)" strokeWidth="1">
            <ellipse cx="400" cy="280" rx="90" ry="120"/>
            <ellipse cx="400" cy="190" rx="40" ry="45"/>
          </g>
          <circle cx="400" cy="320" r="40" fill={s.accent} opacity="0.5"/>
          <circle cx="400" cy="320" r="20" fill="#ffb060" opacity="0.9"/>
          <g stroke={s.accent} strokeWidth="0.6" opacity="0.5">
            {Array.from({length: 16}).map((_,i) => {
              const a = (i / 16) * Math.PI * 2;
              return <line key={i} x1={400} y1={320} x2={400 + Math.cos(a)*140} y2={320 + Math.sin(a)*140}/>;
            })}
          </g>
        </>}

        {kind === 'soil' && <>
          <path d="M0 200 L800 200 L800 500 L0 500 Z" fill="rgba(55,45,35,0.7)"/>
          <path d="M0 200 Q200 190 400 210 T800 200" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none"/>
          <rect x="100" y="280" width="600" height="24" fill="rgba(30,28,24,0.9)" stroke={s.accent} strokeWidth="0.8"/>
          <circle cx="200" cy="400" r="30" fill={s.accent} opacity="0.4"/>
          <circle cx="500" cy="410" r="30" fill={s.accent} opacity="0.4"/>
          <g stroke={s.accent} strokeWidth="0.8" strokeDasharray="4 3" fill="none" opacity="0.6">
            <path d="M200 370 L300 304"/>
            <path d="M500 380 L450 304"/>
          </g>
        </>}

        {kind === 'inspection' && <>
          <g stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="rgba(25,28,33,0.8)">
            <path d="M0 350 L800 350 L800 500 L0 500 Z"/>
            <rect x="100" y="200" width="600" height="40" fill="rgba(40,45,52,0.9)" stroke={s.accent} strokeWidth="0.6"/>
          </g>
          <g fill="rgba(30,34,40,0.85)" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
            <rect x="340" y="260" width="24" height="70"/>
            <circle cx="352" cy="250" r="16"/>
          </g>
          <g stroke={s.accent} strokeWidth="0.5" fill="none" opacity="0.6" strokeDasharray="3 3">
            <path d="M352 250 L352 210"/>
            <path d="M352 250 L400 180"/>
          </g>
        </>}

        {/* overlay dimming */}
        <rect width="800" height="500" fill={`rgba(20,22,26,${dim})`}/>
      </svg>
      {label && (
        <div style={{
          position:'absolute', left: 16, bottom: 12,
          fontFamily:'var(--font-mono)', fontSize: 11,
          color:'rgba(255,255,255,0.6)', letterSpacing:'0.08em',
          textTransform:'uppercase',
        }}>{label}</div>
      )}
    </div>
  );
}

Object.assign(window, { Container, Eyebrow, Button, Tag, LogoMark, IndustrialImage });
