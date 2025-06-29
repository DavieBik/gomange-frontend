// components/ui/TabButtons.tsx
'use client'

interface Tab {
  id: string
  label: string
  variant: 'primary' | 'secondary' | 'disabled'
}

interface TabButtonsProps {
  tabs: Tab[]
  activeId: string
  onChange: (id: string) => void
  className?: string
  tabClassName?: string
  activeTabClassName?: string
}

export default function TabButtons({
  tabs,
  activeId,
  onChange,
  className = '',
  tabClassName = '',
  activeTabClassName = '',
}: TabButtonsProps) {
  return (
    <div className={`flex items-center gap-3 p-3 bg-white rounded-xl shadow-md border border-gray-200 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => tab.variant !== 'disabled' && onChange(tab.id)}
          disabled={tab.variant === 'disabled'}
          className={`
            flex-1 text-sm
            ${tabClassName}
            ${
              activeId === tab.id 
                ? `btn-tab-active ${activeTabClassName}` // Botón activo con borde
                : tab.variant === 'disabled'
                  ? 'btn-disabled bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-300 px-6 py-3 rounded-lg'
                  : 'btn-tab-inactive' // Botón inactivo con borde
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}