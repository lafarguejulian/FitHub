import { useStore } from '@/lib/store'
import { clsx } from 'clsx'

const NAV = [
  { section: 'Général' },
  { id: 'dashboard', icon: 'ti-layout-dashboard', label: 'Dashboard' },
  { id: 'muscu',     icon: 'ti-barbell',           label: 'Programme' },
  { section: 'Nutrition' },
  { id: 'nutrition', icon: 'ti-salad',             label: 'Suivi macros' },
  { id: 'recettes',  icon: 'ti-tools-kitchen-2',   label: 'Recettes IA' },
  { id: 'planning',  icon: 'ti-calendar-week',     label: 'Planning' },
  { id: 'courses',   icon: 'ti-shopping-cart',     label: 'Courses' },
  { section: 'Santé' },
  { id: 'sante',     icon: 'ti-heart-rate-monitor', label: 'Santé iPhone' },
  { section: 'Compte' },
  { id: 'profil',    icon: 'ti-settings',           label: 'Profil & objectifs' },
]

export default function Sidebar() {
  const { page, setPage } = useStore()

  return (
    <aside className="w-48 min-w-[192px] bg-white border-r border-sf-sep flex flex-col">
      {/* Logo */}
      <div className="px-3.5 py-4 flex items-center gap-2.5 border-b border-sf-sep">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
          <i className="ti ti-bolt text-white text-base" aria-hidden="true" />
        </div>
        <div>
          <div className="text-sm font-medium leading-tight">FitHub</div>
          <div className="text-xs text-sf-t2">Ton hub fitness</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 overflow-y-auto">
        {NAV.map((item, i) =>
          item.section ? (
            <div key={i} className="text-[10px] font-medium text-sf-t3 uppercase tracking-widest px-2 pt-3 pb-1">
              {item.section}
            </div>
          ) : (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={clsx(
                'nav-item w-full text-left',
                page === item.id && 'active'
              )}
            >
              <i className={`ti ${item.icon} text-base`} aria-hidden="true" />
              {item.label}
            </button>
          )
        )}
      </nav>

      {/* Coach share */}
      <div className="p-3">
        <button className="w-full py-2 rounded-sf bg-accent text-white text-sm font-medium
                           flex items-center justify-center gap-1.5 hover:bg-accent-dark transition-colors">
          <i className="ti ti-link text-sm" aria-hidden="true" />
          Vue coach
        </button>
      </div>
    </aside>
  )
}
