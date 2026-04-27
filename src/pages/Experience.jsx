/* global React */
function ExperiencePage({ lang, onNav }) {
  const C = window.PCC_CONTENT[lang].experience;
  const D = window.PCC_DATA;
  const { useState } = React;
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? D.projects : D.projects.filter(p => p.sector === filter);

  return <>
    <section style={{ background:'#fff', borderBottom:'1px solid var(--border)' }}>
      <Container wide style={{ padding:'120px 32px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap: 80, alignItems:'start' }}>
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

    {/* filter bar */}
    <section style={{ background:'#fff', borderBottom:'1px solid var(--border)', position:'sticky', top: 76, zIndex: 30 }}>
      <Container wide>
        <div style={{ display:'flex', gap: 0, alignItems:'center' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize: 11, color:'var(--fg-4)', letterSpacing:'0.1em', textTransform:'uppercase', marginRight: 24 }}>{lang === 'es' ? 'FILTRAR ·' : 'FILTER ·'}</span>
          {[{id:'all', es:'Todos', en:'All'}, ...D.industries.map(i => ({id:i.id, es:i.esName, en:i.enName}))].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              background:'transparent', border:'none', cursor:'pointer',
              padding:'20px 18px',
              fontSize: 13.5, fontWeight: 600, letterSpacing:'0.02em',
              color: filter === f.id ? 'var(--fg-1)' : 'var(--fg-3)',
              borderBottom: filter === f.id ? '2px solid var(--accent)' : '2px solid transparent',
            }}>{lang === 'es' ? f.es : f.en}</button>
          ))}
        </div>
      </Container>
    </section>

    {/* project list - editorial feed */}
    <section style={{ background:'#fff' }}>
      <Container wide>
        {filtered.map((p, i) => {
          const ind = D.industries.find(x => x.id === p.sector);
          const reverse = i % 2 === 1;
          return (
            <Reveal as="article" kind="up" key={p.title + i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 0, borderBottom:'1px solid var(--border)' }}>
              <div className="pcc-img-zoom" style={{ order: reverse ? 2 : 1, minHeight: 480, overflow:'hidden' }}>
                <IndustrialImage kind={ind.image} height="100%" dim={0.3}/>
              </div>
              <div style={{ order: reverse ? 1 : 2, padding:'72px 64px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                <div style={{ display:'flex', gap: 16, alignItems:'center', marginBottom: 20, fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--fg-4)' }}>
                  <span style={{ color:'var(--accent)', fontWeight: 600 }}>{lang === 'es' ? ind.esName : ind.enName}</span>
                  <span>·</span>
                  <span>{p.year}</span>
                  <span>·</span>
                  <span>{p.loc}</span>
                </div>
                <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(28px, 3vw, 44px)', lineHeight: 1.1, letterSpacing:'-0.015em', margin:'0 0 20px', textWrap:'balance' }}>{p.title}</h2>
                <p style={{ fontSize: 17, color:'var(--fg-3)', lineHeight: 1.6, margin:'0 0 32px', maxWidth: 540 }}>{lang === 'es' ? p.esScope : p.enScope}</p>
                <div style={{ fontFamily:'var(--font-mono)', fontSize: 12, color:'var(--fg-4)' }}>CASE #{String(i+1).padStart(3, '0')}</div>
              </div>
            </Reveal>
          );
        })}
      </Container>
    </section>

    {/* certifications */}
    <section style={{ padding:'120px 0', background:'var(--bg-2)' }}>
      <Container wide>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap: 80, marginBottom: 56 }}>
          <Reveal kind="right">
            <Eyebrow>{C.certTitle}</Eyebrow>
          </Reveal>
          <Reveal kind="up" delay={120}>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(32px, 3.6vw, 52px)', lineHeight: 1.05, letterSpacing:'-0.02em', margin:'0 0 16px', maxWidth: 800 }}>{lang === 'es' ? 'Sistemas de gestión certificados.' : 'Certified management systems.'}</h2>
            <p style={{ fontSize: 16, color:'var(--fg-3)', maxWidth: 640, margin: 0 }}>{C.certSub}</p>
          </Reveal>
        </div>
        <Reveal as="div" kind="fade" stagger style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 1, background:'var(--border)', border:'1px solid var(--border)' }}>
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
