import { useState } from 'react'
import { Card, SectionLabel, Pill, AddButton } from '@/components/shared/UI'

const RECETTES_DEMO = [
  { emoji: '🍗', bg: '#FFF3E0', nom: 'Bowl poulet · quinoa · avocat', cal: 680, p: 52, g: 68, l: 18 },
  { emoji: '🐟', bg: '#E3F2FD', nom: 'Saumon · patate douce · épinards', cal: 580, p: 44, g: 42, l: 18 },
  { emoji: '🍛', bg: '#FFF8E1', nom: 'Curry lentilles · coco · riz', cal: 520, p: 28, g: 72, l: 14 },
  { emoji: '🥚', bg: '#F3E5F5', nom: 'Omelette protéinée · légumes', cal: 420, p: 38, g: 12, l: 16 },
]

const PREFS = [
  { label: 'Poulet', on: true },  { label: 'Saumon', on: true },
  { label: 'Riz', on: true },     { label: 'Sans lactose', on: true, exclusion: true },
  { label: 'Sans gluten', on: false, exclusion: true },
]

export default function RecettesPage() {
  const [loading, setLoading] = useState(false)
  const [recetteDetail, setRecetteDetail] = useState(null)
  const [recettes, setRecettes] = useState(RECETTES_DEMO)

  async function genererRecettes() {
    setLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Génère 4 recettes pour la semaine adaptées à ces objectifs muscu :
- 2400 kcal/jour, 160g protéines, sans lactose
- Ingrédients préférés : poulet, saumon, riz, légumes
- Repas simples, réalisables en 20-30 min

Réponds UNIQUEMENT en JSON valide, sans texte avant ou après :
[{"nom":"...","emoji":"...","cal":0,"p":0,"g":0,"l":0,"ingredients":["..."],"etapes":["..."]}]`
          }]
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || '[]'
      const parsed = JSON.parse(text.replace(/```json|```/g, '').trim())
      setRecettes(parsed.map(r => ({ ...r, bg: '#F2F2F7' })))
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-3.5 p-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-medium tracking-tight">Recettes IA</h1>
        <Pill variant="purple">Claude AI</Pill>
      </div>

      {/* Objectifs */}
      <Card>
        <SectionLabel>Tes objectifs</SectionLabel>
        {[
          { icon: 'ti-flame',   color: '#FF3B30', bg: '#FF3B3012', lbl: 'Calories / jour', val: '2 400 kcal' },
          { icon: 'ti-meat',    color: '#007AFF', bg: '#007AFF12', lbl: 'Protéines',        val: '160 g · 1,6g/kg' },
          { icon: 'ti-bread',   color: '#FF9500', bg: '#FF950012', lbl: 'Glucides',          val: '240 g' },
          { icon: 'ti-droplet', color: '#30D158', bg: '#30D15812', lbl: 'Lipides',           val: '70 g' },
        ].map((o, i) => (
          <div key={i} className="flex items-center gap-2.5 p-2.5 bg-sf-bg rounded-sf-sm mb-2 last:mb-0">
            <i className={`ti ${o.icon} text-sm`} style={{ color: o.color }} aria-hidden="true" />
            <span className="text-xs text-sf-t2 flex-1">{o.lbl}</span>
            <span className="text-sm font-medium">{o.val}</span>
          </div>
        ))}
        <div className="flex gap-1.5 flex-wrap mt-2">
          {PREFS.map((p, i) => (
            <Pill key={i} variant={p.exclusion ? 'red' : 'green'}>
              {p.exclusion ? '✕ ' : ''}{p.label}
            </Pill>
          ))}
          <Pill variant="gray">+ Préférences</Pill>
        </div>
      </Card>

      {/* Recettes */}
      <Card>
        <SectionLabel right={
          <button
            onClick={genererRecettes}
            disabled={loading}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple text-white text-xs font-medium
                       hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            <i className={`ti ${loading ? 'ti-loader-2 animate-spin' : 'ti-sparkles'} text-xs`} aria-hidden="true" />
            {loading ? 'Génération…' : 'Générer'}
          </button>
        }>
          Suggestions de la semaine
        </SectionLabel>

        <div className="grid grid-cols-2 gap-2.5">
          {recettes.map((r, i) => (
            <div
              key={i}
              className="rounded-sf border border-sf-sep overflow-hidden cursor-pointer
                         hover:border-info transition-colors"
              onClick={() => setRecetteDetail(r)}
            >
              <div className="h-16 flex items-center justify-center text-3xl" style={{ background: r.bg }}>
                {r.emoji || '🍽️'}
              </div>
              <div className="p-2.5">
                <div className="text-xs font-medium mb-1.5 leading-tight">{r.nom}</div>
                <div className="flex gap-1 flex-wrap">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-light text-accent font-medium">{r.cal} kcal</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-info-light text-info font-medium">{r.p}g prot</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-energy-light text-orange-700 font-medium">{r.g}g glu</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <AddButton>Nouvelles suggestions</AddButton>
      </Card>

      {/* Détail recette */}
      {recetteDetail && (
        <Card>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-base font-medium">{recetteDetail.nom}</div>
              <div className="text-xs text-sf-t2 mt-0.5">{recetteDetail.cal} kcal · {recetteDetail.p}g protéines</div>
            </div>
            <button onClick={() => setRecetteDetail(null)} className="text-sf-t2 hover:text-sf-t1">
              <i className="ti ti-x text-lg" aria-hidden="true" />
            </button>
          </div>
          {recetteDetail.ingredients && (
            <>
              <div className="sf-lbl">Ingrédients</div>
              {recetteDetail.ingredients.map((ing, i) => (
                <div key={i} className="text-sm py-1 border-b border-sf-sep last:border-0">{ing}</div>
              ))}
            </>
          )}
          {recetteDetail.etapes && (
            <>
              <div className="sf-lbl mt-3">Préparation</div>
              {recetteDetail.etapes.map((e, i) => (
                <div key={i} className="flex gap-2.5 py-1.5 border-b border-sf-sep last:border-0">
                  <span className="text-xs font-medium text-accent w-4 flex-shrink-0 mt-0.5">{i+1}</span>
                  <span className="text-sm">{e}</span>
                </div>
              ))}
            </>
          )}
          <div className="flex gap-2 mt-3">
            <button className="sf-btn-success flex-1 text-xs">Ajouter au planning</button>
            <button className="sf-btn flex-1 text-xs">Ajouter à la liste de courses</button>
          </div>
        </Card>
      )}
    </div>
  )
}
