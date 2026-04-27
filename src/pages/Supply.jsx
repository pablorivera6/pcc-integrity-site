/* global React */
function SupplyPage({ lang, onNav }) {
  const C = window.PCC_CONTENT[lang].supply;
  const D = window.PCC_DATA;

  return <>
    <section style={{ background:'#fff', borderBottom:'1px solid var(--border)' }}>
      <Container wide style={{ padding:'120px 32px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap: 80, alignItems:'start' }}>
          <div>
            <Eyebrow>{C.eyebrow}</Eyebrow>
            <div style={{ fontFamily:'var(--font-mono)', fontSize: 12, color:'var(--fg-4)', letterSpacing:'0.08em', marginTop: 32 }}>{lang === 'es' ? '12 CATEGORÍAS DE PRODUCTO' : '12 PRODUCT CATEGORIES'}</div>
          </div>
          <div>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(40px, 5vw, 76px)', lineHeight: 1.04, letterSpacing:'-0.025em', margin:'0 0 32px', textWrap:'balance' }}>{C.title}</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color:'var(--fg-3)', maxWidth: 760, margin: 0 }}>{C.sub}</p>
          </div>
        </div>
      </Container>
    </section>

    {/* RECTIFIERS — featured */}
    <section style={{ padding:'120px 0', background:'#fff' }}>
      <Container wide>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'end', marginBottom: 48 }}>
          <div>
            <Eyebrow>{lang === 'es' ? 'PRODUCTO DESTACADO' : 'FEATURED'}</Eyebrow>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(36px, 4vw, 56px)', lineHeight: 1.05, letterSpacing:'-0.02em', margin: 0 }}>{C.rectifiersTitle}</h2>
            <p style={{ fontSize: 16, color:'var(--fg-3)', maxWidth: 580, marginTop: 16 }}>{C.rectifiersSub}</p>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap: 4, background:'var(--border)', border:'1px solid var(--border)' }}>
          {D.products.map((p, i) => (
            <article key={p.sku} style={{ background:'#fff', padding: 28, display:'flex', flexDirection:'column', gap: 16, minHeight: 360, cursor:'pointer', transition:'background 200ms var(--ease)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <div style={{ height: 180, background:'var(--bg-2)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--fg-3)', overflow:'hidden', position:'relative' }}>
                {p.photo
                  ? <img src={p.photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', filter:'grayscale(1) contrast(1.05) brightness(0.95)', display:'block' }}/>
                  : <i data-lucide={p.icon} width="40" height="40"></i>}
              </div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize: 10.5, color:'var(--accent)', fontWeight: 600, letterSpacing:'0.1em' }}>{p.category.toUpperCase()}</div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize: 19, margin: 0, color:'var(--fg-1)', minHeight: 50, lineHeight: 1.2 }}>{lang === 'es' ? p.esName : p.enName}</h3>
              <p style={{ fontSize: 13, color:'var(--fg-3)', lineHeight: 1.5, margin: 0, flex: 1 }}>{lang === 'es' ? p.esDesc : p.enDesc}</p>
              <div style={{ paddingTop: 12, borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <Tag>{p.sku}</Tag>
                <i data-lucide="arrow-up-right" width="14" height="14" style={{ color:'var(--fg-3)' }}></i>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>

    {/* CATEGORIES grid */}
    <section style={{ padding:'120px 0', background:'var(--bg-2)' }}>
      <Container wide>
        <div style={{ marginBottom: 48 }}>
          <Eyebrow>{C.categoriesTitle}</Eyebrow>
          <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(36px, 4vw, 56px)', lineHeight: 1.05, letterSpacing:'-0.02em', margin: 0, maxWidth: 800 }}>{lang === 'es' ? 'Todo lo que un sistema de protección catódica necesita.' : 'Everything a cathodic protection system needs.'}</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 1, background:'var(--border)', border:'1px solid var(--border)' }}>
          {D.supplyCats.map((c, i) => (
            <div key={c.id} style={{ background:'#fff', padding:'32px 28px', minHeight: 220 }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, background:'var(--bg-2)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent)' }}>
                  <i data-lucide={c.icon} width="18" height="18"></i>
                </div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize: 10.5, color:'var(--fg-4)' }}>{String(i+1).padStart(2,'0')}</div>
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize: 18, margin:'0 0 8px', color:'var(--fg-1)', lineHeight: 1.2 }}>{lang === 'es' ? c.es : c.en}</h3>
              <p style={{ fontSize: 13, color:'var(--fg-3)', lineHeight: 1.5, margin: 0 }}>{lang === 'es' ? c.esD : c.enD}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>

    {/* CTA */}
    <section style={{ padding:'120px 0', background:'#fff', borderTop:'1px solid var(--border)' }}>
      <Container wide>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 80, alignItems:'center' }}>
          <Reveal kind="right">
            <Eyebrow>{lang === 'es' ? 'COTIZACIÓN' : 'QUOTATION'}</Eyebrow>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(32px, 3.6vw, 52px)', lineHeight: 1.1, letterSpacing:'-0.02em', margin:'0 0 24px', textWrap:'balance' }}>{lang === 'es' ? '¿Necesita una lista de materiales para su proyecto?' : 'Need a bill of materials for your project?'}</h2>
            <p style={{ fontSize: 17, color:'var(--fg-3)', lineHeight: 1.6, margin:'0 0 32px' }}>{lang === 'es' ? 'Envíenos el alcance, los planos o el listado preliminar. Le devolvemos una cotización detallada con tiempos de entrega.' : 'Send us the scope, drawings or preliminary list. We will reply with a detailed quote and lead times.'}</p>
            <Button variant="primary" onClick={() => onNav('contact')} icon="arrow-right">{lang === 'es' ? 'Solicitar cotización' : 'Request a quote'}</Button>
          </Reveal>
          <Reveal kind="left" delay={150} className="pcc-img-zoom" style={{ height: 400, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <img src="assets/supply-warehouse-pcc.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.05)', display: 'block' }}/>
          </Reveal>
        </div>
      </Container>
    </section>
  </>;
}

window.SupplyPage = SupplyPage;
