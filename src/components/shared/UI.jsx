import { clsx } from 'clsx'

// ── Card ──────────────────────────────────────────────────────────────────────
export function Card({ children, className, ...props }) {
  return (
    <div className={clsx('sf-card', className)} {...props}>
      {children}
    </div>
  )
}

// ── Label section ─────────────────────────────────────────────────────────────
export function SectionLabel({ children, right }) {
  return (
    <div className="sf-lbl flex items-center justify-between">
      <span>{children}</span>
      {right && <span className="normal-case font-normal">{right}</span>}
    </div>
  )
}

// ── Pill / Badge ──────────────────────────────────────────────────────────────
const PILL_VARIANTS = {
  red:    'bg-accent-light text-accent',
  green:  'bg-success-light text-green-700',
  orange: 'bg-energy-light text-orange-700',
  blue:   'bg-info-light text-blue-700',
  purple: 'bg-purple-light text-purple-700',
  gray:   'bg-sf-bg text-sf-t2',
}
export function Pill({ children, variant = 'gray', className }) {
  return (
    <span className={clsx('sf-pill', PILL_VARIANTS[variant], className)}>
      {children}
    </span>
  )
}

// ── Progress bar ──────────────────────────────────────────────────────────────
const BAR_COLORS = {
  red: '#FF3B30', blue: '#007AFF', orange: '#FF9500', green: '#30D158', purple: '#AF52DE'
}
export function ProgressBar({ label, value, max, color = 'red', unit = '' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs text-sf-t2 mb-1">
        <span>{label}</span>
        <span>{value} / {max}{unit}</span>
      </div>
      <div className="sf-prog-bar">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: BAR_COLORS[color] }}
        />
      </div>
    </div>
  )
}

// ── Metric card ───────────────────────────────────────────────────────────────
export function MetricCard({ icon, iconBg, iconColor, value, unit, label, delta, deltaColor }) {
  return (
    <div className="sf-metric">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ background: iconBg }}
      >
        <i className={`ti ${icon} text-sm`} style={{ color: iconColor }} aria-hidden="true" />
      </div>
      <div className="text-[19px] font-medium leading-tight tracking-tight">
        {value} <span className="text-xs font-normal text-sf-t2">{unit}</span>
      </div>
      <div className="text-xs text-sf-t2">{label}</div>
      {delta && (
        <div className="text-xs font-medium" style={{ color: deltaColor || '#30D158' }}>
          {delta}
        </div>
      )}
    </div>
  )
}

// ── Row item ──────────────────────────────────────────────────────────────────
export function Row({ left, right, sub, className }) {
  return (
    <div className={clsx('flex items-center justify-between py-2 border-b border-sf-sep last:border-0', className)}>
      <div>
        <div className="text-sm font-medium text-sf-t1">{left}</div>
        {sub && <div className="text-xs text-sf-t2 mt-0.5">{sub}</div>}
      </div>
      <div className="text-sm font-medium text-sf-t2">{right}</div>
    </div>
  )
}

// ── Add button ────────────────────────────────────────────────────────────────
export function AddButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full mt-2 py-2 rounded-sf-sm border border-dashed border-sf-sep
                 bg-transparent text-sf-t2 text-xs flex items-center justify-center gap-1.5
                 cursor-pointer hover:bg-sf-bg transition-colors"
    >
      <i className="ti ti-plus text-sm" aria-hidden="true" />
      {children}
    </button>
  )
}

// ── Stepper (config séance) ───────────────────────────────────────────────────
export function Stepper({ value, onChange, min = 0, step = 1, format }) {
  return (
    <div className="flex items-center gap-0">
      <button
        className="w-8 h-8 rounded-lg border border-sf-sep bg-sf-bg text-lg
                   flex items-center justify-center cursor-pointer hover:bg-sf-sep"
        onClick={() => onChange(Math.max(min, +(value - step).toFixed(1)))}
      >−</button>
      <div className="min-w-[44px] text-center text-sm font-medium px-1">
        {format ? format(value) : value}
      </div>
      <button
        className="w-8 h-8 rounded-lg border border-sf-sep bg-sf-bg text-lg
                   flex items-center justify-center cursor-pointer hover:bg-sf-sep"
        onClick={() => onChange(+(value + step).toFixed(1))}
      >+</button>
    </div>
  )
}

// ── Toggle switch ─────────────────────────────────────────────────────────────
export function Toggle({ checked, onChange }) {
  return (
    <div
      className="w-9 h-5 rounded-full relative cursor-pointer transition-colors duration-200"
      style={{ background: checked ? '#30D158' : 'rgba(60,60,67,0.2)' }}
      onClick={() => onChange(!checked)}
    >
      <div
        className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200"
        style={{ left: checked ? '18px' : '2px' }}
      />
    </div>
  )
}
