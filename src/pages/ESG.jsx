/* global React */
function ESGPage({ lang, onNav }) {
  const C = window.PCC_CONTENT[lang].esg;
  const pillars = [
    { letter:'E', es:'Ambiental', en:'Environmental', esD:'Reducción de emisiones en obras de campo, reutilización de materiales certificados, gestión responsable de residuos peligrosos y telemetría que evita desplazamientos innecesarios.', enD:'Reduced field emissions, reuse of certified materials, responsible hazardous waste management, and telemetry that avoids unnecessary travel.', icon:'leaf' },
    { letter:'S', es:'Social', en:'Social', esD:'Capacitación técnica para profesionales locales, programas de practicantes con universidades de Bogotá, Lima y Houston, y políticas de seguridad estrictas para nuestros equipos.', enD:'Technical training for local professionals, internship programs with universities in Bogotá, Lima and Houston, and strict safety policies for our crews.', icon:'users' },
    { letter:'G', es:'Gobernanza', en:'Governance', esD:'Auditoría externa anual, código de ética para proveedores, política anti-corrupción y trazabilidad documental completa de cada proyecto entregado.', enD:'Annual external audit, supplier code of ethics, anti-corruption policy, and full documentary traceability of every project delivered.', icon:'scale' },
  ];

  return <>
    <section style={{ background:'#fff', borderBottom:'1px solid var(--border)' }}>
      <Container wide style={{ padding:'120px 32px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap: 80, alignItems:'start' }}>
          <Reveal kind="right">
            <Eyebrow>{C.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal kind="up" delay={120}>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(40px, 5vw, 76px)', lineHeight: 1.04, letterSpacing:'-0.025em', margin:'0 0 32px', textWrap:'balance' }}>{C.title}</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color:'var(--fg-3)', maxWidth: 760, margin: 0 }}>{C.sub}</p>
          </Reveal>
        </div>
      </Container>
    </section>

    <Reveal as="div" kind="clip" style={{ height:'50vh', position:'relative', overflow:'hidden', background:'#0d1015' }}>
      <img src="assets/esg-pcc.png" alt="" className="pcc-hero-bg" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', filter:'grayscale(1) contrast(1.05) brightness(0.92)', display:'block' }}/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(13,16,21,0.15) 0%, rgba(13,16,21,0.5) 100%)' }}/>
    </Reveal>

    <section style={{ padding:'120px 0', background:'#fff' }}>
      <Container wide>
        <Reveal as="div" kind="fade" stagger style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 4, background:'var(--border)' }}>
          {pillars.map((p, i) => (
            <Reveal as="div" kind="up" key={i} className="pcc-card-accent" style={{ background:'#fff', padding:'48px 40px', minHeight: 420, display:'flex', flexDirection:'column' }}>
              <div style={{ display:'flex', alignItems:'baseline', gap: 16, marginBottom: 32 }}>
                <div className="pcc-float" style={{ fontFamily:'var(--font-display)', fontWeight: 700, fontSize: 88, color:'var(--accent)', lineHeight: 0.85, letterSpacing:'-0.04em' }}>{p.letter}</div>
                <i data-lucide={p.icon} width="22" height="22" style={{ color:'var(--fg-3)' }}></i>
              </div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize: 28, margin:'0 0 16px', color:'var(--fg-1)', letterSpacing:'-0.01em' }}>{lang === 'es' ? p.es : p.en}</h3>
              <p style={{ fontSize: 15, color:'var(--fg-3)', lineHeight: 1.6, margin: 0 }}>{lang === 'es' ? p.esD : p.enD}</p>
            </Reveal>
          ))}
        </Reveal>
      </Container>
    </section>

    <section style={{ padding:'120px 0', background:'var(--bg-2)' }}>
      <Container wide>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 80, alignItems:'center' }}>
          <Reveal kind="right">
            <Eyebrow>{lang === 'es' ? 'POLÍTICA HSEQ' : 'HSEQ POLICY'}</Eyebrow>
            <h2 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(32px, 3.6vw, 52px)', lineHeight: 1.1, letterSpacing:'-0.02em', margin:'0 0 24px', textWrap:'balance' }}>{lang === 'es' ? 'Cero incidentes mayores desde 2019.' : 'Zero major incidents since 2019.'}</h2>
            <p style={{ fontSize: 17, color:'var(--fg-3)', lineHeight: 1.6, margin:'0 0 32px' }}>{lang === 'es' ? 'Sistema integrado de gestión bajo ISO 9001 (calidad), 14001 (ambiental) y 45001 (seguridad y salud en el trabajo). Auditado anualmente por terceros.' : 'Integrated management system under ISO 9001 (quality), 14001 (environmental), and 45001 (health & safety). Annually audited by third parties.'}</p>
            <Button variant="secondary" iconLeft="download">{lang === 'es' ? 'Descargar política HSEQ' : 'Download HSEQ policy'}</Button>
          </Reveal>
          <Reveal as="div" kind="fade" stagger delay={150} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 1, background:'var(--border)', border:'1px solid var(--border)' }}>
            {[
              { num:'0', es:'Incidentes mayores 2024', en:'Major incidents 2024' },
              { num:'47', es:'Años sin paro operativo', en:'Years without operational stop' },
              { num:'100%', es:'Trazabilidad documental', en:'Document traceability' },
              { num:'3', es:'Auditorías ISO anuales', en:'Annual ISO audits' },
            ].map((s, i) => (
              <Reveal as="div" kind="scale" key={i} style={{ background:'#fff', padding:'36px 28px', minHeight: 180 }}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight: 700, fontSize: 56, lineHeight: 1, color:'var(--fg-1)', letterSpacing:'-0.03em', marginBottom: 16 }}>{s.num}</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--fg-4)' }}>{lang === 'es' ? s.es : s.en}</div>
              </Reveal>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  </>;
}

window.ESGPage = ESGPage;
