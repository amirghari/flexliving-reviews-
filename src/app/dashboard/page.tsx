'use client'

import { useMemo, useState } from 'react'
import { Box, Container, Divider, Flex, Heading } from '@chakra-ui/react'
import SidePanel from '@/components/SidePanel'
import Filters, { FiltersState } from '@/components/Filters' // only for type
import ReviewList from '@/components/ReviewList'
import TrendChart from '@/components/TrendChart'
import ApprovalControls from '@/components/ApprovalControls'

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
    <Flex minH="100vh" bg="gray.50">
      {/* LEFT SIDEBAR WITH FILTERS */}
      <SidePanel onChange={setFilters} />

      {/* MAIN CONTENT */}
      <Box flex="1" p={{ base: 4, md: 6 }} maxW="1100px" mx="auto">
        <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
          {/* Reviews */}
          <Box flex="2" minW={0}>
            <Heading size="md" mb={3}>
              Reviews
            </Heading>
            <ReviewList qs={qs} enableApproval />
          </Box>

          {/* Chart + Approvals */}
          <Box flex="1" minW="320px">
            <Heading size="md" mb={3}>
              Average Rating Over Time
            </Heading>
            <TrendChart qs={qs} dateLabelFontSize={10} dateLabelMargin={10} />

            {/* extra space between chart and approvals */}
            <Divider my={5} />

            <Heading size="sm" mb={2}>
              Approvals Export/Import
            </Heading>
            <Box>
              <ApprovalControls />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}
