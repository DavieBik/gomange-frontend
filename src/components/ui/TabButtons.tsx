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
    <div className={`flex items-center gap-3 p-2 bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => tab.variant !== 'disabled' && onChange(tab.id)}
          disabled={tab.variant === 'disabled'}
          className={`
            flex-1 text-sm font-semibold px-4 py-2 rounded-md border transition-colors duration-150
            ${tabClassName}
            ${
              activeId === tab.id
                ? `bg-primary-600 text-white border-primary-600 shadow-sm ${activeTabClassName}`
                : tab.variant === 'disabled'
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                  : 'bg-white text-primary-700 border-primary-200 hover:bg-primary-50 hover:text-primary-900'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}