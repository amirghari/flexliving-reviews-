import type { Metadata } from 'next'
import Providers from './providers'
import './globals.css' // make sure this is here

export const metadata: Metadata = {
  title: 'Flex Living Reviews Dashboard',
  description: 'Manager dashboard and property pages for reviews',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="app-shell">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
