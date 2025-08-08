'use client'

import { Box, Flex, Heading, Icon, useColorModeValue } from '@chakra-ui/react'
import { MdDashboard } from 'react-icons/md'
import Filters, { FiltersState } from '@/components/Filters'

export default function SidePanel({
  onChange,
}: {
  onChange: (s: FiltersState) => void
}) {
  const bg = useColorModeValue('white', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      w={{ base: '100%', md: '300px' }}
      bg={bg}
      borderColor={border}
      p={4}
      pos={{ md: 'sticky' }}
      top={0}
      h={{ md: '100vh' }}
      overflowY="auto"
    >
      <Flex align="center" mb={100}>
        <Icon as={MdDashboard} boxSize={6} color="blue.500" mr={2} />
        <Heading size="md">Manager Dashboard</Heading>
      </Flex>

      {/* Filters stacked vertically */}
      <Filters onChange={onChange} layout="vertical" />
    </Box>
  )
}
