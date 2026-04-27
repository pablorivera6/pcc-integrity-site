/* global React */
function ContactPage({ lang }) {
  const C = window.PCC_CONTENT[lang].contact;
  const D = window.PCC_DATA;
  const { useState } = React;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ first:'', last:'', email:'', company:'', subject:'', message:'' });
  const F = C.form;

  const inp = {
    width:'100%', padding:'14px 16px', fontSize: 14,
    border:'1px solid var(--border)', borderRadius: 0, background:'#fff',
    fontFamily:'var(--font-body)', color:'var(--fg-1)',
    outline:'none', transition:'border-color 150ms var(--ease)',
  };
  const lab = { fontFamily:'var(--font-mono)', fontSize: 11, color:'var(--fg-4)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom: 8, display:'block', fontWeight: 600 };

  return <>
    <section style={{ background:'#fff', borderBottom:'1px solid var(--border)' }}>
      <Container wide style={{ padding:'120px 32px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.6fr', gap: 80, alignItems:'start' }}>
          <Reveal kind="right">
            <Eyebrow>{C.eyebrow}</Eyebrow>
            <div style={{ fontFamily:'var(--font-mono)', fontSize: 12, color:'var(--fg-4)', letterSpacing:'0.08em', marginTop: 32 }}>{lang === 'es' ? 'RESPUESTA EN 48 H HÁBILES' : '48 BUSINESS HOURS REPLY'}</div>
          </Reveal>
          <Reveal kind="up" delay={120}>
            <h1 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize:'clamp(40px, 5vw, 76px)', lineHeight: 1.04, letterSpacing:'-0.025em', margin:'0 0 32px', textWrap:'balance' }}>{C.title}</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color:'var(--fg-3)', maxWidth: 720, margin: 0 }}>{C.sub}</p>
          </Reveal>
        </div>
      </Container>
    </section>

    {/* form + info */}
    <section style={{ background:'#fff' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr' }}>
        <Reveal as="div" kind="right" style={{ padding:'80px 64px', borderRight:'1px solid var(--border)' }}>
          {sent ? (
            <div className="pcc-page-fade" style={{ padding:'80px 0', textAlign:'center' }}>
              <i data-lucide="check-circle-2" width="48" height="48" style={{ color:'var(--accent)' }}></i>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize: 28, marginTop: 24 }}>{F.sent}</h3>
            </div>
          ) : (            <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 24, marginBottom: 24 }}>
                <div><label style={lab}>{F.first}</label><input style={inp} value={form.first} onChange={e => setForm({...form, first:e.target.value})} required/></div>
                <div><label style={lab}>{F.last}</label><input style={inp} value={form.last} onChange={e => setForm({...form, last:e.target.value})} required/></div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 24, marginBottom: 24 }}>
                <div><label style={lab}>{F.email}</label><input type="email" style={inp} value={form.email} onChange={e => setForm({...form, email:e.target.value})} required/></div>
                <div><label style={lab}>{F.company}</label><input style={inp} value={form.company} onChange={e => setForm({...form, company:e.target.value})}/></div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={lab}>{F.subject}</label>
                <input style={inp} value={form.subject} onChange={e => setForm({...form, subject:e.target.value})}/>
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={lab}>{F.message}</label>
                <textarea style={{ ...inp, minHeight: 160, resize:'vertical' }} value={form.message} onChange={e => setForm({...form, message:e.target.value})} required/>
              </div>
              <Button variant="primary" icon="arrow-right">{F.send}</Button>
            </form>
          )}
        </Reveal>
        <Reveal as="div" kind="left" delay={150} style={{ padding:'80px 64px', background:'var(--bg-2)' }}>
          <Eyebrow>{C.officesTitle}</Eyebrow>
          <Reveal as="div" kind="fade" stagger style={{ display:'flex', flexDirection:'column', gap: 32, marginTop: 32 }}>
            {D.offices.map(o => (
              <Reveal as="div" kind="up" key={o.country} style={{ paddingBottom: 32, borderBottom:'1px solid var(--border)' }}>
                <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 24, lineHeight: 1 }}>{o.flag}</span>
                  <h3 style={{ fontFamily:'var(--font-display)', fontWeight: 600, fontSize: 22, margin: 0, color:'var(--fg-1)' }}>{o.country}</h3>
                </div>
                <div style={{ fontSize: 14, color:'var(--fg-3)', lineHeight: 1.6, marginBottom: 12 }}>{o.addr}</div>
                <a href={`mailto:${o.email}`} style={{ fontSize: 14, display:'block', marginBottom: 4 }}>{o.email}</a>
                <div style={{ fontFamily:'var(--font-mono)', fontSize: 13, color:'var(--fg-2)' }}>{o.phone}</div>
                {o.mobile && <div style={{ fontFamily:'var(--font-mono)', fontSize: 13, color:'var(--fg-2)' }}>{o.mobile}</div>}
              </Reveal>
            ))}
          </Reveal>
          <Reveal kind="up" delay={300} style={{ marginTop: 32 }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fg-4)', marginBottom: 8 }}>{C.careersTitle}</div>
            <p style={{ fontSize: 14, color:'var(--fg-3)', lineHeight: 1.55, margin:'0 0 8px' }}>{C.careersBody}</p>
            <a href="mailto:careers@pccintegrity.com" style={{ fontSize: 14 }}>careers@pccintegrity.com</a>
          </Reveal>
        </Reveal>
      </div>
    </section>
  </>;
}

window.ContactPage = ContactPage;
