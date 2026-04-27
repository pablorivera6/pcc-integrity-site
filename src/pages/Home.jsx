/* global React */
function HomePage({ lang, onNav, setIndustry }) {
  const C = window.PCC_CONTENT[lang].home;
  const D = window.PCC_DATA;

  return <>
    {/* HERO */}
    <section data-screen-label="Home/Hero" style={{ position:'relative', minHeight: 720, background:'#0d1015', color:'#fff', overflow:'hidden' }}>
      <div className="pcc-hero-bg" style={{ position:'absolute', inset: 0 }}>
        <CorrosionAnimation height="100%"/>
      </div>
      <div style={{ position:'absolute', inset: 0, background:'linear-gradient(120deg, rgba(13,16,21,0.92) 0%, rgba(13,16,21,0.55) 55%, rgba(13,16,21,0.78) 100%)' }}/>
      <Container wide style={{ position:'relative', paddingTop: 120, paddingBottom: 96, minHeight: 720, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div style={{ maxWidth: 1080 }}>
          <div className="pcc-page-fade" style={{ animationDelay:'40ms' }}><Eyebrow dark>{C.eyebrow}</Eyebrow></div>
          <h1 className="pcc-page-fade" style={{
            fontFamily:'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(48px, 6vw, 88px)', lineHeight: 1.02, letterSpacing:'-0.025em',
            color:'#fff', margin:'0 0 32px', textWrap:'balance',
            animationDelay:'120ms',
          }}>
            {C.hTitleA} <span style={{ color: 'var(--accent)' }}>{C.hTitleB}</span> {C.hTitleC}
          </h1>
          <p className="pcc-page-fade" style={{ fontSize: 19, lineHeight: 1.55, color:'rgba(255,255,255,0.78)', maxWidth: 680, marginBottom: 40, animationDelay:'220ms' }}>
            {C.hSub}
          </p>
          <div className="pcc-page-fade" style={{ display:'flex', gap: 12, flexWrap:'wrap', animationDelay:'320ms' }}>
            <Button variant="primary" onClick={() => onNav('contact')} icon="arrow-right">{C.ctaPrimary}</Button>
            <Button variant="outlineDark" onClick={() => onNav('services')}>{C.ctaSecondary}</Button>
          </div>
        </div>
        <div className="pcc-page-fade" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop: 80, animationDelay:'500ms' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize: 11, color:'rgba(255,255,255,0.5)', letterSpacing:'0.12em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display:'inline-block' }} className="pcc-blink"/>
            {C.heroCaption}
          </div>
          <div style={{ display:'flex', gap: 32, fontSize: 11, color:'rgba(255,255,255,0.5)', letterSpacing:'0.14em', textTransform:'uppercase', fontWeight: 600 }}>
            <span>NACE CP-4</span>
            <span>ISO 9001</span>
            <span>ISO 14001</span>
            <span>ISO 45001</span>
          </div>
        </div>
      </Container>
    </section>

    {/* STAT BAND */}
    <section style={{ background:'#fff', borderBottom:'1px solid var(--border)' }}>
      <Container wide>
        <Reveal as="div" kind="fade" stagger style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)' }}>
          {[
            { num:'1978', es:'Año de fundación', en:'Founded', count: 1978 },
            { num:'+550', es:'Proyectos entregados', en:'Projects delivered', count: 550, prefix:'+' },
            { num:'3', es:'Países · CO · PE · USA', en:'Countries · CO · PE · USA', count: 3 },
            { num:'CP-4', es:'Certificación NACE Specialist', en:'NACE Specialist certification' },
          ].map((s, i) => (
            <Reveal as="div" kind="up" key={i} style={{ padding:'56px 40px', borderRight: i < 3 ? '1px solid var(--border)' : 'none', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight: 700, fontSize: 'clamp(48px, 5vw, 72px)', lineHeight: 1, letterSpacing:'-0.03em', color:'var(--fg-1)' }}>
                {s.count
                  ? <>{s.prefix && <span style={{ color:'var(--accent)' }}>{s.prefix}</span>}<CountUp to={s.count}/></>
                  : s.num}
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fg-4)', marginTop: 16 }}>{lang === 'es' ? s.es : s.en}</div>
            </Reveal>
          ))}
        </Reveal>
      </Container>
    </section>

    {/* INDUSTRIES — full bleed cards */}
    <section style={{ padding:'120px 0 0', background:'var(--bg-2)' }}>
      <Container wide style={{ marginBottom: 56 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 56, alignItems:'end' }}>
          <Reveal kind="up">
            <Eyebrow>{C.sectorEyebrow}</Eyebrow>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(36px, 4vw, 56px)', lineHeight: 1.05, letterSpacing:'-0.02em', margin: 0, textWrap:'balance' }}>
              {C.sectorTitle}
            </h2>
          </Reveal>
          <Reveal as="p" kind="up" delay={120} style={{ fontSize: 17, lineHeight: 1.6, color:'var(--fg-3)', margin: 0 }}>{C.sectorSub}</Reveal>
        </div>
      </Container>
      <Container wide>
        <Reveal as="div" kind="fade" stagger style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 4, marginBottom: 0 }}>
          {D.industries.map((ind) => (
            <Reveal as="article" kind="up" key={ind.id}
              onClick={() => { setIndustry(ind.id); onNav('services'); }}
              style={{ position:'relative', cursor:'pointer', overflow:'hidden', minHeight: 420 }}
              onMouseEnter={e => { e.currentTarget.querySelector('.ind-img').style.transform = 'scale(1.04)'; }}
              onMouseLeave={e => { e.currentTarget.querySelector('.ind-img').style.transform = 'scale(1)'; }}
            >
              <div className="ind-img" style={{ position:'absolute', inset: 0, transition:'transform 800ms var(--ease)' }}>
                <IndustrialImage kind={ind.image} height="100%" dim={0.45}/>
              </div>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(13,16,21,0.1) 0%, rgba(13,16,21,0.85) 100%)' }}/>
              <div className="pcc-arrow-host" style={{ position:'relative', height:'100%', minHeight: 420, padding: 40, display:'flex', flexDirection:'column', justifyContent:'space-between', color:'#fff' }}>
                <div style={{ width: 56, height: 56, border:'1px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', transition:'border-color 300ms var(--ease), background 300ms var(--ease)' }}>
                  <i data-lucide={ind.icon} width="24" height="24"></i>
                </div>
                <div>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom: 12 }}>0{D.industries.indexOf(ind) + 1} / 0{D.industries.length}</div>
                  <h3 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize: 36, color:'#fff', margin:'0 0 12px', letterSpacing:'-0.015em' }}>{lang === 'es' ? ind.esName : ind.enName}</h3>
                  <p style={{ fontSize: 15, color:'rgba(255,255,255,0.78)', margin:'0 0 20px', maxWidth: 460 }}>{lang === 'es' ? ind.esSub : ind.enSub}</p>
                  <div style={{ display:'inline-flex', alignItems:'center', gap: 10, fontSize: 13, fontWeight: 600, letterSpacing:'0.04em', color:'#fff', borderBottom:'1px solid var(--accent)', paddingBottom: 4 }}>
                    {lang === 'es' ? 'Ver alcance técnico' : 'See technical scope'}
                    <i data-lucide="arrow-right" width="14" height="14" className="pcc-arrow"></i>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </Reveal>
      </Container>
    </section>

    {/* SERVICE LINES */}
    <section style={{ padding:'120px 0', background:'var(--bg-2)' }}>
      <Container wide>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 56, alignItems:'end', marginBottom: 56 }}>
          <div>
            <Eyebrow>{C.lineEyebrow}</Eyebrow>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(36px, 4vw, 56px)', lineHeight: 1.05, letterSpacing:'-0.02em', margin: 0, textWrap:'balance' }}>{C.lineTitle}</h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color:'var(--fg-3)', margin: 0 }}>{C.lineSub}</p>
        </div>
        <Reveal as="div" kind="fade" stagger style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 4, background:'var(--border)' }}>
          {D.serviceLines.map((sl, i) => (
            <Reveal as="div" kind="up" key={sl.id} className="pcc-card-accent" style={{ background:'#fff', padding:'40px 32px 36px', minHeight: 280, position:'relative', display:'flex', flexDirection:'column' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, background:'var(--bg-2)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent)', transition:'transform 300ms var(--ease), background 300ms var(--ease)' }}>
                  <i data-lucide={sl.icon} width="20" height="20"></i>
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize: 11, color:'var(--fg-4)' }}>0{i+1}</div>
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize: 22, margin:'0 0 12px', color:'var(--fg-1)', letterSpacing:'-0.005em' }}>{lang === 'es' ? sl.esName : sl.enName}</h3>
              <p style={{ fontSize: 14, color:'var(--fg-3)', lineHeight: 1.55, margin: 0 }}>{lang === 'es' ? sl.esDesc : sl.enDesc}</p>
            </Reveal>
          ))}
        </Reveal>
      </Container>
    </section>

    {/* QUOTE / EDITORIAL — TRUSTED BY (impact redesign) */}
    <section style={{ padding:'100px 0 0', background:'var(--pcc-ink)', color:'#fff', position:'relative', overflow:'hidden', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
      {/* faint diagonal grid */}
      <svg aria-hidden style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity: 0.06, pointerEvents:'none' }}>
        <defs>
          <pattern id="trustGrid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M0 56 L56 0" stroke="#fff" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#trustGrid)"/>
      </svg>

      <Container wide style={{ position:'relative' }}>
        {/* Header */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap: 56, alignItems:'end', marginBottom: 56 }}>
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--accent)', fontWeight: 600, marginBottom: 16 }}>{C.proofEyebrow}</div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize: 12, color:'rgba(255,255,255,0.45)', letterSpacing:'0.08em' }}>{lang === 'es' ? '16 OPERADORES · 4 INDUSTRIAS · 3 PAÍSES' : '16 OPERATORS · 4 INDUSTRIES · 3 COUNTRIES'}</div>
          </div>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 500, fontSize:'clamp(30px, 3.2vw, 48px)', lineHeight: 1.08, letterSpacing:'-0.02em', margin: 0, textWrap:'balance', color:'#fff' }}>
            {lang === 'es'
              ? <>Los operadores de infraestructura crítica de las Américas <span style={{ color:'var(--accent)', fontStyle:'italic', fontWeight: 400 }}>confían en PCC.</span></>
              : <>The operators of critical infrastructure across the Americas <span style={{ color:'var(--accent)', fontStyle:'italic', fontWeight: 400 }}>rely on PCC.</span></>}
          </h2>
        </div>

        {/* KPI strip */}
        <Reveal as="div" kind="fade" stagger style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 0, borderTop:'1px solid rgba(255,255,255,0.12)', borderBottom:'1px solid rgba(255,255,255,0.12)', marginBottom: 64 }}>
          {[
            { count: 40, suffix:'+', es:'Años con clientes activos', en:'Years with active clients' },
            { count: 16, es:'Operadores estratégicos', en:'Strategic operators' },
            { count: 95, suffix:'%', es:'Tasa de recontratación', en:'Repeat-business rate' },
            { count: 3, es:'Países · CO · PE · USA', en:'Countries · CO · PE · USA' },
          ].map((k, i) => (
            <Reveal as="div" kind="up" key={i} style={{ padding:'28px 24px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize: 40, lineHeight: 1, letterSpacing:'-0.025em', color:'#fff' }}>
                <CountUp to={k.count} suffix={k.suffix || ''}/>
              </div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize: 10.5, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.55)', marginTop: 12 }}>{lang === 'es' ? k.es : k.en}</div>
            </Reveal>
          ))}
        </Reveal>

        {/* Wordmark grid — 4 columns, compact */}
        <Reveal as="div" kind="fade" stagger style={{
          display:'grid',
          gridTemplateColumns:'repeat(4, 1fr)',
          borderTop:'1px solid rgba(255,255,255,0.12)',
          borderLeft:'1px solid rgba(255,255,255,0.12)',
        }}>
          {['ECOPETROL','EXXONMOBIL','CHEVRON','REPSOL','CEPSA','OXY','PETROPERÚ','ENEL','PROMIGAS','HOCOL','CENIT','OCENSA','ISA','CELSIA','TGI','FRONTERA'].map((name, idx) => (
            <Reveal as="div" kind="scale" key={name}
              style={{
                position:'relative',
                padding:'28px 24px',
                borderRight:'1px solid rgba(255,255,255,0.12)',
                borderBottom:'1px solid rgba(255,255,255,0.12)',
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-between',
                minHeight: 110,
                cursor:'default',
                transition:'background 250ms var(--ease)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(229,57,53,0.08)';
                e.currentTarget.querySelector('.wm').style.color = '#fff';
                e.currentTarget.querySelector('.wm-meta').style.color = 'var(--accent)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.querySelector('.wm').style.color = 'rgba(255,255,255,0.7)';
                e.currentTarget.querySelector('.wm-meta').style.color = 'rgba(255,255,255,0.4)';
              }}
            >
              <div className="wm-meta" style={{ fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'0.16em', color:'rgba(255,255,255,0.4)', transition:'color 250ms var(--ease)' }}>
                {String(idx + 1).padStart(2, '0')} / 16
              </div>
              <div className="wm" style={{
                fontFamily:'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(18px, 1.8vw, 26px)',
                letterSpacing:'-0.01em',
                lineHeight: 1,
                color:'rgba(255,255,255,0.7)',
                transition:'color 250ms var(--ease)',
                whiteSpace:'nowrap',
                overflow:'hidden',
                textOverflow:'ellipsis',
              }}>{name}</div>
            </Reveal>
          ))}
        </Reveal>

        {/* closing band: testimonial-style statement + CTA */}
        <div style={{ padding:'56px 0 80px', display:'grid', gridTemplateColumns:'1.4fr 1fr', gap: 64, alignItems:'center' }}>
          <Reveal kind="up" style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontWeight: 400, fontSize:'clamp(18px, 1.5vw, 22px)', lineHeight: 1.4, color:'rgba(255,255,255,0.85)', textWrap:'balance' }}>
            {lang === 'es'
              ? <>“Cuatro décadas protegiendo los activos que mueven la energía y el agua de tres países —<span style={{ color:'var(--accent)', fontStyle:'normal', fontWeight: 600 }}> con la misma firma de ingeniería detrás de cada proyecto.</span>”</>
              : <>“Four decades protecting the assets that move energy and water across three countries —<span style={{ color:'var(--accent)', fontStyle:'normal', fontWeight: 600 }}> with the same engineering signature behind every project.</span>”</>}
          </Reveal>
          <Reveal kind="left" delay={150} style={{ display:'flex', justifyContent:'flex-end' }}>
            <a onClick={() => onNav('experience')} className="pcc-arrow-host pcc-underline" style={{ display:'inline-flex', alignItems:'center', gap: 12, fontFamily:'var(--font-display)', fontWeight: 500, fontSize: 16, color:'#fff', borderBottom:'1px solid var(--accent)', paddingBottom: 6, cursor:'pointer' }}>
              {lang === 'es' ? 'Ver portafolio de proyectos' : 'See project portfolio'}
              <i data-lucide="arrow-up-right" width="16" height="16" className="pcc-arrow"></i>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>

    {/* PROJECTS / NEWS FEED */}
    <section style={{ padding:'120px 0', background:'#fff' }}>
      <Container wide>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'end', marginBottom: 48 }}>
          <Reveal kind="up">
            <Eyebrow>{C.projEyebrow}</Eyebrow>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(36px, 4vw, 56px)', lineHeight: 1.05, letterSpacing:'-0.02em', margin: 0 }}>{C.projTitle}</h2>
          </Reveal>
          <Reveal kind="left" delay={120} className="pcc-arrow-host">
            <Button variant="ghost" onClick={() => onNav('experience')} icon="arrow-right">{C.projAll}</Button>
          </Reveal>
        </div>
        <Reveal as="div" kind="fade" stagger style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 32 }}>
          {D.projects.slice(0, 3).map((p, i) => {
            const ind = D.industries.find(x => x.id === p.sector);
            return (
              <Reveal as="article" kind="up" key={i} style={{ cursor:'pointer' }}
                onMouseEnter={e => e.currentTarget.querySelector('.proj-img').style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.querySelector('.proj-img').style.transform = 'scale(1)'}
              >
                <div style={{ overflow:'hidden', marginBottom: 24, aspectRatio:'4/3' }}>
                  <div className="proj-img" style={{ height:'100%', transition:'transform 600ms var(--ease)' }}>
                    <IndustrialImage kind={ind.image} height="100%" dim={0.35}/>
                  </div>
                </div>
                <div style={{ display:'flex', gap: 12, alignItems:'center', marginBottom: 12, fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--fg-4)' }}>
                  <span style={{ color:'var(--accent)', fontWeight: 600 }}>{lang === 'es' ? ind.esName : ind.enName}</span>
                  <span>·</span>
                  <span>{p.year}</span>
                  <span>·</span>
                  <span>{p.loc}</span>
                </div>
                <h3 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize: 24, margin:'0 0 10px', color:'var(--fg-1)', letterSpacing:'-0.01em', textWrap:'balance' }}>{p.title}</h3>
                <p style={{ fontSize: 14.5, color:'var(--fg-3)', lineHeight: 1.55, margin: 0 }}>{lang === 'es' ? p.esScope : p.enScope}</p>
              </Reveal>
            );
          })}
        </Reveal>
      </Container>
    </section>

    {/* BIG CTA */}
    <section style={{ background:'var(--pcc-ink)', color:'#fff', position:'relative', overflow:'hidden' }}>
      <div className="pcc-hero-bg" style={{ position:'absolute', inset:0, opacity: 0.25 }}>
        <IndustrialImage kind="pipeline" height="100%" dim={0.5}/>
      </div>
      <Container wide style={{ position:'relative', padding:'140px 32px' }}>
        <Reveal kind="up" style={{ maxWidth: 1100 }}>
          <Eyebrow dark>{lang === 'es' ? 'CONTACTO DIRECTO' : 'DIRECT LINE'}</Eyebrow>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(40px, 5vw, 76px)', lineHeight: 1.05, letterSpacing:'-0.025em', margin:'0 0 28px', color:'#fff', textWrap:'balance' }}>
            {C.ctaBig}
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color:'rgba(255,255,255,0.72)', maxWidth: 680, marginBottom: 40 }}>{C.ctaBigSub}</p>
          <div style={{ display:'flex', gap: 12, flexWrap:'wrap' }}>
            <Button variant="primary" onClick={() => onNav('contact')} icon="arrow-right">{lang === 'es' ? 'Iniciar conversación' : 'Start conversation'}</Button>
            <Button variant="outlineDark" onClick={() => onNav('experience')}>{lang === 'es' ? 'Ver casos de estudio' : 'See case studies'}</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  </>;
}

window.HomePage = HomePage;
