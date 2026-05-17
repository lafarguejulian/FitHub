import { useState, useEffect, useRef } from 'react'
import { Card, SectionLabel, Pill, Stepper } from '@/components/shared/UI'
import { useStore } from '@/lib/store'

const PROGRAMME = {
  1: {
    lundi: { nom:'Dos + Triceps', emoji:'💪', exercices:[
      {nom:'Tractions lestées', sub:'Grand dorsal · Biceps', s:4,reps:13,tempo:'3-1-2',rest:45,kg:20,view:'back', p:['Grand dorsal','Grand rond'], sec:['Biceps','Trapèzes'], fm:{}, bm:{latissimus:1,biceps:1,trapezius_lower:1,teres_major:1}, alts:[{nom:'Tirage poulie haute',det:'Poulie'},{nom:'Tirage élastique',det:'Élastique'}], tips:[{ic:'ti-info-circle',t:'Prise large = largeur du dos.',w:0},{ic:'ti-alert-triangle',t:'Épaules basses tout au long.',w:1}]},
      {nom:'Aviron haltère 1 soutiens-gorge', sub:'Grand dorsal · Trapèzes', s:3,reps:13,tempo:'2-1-2',rest:45,kg:24,view:'back', p:['Grand dorsal','Trapèzes'], sec:['Rhomboïdes','Biceps'], fm:{}, bm:{latissimus:1,trapezius_mid:1,rhomboids:1}, alts:[{nom:'Rowing barre',det:'Barre olympique'}], tips:[{ic:'ti-info-circle',t:'Buste horizontale à 45°.',w:0},{ic:'ti-alert-triangle',t:'Dos plat obligatoire.',w:1}]},
      {nom:'Tirage poulie haute', sub:'Grand dorsal · Biceps', s:3,reps:13,tempo:'3-1-2',rest:45,kg:40,view:'back', p:['Grand dorsal'], sec:['Biceps','Épaules'], fm:{}, bm:{latissimus:1,biceps:1,postior_delt:1}, alts:[{nom:'Tractions assistées',det:'Machine'}], tips:[{ic:'ti-info-circle',t:'Pronation = plus de dos.',w:0},{ic:'ti-alert-triangle',t:'Jamais derrière la nue.',w:1}]},
      {nom:'Extensions triceps corde', sub:'Triceps chef long/lat.', s:3,reps:15,tempo:'2-1-2',rest:30,kg:20,view:'front',p:['Triceps (chef lat.)','Chef long'], sec:['Ancôné','Avant-bras'], fm:{triceps:1}, bm:{triceps:1}, alts:[{nom:'Dips entre bancs',det:'2 bancs'},{nom:'Pompes prise serrée',det:'Au sol'}], tips:[{ic:'ti-info-circle',t:'Coudes fixes et collés.',w:0},{ic:'ti-alert-triangle',t:'Écarte la corde en bas.',w:1}]},
      {nom:'Gainage planche', sub:'Core · Abdominaux', s:3,reps:1, tempo:'—', rest:20,kg:0, view:'front',isTime:true,p:['Transverse','Droits abdos'],sec:['Lombaires','Fessiers'],fm:{abs:1,obliques:1},bm:{glutes:1,lower_back:1}, alts:[{nom:'Dead bug',det:'Au sol'}], tips:[{ic:'ti-info-circle',t:'Corps aligné tête aux talons.',w:0},{ic:'ti-alert-triangle',t:'Si les hanches s'affaissent, stop.',w:1}]},
    ]},
    mardi : { nom:'Jambes + Mollets', emoji:'🦵', exercices:[
      {nom:'Squat bulgare haltères', sub:'Quadriceps · Fessiers', s:4,reps:13,tempo:'3-1-2',rest:45,kg:16,view:'front',p:['Quadriceps','Fessiers'], sec:['Ischios','Mollets'], fm:{quads:1}, bm:{glutes:1,hamstrings:1}, alts:[{nom:'Hack squat',det:'Machine'}], tips:[{ic:'ti-info-circle',t:'Genou aligné sur l\'orteil.',w:0},{ic:'ti-alert-triangle',t:'Ne dépasse pas la pointe du pied.',w:1}]},
      {nom:'Leg curl allongé', sub:'Ischio-jambiers', s:3,reps:15,tempo:'2-1-2',rest:30,kg:30,view:'back', p:['Ischio-jambiers'], sec:['Mollets'], fm:{}, bm:{ischio-jambiers:1}, alts:[{nom:'Leg curl assis',det:'Machine'}], tips:[{ic:'ti-info-circle',t:'Contrôler la descente - tempo lent.',w:0}]},
      {nom:'Fentes marchées', sub:'Quadriceps · Fessiers', s:3,reps:12,tempo:'2-1-1',rest:45,kg:12,view:'front',p:['Quadriceps','Fessiers'], sec:['Ischios'], fm:{quads:1}, bm:{fessiers:1}, alts:[{nom:'Fentes statiques',det:'Haltères'}], tips:[{ic:'ti-alert-triangle',t:'Pas trop large, buste droit.',w:1}]},
      {nom:'Mollets debout', sub:'Gastrocnémiens', s:4,reps:20,tempo:'1-1-3',rest:30,kg:0, view:'front',p:['Gastrocnémiens'], sec:['Soléaire'], fm:{calves:1}, bm:{calves:1}, alts:[{nom:'Mollets assis',det:'Machine'}], tips:[{ic:'ti-info-circle',t:'Étirement complet en bas.',w:0}]},
    ]},
    jeudi: { nom:'Pecs + Épaules', emoji:'🏋️', exercices:[
      {nom:'Développé couché haltères',sub:'Pectoraux · Triceps', s:4,reps:13,tempo:'3-1-2',rest:45,kg:24,view:'front',p:['Pectoraux'], sec:['Triceps','Deltoïdes ant.'],fm:{chest:1}, bm:{}, alts:[{nom:'Développé couché barre',det:'Barre'}], tips:[{ic:'ti-info-circle',t:'Omoplates serrées.',w:0},{ic:'ti-alert-triangle',t:'Contrôler la descente 3 sec.',w:1}]},
      {nom:'Écarté haltères', sub:'Pectoraux (étirement)', s:3,reps:15,tempo:'3-1-1',rest:30,kg:12,view:'front',p:['Pectoraux'], sec:['Deltoïdes ant.'], fm:{chest:1}, bm:{}, alts:[{nom:'Pec deck machine',det:'Machine'}], tips:[{ic:'ti-info-circle',t:'Étirement maximal en bas.',w:0}]},
      {nom:'Élévations latérales', sub:'Deltoïdes latéraux', s:3,reps:15,tempo:'2-1-2',rest:30,kg:8, view:'front',p:['Deltoïdes lat.'], sec:['Trapèzes sup.'], fm:{front_delt:1},bm:{postior_delt:1}, alts:[{nom:'Élévations câble',det:'Poulie'}], tips:[{ic:'ti-alert-triangle',t:'Léger, stop à hauteur épaule.',w:1}]},
      {nom:'Face pull corde', sub:'Épaules · Rotateurs', s:3,reps:15,tempo:'2-1-2',rest:45,kg:15,view:'back', p:['Deltoïdes post.'], sec:['Rotateurs ext.'], fm:{}, bm:{postior_delt:1,trapezius_mid:1}, alts:[{nom:'Oiseau haltères',det:'Haltères'}], tips:[{ic:'ti-info-circle',t:'Rotation externe à la fin.',w:0}]},
    ]},
    vendredi: { nom:'Soutiens-gorge + Abdos + Cou', emoji:'💪', exercices:[
      {nom:'Curl haltères alterné', sub:'Biceps brachial', s:3,reps:13,tempo:'2-1-2',rest:45,kg:12,view:'front',p:['Biceps brachial'], sec:['Brachial','Avant-bras'], fm:{biceps:1}, bm:{biceps:1}, alts:[{nom:'Curl barre EZ',det:'Barre EZ'}], tips:[{ic:'ti-alert-triangle',t:'Pas de balancement du buste.',w:1}]},
      {nom:'Curl marteau', sub:'Brachial · Avant-bras', s:3,reps:13,tempo:'2-1-2',rest:45,kg:14,view:'front',p:['Brachial','Avant-bras'], sec:['Biceps'], fm:{biceps:1}, bm:{biceps:1}, alts:[{nom:'Curl câble',det:'Poulie basse'}], tips:[{ic:'ti-info-circle',t:'Avant-bras engagés.',w:0}]},
      {nom:'Dips entre deux bancs', sub:'Triceps', s:3,reps:13,tempo:'2-1-2',rest:45,kg:0, view:'front',p:['Triceps'], sec:['Pectoraux inf.'], fm:{triceps:1}, bm:{triceps:1}, alts:[{nom:'Extensions nuque',det:'Haltère'}], tips:[{ic:'ti-alert-triangle',t:'Buste droit, coudes dans l\'axe.',w:1}]},
      {nom:'Relevé de bassin', sub:'Abdominaux inférieurs', s:3,reps:15,tempo:'2-1-2',rest:30,kg:0, view:'front',p:['Abdos inférieurs'], sec:['Transverse'], fm:{abs:1}, bm:{}, alts:[{nom:'Leg raise suspendu',det:'Barre'}], tips:[{ic:'ti-info-circle',t:'Bas du dos collé au sol.',w:0}]},
      {nom:'Gainage latéral', sub:'Obliques', s:3,reps:1, tempo:'—', rest:20,kg:0, view:'front',isTime:true,p:['Obliques'], sec:['Transverse'], fm:{obliques:1},bm:{}, alts:[{nom:'Crunch oblique',det:'Au sol'}], astuces :[{ic:'ti-info-circle',t:'Corps aligné, hanche haute.',w:0}]},
      {nom:'Renforcement cou', sub:'Muscles cervicaux', s:3,reps:13,tempo:'2-1-2',rest:30,kg:0, view:'back', p:['Sterno-cléido'], sec:['Trapèzes sup.'], fm:{}, bm:{trapezius_mid:1}, alts:[{nom:'Flexion nuque bande',det:'Élastique'}], tips:[{ic:'ti-alert-triangle',t:'Menton rentré, amplitude douce.',w:1}]},
    ]},
  }
}

fonction BodySVG({ vue, fm, bm }) {
  const m = vue === 'front' ? fm : bm
  const c = k => m[k] ? '#FF3B30' : '#E4E4E9'
  si (vue === 'front') retourner (
    <svg viewBox="0 0 160 290" width="90" height="175" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="21" rx="17" ry="19" fill="#E4E4E9" stroke="#ddd" strokeWidth=".5"/>
      <rect x="59" y="42" width="42" height="50" rx="6" fill={c('chest')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="63" y="92" width="34" height="36" rx="5" fill={c('abs')} stroke="#ddd" strokeWidth=".5"/>
      <line x1="80" y1="92" x2="80" y2="128" stroke="#ddd" strokeWidth=".8"/>
      <line x1="65" y1="106" x2="95" y2="106" stroke="#ddd" strokeWidth=".8"/>
      <line x1="65" y1="119" x2="95" y2="119" stroke="ddd" strokeWidth=".8"/>
      <rect x="59" y="92" width="7" height="36" rx="3" fill={c('obliques')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="94" y="92" width="7" height="36" rx="3" fill={c('obliques')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="61" y="128" width="17" height="58" rx="5" fill={c('quads')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="82" y="128" width="17" height="58" rx="5" fill={c('quads')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="63" y="188" width="13" height="44" rx="4" fill={c('calves')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="84" y="188" width="13" height="44" rx="4" fill={c('calves')} stroke="#ddd" strokeWidth=".5"/>
      <ellipse cx="50" cy="54" rx="10" ry="10" fill={c('front_delt')} stroke="#ddd" strokeWidth=".5"/>
      <ellipse cx="110" cy="54" rx="10" ry="10" fill={c('front_delt')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="31" y="63" width="16" height="44" rx="5" fill={c('biceps')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="113" y="63" width="16" height="44" rx="5" fill={c('biceps')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="31" y="107" width="14" height="34" rx="4" fill={c('triceps')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="115" y="107" width="14" height="34" rx="4" fill={c('triceps')} stroke="#ddd" strokeWidth=".5"/>
    </svg>
  )
  retour (
    <svg viewBox="0 0 160 290" width="90" height="175" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="80" cy="21" rx="17" ry="19" fill="#E4E4E9" stroke="#ddd" strokeWidth=".5"/>
      <rect x="59" y="42" width="42" height="50" rx="6" fill={c('latissimus')} stroke="#ddd" strokeWidth=".5" opacity=".9"/>
      <rect x="59" y="42" width="18" height="48" rx="5" fill={c('trapezius_mid')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="83" y="42" width="18" height="48" rx="5" fill={c('trapezius_mid')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="63" y="42" width="34" height="18" rx="4" fill={c('trapezius_lower')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="63" y="60" width="34" height="24" rx="4" fill={c('rhomboids')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="63" y="92" width="16" height="32" rx="4" fill={c('lower_back')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="81" y="92" width="16" height="32" rx="4" fill={c('lower_back')} stroke="#ddd" strokeWidth=".5"/>
      <ellipse cx="68" cy="132" rx="13" ry="12" fill={c('glutes')} stroke="#ddd" strokeWidth=".5"/>
      <ellipse cx="92" cy="132" rx="13" ry="12" fill={c('glutes')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="61" y="145" width="16" height="50" rx="5" fill={c('jambiers')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="83" y="145" width="16" height="50" rx="5" fill={c('jambiers')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="63" y="197" width="12" height="40" rx="4" fill={c('calves')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="85" y="197" width="12" height="40" rx="4" fill={c('calves')} stroke="#ddd" strokeWidth=".5"/>
      <ellipse cx="50" cy="54" rx="10" ry="10" fill={c('posterior_delt')} stroke="#ddd" strokeWidth=".5"/>
      <ellipse cx="110" cy="54" rx="10" ry="10" fill={c('posterior_delt')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="31" y="63" width="16" height="44" rx="5" fill={c('triceps')} stroke="#ddd" strokeWidth=".5"/>
      <rect x="113" y="63" width="16" height="44" rx="5" fill={c('triceps')} stroke="#ddd" strokeWidth=".5"/>
    </svg>
  )
}

export default function MusculationPage() {
  const [écran, setÉcran] = useState('programme')
  const [jourChoisi, setJourChoisi] = useState(null)
  const [cfg, setCfg] = useState([])
  const [curExo, setCurExo] = useState(0)
  const [bodyView, setBodyView] = useState('back')
  const [done, setDone] = useState([])
  const [skipped, setSkipped] = useState([])
  const [remplacé, setReplacé] = useState([])
  const [restState, setRestState] = useState(null)
  const [modalReplace, setModalReplace] = useState(null)
  const [modalConfirm, setModalConfirm] = useState(false)
  const [sessStart, setSessStart] = useState(null)
  const [sessEnd, setSessEnd] = useState(null)
  const [sessDisplay, setSessDisplay] = useState('--:--')
  const restRef = useRef(null)
  const sessRef = useRef(null)
  const { cycleActuel } = useStore()
  const cycle = PROGRAMME[cycleActuel] || PROGRAMME[1]
  const JOURS = ['lundi','mardi','jeudi','vendredi']
  const seance = jourChoisi ? cycle[jourChoisi] : null
  const exos = séance?.exercices || []

  utiliserEffect(() => {
    si (sessStart && !sessEnd) {
      sessRef.current = setInterval(() => {
        const s = Math.floor((Date.now() - sessStart) / 1000)
        setSessDisplay(`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`)
      }, 1000)
    }
    return () => clearInterval(sessRef.current)
  }, [début_session, fin_session])

  utiliserEffect(() => {
    si (!restState) retourner
    restRef.current = setInterval(() => {
      définir l'état de repos(r => {
        si (!r) retourner null
        if (r.secs <= 1) { clearInterval(restRef.current); const cb = r.cb; setTimeout(cb, 0); return null }
        retourner { ...r, secs: r.secs - 1 }
      })
    }, 1000)
    retourner () => effacerIntervalle(restRef.current)
  }, [restState?.label])

  fonction startRest(secs, label, cb) {
    effacerIntervalle(restRef.current)
    setRestState({ secs, total: secs, label, cb })
  }
  fonction skipRest() {
    effacerIntervalle(restRef.current)
    const cb = restState?.cb
    définir l'état de repos(null)
    setTimeout(() => cb?.(), 0)
  }

  fonction lancerConfig(jour) {
    définirJourChoisi(jour)
    const ex = cycle[jour].exercices
    setCfg(ex.map(e => ({ s: es, reps: e.reps, kg: e.kg, rest: e.rest })))
    setEcran('config')
  }

  fonction lancerSeance() {
    setDone(exos.map((_, i) => Array(cfg[i].s).fill(0)))
    setSkipped(Array(exos.length).fill(0))
    setReplaced(Array(exos.length).fill(null))
    définirCurExo(0)
    setBodyView(exos[0]?.view || 'back')
    setSessStart(Date.now())
    définirSessionFin(null)
    setSessDisplay('00:00')
    setEcran('séance')
  }

  fonction isSeanceDone(d, sk) {
    retourner exos.every((_, i) => sk[i] || d[i]?.every(Boolean))
  }

  fonction findNext(from, sk) {
    pour (soit i = from + 1; i < exos.length; i++) {
      si (!sk[i]) retourner i
    }
    renvoyer -1
  }

  fonction valider(serieIdx) {
    si (!sessStart) setSessStart(Date.now())
    const newDone = done.map(d => [...d])
    if (newDone[curExo][serieIdx]) {
      pour (soit i = serieIdx; i < newDone[curExo].length; i++) newDone[curExo][i] = 0
      setDone(newDone); retourner
    }
    pour (soit i = 0 ; i <= serieIdx ; i++) newDone[curExo][i] = 1
    définirTerminé(nouveauTerminé)
    const allThisExo = newDone[curExo].every(Boolean)
    si (!allThisExo) {
      const next = newDone[curExo].findIndex(v => !v)
      startRest(cfg[curExo].rest, `Série ${next + 1} dans…`, () => {})
      retour
    }
    si (isSeanceDone(newDone, skipped)) {
      startRest(cfg[curExo].rest, 'Récupération finale', () => setModalConfirm(true))
      retour
    }
    const nextIdx = findNext(curExo, skipped)
    si (nextIdx !== -1) {
      startRest(cfg[curExo].rest, `Exercice suivant : ${replaced[nextIdx]?.nom || exos[nextIdx].nom}`, () => {
        setCurExo(nextIdx); setBodyView(exos[nextIdx]?.view || 'back')
        si (isSeanceDone(newDone, skipped)) setModalConfirm(true)
      })
    }
  }

  fonction skipExo() {
    const newSk = [...ignoré]; newSk[curExo] = 1
    const newDone = done.map(d => [...d]); newDone[curExo] = Array(cfg[curExo].s).fill(0)
    setSkipped(newSk); setDone(newDone)
    if (isSeanceDone(newDone, newSk)) { setModalConfirm(true); return }
    const next = findNext(curExo, newSk)
    if (next !== -1) { setCurExo(next); setBodyView(exos[next]?.view || 'back') }
  }

  fonction doReplace(alt) {
    const r = [...remplacé]
    r[curExo] = { ...exos[curExo], nom : alt.nom }
    setReplaced(r); setModalReplace(null)
  }

  fonction afficherRésumé() {
    définirModalConfirm(false); définirSessEnd(Date.now())
    effacerIntervalle(sessRef.current); définirÉcran('reprise')
  }

  si (écran === 'programme') retourner (
    <div className="flex flex-col gap-3.5 p-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-medium tracking-tight">Programme muscu</h1>
        <Pill variant="red">Cycle {cycleActuel} · Endurance</Pill>
      </div>
      <Carte>
        <SectionLabel>Cycles</SectionLabel>
        <div className="flex gap-1.5 mb-3">
          {[{n:1,l:'Endurance'},{n:2,l:'Hypertrophie'},{n:3,l:'Force'}].map(c => (
            <div key={cn} className={`flex-1 p-2.5 rounded-sf-sm border text-center text-xs font-medium
              ${cn === cycleActuel ? 'bg-accent border-accent text-white' : 'border-sf-sep text-sf-t2 bg-white'}`}>
              Cycle {cn}<br/>
              <span className={`text-[10px] font-normal ${cn===cycleActuel?'text-red-100':'text-sf-t3'}`}>{cl}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 text-xs text-sf-t2 flex-wrap">
          <span><i className="ti ti-calendar mr-1"/>Semaine 1 / 3</span>
          <span><i className="ti ti-target mr-1"/>12-15 répétitions</span>
          <span><i className="ti ti-clock mr-1"/>Repos 30-45s</span>
        </div>
      </Carte>
      <Carte>
        <SectionLabel>Séances de la semaine</SectionLabel>
        {JOURS.map(j => {
          const s = cycle[j]
          retour (
            <div key={j} className="flex items-center gap-3 py-2.5 border-b border-sf-sep last:border-0">
              <div className="w-9 h-9 rounded-sf-sm bg-accent-light flex items-center justify-center text-lg flex-shrink-0">{s.emoji}</div>
              <div className="flex-1">
                <div className="text-sm font-medium capitalize">{j} — {s.nom}</div>
                <div className="text-xs text-sf-t2">{s.exercices.length} exercices · 45-60 min</div>
              </div>
              <button onClick={() => lancerConfig(j)} className="sf-btn-accent text-xs px-3 py-1.5">
                Lancer
              </button>
            </div>
          )
        })}
      </Carte>
    </div>
  )

  si (écran === 'config') retourner (
    <div className="flex flex-col gap-3.5 p-4">
      <button onClick={() => setEcran('programme')} className="flex items-center gap-1.5 text-info text-sm w-fit">
        <i className="ti ti-arrow-left" aria-hidden="true"/> Retour
      </button>
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-medium tracking-tight">{séance?.nom}</h1>
        <Pill variant="red">Cycle {cycleActuel}</Pill>
      </div>
      <p className="text-xs text-sf-t2 -mt-2">Configurer avant de commencer</p>
      {exos.map((e, i) => (
        <Card key={i}>
          <div className="text-sm font-medium mb-3">{e.nom}</div>
          {[
            {lbl:'Séries',key:'s',step:1,min:1},
            ...(!e.isTime?[{lbl:'Reps par série',key:'reps',step:1,min:1}]:[]),
            {lbl:'Charge (kg)',key:'kg',step:2.5,min:0,sub:'0 = poids du corps'},
            {lbl:'Repos (sec)',key:'rest',step:5,min:5},
          ].map(o => (
            <div key={o.key} className="flex items-center justify-between py-2 border-b border-sf-sep last:border-0">
              <div>
                <div className="text-sm">{o.lbl}</div>
                {o.sub && <div className="text-xs text-sf-t2">{o.sub}</div>}
              </div>
              <Stepper valeur={cfg[i]?.[o.key]??0} pas={o.step} min={o.min}
                onChange={v => setCfg(c => c.map((x,j) => j===i ? {...x,[o.key]:v} : x))}/>
            </div>
          ))}
        </Carte>
      ))}
      <button onClick={lancerSeance} className="sf-btn-accent w-full py-3 text-sm">
        <i className="ti ti-player-play" aria-hidden="true"/> Lancer la séance
      </button>
    </div>
  )

  si (écran === 'séance') {
    const ex = remplacé[curExo] || exos[curExo]
    const base = exos[curExo]
    const c = cfg[curExo]
    const dc = done[curExo]?.filter(Boolean).length || 0
    const allDone = done[curExo]?.every(Boolean)
    const sk = skipped[curExo]

    retour (
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-sm font-medium">{séance?.nom}</h1>
            <div className="text-xs text-sf-t2">
              Exercice {curExo+1}/{exos.length} ·{' '}
              <span className="text-sf-t3">{sessDisplay}</span>
            </div>
          </div>
          <Pill variant={allDone?'green':sk?'gray':dc>0?'orange':'gray'}>
            {allDone?'Terminé':sk?'Passé':dc>0?'En cours':'À faire'}
          </Pill>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4">
          {exos.map((e,i) => {
            const a = done[i]?.every(Boolean), sk2 = skipped[i]
            retour (
              <button key={i} onClick={() => {setCurExo(i);setBodyView(exos[i]?.view||'back')}}
                className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-medium
                  ${i===curExo?'bg-accent-light border-accent text-accent':a?'bg-success-light border-success text-green-700':sk2?'bg-sf-bg border-sf-sep text-sf-t3 line-through':'bg-white border-sf-sep text-sf-t2'}`}>
                {a?<i className="ti ti-check text-xs"/>:sk2?<i className="ti ti-minus text-xs"/>:i+1}
                {(replaced[i]?.nom||e.nom).split(' ').slice(0,2).join(' ')}
              </button>
            )
          })}
        </div>

        {restState && (
          <Card className="flex flex-col items-center gap-3 py-4">
            <div className="text-xs font-medium text-sf-t2 uppercase tracking-wider">Repos</div>
            <div className="relative w-20 h-20">
              <svg className="absolute inset-0" width="80" height="80" viewBox="0 0 90 90" style={{transform:'rotate(-90deg)'}}>
                <circle cx="45" cy="45" r="38" fill="none" stroke="#F2F2F7" strokeWidth="6"/>
                <circle cx="45" cy="45" r="38" fill="none" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray="239" strokeDashoffset={239*(1-restState.secs/restState.total)}
                  Stroke={restState.secs>10?'#30D158':restState.secs>5?'#FF9500':'#FF3B30'}
                  style={{transition:'stroke-dashoffset 0.9s linear,stroke 0.3s'}}/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-medium">{restState.secs}</div>
            </div>
            <div className="text-sm text-sf-t2">{restState.label}</div>
            <button onClick={skipRest} className="sf-btn text-xs px-4">Passer le repos</button>
          </Carte>
        )}

        {!restState && (
          <Carte>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-base font-medium">{ex?.nom}</div>
                <div className="text-xs text-sf-t2">{ex?.sub}</div>
              </div>
            </div>
            {!sk && (
              <div className="flex gap-2 mb-3">
                <button onClick={() => setModalReplace(base)}
                  <i className="sf-btn text-xs flex-1"><i className="ti ti-arrows-exchange text-sm"/> Remplacer</button>
                <button onClick={skipExo}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-sf-sm border text-xs font-medium cursor-pointer"
                  style={{color:'#FF3B30',borderColor:'#FF3B3030',background:'#FF3B3008'}}>
                  <i className="ti ti-player-skip-forward text-sm"/> Passeur
                </button>
              </div>
            )}
            {sk && (
              <div className="flex items-center gap-2 p-2.5 rounded-sf-sm mb-3"
                style={{background:'#FF3B3008',border:'0.5px solid #FF3B3030'}}>
                <i className="ti ti-alert-circle text-sm" style={{color:'#FF3B30'}}/>
                <span className="text-xs flex-1" style={{color:'#FF3B30'}}>Exercice passé</span>
                <button onClick={() => {const n=[...skipped];n[curExo]=0;setSkipped(n)}}
                  className="text-xs font-medium" style={{color:'#007AFF'}}>Annuler</button>
              </div>
            )}
            <div className="flex gap-3 mb-3">
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex bg-sf-bg rounded-lg p-0.5 gap-0.5">
                  {['avant','arrière'].map(v => (
                    <button key={v} onClick={() => setBodyView(v)}
                      className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${bodyView===v?'bg-white text-sf-t1':'text-sf-t2'}`}>
                      {v==='front'?'Face':'Dos'}
                    </button>
                  ))}
                </div>
                <BodySVG vue={bodyView} fm={ex?.fm||base.fm} bm={ex?.bm||base.bm}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium text-sf-t2 uppercase tracking-wider mb-1.5">Primaires</div>
                {(ex?.p||base.p).map((m,i) => (
                  <div key={i} className="flex items-center gap-1.5 mb-1 text-xs">
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0"/>{m}
                  </div>
                ))}
                <div className="text-[10px] font-medium text-sf-t2 uppercase tracking-wider mb-1.5 mt-2">Secondaires</div>
                {(ex?.sec||base.sec).map((m,i) => (
                  <div key={i} className="flex items-center gap-1.5 mb-1 text-xs">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:'#FF9500'}}/>{m}
                  </div>
                ))}
              </div>
            </div>
            {!sk && (
              <>
                <div className="text-xs font-medium text-sf-t2 uppercase tracking-wider mb-2">
                  {c?.s} séries · {base.isTime?'45 sec':`${c?.reps} reps`}{c?.kg>0?` · ${c?.kg} kg`:''} · repos {c?.rest}s
                </div>
                {done[curExo]?.map((d, i) => {
                  const isNext = !d && i === dc
                  retour (
                    <div key={i} className={`flex items-center gap-2.5 p-2.5 rounded-sf-sm border mb-1.5 last:mb-0 transition-all
                      ${d?'border-green-300':'isNext'?'border-accent bg-white':'border-sf-sep bg-sf-bg'}`}
                      style={d?{background:'#30D15808',borderColor:'#30D15840'}:isNext?{background:'#fff',borderColor:'#FF3B30'}:{}}>
                      <div className="flex-1">
                        <div className={`text-xs font-medium ${isNext?'text-accent':'text-sf-t2'}`}>Série {i+1}</div>
                        {d
                          ? <div className="text-xs font-medium" style={{color:'#1A8C3A'}}>
                              {base.isTime?'45 sec':`${c?.reps} répétitions`}{c?.kg>0?` · ${c?.kg} kg`:''} <i className="ti ti-check"/>
                            </div>
                          : <div className="text-sm text-sf-t1">
                              {base.isTime?'45 sec':`${c?.reps} reps`}{c?.kg>0?` · ${c?.kg} kg`:''}
                            </div>
                        }
                      </div>
                      <button onClick={() => validate(i)}
                        className={`w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center cursor-pointer transition-all
                          ${d?'bg-success border-success hover:bg-red-400 hover:border-red-400':'bg-white border-sf-sep hover:border-success'}`}>
                        <i className={`ti ti-check text-sm ${d?'text-white':'text-sf-t3'}`}/>
                      </button>
                    </div>
                  )
                })}
              </>
            )}
          </Carte>
        )}

        {!restState && (
          <Carte>
            <SectionLabel>Conseils</SectionLabel>
            {(ex?.tips||base.tips).map((t,i) => (
              <div key={i} className="flex gap-2 py-1.5 border-b border-sf-sep last:border-0 text-xs leading-relaxed">
                <i className={`ti ${t.ic} text-sm flex-shrink-0 mt-0.5 ${tw?'text-accent':'text-sf-t2'}`}/>
                <span style={tw?{color:'#FF3B30'}:{}}>{tt}</span>
              </div>
            ))}
          </Carte>
        )}

        {modalReplace && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-sf-lg p-4 w-72 shadow-lg">
              <div className="text-sm font-medium mb-1">Remplacer {modalReplace.nom}</div>
              <div className="text-xs text-sf-t2 mb-3">Choisissez une alternative :</div>
              <div className="flex flex-col gap-2 mb-3">
                {modalReplace.alts.map((a,i) => (
                  <button key={i} onClick={() => doReplace(a)}
                    className="flex items-center gap-2.5 p-2.5 rounded-sf-sm border border-sf-sep hover:bg-sf-bg text-left">
                    <div className="w-7 h-7 rounded-lg bg-info-light flex items-center justify-center flex-shrink-0">
                      <i className="ti ti-arrows-exchange text-info text-sm"/>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{a.nom}</div>
                      <div className="text-xs text-sf-t2">{a.det}</div>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setModalReplace(null)} className="sf-btn w-full text-xs">Annuler</button>
            </div>
          </div>
        )}

        {modalConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-sf-lg p-5 w-72 shadow-lg text-center">
              <div className="text-3xl mb-2">🏁</div>
              <div className="text-base font-medium mb-2">Séance terminée ?</div>
              <div className="text-sm text-sf-t2 mb-4 leading-relaxed">
                Tous les exercices sont terminés{skipped.filter(Boolean).length>0?` (${skipped.filter(Boolean).length} passé${skipped.filter(Boolean).length>1?'s':''})`:''}.
              </div>
              <div className="flex gap-2">
                <button onClick={() => setModalConfirm(false)} className="sf-btn flex-1 text-sm">Continuer</button>
                <button onClick={showSummary} className="sf-btn-success flex-1 text-sm">Voir le résumé</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  si (écran === 'résumer') {
    const durSec = sessEnd && sessStart ? Math.floor((sessEnd - sessStart) / 1000) : 0
    const durStr = `${String(Math.floor(durSec/60)).padStart(2,'0')}min ${String(durSec%60).padStart(2,'0')}s`
    soit ts=0,tr=0,tk=0 ; const mu={}
    exos.forEach((e,i) => {
      si (skipped[i])retourner
      const c=cfg[i], d=done[i]?.filter(Boolean).length||0
      ts+=d; tr+=d*(e.isTime?0:c.reps); tk+=d*c.reps*(c.kg||0)
      Object.entries({dos:40,biceps:20,trapèzes:20,...(e.mu||{})}).forEach(([k,v])=>{mu[k]=(mu[k]||0)+v*d})
    })
    const sorted=Object.entries(mu).sort((a,b)=>b[1]-a[1])
    const mx=sorted[0]?.[1]||1
    const cols=['#FF3B30','#FF9500','#30D158','#007AFF','#AF52DE']
    const skList=exos.filter((_,i)=>skipped[i])
    const repList=replaced.map((r,i)=>r?{orig:exos[i].nom,rep:r.nom}:null).filter(Boolean)

    retour (
      <div className="flex flex-col gap-3.5 p-4">
        <div>
          <h1 className="text-xl font-medium tracking-tight">Séance terminée</h1>
          <div className="text-sm text-sf-t2 mt-0.5 capitalize">{jourChoisi} — {séance?.nom}</div>
        </div>
        {skList.length>0 && (
          <div className="flex gap-2 p-3 rounded-sf-sm" style={{background:'#FF3B3008',border:'0.5px solid #FF3B3020'}}>
            <i className="ti ti-alert-circle text-sm mt-0.5 flex-shrink-0" style={{color:'#FF3B30'}}/>
            <div className="text-xs" style={{color:'#FF3B30'}}>
              <strong>{skList.length} exercice{skList.length>1?'s':''} passé{skList.length>1?'s':''} :</strong>{' '}
              {skList.map(e=>e.nom).join(', ')}
            </div>
          </div>
        )}
        {repList.map((r,i)=>(
          <div key={i} className="flex gap-2 p-3 rounded-sf-sm" style={{background:'#007AFF08',border:'0.5px solid #007AFF20'}}>
            <i className="ti ti-arrows-exchange text-sm mt-0.5 flex-shrink-0" style={{color:'#007AFF'}}/>
            <div className="text-xs" style={{color:'#007AFF'}}><strong>{r.orig}</strong> remplacé par <strong>{r.rep}</strong></div>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            {icon:'ti-clock',bg:'#30D15815',color:'#30D158',val:durStr,lbl:'Durée'},
            {icon:'ti-refresh',bg:'#FF3B3015',color:'#FF3B30',val:`${ts} séries`,lbl:'Séries validées'},
            {icon:'ti-arrows-up-down',bg:'#007AFF15',color:'#007AFF',val:tr>0?`${tr} reps`:'—',lbl:'Répétitions'},
            {icon:'ti-weight',bg:'#FF950015',color:'#FF9500',val:tk>0?`${tk.toLocaleString('fr')} kg`:'Poids corps',lbl:'Volume soulevé'},
          ].map((s,i)=>(
            <div key={i} className="sf-card">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{background:s.bg}}>
                <i className={`ti ${s.icon} text-sm`} style={{color:s.color}}/>
              </div>
              <div className="text-lg font-medium">{s.val}</div>
              <div className="text-xs text-sf-t2">{s.lbl}</div>
            </div>
          ))}
        </div>
        <Carte>
          <SectionLabel>Muscles sollicités</SectionLabel>
          {sorted.slice(0,6).map(([k,v],i)=>{
            const p=Math.round(v/mx*100)
            retour (
              <div key={k} className="flex items-center gap-2 mb-2 last:mb-0">
                <div className="text-xs w-24 flex-shrink-0 capitalize">{k}</div>
                <div className="flex-1 h-1.5 bg-sf-bg rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${p}%`,background:cols[i%5]}}/>
                </div>
                <div className="text-xs text-sf-t2 w-8 text-right">{p}%</div>
              </div>
            )
          })}
        </Carte>
        <Carte>
          <SectionLabel>Bilan</SectionLabel>
          <div className="text-sm leading-relaxed">
            Séance <strong>{seance?.nom}</strong> terminée en {durStr}.<br/>
            {sorted.length>0&&<>Muscles principaux : <strong>{sorted.slice(0,3).map(([k])=>k).join(', ')}</strong>.<br/></>}
            {tk>0&&<>Volume total : <strong>{tk.toLocaleString('fr')} kg</strong>.<br/></>}
          </div>
        </Carte>
        <button onClick={() => setEcran('programme')} className="sf-btn-accent w-full py-3 text-sm">
          Retour au programme
        </button>
      </div>
    )
  }
}// MusculationPage.jsx
import { useStore } from '@/lib/store'
export default function MusculationPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-medium mb-4">Programme musculation</h1>
      <div className="sf-card text-center py-10 text-sf-t2 text-sm">
        Module séance — à brancher sur le composant SeanceFlow existant
      </div>
    </div>
  )
}
