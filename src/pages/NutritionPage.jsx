import { useState } from 'react'
import { Card, SectionLabel, ProgressBar, Pill, AddButton, Row } from '@/components/shared/UI'

const OBJECTIFS = { calories: 2400, proteines: 160, glucides: 240, lipides: 70 }

const REPAS_DEMO = [
  { moment: 'Petit-déjeuner', nom: 'Omelette 3 œufs + flocons d\'avoine', cal: 420, p: 32, g: 38, l: 12, dot: '#FF9500' },
  { moment: 'Déjeuner',       nom: 'Bowl poulet · riz · brocolis',        cal: 680, p: 52, g: 68, l: 14, dot: '#007AFF' },
  { moment: 'Collation',      nom: 'Shaker protéiné + banane',            cal: 320, p: 36, g: 32, l: 4,  dot: '#30D158' },
  { moment: 'Dîner',          nom: 'Saumon · patate douce · épinards',    cal: 580, p: 44, g: 42, l: 18, dot: '#AF52DE' },
]

const totaux = REPAS_DEMO.reduce((acc, r) => ({
  cal: acc.cal + r.cal, p: acc.p + r.p, g: acc.g + r.g, l: acc.l + r.l
}), { cal: 0, p: 0, g: 0, l: 0 })

export default function NutritionPage() {
  const [showYazio, setShowYazio] = useState(false)

  return (
    <div className="flex flex-col gap-3.5 p-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-medium tracking-tight">Suivi macros</h1>
        <Pill variant="green">Yazio sync</Pill>
      </div>

      {/* Métriques */}
      <div className="grid grid-cols-4 gap-2.5">
        {[
          { icon: 'ti-flame', bg: '#FF3B3012', color: '#FF3B30', val: totaux.cal,  unit: 'kcal', lbl: 'Calories' },
          { icon: 'ti-meat',  bg: '#007AFF12', color: '#007AFF', val: totaux.p+'g', unit: '',    lbl: 'Protéines' },
          { icon: 'ti-bread', bg: '#FF950012', color: '#FF9500', val: totaux.g+'g', unit: '',    lbl: 'Glucides' },
          { icon: 'ti-droplet',bg:'#30D15812', color: '#30D158', val: totaux.l+'g', unit: '',    lbl: 'Lipides' },
        ].map((m, i) => (
          <div key={i} className="sf-card">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center mb-2" style={{ background: m.bg }}>
              <i className={`ti ${m.icon} text-xs`} style={{ color: m.color }} aria-hidden="true" />
            </div>
            <div className="text-lg font-medium">{m.val}<span className="text-xs text-sf-t2 font-normal ml-0.5">{m.unit}</span></div>
            <div className="text-xs text-sf-t2">{m.lbl}</div>
          </div>
        ))}
      </div>

      {/* Progression */}
      <Card>
        <SectionLabel>Progression du jour</SectionLabel>
        <ProgressBar label="Calories"  value={totaux.cal} max={OBJECTIFS.calories}  color="red"    unit=" kcal" />
        <ProgressBar label="Protéines" value={totaux.p}   max={OBJECTIFS.proteines} color="blue"   unit=" g" />
        <ProgressBar label="Glucides"  value={totaux.g}   max={OBJECTIFS.glucides}  color="orange" unit=" g" />
        <ProgressBar label="Lipides"   value={totaux.l}   max={OBJECTIFS.lipides}   color="green"  unit=" g" />
      </Card>

      {/* Repas */}
      <Card>
        <SectionLabel right={<span className="text-xs text-sf-t2">Lundi 11 mai</span>}>
          Repas du jour
        </SectionLabel>
        {REPAS_DEMO.map((r, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-sf-sep last:border-0">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: r.dot }} />
              <div>
                <div className="text-sm font-medium">{r.moment}</div>
                <div className="text-xs text-sf-t2">{r.nom}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{r.cal} kcal</div>
              <div className="text-xs text-sf-t2">{r.p}g prot</div>
            </div>
          </div>
        ))}
        <AddButton>Ajouter un repas</AddButton>
      </Card>

      {/* Yazio sync */}
      <Card>
        <SectionLabel>Synchronisation Yazio</SectionLabel>
        <div className="flex items-center gap-3 p-3 bg-sf-bg rounded-sf-sm">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
            <i className="ti ti-salad text-white text-lg" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Yazio connecté</div>
            <div className="text-xs text-sf-t2">Dernière sync : aujourd'hui 14h32 · Import CSV</div>
          </div>
          <button className="sf-btn-primary text-xs px-3 py-1.5">Sync</button>
        </div>
        <div className="mt-2 text-xs text-sf-t2 leading-relaxed">
          Pour synchroniser : exporte tes données depuis Yazio (Profil → Exporter les données) et importe le CSV ici.
        </div>
        <AddButton>Importer CSV Yazio</AddButton>
      </Card>
    </div>
  )
}
