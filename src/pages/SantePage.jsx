// SantePage.jsx
import { Card, SectionLabel, Pill, AddButton } from '@/components/shared/UI'

const SANTE = { pas: 8420, sommeil_min: 440, fc_repos: 58, hrv_ms: 62, poids_kg: 79.4, calories_actives: 340 }

export default function SantePage() {
  return (
    <div className="flex flex-col gap-3.5 p-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-medium tracking-tight">Santé iPhone</h1>
        <Pill variant="green">Synchronisé</Pill>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { icon: 'ti-walk',     bg: '#FF3B3012', color: '#FF3B30', val: SANTE.pas.toLocaleString('fr'), lbl: 'Pas · aujourd\'hui' },
          { icon: 'ti-moon',     bg: '#AF52DE12', color: '#AF52DE', val: `${Math.floor(SANTE.sommeil_min/60)}h ${SANTE.sommeil_min%60}min`, lbl: 'Sommeil · cette nuit' },
          { icon: 'ti-heart',    bg: '#FF3B3012', color: '#FF3B30', val: `${SANTE.fc_repos} bpm`,   lbl: 'FC au repos' },
          { icon: 'ti-scale',    bg: '#FF950012', color: '#FF9500', val: `${SANTE.poids_kg} kg`,    lbl: 'Poids · hier' },
          { icon: 'ti-activity', bg: '#AF52DE12', color: '#AF52DE', val: `${SANTE.hrv_ms} ms`,      lbl: 'HRV · cette nuit' },
          { icon: 'ti-run',      bg: '#30D15812', color: '#30D158', val: `${SANTE.calories_actives} kcal`, lbl: 'Actives · aujourd\'hui' },
        ].map((h, i) => (
          <div key={i} className="sf-card flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: h.bg }}>
              <i className={`ti ${h.icon} text-sm`} style={{ color: h.color }} aria-hidden="true" />
            </div>
            <div>
              <div className="text-base font-medium leading-tight">{h.val}</div>
              <div className="text-xs text-sf-t2">{h.lbl}</div>
            </div>
          </div>
        ))}
      </div>
      <Card>
        <SectionLabel>Importer Apple Health</SectionLabel>
        <div className="text-xs text-sf-t2 mb-3 leading-relaxed">
          Sur iPhone : Santé → icône profil → Exporter les données. Le fichier XML sera analysé automatiquement pour extraire tes données.
        </div>
        <AddButton>Importer export-sante.xml</AddButton>
      </Card>
    </div>
  )
}
