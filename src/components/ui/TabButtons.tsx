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
    <div className={`flex items-center gap-1 p-1 bg-gray-100 rounded-xl ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => tab.variant !== 'disabled' && onChange(tab.id)}
          disabled={tab.variant === 'disabled'}
          className={`
            relative flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500
            ${tabClassName}
            ${
              activeId === tab.id 
                ? `text-white bg-primary-500 shadow-md ${activeTabClassName}`
                : tab.variant === 'disabled'
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
            }
            ${
              activeId === tab.id 
                ? 'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-1 after:bg-white after:rounded-full'
                : ''
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}