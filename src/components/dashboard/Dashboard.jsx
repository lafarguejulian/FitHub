import { useStore } from '@/lib/store'
import { Card, SectionLabel, MetricCard, ProgressBar, Row, Pill } from '@/components/shared/UI'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

// Données de démo (remplacées par Supabase en prod)
const DEMO = {
  sante:   { pas: 8420, sommeil_min: 440, fc_repos: 58, hrv_ms: 62, poids_kg: 79.4, calories_actives: 340 },
  nutri:   { calories: 1840, proteines_g: 142, glucides_g: 190, lipides_g: 52 },
  profil:  { calories_objectif: 2400, proteines_g: 160, glucides_g: 240, lipides_g: 70 },
  seance:  {
    nom: 'Dos + Triceps', cycle: 1, semaine: 1,
    exercices: [
      { nom: 'Tractions lestées',     fait: true,  series: '4×12-15', charge: '20 kg' },
      { nom: 'Rowing haltère 1 bras', fait: true,  series: '3×12-15', charge: '24 kg' },
      { nom: 'Tirage poulie haute',   fait: false, series: '3×12-15', charge: '—',     actif: true },
      { nom: 'Extensions triceps',    fait: false, series: '3×15',    charge: '—' },
    ]
  }
}

export default function Dashboard() {
  const { setPage } = useStore()
  const today = format(new Date(), "EEEE d MMMM yyyy", { locale: fr })
  const { sante, nutri, profil, seance } = DEMO

  return (
    <div className="flex flex-col gap-3.5 p-4">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-medium tracking-tight">Dashboard</h1>
        <span className="text-sm text-sf-t2 capitalize">{today}</span>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-4 gap-2.5">
        <MetricCard icon="ti-flame"          iconBg="#FF3B3012" iconColor="#FF3B30"
          value={nutri.calories}   unit="kcal" label="Calories"
          delta={`${Math.round(nutri.calories/profil.calories_objectif*100)}% de l'objectif`} />
        <MetricCard icon="ti-meat"           iconBg="#007AFF12" iconColor="#007AFF"
          value={nutri.proteines_g} unit="g"   label="Protéines"
          delta={`+${profil.proteines_g - nutri.proteines_g}g restants`} />
        <MetricCard icon="ti-heart"          iconBg="#FF3B3012" iconColor="#FF3B30"
          value={sante.fc_repos}   unit="bpm" label="FC repos"
          delta="Bonne récupération" />
        <MetricCard icon="ti-moon"           iconBg="#AF52DE12" iconColor="#AF52DE"
          value={`${Math.floor(sante.sommeil_min/60)}h${sante.sommeil_min%60}`} unit="" label="Sommeil"
          delta="Objectif atteint" />
      </div>

      {/* 2 colonnes */}
      <div className="grid grid-cols-2 gap-2.5">

        {/* Séance du jour */}
        <Card>
          <SectionLabel right={
            <span className="flex gap-1">
              <Pill variant="red">Cycle {seance.cycle}</Pill>
              <Pill variant="gray">Sem. {seance.semaine}</Pill>
            </span>
          }>Séance du jour</SectionLabel>

          {seance.exercices.map((ex, i) => (
            <div key={i} className="flex items-center gap-2.5 py-2 border-b border-sf-sep last:border-0">
              {/* Indicateur */}
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0
                ${ex.fait ? 'bg-success text-white' : ex.actif ? 'bg-accent text-white' : 'bg-sf-bg text-sf-t2 border border-sf-sep'}`}>
                {ex.fait ? <i className="ti ti-check text-xs" /> : i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-sf-t1 truncate">{ex.nom}</div>
                <div className="text-[11px] text-sf-t2">{ex.series} · {ex.charge}</div>
              </div>
              {ex.actif && <Pill variant="orange">En cours</Pill>}
              {ex.fait && <Pill variant="green">Fait</Pill>}
            </div>
          ))}

          <button
            onClick={() => setPage('muscu')}
            className="sf-btn-accent w-full mt-2 text-xs py-1.5"
          >
            <i className="ti ti-player-play text-xs" aria-hidden="true" />
            Continuer la séance
          </button>
        </Card>

        {/* Nutrition */}
        <Card>
          <SectionLabel right={<Pill variant="blue">Yazio</Pill>}>
            Nutrition du jour
          </SectionLabel>
          <ProgressBar label="Calories"  value={nutri.calories}    max={profil.calories_objectif} color="red"    unit=" kcal" />
          <ProgressBar label="Protéines" value={nutri.proteines_g} max={profil.proteines_g}       color="blue"   unit=" g" />
          <ProgressBar label="Glucides"  value={nutri.glucides_g}  max={profil.glucides_g}        color="orange" unit=" g" />
          <ProgressBar label="Lipides"   value={nutri.lipides_g}   max={profil.lipides_g}         color="green"  unit=" g" />
          <button onClick={() => setPage('nutrition')} className="sf-btn w-full mt-1 text-xs py-1.5">
            Voir le détail
          </button>
        </Card>
      </div>

      {/* Santé iPhone */}
      <Card>
        <SectionLabel right={<Pill variant="green">Synchronisé</Pill>}>
          Santé iPhone — aujourd'hui
        </SectionLabel>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: 'ti-walk',          bg: '#FF3B3012', color: '#FF3B30', val: sante.pas.toLocaleString('fr'), lbl: 'Pas' },
            { icon: 'ti-moon',          bg: '#AF52DE12', color: '#AF52DE', val: `${Math.floor(sante.sommeil_min/60)}h ${sante.sommeil_min%60}min`, lbl: 'Sommeil' },
            { icon: 'ti-heart',         bg: '#FF3B3012', color: '#FF3B30', val: `${sante.fc_repos} bpm`, lbl: 'FC repos' },
            { icon: 'ti-scale',         bg: '#FF950012', color: '#FF9500', val: `${sante.poids_kg} kg`,   lbl: 'Poids' },
            { icon: 'ti-activity',      bg: '#AF52DE12', color: '#AF52DE', val: `${sante.hrv_ms} ms`,     lbl: 'HRV' },
            { icon: 'ti-run',           bg: '#30D15812', color: '#30D158', val: `${sante.calories_actives} kcal`, lbl: 'Actives' },
          ].map((h, i) => (
            <div key={i} className="bg-sf-bg rounded-sf-sm p-3 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: h.bg }}>
                <i className={`ti ${h.icon} text-sm`} style={{ color: h.color }} aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-medium leading-tight">{h.val}</div>
                <div className="text-xs text-sf-t2">{h.lbl}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Récap semaine */}
      <Card>
        <SectionLabel>Cette semaine</SectionLabel>
        <div className="grid grid-cols-4 gap-2">
          {[
            { val: '3 / 4', lbl: 'Séances', color: '#FF3B30' },
            { val: '87%',   lbl: 'Protéines moy.', color: '#007AFF' },
            { val: '7h12',  lbl: 'Sommeil moy.', color: '#AF52DE' },
            { val: '9 240', lbl: 'Pas / jour', color: '#30D158' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-lg font-medium" style={{ color: s.color }}>{s.val}</div>
              <div className="text-[11px] text-sf-t2 mt-0.5">{s.lbl}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
