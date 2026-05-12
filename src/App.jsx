import { useStore } from '@/lib/store'
import Sidebar from '@/components/shared/Sidebar'
import Dashboard from '@/components/dashboard/Dashboard'
import { lazy, Suspense } from 'react'

// Lazy loading des modules (chargés seulement quand on y va)
const MusculationPage  = lazy(() => import('@/pages/MusculationPage'))
const NutritionPage    = lazy(() => import('@/pages/NutritionPage'))
const RecettesPage     = lazy(() => import('@/pages/RecettesPage'))
const PlanningPage     = lazy(() => import('@/pages/PlanningPage'))
const CoursesPage      = lazy(() => import('@/pages/CoursesPage'))
const SantePage        = lazy(() => import('@/pages/SantePage'))
const ProfilPage       = lazy(() => import('@/pages/ProfilPage'))

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-sf-t2">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <div className="text-sm">Chargement…</div>
      </div>
    </div>
  )
}

const PAGES = {
  dashboard: <Dashboard />,
  muscu:     <Suspense fallback={<PageLoader />}><MusculationPage /></Suspense>,
  nutrition: <Suspense fallback={<PageLoader />}><NutritionPage /></Suspense>,
  recettes:  <Suspense fallback={<PageLoader />}><RecettesPage /></Suspense>,
  planning:  <Suspense fallback={<PageLoader />}><PlanningPage /></Suspense>,
  courses:   <Suspense fallback={<PageLoader />}><CoursesPage /></Suspense>,
  sante:     <Suspense fallback={<PageLoader />}><SantePage /></Suspense>,
  profil:    <Suspense fallback={<PageLoader />}><ProfilPage /></Suspense>,
}

export default function App() {
  const { page } = useStore()

  return (
    <div className="flex min-h-screen bg-sf-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {PAGES[page] || <Dashboard />}
      </main>
    </div>
  )
}
