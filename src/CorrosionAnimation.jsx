/* global React */
// Corrosion → Protection animation
// A long horizontal steel surface that progressively corrodes (rust patches, pits),
// then a sweep of cathodic-protection current passes through and the metal heals back to clean steel.
// Loops continuously. Editorial, monochrome with red accent — matches the page's visual system.

function CorrosionAnimation({ height = 480 }) {
  const { useEffect, useRef, useState } = React;
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState(0); // 0 corroding, 1 protecting

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W, H;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    // Generate static noise patches (corrosion spots) — deterministic seeded
    const rand = (s) => { let x = Math.sin(s * 9301 + 49297) * 233280; return x - Math.floor(x); };
    const SPOTS = 180;
    const spots = Array.from({ length: SPOTS }, (_, i) => ({
      x: rand(i + 1),                     // 0..1 along width
      y: 0.3 + rand(i + 200) * 0.4,       // band along the pipe
      r: 4 + rand(i + 400) * 28,          // radius
      birth: rand(i + 600),               // 0..1 when in the cycle it appears
      hue: 14 + rand(i + 800) * 18,       // rust orange-red hue
      sat: 50 + rand(i + 900) * 40,
      pit: rand(i + 1100) > 0.85,         // is a deep pit
    }));

    const PARTICLES = 60;
    const particles = Array.from({ length: PARTICLES }, (_, i) => ({
      x: rand(i + 2000),
      y: 0.25 + rand(i + 2100) * 0.5,
      v: 0.4 + rand(i + 2200) * 0.6,
      life: rand(i + 2300),
      size: 1 + rand(i + 2400) * 2.5,
    }));

    let raf;
    const start = performance.now();
    const CYCLE = 9000; // ms total cycle
    const CORRODE_END = 5500;
    const PROTECT_END = 9000;

    const draw = (t) => {
      const elapsed = (t - start) % CYCLE;
      const corrodeT = Math.min(1, elapsed / CORRODE_END);
      const protectT = elapsed > CORRODE_END ? Math.min(1, (elapsed - CORRODE_END) / (PROTECT_END - CORRODE_END)) : 0;

      const newPhase = elapsed > CORRODE_END ? 1 : 0;
      // (avoid setState every frame)

      ctx.clearRect(0, 0, W, H);

      // ── BACKDROP gradient
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#14181d');
      bg.addColorStop(1, '#0a0c10');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Grid texture
      ctx.strokeStyle = 'rgba(255,255,255,0.025)';
      ctx.lineWidth = 1;
      const grid = 40;
      for (let x = 0; x < W; x += grid) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += grid) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // ── Pipe geometry
      const pipeY = H * 0.5;
      const pipeH = Math.min(H * 0.42, 220);
      const pipeTop = pipeY - pipeH / 2;
      const pipeBot = pipeY + pipeH / 2;

      // ── Pipe steel base (clean metal)
      const pipeGrad = ctx.createLinearGradient(0, pipeTop, 0, pipeBot);
      pipeGrad.addColorStop(0,    '#2c3138');
      pipeGrad.addColorStop(0.18, '#5a6068');
      pipeGrad.addColorStop(0.45, '#8a9098');
      pipeGrad.addColorStop(0.55, '#8a9098');
      pipeGrad.addColorStop(0.82, '#3e434a');
      pipeGrad.addColorStop(1,    '#1f2329');
      ctx.fillStyle = pipeGrad;
      ctx.fillRect(0, pipeTop, W, pipeH);

      // brushed steel highlight
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 80; i++) {
        const yy = pipeTop + rand(i + 5000) * pipeH;
        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.lineTo(W, yy + (rand(i + 6000) - 0.5) * 4);
        ctx.stroke();
      }
      ctx.restore();

      // weld seams every X
      ctx.strokeStyle = 'rgba(0,0,0,0.45)';
      ctx.lineWidth = 1.5;
      const segs = 5;
      for (let i = 1; i < segs; i++) {
        const x = (W / segs) * i;
        ctx.beginPath();
        ctx.moveTo(x, pipeTop);
        ctx.lineTo(x, pipeBot);
        ctx.stroke();
      }

      // top edge highlight
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fillRect(0, pipeTop, W, 1);
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, pipeBot - 1, W, 1);

      // ── CORROSION patches — appear progressively, fade out during protection
      ctx.save();
      // clip to pipe so corrosion stays on metal
      ctx.beginPath();
      ctx.rect(0, pipeTop, W, pipeH);
      ctx.clip();

      spots.forEach((s) => {
        const visible = s.birth < corrodeT ? 1 : 0;
        if (!visible) return;
        // age relative to when it was born
        const age = (corrodeT - s.birth) / (1 - s.birth);
        let alpha = Math.min(1, age * 2.5);
        // during protect phase, healing sweeps left → right
        if (protectT > 0) {
          const sweepX = protectT;
          // distance of this spot from sweep line (in normalized space)
          const dist = s.x - sweepX;
          if (dist < 0) {
            // already swept — fade out smoothly
            alpha *= Math.max(0, 1 + dist * 6);
          } else if (dist < 0.05) {
            // edge of the wave — bright glow
            alpha *= 1;
          }
        }
        if (alpha <= 0.01) return;

        const cx = s.x * W;
        const cy = pipeTop + s.y * pipeH;
        const rr = s.r;

        // outer rust halo
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        grd.addColorStop(0,    `hsla(${s.hue}, ${s.sat}%, 38%, ${alpha * 0.95})`);
        grd.addColorStop(0.45, `hsla(${s.hue + 6}, ${s.sat - 10}%, 28%, ${alpha * 0.7})`);
        grd.addColorStop(1,    `hsla(${s.hue - 4}, ${s.sat - 20}%, 18%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.fill();

        // pit (dark center) if applicable
        if (s.pit) {
          ctx.fillStyle = `rgba(8, 4, 2, ${alpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(cx, cy, rr * 0.25, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // small rust speckle texture on top of the patches
      ctx.globalAlpha = Math.min(0.6, corrodeT) * (1 - protectT * 0.9);
      for (let i = 0; i < 400; i++) {
        const x = rand(i + 7000) * W;
        const y = pipeTop + (0.25 + rand(i + 7500) * 0.5) * pipeH;
        const size = 0.8 + rand(i + 8000) * 1.2;
        ctx.fillStyle = `hsl(${10 + rand(i + 8500) * 20}, 55%, ${20 + rand(i + 9000) * 25}%)`;
        ctx.fillRect(x, y, size, size);
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // ── PROTECTION SWEEP (cathodic current wave)
      if (protectT > 0 && protectT < 1.05) {
        const sweepX = protectT * W;
        // wide soft beam
        const beam = ctx.createLinearGradient(sweepX - 220, 0, sweepX + 80, 0);
        beam.addColorStop(0,    'rgba(184, 35, 62, 0)');
        beam.addColorStop(0.6,  'rgba(184, 35, 62, 0.18)');
        beam.addColorStop(0.85, 'rgba(255, 80, 110, 0.55)');
        beam.addColorStop(1,    'rgba(255, 255, 255, 0)');
        ctx.fillStyle = beam;
        ctx.fillRect(sweepX - 220, pipeTop - 6, 300, pipeH + 12);

        // sharp leading edge
        ctx.fillStyle = 'rgba(255, 220, 230, 0.9)';
        ctx.fillRect(sweepX - 1.5, pipeTop - 4, 2, pipeH + 8);

        // halo glow above and below
        const halo = ctx.createRadialGradient(sweepX, pipeY, 0, sweepX, pipeY, pipeH * 0.9);
        halo.addColorStop(0,    'rgba(184, 35, 62, 0.35)');
        halo.addColorStop(0.5,  'rgba(184, 35, 62, 0.12)');
        halo.addColorStop(1,    'rgba(184, 35, 62, 0)');
        ctx.fillStyle = halo;
        ctx.fillRect(sweepX - pipeH, pipeTop - pipeH * 0.4, pipeH * 2, pipeH * 1.8);

        // ascending current particles around the sweep
        ctx.fillStyle = 'rgba(255, 200, 210, 0.7)';
        for (let i = 0; i < 30; i++) {
          const px = sweepX - rand(i + 11000) * 180;
          const py = pipeTop + rand(i + 12000) * pipeH;
          const sz = 0.8 + rand(i + 13000) * 1.6;
          ctx.fillRect(px, py, sz, sz);
        }
      }

      // ── Floating ION particles (always present, subtle)
      particles.forEach((p, i) => {
        p.life += 0.004 * p.v;
        if (p.life > 1) { p.life = 0; p.x = rand(i + 14000 + Math.floor(t / 100)); }
        const px = ((p.x + p.life * 0.3) % 1) * W;
        const py = pipeTop + p.y * pipeH + Math.sin(t * 0.001 + i) * 6;
        ctx.fillStyle = `rgba(255, 80, 110, ${0.15 + Math.sin(p.life * Math.PI) * 0.25})`;
        ctx.fillRect(px, py, p.size, p.size);
      });

      // ── ANODE / CATHODE schematic labels (top-left and right)
      ctx.font = '600 10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.fillText('FE — STEEL PIPELINE', 16, pipeTop - 14);
      ctx.fillStyle = 'rgba(184,35,62,0.85)';
      ctx.fillText('CP-4 · CATHODIC PROTECTION', W - 220, pipeBot + 22);

      // potential reading (animated)
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      const potential = (-0.85 - Math.sin(t * 0.002) * 0.04 - corrodeT * 0.15 + protectT * 0.18).toFixed(3);
      ctx.fillText(`E = ${potential} V (Cu/CuSO₄)`, W - 220, pipeTop - 14);

      // phase indicator dot
      const dotX = W - 30, dotY = pipeBot + 22;
      ctx.fillStyle = protectT > 0 ? '#ff6080' : `rgba(184,35,62,${0.4 + corrodeT * 0.6})`;
      ctx.beginPath();
      ctx.arc(dotX, dotY - 3, 3, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      display:'block', width:'100%', height: height, background:'#0d1015',
    }}/>
  );
}

window.CorrosionAnimation = CorrosionAnimation;
