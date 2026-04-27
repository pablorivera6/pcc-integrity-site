/* global React */
/* PCC Integrity — Animation primitives
   - <Reveal> wraps content for scroll-reveal via IntersectionObserver
   - <CountUp> animates a number to a target value
   - <Marquee> infinite horizontal scroll
   - useReveal() observer hook used internally
*/

const { useEffect, useRef, useState, Children, cloneElement, isValidElement } = React;

// Single shared observer
let _io = null;
function _getIO() {
  if (_io) return _io;
  if (typeof IntersectionObserver === 'undefined') return null;
  _io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        _io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  return _io;
}

function Reveal({ as = 'div', kind = 'up', delay = 0, stagger = false, style, className = '', children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = _getIO();
    if (!io) { el.classList.add('is-in'); return; }
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      data-reveal={kind}
      style={{ '--reveal-delay': delay + 'ms', ...style }}
      className={(stagger ? 'pcc-stagger ' : '') + className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Auto-reveal helper: scans the page for [data-auto-reveal] elements after route changes
function useAutoReveal(deps = []) {
  useEffect(() => {
    const io = _getIO();
    if (!io) return;
    const els = document.querySelectorAll('[data-reveal]:not(.is-in)');
    els.forEach(el => io.observe(el));
    // also re-trigger if items already in viewport at mount
    requestAnimationFrame(() => {
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
      });
    });
  }, deps);
}

function CountUp({ to, duration = 1400, prefix = '', suffix = '', format, style, className }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(to * eased);
            if (t < 1) requestAnimationFrame(animate);
            else setVal(to);
          };
          requestAnimationFrame(animate);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const display = format ? format(val) : Math.round(val).toString();
  return <span ref={ref} style={style} className={className}>{prefix}{display}{suffix}</span>;
}

function Marquee({ children, speed = 60, style, className = '' }) {
  return (
    <div className={'pcc-marquee ' + className} style={style}>
      <div className="pcc-marquee-track" style={{ animationDuration: speed + 's' }}>
        <div style={{ display:'inline-flex' }}>{children}</div>
        <div style={{ display:'inline-flex' }} aria-hidden>{children}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Reveal, CountUp, Marquee, useAutoReveal });
