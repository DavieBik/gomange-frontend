import '../../styles/global.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GoMange CMS',
  description: 'Restaurant management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
}