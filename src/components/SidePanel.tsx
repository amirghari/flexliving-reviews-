'use client'

import { Box, Flex, Heading, Image, useColorModeValue } from '@chakra-ui/react'
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
      rounded="xl"
      borderWidth="1px"
      boxShadow="sm"
      borderColor={border}
      p={4}
      pos={{ md: 'sticky' }}
      top={2}
      h={{ md: '75vh' }}
      overflowY="auto"
    >
      <Flex align="center" gap={2} mb={50}>
        <Image
          src="/favicon-white.png"
          alt="Manager Dashboard Icon"
          boxSize="40px"
          mr={2}
          sx={{
            filter:
              'brightness(0) saturate(100%) invert(21%) sepia(10%) saturate(1042%) hue-rotate(118deg) brightness(95%) contrast(92%)', // deep green tint
          }}
        />
        <Heading size="md">Manager Dashboard</Heading>
      </Flex>

      {/* Filters stacked vertically */}
      <Filters onChange={onChange} layout="vertical" />
    </Box>
  )
}
