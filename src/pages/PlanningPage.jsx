import { useState } from 'react'
import { Card, SectionLabel, ProgressBar, Pill } from '@/components/shared/UI'
import { useStore } from '@/lib/store'

const JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const JOURS_FULL = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const PLANNING = [
  { d: '🥚', l: '🍗 Bowl poulet', s: '🐟 Saumon' },
  { d: '🌾 Flocons',  l: '🐟 Saumon riz', s: '🍗 Poulet légumes' },
  { d: '🥚 Pancakes', l: '🍛 Curry lentilles', s: '🐟 Cabillaud' },
  { d: '🌾 Flocons',  l: '🍗 Wrap poulet', s: '🥩 Bœuf riz' },
  { d: '🥚 Omelette', l: '🐟 Saumon quinoa', s: '🍛 Curry pois' },
  { d: '🥞 Pancakes', l: '🥩 Steak patate douce', s: '—' },
  { d: '🌾 Yaourt',   l: '🍗 Poulet rôti', s: '—' },
]

const MACROS_MOY = { cal: 2380, p: 158, g: 235, l: 68 }
const OBJ = { cal: 2400, p: 160, g: 240, l: 70 }

export default function PlanningPage() {
  const { setPage } = useStore()
  const [jourSelectionne, setJourSelectionne] = useState(0)

  return (
    <div className="flex flex-col gap-3.5 p-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-medium tracking-tight">Planning semaine</h1>
        <Pill variant="blue">Sem. 19 · 2026</Pill>
      </div>

      {/* Vue 7 jours */}
      <Card>
        <SectionLabel>Cette semaine</SectionLabel>
        <div className="grid grid-cols-7 gap-1.5">
          {JOURS.map((j, i) => (
            <div
              key={i}
              className={`rounded-sf-sm border cursor-pointer transition-all
                ${i === 0 ? 'border-accent bg-accent-light' : 'border-sf-sep bg-white'}
                ${jourSelectionne === i ? 'ring-1 ring-info' : ''}`}
              onClick={() => setJourSelectionne(i)}
            >
              <div className={`text-center text-[10px] font-medium py-1 border-b border-sf-sep
                ${i === 0 ? 'text-accent' : 'text-sf-t2'}`}>
                {j}
              </div>
              <div className="p-1 flex flex-col gap-0.5">
                <div className="text-[10px] bg-energy-light text-orange-700 rounded px-1 py-0.5 leading-tight truncate">
                  {PLANNING[i].d}
                </div>
                <div className="text-[10px] bg-info-light text-blue-700 rounded px-1 py-0.5 leading-tight truncate">
                  {PLANNING[i].l}
                </div>
                <div className={`text-[10px] rounded px-1 py-0.5 leading-tight truncate
                  ${PLANNING[i].s === '—' ? 'bg-sf-bg text-sf-t3 italic' : 'bg-purple-light text-purple-700'}`}>
                  {PLANNING[i].s}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Détail jour sélectionné */}
      <Card>
        <SectionLabel>{JOURS_FULL[jourSelectionne]}</SectionLabel>
        {[
          { moment: 'Petit-déjeuner', repas: PLANNING[jourSelectionne].d, color: '#FF9500' },
          { moment: 'Déjeuner',       repas: PLANNING[jourSelectionne].l, color: '#007AFF' },
          { moment: 'Dîner',          repas: PLANNING[jourSelectionne].s, color: '#AF52DE' },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-2.5 py-2 border-b border-sf-sep last:border-0">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: r.color }} />
            <div className="flex-1">
              <div className="text-xs text-sf-t2">{r.moment}</div>
              <div className="text-sm font-medium">{r.repas}</div>
            </div>
            <button className="text-xs text-info">Changer</button>
          </div>
        ))}
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="sf-btn flex-1 text-xs">
          <i className="ti ti-sparkles text-sm text-purple" aria-hidden="true" />
          Regénérer la semaine
        </button>
        <button
          className="sf-btn-primary flex-1 text-xs"
          onClick={() => setPage('courses')}
        >
          <i className="ti ti-shopping-cart text-sm" aria-hidden="true" />
          Générer la liste de courses
        </button>
      </div>

      {/* Macros moyennes */}
      <Card>
        <SectionLabel>Macros moyennes / jour</SectionLabel>
        <ProgressBar label="Calories"  value={MACROS_MOY.cal} max={OBJ.cal} color="red"    unit=" kcal" />
        <ProgressBar label="Protéines" value={MACROS_MOY.p}   max={OBJ.p}   color="blue"   unit=" g" />
        <ProgressBar label="Glucides"  value={MACROS_MOY.g}   max={OBJ.g}   color="orange" unit=" g" />
        <ProgressBar label="Lipides"   value={MACROS_MOY.l}   max={OBJ.l}   color="green"  unit=" g" />
      </Card>
    </div>
  )
}
