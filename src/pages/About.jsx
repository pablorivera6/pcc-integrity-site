/* global React */
function AboutPage({ lang, onNav }) {
  const C = window.PCC_CONTENT[lang].about;
  const D = window.PCC_DATA;

  return <>
    <section style={{ background:'#fff', borderBottom:'1px solid var(--border)' }}>
      <Container wide style={{ padding:'120px 32px 96px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap: 80, alignItems:'start' }}>
          <Reveal kind="right">
            <Eyebrow>{C.eyebrow}</Eyebrow>
            <div style={{ fontFamily:'var(--font-mono)', fontSize: 12, color:'var(--fg-4)', letterSpacing:'0.08em', textTransform:'uppercase', marginTop: 32 }}>EST. 1978 — BOGOTÁ, COLOMBIA</div>
          </Reveal>
          <Reveal kind="up" delay={120}>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(40px, 5vw, 76px)', lineHeight: 1.04, letterSpacing:'-0.025em', margin:'0 0 32px', textWrap:'balance' }}>{C.title}</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color:'var(--fg-3)', maxWidth: 760, margin: 0 }}>{C.sub}</p>
          </Reveal>
        </div>
      </Container>
    </section>

    {/* full-bleed image — real PCC site photo, B&W */}
    <Reveal as="div" kind="clip" style={{ height:'60vh', position:'relative', overflow:'hidden', background:'#0d1015' }}>
      <img src="assets/refinery-pcc.jpg" alt="" className="pcc-hero-bg" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', filter:'grayscale(1) contrast(1.08) brightness(0.92)', display:'block' }}/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(13,16,21,0.15) 0%, rgba(13,16,21,0.45) 100%)' }}/>
    </Reveal>

    {/* MISSION / VISION */}
    <section style={{ padding:'120px 0', background:'#fff' }}>
      <Container wide>
        <Reveal as="div" kind="fade" stagger style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 4, background:'var(--border)' }}>
          <Reveal as="div" kind="right" style={{ background:'#fff', padding:'56px 48px' }}>
            <Eyebrow>{C.mission}</Eyebrow>
            <p style={{ fontFamily:'var(--font-display)', fontWeight: 500, fontSize: 26, lineHeight: 1.3, letterSpacing:'-0.005em', color:'var(--fg-1)', margin: 0, textWrap:'balance' }}>{C.missionBody}</p>
          </Reveal>
          <Reveal as="div" kind="left" style={{ background:'#fff', padding:'56px 48px' }}>
            <Eyebrow>{C.vision}</Eyebrow>
            <p style={{ fontFamily:'var(--font-display)', fontWeight: 500, fontSize: 26, lineHeight: 1.3, letterSpacing:'-0.005em', color:'var(--fg-1)', margin: 0, textWrap:'balance' }}>{C.visionBody}</p>
          </Reveal>
        </Reveal>
      </Container>
    </section>

    {/* LEMA / MOTTO */}
    <section style={{ padding:'120px 0', background:'var(--pcc-ink)', color:'#fff', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, opacity:0.18 }}>
        <IndustrialImage kind="rectifier" height="100%" dim={0.5}/>
      </div>
      <Container wide style={{ position:'relative' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap: 80 }}>
          <Reveal kind="up">
            <Eyebrow dark>{C.lemaTitle}</Eyebrow>
            <div className="pcc-float" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(80px, 12vw, 200px)', fontWeight: 700, color:'var(--accent)', lineHeight: 0.85, letterSpacing:'-0.04em' }}>PCC</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize: 32, fontStyle:'italic', color:'rgba(255,255,255,0.9)', marginTop: 8 }}>{C.lemaTag}</div>
          </Reveal>
          <Reveal kind="left" delay={150} style={{ display:'flex', alignItems:'center' }}>
            <p style={{ fontFamily:'var(--font-display)', fontWeight: 400, fontSize: 28, lineHeight: 1.4, color:'rgba(255,255,255,0.85)', margin: 0, textWrap:'balance' }}>{C.lemaBody}</p>
          </Reveal>
        </div>
      </Container>
    </section>

    {/* VALUES */}
    <section style={{ padding:'120px 0', background:'#fff' }}>
      <Container wide>
        <Reveal kind="up" style={{ marginBottom: 56 }}>
          <Eyebrow>{C.valuesEyebrow}</Eyebrow>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(36px, 4vw, 56px)', lineHeight: 1.05, letterSpacing:'-0.02em', margin: 0 }}>{C.valuesTitle}</h2>
        </Reveal>
        <Reveal as="div" kind="fade" stagger style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 4, background:'var(--border)' }}>
          {D.values.map((v, i) => (
            <Reveal as="div" kind="up" key={i} className="pcc-card-accent" style={{ background:'#fff', padding:'40px 32px', minHeight: 220 }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize: 11, color:'var(--fg-4)', letterSpacing:'0.1em', marginBottom: 24 }}>0{i+1}</div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize: 22, margin:'0 0 12px', color:'var(--fg-1)' }}>{lang === 'es' ? v.esName : v.enName}</h3>
              <p style={{ fontSize: 14, color:'var(--fg-3)', lineHeight: 1.55, margin: 0 }}>{lang === 'es' ? v.esDesc : v.enDesc}</p>
            </Reveal>
          ))}
        </Reveal>
      </Container>
    </section>

    {/* TIMELINE */}
    <section style={{ padding:'0 0 120px', background:'#fff' }}>
      <Container wide>
        <Reveal kind="up" style={{ marginBottom: 48 }}>
          <Eyebrow>{lang === 'es' ? 'TRAYECTORIA' : 'TIMELINE'}</Eyebrow>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(36px, 4vw, 56px)', lineHeight: 1.05, letterSpacing:'-0.02em', margin: 0 }}>{lang === 'es' ? '47 años de ingeniería continua.' : '47 years of continuous engineering.'}</h2>
        </Reveal>
        <Reveal as="div" kind="fade" stagger style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap: 4, background:'var(--border)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
          {[
            { y:'1978', es:'Fundación en Bogotá', en:'Founded in Bogotá' },
            { y:'1995', es:'Primer contrato Ecopetrol', en:'First Ecopetrol contract' },
            { y:'2008', es:'Apertura oficina en Lima', en:'Lima office opens' },
            { y:'2018', es:'Apertura oficina USA', en:'USA office opens' },
            { y:'2025', es:'+550 proyectos', en:'+550 projects' },
          ].map((t, i) => (
            <Reveal as="div" kind="up" key={i} style={{ background:'#fff', padding:'40px 32px', position:'relative' }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight: 700, fontSize: 32, color:'var(--accent)', letterSpacing:'-0.01em', marginBottom: 8 }}>{t.y}</div>
              <div style={{ fontSize: 14, color:'var(--fg-2)', lineHeight: 1.45 }}>{lang === 'es' ? t.es : t.en}</div>
              <Reveal as="div" kind="line" delay={i * 80} style={{ position:'absolute', left: 0, right: 0, top: 0, height: 2, background:'var(--accent)', opacity: 0.6 }}/>
            </Reveal>
          ))}
        </Reveal>
      </Container>
    </section>
  </>;
}

window.AboutPage = AboutPage;
