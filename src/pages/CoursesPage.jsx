import { useState } from 'react'
import { Card, SectionLabel, Pill, AddButton } from '@/components/shared/UI'

const ENSEIGNES = {
  lec: { name: 'Leclerc',      letter: 'E', color: '#003DA5', bg: '#003DA510', url: 'https://www.leclercdrive.fr', urlLiv: 'https://www.leclercdrive.fr', feats: ['Drive', 'Livraison'] },
  pic: { name: 'Picard',       letter: 'P', color: '#00529B', bg: '#00529B10', url: 'https://www.picard.fr',       urlLiv: 'https://www.picard.fr/livraison', feats: ['Surgelés', 'Livraison'] },
  auc: { name: 'Auchan',       letter: 'A', color: '#E30001', bg: '#E3000110', url: 'https://www.auchan.fr',       urlLiv: 'https://www.auchan.fr',          feats: ['Drive', 'Livraison'] },
  int: { name: 'Intermarché',  letter: 'I', color: '#CC5500', bg: '#FF6B0010', url: 'https://www.intermarche.com', urlLiv: 'https://www.intermarche.com',    feats: ['Drive', 'Bio'] },
  car: { name: 'Carrefour',    letter: 'C', color: '#005BAB', bg: '#007AFF10', url: 'https://www.carrefour.fr',    urlLiv: 'https://www.carrefour.fr',       feats: ['Drive', 'Bio'] },
  mon: { name: 'Monoprix',     letter: 'M', color: '#558B2F', bg: '#30D15810', url: 'https://www.monoprix.fr',     urlLiv: 'https://www.monoprix.fr',        feats: ['Livraison', 'Bio'] },
}

const ARTICLES = [
  { nom: 'Filet de saumon',       qte: '600g',       enseigne: 'lec', cat: 'Poissons' },
  { nom: 'Blanc de poulet',       qte: '1 kg',        enseigne: 'lec', cat: 'Viandes' },
  { nom: 'Œufs frais',            qte: '12 unités',   enseigne: 'lec', cat: 'Œufs' },
  { nom: 'Épinards frais',        qte: '300g',        enseigne: 'lec', cat: 'Légumes' },
  { nom: 'Avocat',                qte: '3 unités',    enseigne: 'lec', cat: 'Fruits' },
  { nom: 'Patates douces',        qte: '800g',        enseigne: 'lec', cat: 'Légumes' },
  { nom: 'Brocolis',              qte: '500g',        enseigne: 'lec', cat: 'Légumes' },
  { nom: 'Riz basmati',           qte: '1 kg',        enseigne: 'lec', cat: 'Épicerie' },
  { nom: 'Quinoa',                qte: '500g',        enseigne: 'lec', cat: 'Épicerie' },
  { nom: 'Lentilles corail',      qte: '400g',        enseigne: 'lec', cat: 'Épicerie' },
  { nom: 'Flocons d\'avoine',     qte: '500g',        enseigne: 'lec', cat: 'Épicerie' },
  { nom: 'Cabillaud surgelé',     qte: '600g',        enseigne: 'pic', cat: 'Surgelés' },
  { nom: 'Haricots verts surgelés', qte: '500g',      enseigne: 'pic', cat: 'Surgelés' },
]

export default function CoursesPage() {
  const [selected, setSelected]   = useState(new Set(['lec', 'pic']))
  const [mode, setMode]           = useState('drive')
  const [step, setStep]           = useState('enseignes') // enseignes | liste | magasin | yazio
  const [checked, setChecked]     = useState(new Set())

  const toggleEnseigne = (id) => {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
  }

  const toggleCheck = (i) => {
    const next = new Set(checked)
    next.has(i) ? next.delete(i) : next.add(i)
    setChecked(next)
  }

  const articlesByEnseigne = ARTICLES.reduce((acc, a) => {
    const eid = selected.has(a.enseigne) ? a.enseigne : [...selected][0] || 'lec'
    if (!acc[eid]) acc[eid] = []
    acc[eid].push(a)
    return acc
  }, {})

  const STEPS = ['enseignes', 'liste', 'magasin', 'yazio']
  const stepIdx = STEPS.indexOf(step)

  // ── Stepper header
  function StepHeader() {
    return (
      <Card>
        <div className="flex items-center">
          {['Enseignes', 'Liste', 'Magasin', 'Yazio'].map((s, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                  ${i < stepIdx ? 'bg-success text-white' : i === stepIdx ? 'bg-info text-white' : 'bg-sf-bg text-sf-t2 border border-sf-sep'}`}>
                  {i < stepIdx ? <i className="ti ti-check text-xs" /> : i + 1}
                </div>
                <div className={`text-[10px] mt-1 ${i === stepIdx ? 'text-info font-medium' : 'text-sf-t2'}`}>{s}</div>
              </div>
              {i < 3 && <div className={`flex-1 h-px mx-1 mb-4 ${i < stepIdx ? 'bg-success' : 'bg-sf-sep'}`} />}
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (step === 'enseignes') return (
    <div className="flex flex-col gap-3.5 p-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-medium tracking-tight">Où faire tes courses ?</h1>
        <Pill variant="blue">{selected.size} sélectionné{selected.size > 1 ? 's' : ''}</Pill>
      </div>
      <StepHeader />
      <div className="grid grid-cols-3 gap-2.5">
        {Object.entries(ENSEIGNES).map(([id, e]) => (
          <div
            key={id}
            onClick={() => toggleEnseigne(id)}
            className={`sf-card cursor-pointer flex flex-col items-center gap-2 py-3 relative transition-all
              ${selected.has(id) ? 'border-info ring-1 ring-info bg-info-light' : ''}`}
          >
            {selected.has(id) && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-info flex items-center justify-center">
                <i className="ti ti-check text-white text-xs" aria-hidden="true" />
              </div>
            )}
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold"
                 style={{ background: e.bg, color: e.color }}>{e.letter}</div>
            <div className="text-sm font-medium text-center">{e.name}</div>
            <div className="flex gap-1 flex-wrap justify-center">
              {e.feats.map(f => <span key={f} className="text-[10px] px-1.5 py-0.5 rounded-full bg-sf-bg text-sf-t2">{f}</span>)}
            </div>
          </div>
        ))}
      </div>
      <Card>
        <SectionLabel>Mode de récupération</SectionLabel>
        <div className="flex gap-2">
          {[
            { id: 'drive',    icon: 'ti-car',              label: 'Drive',     sub: 'Je récupère' },
            { id: 'livraison', icon: 'ti-truck-delivery',  label: 'Livraison', sub: 'À domicile' },
            { id: 'magasin',  icon: 'ti-building-store',   label: 'Magasin',   sub: 'Liste papier' },
          ].map(m => (
            <div
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex-1 p-2.5 rounded-sf-sm border cursor-pointer text-center transition-all
                ${mode === m.id ? 'border-info bg-info-light' : 'border-sf-sep bg-sf-bg'}`}
            >
              <i className={`ti ${m.icon} text-xl block mb-1 ${mode === m.id ? 'text-info' : 'text-sf-t2'}`} aria-hidden="true" />
              <div className={`text-xs font-medium ${mode === m.id ? 'text-info' : 'text-sf-t2'}`}>{m.label}</div>
              <div className="text-[10px] text-sf-t3">{m.sub}</div>
            </div>
          ))}
        </div>
      </Card>
      <button
        onClick={() => selected.size > 0 && setStep('liste')}
        className={`sf-btn-primary w-full py-3 text-sm ${selected.size === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <i className="ti ti-arrow-right" aria-hidden="true" /> Voir ma liste de courses
      </button>
    </div>
  )

  if (step === 'liste') return (
    <div className="flex flex-col gap-3.5 p-4">
      <button onClick={() => setStep('enseignes')} className="flex items-center gap-1.5 text-info text-sm">
        <i className="ti ti-arrow-left" aria-hidden="true" /> Choisir les enseignes
      </button>
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-medium tracking-tight">Liste de courses</h1>
        <Pill variant="orange">{ARTICLES.length} articles</Pill>
      </div>
      <StepHeader />
      <Card>
        {Object.entries(articlesByEnseigne).map(([eid, arts]) => {
          const e = ENSEIGNES[eid]
          if (!e) return null
          return (
            <div key={eid} className="mb-4 last:mb-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: e.bg, color: e.color }}>
                  {e.name} · {arts.length} articles
                </span>
              </div>
              {arts.map((a, i) => {
                const key = eid + i
                return (
                  <div key={key} className="flex items-center gap-2.5 py-2 border-b border-sf-sep last:border-0">
                    <div
                      onClick={() => toggleCheck(key)}
                      className={`w-5 h-5 rounded-md border cursor-pointer flex items-center justify-center flex-shrink-0 transition-all
                        ${checked.has(key) ? 'bg-success border-success' : 'border-sf-sep bg-white hover:border-success'}`}
                    >
                      {checked.has(key) && <i className="ti ti-check text-white text-xs" aria-hidden="true" />}
                    </div>
                    <span className={`flex-1 text-sm font-medium ${checked.has(key) ? 'line-through opacity-40' : ''}`}>{a.nom}</span>
                    <span className="text-xs text-sf-t2">{a.qte}</span>
                  </div>
                )
              })}
            </div>
          )
        })}
        <AddButton>Ajouter un article</AddButton>
      </Card>
      <div className="flex gap-2">
        <button onClick={() => setStep('enseignes')} className="sf-btn flex-1 text-xs">
          <i className="ti ti-edit text-sm" aria-hidden="true" /> Modifier
        </button>
        <button onClick={() => setStep('magasin')} className="sf-btn-primary flex-1 text-xs">
          <i className="ti ti-external-link text-sm" aria-hidden="true" /> Aller faire les courses
        </button>
      </div>
    </div>
  )

  if (step === 'magasin') return (
    <div className="flex flex-col gap-3.5 p-4">
      <button onClick={() => setStep('liste')} className="flex items-center gap-1.5 text-info text-sm">
        <i className="ti ti-arrow-left" aria-hidden="true" /> Retour à la liste
      </button>
      <h1 className="text-xl font-medium tracking-tight">Aller faire les courses</h1>
      <StepHeader />
      {Object.entries(articlesByEnseigne).map(([eid, arts]) => {
        const e = ENSEIGNES[eid]
        if (!e) return null
        const url = mode === 'livraison' ? e.urlLiv : e.url
        const listeTxt = arts.map(a => `• ${a.nom} (${a.qte})`).join('\n')
        return (
          <Card key={eid}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                     style={{ background: e.bg, color: e.color }}>{e.letter}</div>
                <div>
                  <div className="text-sm font-medium">{e.name}</div>
                  <div className="text-xs text-sf-t2">{arts.length} articles · {mode === 'livraison' ? 'Livraison' : 'Drive'}</div>
                </div>
              </div>
            </div>
            <div className="text-xs text-sf-t2 bg-sf-bg rounded-sf-sm p-2.5 mb-3 leading-relaxed">
              {arts.map(a => `${a.nom} (${a.qte})`).join(' · ')}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(`Liste FitHub — ${e.name}\n\n${listeTxt}`)}
                className="sf-btn flex-1 text-xs"
              >
                <i className="ti ti-copy text-sm" aria-hidden="true" /> Copier la liste
              </button>
              <a href={url} target="_blank" rel="noopener noreferrer" className="flex-1">
                <button className="sf-btn-primary w-full text-xs">
                  <i className="ti ti-external-link text-sm" aria-hidden="true" /> Ouvrir {e.name}
                </button>
              </a>
            </div>
          </Card>
        )
      })}
      <div className="sf-card bg-amber-50 border-yellow-200">
        <div className="flex gap-2.5 items-start">
          <i className="ti ti-info-circle text-energy text-base mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div className="text-xs text-sf-t2 leading-relaxed">
            Clique sur "Copier la liste" puis ouvre le site. Recherche chaque produit et ajoute-le à ton panier drive ou livraison. Reviens ensuite pour l'étape Yazio.
          </div>
        </div>
      </div>
      <button onClick={() => setStep('yazio')} className="sf-btn-success w-full py-3 text-sm">
        <i className="ti ti-check" aria-hidden="true" /> Courses faites — Exporter vers Yazio
      </button>
    </div>
  )

  if (step === 'yazio') return (
    <div className="flex flex-col gap-3.5 p-4">
      <button onClick={() => setStep('magasin')} className="flex items-center gap-1.5 text-info text-sm">
        <i className="ti ti-arrow-left" aria-hidden="true" /> Retour
      </button>
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-medium tracking-tight">Exporter vers Yazio</h1>
        <Pill variant="green">Open Food Facts</Pill>
      </div>
      <StepHeader />
      <Card>
        <SectionLabel>Produits identifiés</SectionLabel>
        <div className="text-xs text-sf-t2 mb-3 leading-relaxed">
          Données nutritionnelles des fabricants via Open Food Facts.
        </div>
        {[
          { emoji: '🐟', nom: 'Filet de saumon Atlantique',    mag: 'Leclerc · 100g', p: 20, g: 0,  cal: 206 },
          { emoji: '🍗', nom: 'Blanc de poulet rôti',          mag: 'Leclerc · 100g', p: 31, g: 0,  cal: 165 },
          { emoji: '🌾', nom: 'Riz basmati',                   mag: 'Leclerc · 100g', p: 2.5,g: 28, cal: 130 },
          { emoji: '🥚', nom: 'Œufs frais Label Rouge',        mag: 'Leclerc · 1 œuf',p: 7,  g: 0.3,cal: 86  },
          { emoji: '🥦', nom: 'Brocolis surgelés',             mag: 'Picard · 100g',  p: 2.8,g: 4,  cal: 34  },
        ].map((p, i) => (
          <div key={i} className="flex items-center gap-2.5 py-2.5 border-b border-sf-sep last:border-0">
            <div className="w-9 h-9 rounded-sf-sm flex items-center justify-center text-lg bg-sf-bg flex-shrink-0">
              {p.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium leading-tight">{p.nom}</div>
              <div className="text-xs text-sf-t2">{p.mag}</div>
              <div className="flex gap-1 mt-1">
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-info-light text-info font-medium">{p.p}g prot</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-energy-light text-orange-700 font-medium">{p.g}g glu</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-light text-accent font-medium">{p.cal} kcal</span>
              </div>
            </div>
            <button className="text-xs px-2.5 py-1.5 rounded-lg bg-info text-white font-medium flex-shrink-0">
              + Yazio
            </button>
          </div>
        ))}
      </Card>
      <Card>
        <SectionLabel>Export global</SectionLabel>
        <div className="text-xs text-sf-t2 mb-3 leading-relaxed">
          Exporte tous les produits en CSV importable directement dans Yazio (Profil → Importer les données).
        </div>
        <div className="flex gap-2">
          <button className="sf-btn-primary flex-1 text-xs">
            <i className="ti ti-download text-sm" aria-hidden="true" /> Télécharger CSV Yazio
          </button>
          <button className="sf-btn-success flex-1 text-xs">
            <i className="ti ti-clipboard text-sm" aria-hidden="true" /> Copier le journal
          </button>
        </div>
      </Card>
    </div>
  )
}
