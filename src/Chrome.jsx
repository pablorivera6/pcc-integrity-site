/* global React */
function Nav({ current, onNav, lang, setLang, dark }) {
  const C = window.PCC_CONTENT[lang].nav;
  const items = [
    { id: 'home', label: C.home },
    { id: 'about', label: C.about },
    { id: 'services', label: C.services },
    { id: 'supply', label: C.supply },
    { id: 'experience', label: C.experience },
    { id: 'esg', label: C.esg },
    { id: 'contact', label: C.contact },
  ];

  const onTop = !dark;
  const fg = onTop ? 'var(--fg-2)' : 'rgba(255,255,255,0.85)';
  const fgActive = onTop ? 'var(--accent)' : '#fff';
  const border = onTop ? '1px solid var(--border)' : '1px solid rgba(255,255,255,0.08)';
  const bg = onTop ? 'rgba(255,255,255,0.96)' : 'rgba(20,24,29,0.92)';

  return (
    <nav className="pcc-nav-enter" style={{
      position: 'sticky', top: 0, zIndex: 50,
      height: 76, background: bg,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: border,
      transition: 'background 200ms var(--ease)',
    }}>
      <Container wide style={{ height: '100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap: 24 }}>
        <a onClick={() => onNav('home')} className="pcc-logo-link" style={{ display:'flex', alignItems:'center', gap: 14, cursor:'pointer', textDecoration:'none', flexShrink: 0 }}>
          <LogoMark size={42} variant={dark ? 'white' : 'red'}/>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, letterSpacing: '0.04em', color: dark ? '#fff' : 'var(--fg-1)', lineHeight: 1 }}>PCC INTEGRITY</div>
            <div style={{ fontFamily:'var(--font-body)', fontSize: 9.5, color: dark ? 'rgba(255,255,255,0.5)' : 'var(--fg-4)', letterSpacing: '0.18em', textTransform:'uppercase', marginTop: 5, fontWeight: 500 }}>{lang === 'es' ? 'Protección Catódica · 1978' : 'Cathodic Protection · 1978'}</div>
          </div>
        </a>
        <ul style={{ listStyle:'none', display:'flex', gap: 26, margin:0, padding:0, flex: 1, justifyContent:'center' }}>
          {items.map(i => (
            <li key={i.id}>
              <a onClick={() => onNav(i.id)} className="pcc-nav-link" style={{
                color: current === i.id ? fgActive : fg,
                fontSize: 13, fontWeight: current === i.id ? 600 : 500,
                cursor:'pointer', letterSpacing:'0.02em',
                position: 'relative', paddingBottom: 4,
                transition: 'color 150ms var(--ease)',
                ['--pcc-link-color']: fgActive,
                ['--pcc-link-active']: current === i.id ? 1 : 0,
              }}>{i.label}</a>
            </li>
          ))}
        </ul>
        <div style={{ display:'flex', alignItems:'center', gap: 16, flexShrink: 0 }}>
          <div style={{ display:'flex', alignItems:'center', fontSize: 12, fontWeight: 600, fontFamily:'var(--font-mono)', letterSpacing:'0.08em' }}>
            <button onClick={() => setLang('es')} style={{
              background:'none', border:'none', cursor:'pointer',
              color: lang === 'es' ? fgActive : (dark ? 'rgba(255,255,255,0.5)' : 'var(--fg-4)'),
              fontWeight: lang === 'es' ? 700 : 500, padding:'2px 6px',
            }}>ES</button>
            <span style={{ color: dark ? 'rgba(255,255,255,0.3)' : 'var(--fg-4)' }}>/</span>
            <button onClick={() => setLang('en')} style={{
              background:'none', border:'none', cursor:'pointer',
              color: lang === 'en' ? fgActive : (dark ? 'rgba(255,255,255,0.5)' : 'var(--fg-4)'),
              fontWeight: lang === 'en' ? 700 : 500, padding:'2px 6px',
            }}>EN</button>
          </div>
          <button onClick={() => onNav('contact')} className="pcc-cta-btn pcc-arrow-host" style={{
            background: 'var(--accent)', color: '#fff',
            padding: '0 20px', height: 42, borderRadius: 2,
            border: 'none', cursor: 'pointer',
            fontSize: 12.5, fontWeight: 600, letterSpacing: '0.04em',
            fontFamily: 'var(--font-body)',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            transition: 'background 150ms var(--ease), transform 150ms var(--ease)',
            position:'relative', overflow:'hidden',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-deep)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >
            {C.cta}
            <i data-lucide="arrow-right" width="14" height="14" className="pcc-arrow"></i>
          </button>
        </div>
      </Container>
    </nav>
  );
}

function Footer({ lang, onNav }) {
  const C = window.PCC_CONTENT[lang];
  const D = window.PCC_DATA;
  return (
    <footer style={{ background:'var(--pcc-ink)', color:'rgba(255,255,255,0.72)', paddingTop: 80 }}>
      <Container wide>
        <Reveal as="div" kind="fade" stagger style={{ display:'grid', gridTemplateColumns:'1.4fr repeat(3, 1fr)', gap: 56, paddingBottom: 56 }}>
          <Reveal as="div" kind="up">
            <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 20 }}>
              <LogoMark size={44} variant="white"/>
              <div>
                <div style={{ fontFamily:'var(--font-display)', fontSize: 22, fontWeight: 700, color:'#fff', letterSpacing:'0.04em', lineHeight: 1 }}>PCC INTEGRITY</div>
                <div style={{ fontSize: 10.5, letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', marginTop: 5 }}>{lang === 'es' ? 'Protección Catódica · 1978' : 'Cathodic Protection · 1978'}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 360, margin: '0 0 24px', color:'rgba(255,255,255,0.65)' }}>
              {C.footer.tagline} {lang === 'es' ? 'Más de 47 años protegiendo infraestructura crítica en Colombia, Perú y Estados Unidos.' : 'Over 47 years protecting critical infrastructure in Colombia, Peru and the United States.'}
            </p>
            <div style={{ display:'flex', gap: 12 }}>
              {['linkedin','youtube','facebook'].map(n => (
                <a key={n} href="#" className="pcc-social" style={{ width: 36, height: 36, border:'1px solid rgba(255,255,255,0.18)', display:'inline-flex', alignItems:'center', justifyContent:'center', color:'rgba(255,255,255,0.6)', transition:'all 200ms var(--ease)' }}>
                  <i data-lucide={n} width="15" height="15"></i>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal as="div" kind="up">
            <div style={{ fontSize: 11, letterSpacing:'0.18em', textTransform:'uppercase', color:'#fff', fontWeight: 600, marginBottom: 18 }}>{C.footer.services}</div>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap: 10 }}>
              {D.industries.map(it => <li key={it.id}><a onClick={() => onNav('services')} className="pcc-foot-link" style={{ color:'rgba(255,255,255,0.7)', fontSize: 13.5, cursor:'pointer', transition:'color 150ms var(--ease)' }}>{lang === 'es' ? it.esName : it.enName}</a></li>)}
            </ul>
          </Reveal>
          <Reveal as="div" kind="up">
            <div style={{ fontSize: 11, letterSpacing:'0.18em', textTransform:'uppercase', color:'#fff', fontWeight: 600, marginBottom: 18 }}>{C.footer.products}</div>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap: 10 }}>
              {D.products.map(it => <li key={it.sku}><a onClick={() => onNav('supply')} className="pcc-foot-link" style={{ color:'rgba(255,255,255,0.7)', fontSize: 13.5, cursor:'pointer', transition:'color 150ms var(--ease)' }}>{lang === 'es' ? it.esName : it.enName}</a></li>)}
            </ul>
          </Reveal>
          <Reveal as="div" kind="up">
            <div style={{ fontSize: 11, letterSpacing:'0.18em', textTransform:'uppercase', color:'#fff', fontWeight: 600, marginBottom: 18 }}>{C.footer.company}</div>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap: 10 }}>
              <li><a onClick={() => onNav('about')} style={{ color:'rgba(255,255,255,0.7)', fontSize: 13.5, cursor:'pointer' }}>{C.nav.about}</a></li>
              <li><a onClick={() => onNav('experience')} style={{ color:'rgba(255,255,255,0.7)', fontSize: 13.5, cursor:'pointer' }}>{C.nav.experience}</a></li>
              <li><a onClick={() => onNav('esg')} style={{ color:'rgba(255,255,255,0.7)', fontSize: 13.5, cursor:'pointer' }}>{C.nav.esg}</a></li>
              <li><a onClick={() => onNav('contact')} style={{ color:'rgba(255,255,255,0.7)', fontSize: 13.5, cursor:'pointer' }}>{lang === 'es' ? 'Trabaja con nosotros' : 'Careers'}</a></li>
              <li><a href="#" className="pcc-foot-link" style={{ color:'rgba(255,255,255,0.7)', fontSize: 13.5, transition:'color 150ms var(--ease)' }}>HSEQ</a></li>
            </ul>
          </Reveal>
        </Reveal>
        <div style={{ paddingTop: 24, paddingBottom: 28, borderTop:'1px solid rgba(255,255,255,0.1)', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize: 12, color:'rgba(255,255,255,0.45)', flexWrap:'wrap', gap: 16 }}>
          <span>© 1978–{new Date().getFullYear()} Protección Catódica de Colombia S.A.S. · {C.footer.rights}</span>
          <span style={{ fontFamily:'var(--font-mono)', letterSpacing:'0.06em' }}>NACE INTERNATIONAL · CP-4 · ISO 9001 · ISO 14001 · ISO 45001</span>
        </div>
      </Container>
    </footer>
  );
}

window.Nav = Nav;
window.Footer = Footer;
