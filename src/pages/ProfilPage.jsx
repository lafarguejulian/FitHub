import { useState } from 'react'
import { Card, SectionLabel, Stepper, Pill } from '@/components/shared/UI'

export default function ProfilPage() {
  const [profil, setProfil] = useState({
    prenom: 'Thomas',
    poids: 79.4,
    objectif: 'prise_muscle',
    calories: 2400,
    proteines: 160,
    glucides: 240,
    lipides: 70,
  })

  const upd = (k, v) => setProfil(p => ({ ...p, [k]: v }))

  return (
    <div className="flex flex-col gap-3.5 p-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-medium tracking-tight">Profil & objectifs</h1>
        <Pill variant="green">Sauvegardé</Pill>
      </div>

      <Card>
        <SectionLabel>Informations</SectionLabel>
        <div className="flex items-center justify-between py-2 border-b border-sf-sep">
          <span className="text-sm text-sf-t2">Prénom</span>
          <span className="text-sm font-medium">{profil.prenom}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-sf-sep">
          <span className="text-sm text-sf-t2">Poids actuel</span>
          <Stepper value={profil.poids} onChange={v => upd('poids', v)} step={0.1} min={40} format={v => `${v} kg`} />
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-sf-t2">Objectif</span>
          <select
            value={profil.objectif}
            onChange={e => upd('objectif', e.target.value)}
            className="text-sm font-medium border border-sf-sep rounded-lg px-2 py-1 bg-white"
          >
            <option value="prise_muscle">Prise de muscle</option>
            <option value="perte_gras">Perte de gras</option>
            <option value="recomposition">Recomposition</option>
            <option value="force">Force pure</option>
          </select>
        </div>
      </Card>

      <Card>
        <SectionLabel>Objectifs nutritionnels / jour</SectionLabel>
        {[
          { lbl: 'Calories',  key: 'calories',  step: 50,  min: 1200, format: v => `${v} kcal` },
          { lbl: 'Protéines', key: 'proteines', step: 5,   min: 50,   format: v => `${v} g` },
          { lbl: 'Glucides',  key: 'glucides',  step: 10,  min: 50,   format: v => `${v} g` },
          { lbl: 'Lipides',   key: 'lipides',   step: 5,   min: 20,   format: v => `${v} g` },
        ].map(o => (
          <div key={o.key} className="flex items-center justify-between py-2 border-b border-sf-sep last:border-0">
            <span className="text-sm text-sf-t2">{o.lbl}</span>
            <Stepper value={profil[o.key]} onChange={v => upd(o.key, v)} step={o.step} min={o.min} format={o.format} />
          </div>
        ))}
      </Card>

      <Card>
        <SectionLabel>Programme muscu</SectionLabel>
        {[
          { lbl: 'Cycle actuel',   val: 'Cycle 1 — Endurance' },
          { lbl: 'Semaine',        val: 'Semaine 1 / 3' },
          { lbl: 'Séances / sem.', val: '4 (Lun · Mar · Jeu · Ven)' },
          { lbl: 'Prochain cycle', val: 'Cycle 2 — Hypertrophie' },
        ].map((r, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-sf-sep last:border-0">
            <span className="text-sm text-sf-t2">{r.lbl}</span>
            <span className="text-sm font-medium">{r.val}</span>
          </div>
        ))}
      </Card>

      <button className="sf-btn-accent w-full py-3 text-sm">
        <i className="ti ti-device-floppy text-sm" aria-hidden="true" /> Sauvegarder les modifications
      </button>
    </div>
  )
}
