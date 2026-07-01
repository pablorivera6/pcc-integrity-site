/* global React */
// Spark Gap discharge animation.
// Two electrode terminals with an insulating gap between them. In normal operation the
// gap is dark and quiet (a faint pulsing glow). Periodically a branching lightning arc
// fires ACROSS the gap — bright white core + red glow — exactly what an isolating spark
// gap does when it drains a surge to ground. Embers rise around the discharge.
// Transparent canvas so it layers behind the product photo. Matches the page's
// monochrome-with-red visual system.

function SparkGapAnimation({ accent = '#d50032' }) {
  const { useEffect, useRef } = React;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.max(1, W * dpr);
      canvas.height = Math.max(1, H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    // ── Recursive midpoint-displacement bolt generator
    const makeBolt = (x1, y1, x2, y2, displace, detail) => {
      if (displace < detail) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * displace;
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * displace;
      const a = makeBolt(x1, y1, mx, my, displace / 1.8, detail);
      const b = makeBolt(mx, my, x2, y2, displace / 1.8, detail);
      return a.concat(b.slice(1));
    };

    let strikes = [];   // active bolts
    let embers = [];

    const fire = () => {
      // gap axis runs vertically through the centre (where the device sits)
      const cx = W * 0.5;
      const topY = H * 0.20;
      const botY = H * 0.80;
      const swing = Math.min(W, H) * 0.30;

      // main discharge across the gap
      const path = makeBolt(cx, topY, cx, botY, swing, 5);
      strikes.push({ path, born: performance.now(), life: 200 + Math.random() * 120, w: 2.4 });

      // 0–2 outward branches radiating from the gap centre
      const branches = Math.random() < 0.7 ? (Math.random() < 0.5 ? 1 : 2) : 0;
      for (let i = 0; i < branches; i++) {
        const ang = (Math.random() < 0.5 ? -1 : 1) * (0.2 + Math.random() * 0.7) * Math.PI;
        const len = Math.min(W, H) * (0.28 + Math.random() * 0.22);
        const ex = cx + Math.cos(ang) * len;
        const ey = H * 0.5 + Math.sin(ang) * len * 0.6;
        strikes.push({ path: makeBolt(cx, H * 0.5, ex, ey, swing * 0.7, 6), born: performance.now(), life: 150 + Math.random() * 90, w: 1.4 });
      }

      // embers burst at the gap
      for (let i = 0; i < 18; i++) {
        embers.push({
          x: cx + (Math.random() - 0.5) * 60,
          y: H * 0.5 + (Math.random() - 0.5) * 120,
          vx: (Math.random() - 0.5) * 1.4,
          vy: -0.4 - Math.random() * 1.2,
          life: 1, size: 0.8 + Math.random() * 1.8,
        });
      }
    };

    let raf;
    let nextStrike = performance.now() + 600;
    let last = performance.now();

    const draw = (t) => {
      const dt = Math.min(40, t - last); last = t;
      ctx.clearRect(0, 0, W, H);

      const cx = W * 0.5, gapY = H * 0.5;

      // ── Ambient pulsing glow at the gap (idle state)
      const pulse = 0.10 + 0.06 * (0.5 + 0.5 * Math.sin(t * 0.003));
      const ambient = ctx.createRadialGradient(cx, gapY, 0, cx, gapY, Math.min(W, H) * 0.5);
      ambient.addColorStop(0, `rgba(213,0,50,${pulse})`);
      ambient.addColorStop(0.5, `rgba(213,0,50,${pulse * 0.35})`);
      ambient.addColorStop(1, 'rgba(213,0,50,0)');
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, W, H);

      // schedule next discharge
      if (t > nextStrike) {
        fire();
        if (Math.random() < 0.4) setTimeout(fire, 80 + Math.random() * 120); // flicker double-strike
        nextStrike = t + 1500 + Math.random() * 1700;
      }

      // ── Draw active bolts (additive)
      ctx.globalCompositeOperation = 'lighter';
      strikes = strikes.filter(s => t - s.born < s.life);
      strikes.forEach(s => {
        const age = (t - s.born) / s.life;
        const flick = (0.6 + Math.random() * 0.4) * (1 - age);   // fade + crackle
        if (flick <= 0.02) return;

        // outer red glow
        ctx.shadowColor = accent;
        ctx.shadowBlur = 18;
        ctx.strokeStyle = `rgba(213,0,50,${0.55 * flick})`;
        ctx.lineWidth = s.w * 3.2;
        ctx.lineJoin = 'round'; ctx.lineCap = 'round';
        ctx.beginPath();
        s.path.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
        ctx.stroke();

        // hot white core
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ff7d96';
        ctx.strokeStyle = `rgba(255,240,244,${0.95 * flick})`;
        ctx.lineWidth = s.w;
        ctx.beginPath();
        s.path.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
        ctx.stroke();
      });

      // bright flash at the gap while a fresh strike lives
      const fresh = strikes.find(s => t - s.born < 70);
      if (fresh) {
        const fa = 1 - (t - fresh.born) / 70;
        const flash = ctx.createRadialGradient(cx, gapY, 0, cx, gapY, Math.min(W, H) * 0.42);
        flash.addColorStop(0, `rgba(255,235,240,${0.5 * fa})`);
        flash.addColorStop(0.4, `rgba(213,0,50,${0.3 * fa})`);
        flash.addColorStop(1, 'rgba(213,0,50,0)');
        ctx.fillStyle = flash;
        ctx.fillRect(0, 0, W, H);
      }
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = 'source-over';

      // ── Embers (additive, rising)
      ctx.globalCompositeOperation = 'lighter';
      embers = embers.filter(e => e.life > 0);
      embers.forEach(e => {
        e.x += e.vx * (dt / 16);
        e.y += e.vy * (dt / 16);
        e.vy += 0.01 * (dt / 16);
        e.life -= 0.012 * (dt / 16);
        const a = Math.max(0, e.life);
        ctx.fillStyle = `rgba(255,${120 + Math.floor(80 * a)},${140},${a * 0.9})`;
        ctx.fillRect(e.x, e.y, e.size, e.size);
      });
      ctx.globalCompositeOperation = 'source-over';

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [accent]);

  return (
    <canvas ref={canvasRef} aria-hidden="true" style={{
      display: 'block', width: '100%', height: '100%', background: 'transparent',
    }}/>
  );
}

window.SparkGapAnimation = SparkGapAnimation;
