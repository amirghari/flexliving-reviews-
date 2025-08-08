import type { Metadata } from 'next'
import Providers from './providers'
import { Box } from '@chakra-ui/react'

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
          {/* Global breathing room for the whole app */}
          <Box minH="100vh" bg="gray.50" p={{ base: 4, md: 8 }}>
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  )
}
