/* global React */
const { useState: useStateSrv } = React;

function ServicesPage({ lang, onNav, initial }) {
  const C = window.PCC_CONTENT[lang].services;
  const D = window.PCC_DATA;
  const [active, setActive] = useStateSrv(initial || D.industries[0].id);
  const ind = D.industries.find(i => i.id === active);

  return <>
    <section style={{ background:'#fff', borderBottom:'1px solid var(--border)' }}>
      <Container wide style={{ padding:'120px 32px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap: 80, alignItems:'start' }}>
          <Reveal kind="right">
            <Eyebrow>{C.eyebrow}</Eyebrow>
            <div style={{ fontFamily:'var(--font-mono)', fontSize: 12, color:'var(--fg-4)', letterSpacing:'0.08em', marginTop: 32 }}>04 {lang === 'es' ? 'INDUSTRIAS · UN EQUIPO' : 'INDUSTRIES · ONE TEAM'}</div>
          </Reveal>
          <Reveal kind="up" delay={120}>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(40px, 5vw, 76px)', lineHeight: 1.04, letterSpacing:'-0.025em', margin:'0 0 32px', textWrap:'balance' }}>{C.title}</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color:'var(--fg-3)', maxWidth: 760, margin: 0 }}>{C.sub}</p>
          </Reveal>
        </div>
      </Container>
    </section>

    {/* tabs */}
    <section style={{ background:'#fff', borderBottom:'1px solid var(--border)', position:'sticky', top: 76, zIndex: 30 }}>
      <Container wide>
        <div style={{ display:'flex', gap: 0, justifyContent:'center', flexWrap:'wrap' }}>
          {D.industries.map((i, k) => {
            const isActive = active === i.id;
            return (
              <button key={i.id} onClick={() => setActive(i.id)} style={{
                background: isActive ? 'var(--bg-2)' : 'transparent',
                border:'none', cursor:'pointer',
                padding:'22px 36px',
                fontFamily:'var(--font-body)', fontSize: 14.5, fontWeight: 600, letterSpacing:'0.01em',
                color: isActive ? 'var(--fg-1)' : 'var(--fg-3)',
                position:'relative',
                display:'flex', alignItems:'center', gap: 12,
                flexShrink: 0,
                transition:'all 200ms var(--ease)',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--fg-1)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--fg-3)'; }}
              >
                <span style={{ fontFamily:'var(--font-mono)', fontSize: 11, color: isActive ? 'var(--accent)' : 'var(--fg-4)', letterSpacing:'0.08em', fontWeight: 600 }}>0{k+1}</span>
                <i data-lucide={i.icon} width="17" height="17" style={{ color: isActive ? 'var(--accent)' : 'var(--fg-4)' }}></i>
                <span>{lang === 'es' ? i.esName : i.enName}</span>
                {isActive && <span style={{ position:'absolute', left: 0, right: 0, bottom: -1, height: 2, background:'var(--accent)' }}/>}
              </button>
            );
          })}
        </div>
      </Container>
    </section>

    {/* split detail */}
    <section style={{ background:'#fff' }}>
      <div key={active} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight: 720 }}>
        <div className="pcc-page-fade" style={{ position:'relative', animationDelay:'0ms' }}>
          {ind.photo
            ? <div style={{ position:'absolute', inset:0, overflow:'hidden', background:'#0d1015' }}>
                <img src={ind.photo} alt="" className="pcc-hero-bg" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', filter:'grayscale(1) contrast(1.08) brightness(0.9)', display:'block' }}/>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(13,16,21,0.15) 0%, rgba(13,16,21,0.55) 100%)' }}/>
              </div>
            : <IndustrialImage kind={ind.image} height="100%" dim={0.35} style={{ position:'absolute', inset:0 }}/>}
          <div style={{ position:'absolute', left: 32, bottom: 32, color:'#fff' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.7)', marginBottom: 8 }}>FIG · 0{D.industries.indexOf(ind)+1} / 04</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize: 28, fontWeight: 600, color:'#fff', letterSpacing:'-0.01em' }}>{lang === 'es' ? ind.esName : ind.enName}</div>
          </div>
        </div>
        <div className="pcc-page-fade" style={{ padding:'80px 64px', display:'flex', flexDirection:'column', justifyContent:'center', maxWidth: 720, animationDelay:'120ms' }}>
          <Eyebrow>{lang === 'es' ? 'ALCANCE TÉCNICO' : 'TECHNICAL SCOPE'}</Eyebrow>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(32px, 3.4vw, 48px)', lineHeight: 1.1, letterSpacing:'-0.02em', margin:'0 0 16px', textWrap:'balance' }}>
            {lang === 'es' ? ind.esName : ind.enName}
          </h2>
          <p style={{ fontSize: 17, color:'var(--fg-3)', lineHeight: 1.55, margin:'0 0 40px', maxWidth: 540 }}>{lang === 'es' ? ind.esSub : ind.enSub}</p>
          <ul className="pcc-stagger" style={{ listStyle:'none', padding: 0, margin: 0, borderTop:'1px solid var(--border)' }}>
            {(lang === 'es' ? ind.esItems : ind.enItems).map((it, i) => (
              <li key={i} className="pcc-page-fade" style={{ display:'grid', gridTemplateColumns:'40px 1fr', gap: 16, padding:'18px 0', borderBottom:'1px solid var(--border)', alignItems:'center', animationDelay: (200 + i * 60) + 'ms' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize: 12, color:'var(--fg-4)' }}>{String(i+1).padStart(2, '0')}</span>
                <span style={{ fontSize: 15.5, color:'var(--fg-1)', fontWeight: 500 }}>{it}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 40, display:'flex', gap: 12 }}>
            <Button variant="primary" onClick={() => onNav('contact')} icon="arrow-right">{lang === 'es' ? 'Solicitar propuesta' : 'Request a proposal'}</Button>
            <Button variant="ghost" onClick={() => onNav('experience')} icon="arrow-up-right">{lang === 'es' ? 'Ver proyectos' : 'See projects'}</Button>
          </div>
        </div>
      </div>
    </section>

    {/* methodology */}
    <section style={{ padding:'120px 0', background:'var(--bg-2)' }}>
      <Container wide>
        <Reveal kind="up" style={{ marginBottom: 56 }}>
          <Eyebrow>{lang === 'es' ? 'METODOLOGÍA' : 'METHODOLOGY'}</Eyebrow>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(36px, 4vw, 56px)', lineHeight: 1.05, letterSpacing:'-0.02em', margin: 0, maxWidth: 800 }}>{lang === 'es' ? 'Cómo trabajamos un proyecto, paso a paso.' : 'How we run a project, step by step.'}</h2>
        </Reveal>
        <Reveal as="div" kind="fade" stagger style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap: 1, background:'var(--border)', border:'1px solid var(--border)' }}>
          {[
            { es:'Levantamiento', en:'Assessment', esD:'Inspección de campo, planos, mediciones eléctricas y de suelo.', enD:'Field inspection, drawings, electrical and soil measurements.' },
            { es:'Diseño', en:'Design', esD:'Cálculo de demanda, dimensionamiento de ánodos y rectificadores.', enD:'Demand calculation, anode and rectifier sizing.' },
            { es:'Suministro', en:'Supply', esD:'Materiales certificados, fabricación o importación de equipos.', enD:'Certified materials, equipment fabrication or import.' },
            { es:'Instalación', en:'Installation', esD:'Obra civil, soldadura termoreductiva, comisionamiento.', enD:'Civil works, thermite welding, commissioning.' },
            { es:'Monitoreo', en:'Monitoring', esD:'Inspecciones periódicas CIPS/DCVG/PCM y telemetría.', enD:'Periodic CIPS/DCVG/PCM inspections and telemetry.' },
          ].map((s, i) => (
            <Reveal as="div" kind="up" key={i} className="pcc-card-accent" style={{ background:'#fff', padding:'40px 28px', minHeight: 240, position:'relative' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize: 11, color:'var(--accent)', fontWeight: 600, letterSpacing:'0.1em', marginBottom: 24 }}>STEP / 0{i+1}</div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize: 22, margin:'0 0 12px', color:'var(--fg-1)' }}>{lang === 'es' ? s.es : s.en}</h3>
              <p style={{ fontSize: 14, color:'var(--fg-3)', lineHeight: 1.55, margin: 0 }}>{lang === 'es' ? s.esD : s.enD}</p>
              {i < 4 && <i data-lucide="chevron-right" width="14" height="14" className="pcc-blink" style={{ position:'absolute', right: 8, top:'50%', color:'var(--fg-4)' }}></i>}
            </Reveal>
          ))}
        </Reveal>
      </Container>
    </section>
  </>;
}

window.ServicesPage = ServicesPage;
