'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  useDisclosure,
} from '@chakra-ui/react'
import { FiFilter } from 'react-icons/fi'
import SidePanel from '@/components/SidePanel'
import Filters, { FiltersState } from '@/components/Filters' // only for type
import ReviewList from '@/components/ReviewList'
import TrendChart from '@/components/TrendChart'
import ApprovalControls from '@/components/ApprovalControls'
import { syncApprovalsFromServer } from '@/lib/approvals'

export default function DashboardPage() {
  useEffect(() => {
    syncApprovalsFromServer()
  }, [])

  const [filters, setFilters] = useState<FiltersState>({ sort: 'date_desc' })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const qs = useMemo(() => {
    const p = new URLSearchParams()
    if (filters.q) p.set('q', filters.q)
    if (filters.minRating != null) p.set('minRating', String(filters.minRating))
    if (filters.from) p.set('from', filters.from) // YYYY-MM-DD
    if (filters.to) p.set('to', filters.to) // YYYY-MM-DD
    if (filters.sort) p.set('sort', filters.sort)
    const s = p.toString()
    return s ? `?${s}` : ''
  }, [filters])

  return (
    <Flex minH="100vh" bg="cream">
      {/* Desktop sidebar */}
      <Box display={{ base: 'none', md: 'block' }}>
        <SidePanel onChange={setFilters} />
      </Box>

      {/* Mobile filter launcher */}
      <Box
        position="fixed"
        top={3}
        left={3}
        zIndex={20}
        display={{ base: 'block', md: 'none' }}
      >
        <Button
          size="sm"
          leftIcon={<Icon as={FiFilter} />}
          variant="secondary"
          onClick={onOpen}
        >
          Filter Menu
        </Button>
      </Box>

      {/* Mobile drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent p={0}>
          <SidePanel onChange={setFilters} />
        </DrawerContent>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box
        flex="1"
        px={{ base: 4, md: 6 }}
        py={{ base: 16, md: 6 }} // extra top space on mobile for the Filters button
        w="100%"
        maxW="1100px"
        mx="auto"
      >
        <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
          {/* Reviews */}
          <Box flex={{ base: 'unset', lg: 2 }} minW={0}>
            <Heading size="md" mb={3} fontSize={{ base: 'lg', md: 'xl' }}>
              Reviews
            </Heading>
            <ReviewList qs={qs} enableApproval />
          </Box>

          {/* Chart + Approvals */}
          <Box
            flex={{ base: 'unset', lg: 1 }}
            minW={{ base: 'auto', lg: '320px' }}
          >
            <Heading size="md" mb={3} fontSize={{ base: 'lg', md: 'xl' }}>
              Average Rating Over Time
            </Heading>
            <TrendChart qs={qs} dateLabelFontSize={10} dateLabelMargin={10} />

            <Divider my={{ base: 4, md: 5 }} />
            <Box>
              <ApprovalControls />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}
