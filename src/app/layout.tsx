import '../../styles/global.css'
import type { Metadata } from 'next'
import 'keen-slider/keen-slider.min.css'

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
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Lobster:wght@400&family=Poppins:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
}