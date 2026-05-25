/* global React */
function ExperiencePage({ lang, onNav }) {
  const C = window.PCC_CONTENT[lang].experience;
  const D = window.PCC_DATA;

  return <>
    <section style={{ background:'#fff', borderBottom:'1px solid var(--border)' }}>
      <Container wide style={{ padding:'120px 32px 80px' }}>
        <div className="pcc-page-header" style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap: 80, alignItems:'start' }}>
          <Reveal kind="right">
            <Eyebrow>{C.eyebrow}</Eyebrow>
            <div style={{ fontFamily:'var(--font-mono)', fontSize: 12, color:'var(--fg-4)', letterSpacing:'0.08em', marginTop: 32 }}>1978 — {new Date().getFullYear()}</div>
          </Reveal>
          <Reveal kind="up" delay={120}>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(40px, 5vw, 76px)', lineHeight: 1.04, letterSpacing:'-0.025em', margin:'0 0 32px', textWrap:'balance' }}>{C.title}</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color:'var(--fg-3)', maxWidth: 760, margin: 0 }}>{C.sub}</p>
          </Reveal>
        </div>
      </Container>
    </section>

    {/* project marquee - auto-scrolling photo + title */}
    <section style={{ background:'#fff', padding:'80px 0 120px' }}>
      <div className="pcc-marquee">
        <div className="pcc-marquee-track" style={{ gap: 32, padding:'0 16px' }}>
          {[...D.projects, ...D.projects].map((p, i) => (
            <article key={i} style={{ flex:'0 0 auto', width: 420 }}>
              <div style={{ overflow:'hidden', marginBottom: 20, aspectRatio:'4/3', background:'var(--bg-2)' }}>
                <img src={p.cover} alt={lang === 'es' ? p.esTitle : p.enTitle}
                     style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize: 20, margin: 0, color:'var(--fg-1)', letterSpacing:'-0.01em', textWrap:'balance', lineHeight: 1.25, whiteSpace:'normal' }}>
                {lang === 'es' ? p.esTitle : p.enTitle}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* certifications */}
    <section style={{ padding:'120px 0', background:'var(--bg-2)' }}>
      <Container wide>
        <div className="pcc-page-header" style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap: 80, marginBottom: 56 }}>
          <Reveal kind="right">
            <Eyebrow>{C.certTitle}</Eyebrow>
          </Reveal>
          <Reveal kind="up" delay={120}>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(32px, 3.6vw, 52px)', lineHeight: 1.05, letterSpacing:'-0.02em', margin:'0 0 16px', maxWidth: 800 }}>{lang === 'es' ? 'Sistemas de gestión certificados.' : 'Certified management systems.'}</h2>
            <p style={{ fontSize: 16, color:'var(--fg-3)', maxWidth: 640, margin: 0 }}>{C.certSub}</p>
          </Reveal>
        </div>
        <Reveal as="div" kind="fade" stagger className="pcc-grid-4" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 1, background:'var(--border)', border:'1px solid var(--border)' }}>
          {D.certs.map((c, i) => (
            <Reveal as="div" kind="up" key={i} className="pcc-card-accent" style={{ background:'#fff', padding:'40px 32px', minHeight: 200 }}>
              <i data-lucide="badge-check" width="28" height="28" style={{ color:'var(--accent)', marginBottom: 20 }}></i>
              <div style={{ fontFamily:'var(--font-display)', fontWeight: 700, fontSize: 18, color:'var(--fg-1)', marginBottom: 8, letterSpacing:'-0.005em' }}>{c.code}</div>
              <div style={{ fontSize: 13, color:'var(--fg-3)', lineHeight: 1.5, marginBottom: 16 }}>{c.desc}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize: 11, color:'var(--fg-4)', letterSpacing:'0.04em' }}>{c.no}</div>
            </Reveal>
          ))}
        </Reveal>
      </Container>
    </section>
  </>;
}

window.ExperiencePage = ExperiencePage;
