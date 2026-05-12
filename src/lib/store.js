import { create } from 'zustand'
import { supabase } from './supabase'

export const useStore = create((set, get) => ({
  // ── Auth ──────────────────────────────────────────────────────────────────
  user: null,
  profil: null,
  setUser: (user) => set({ user }),
  setProfil: (profil) => set({ profil }),

  // ── Navigation ────────────────────────────────────────────────────────────
  page: 'dashboard', // dashboard | muscu | seance | nutrition | planning | courses | sante
  setPage: (page) => set({ page }),

  // ── Dashboard data ────────────────────────────────────────────────────────
  today: new Date().toISOString().split('T')[0],
  sante: null,
  nutritionToday: null,
  setSante: (sante) => set({ sante }),
  setNutritionToday: (n) => set({ nutritionToday: n }),

  // ── Programme muscu ───────────────────────────────────────────────────────
  cycleActuel: 1,      // 1 = Endurance, 2 = Hypertrophie, 3 = Force
  semaineActuelle: 1,
  seanceEnCours: null,
  setSeanceEnCours: (s) => set({ seanceEnCours: s }),
  historiqueSeances: [],
  setHistoriqueSeances: (h) => set({ historiqueSeances: h }),

  // ── Nutrition ─────────────────────────────────────────────────────────────
  recettes: [],
  setRecettes: (r) => set({ recettes: r }),
  planningActuel: null,
  setPlanningActuel: (p) => set({ planningActuel: p }),
  listeCourses: [],
  setListeCourses: (l) => set({ listeCourses: l }),
  enseignesSelectionnees: new Set(['lec']),
  setEnseignes: (e) => set({ enseignesSelectionnees: e }),

  // ── Chargement données du jour ────────────────────────────────────────────
  async loadToday() {
    const { user } = get()
    if (!user) return
    const today = get().today

    // Santé
    const { data: sante } = await supabase
      .from('sante_log')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single()
    if (sante) set({ sante })

    // Nutrition
    const { data: nutri } = await supabase
      .from('nutrition_log')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single()
    if (nutri) set({ nutritionToday: nutri })
  },

  // ── Sauvegarder résumé séance ─────────────────────────────────────────────
  async saveSeance(resume) {
    const { user } = get()
    if (!user) return
    const { data } = await supabase.from('seances').insert({
      user_id: user.id,
      ...resume
    }).select().single()
    return data
  }
}))
