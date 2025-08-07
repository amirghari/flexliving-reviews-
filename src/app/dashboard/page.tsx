'use client'
import { useMemo, useState } from 'react'
import Filters, { FiltersState } from '@/components/Filters'
import ReviewList from '@/components/ReviewList'
import TrendChart from '@/components/TrendChart'
import ApprovalControls from '@/components/ApprovalControls'
import { Heading, SimpleGrid, Box } from '@chakra-ui/react'

export default function DashboardPage() {
  const [filters, setFilters] = useState<FiltersState>({ sort: 'date_desc' })

  const qs = useMemo(() => {
    const p = new URLSearchParams()
    if (filters.listingId) p.set('listingId', filters.listingId)
    if (filters.minRating != null) p.set('minRating', String(filters.minRating))
    if (filters.q) p.set('q', filters.q)
    if (filters.sort) p.set('sort', filters.sort)
    return `?${p.toString()}`
  }, [filters])

  return (
    <Box maxW="1100px" mx="auto" p={4}>
      <Heading size="lg" mb={4}>
        Manager Dashboard
      </Heading>
      <Filters onChange={setFilters} />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
        <Box gridColumn={{ md: 'span 2' }}>
          <Heading size="md" mb={2}>
            Reviews
          </Heading>
          <ReviewList qs={qs} enableApproval />
        </Box>
        <Box>
          <Heading size="md" mb={2}>
            Average Rating Over Time
          </Heading>
          <TrendChart qs={qs} />
          <Box mt={4}>
            <Heading size="sm" mb={2}>
              Approvals Export/Import
            </Heading>
            <ApprovalControls />
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  )
}
