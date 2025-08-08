// src/app/properties/[listingId]/PropertyPageClient.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  HStack,
  Image as ChakraImage,
  SimpleGrid,
  Stack,
  Text,
  Tag,
  Divider,
  useToken,
} from '@chakra-ui/react'
import PublicReviewsSection from '@/components/PublicReviewsSection'
import { propertyImages } from '@/lib/propertyImages'

export default function PropertyPageClient({
  listingId,
}: {
  listingId: string
}) {
  const [data, setData] = useState<any[]>([])
  const [brand50] = useToken('colors', ['brand.50'])

  const qs = useMemo(
    () => `?listingId=${encodeURIComponent(listingId)}&sort=date_desc`,
    [listingId],
  )

  useEffect(() => {
    fetch(`/api/reviews/hostaway${qs}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.ok) setData(j.data)
      })
  }, [qs])

  const listingSlug = decodeURIComponent(listingId)
  const listingName = data[0]?.listingName ?? listingSlug.replace(/-/g, ' ')
  const imageSrc = propertyImages[listingName] ?? '/images/default-property.jpg'

  return (
    <Box maxW="1100px" mx="auto">
      <Breadcrumb fontSize="sm" mb={4}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{listingName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mb={6}>
        <ChakraImage
          src={imageSrc}
          alt={listingName}
          rounded="xl"
          objectFit="cover"
          h={{ base: '220px', md: '320px' }}
          border="1px solid"
          borderColor={brand50}
        />
        <Stack spacing={3} justify="center">
          <Heading size="xl">{listingName}</Heading>
          <HStack spacing={2}>
            <Tag>2 guests</Tag>
            <Tag>1 bedroom</Tag>
            <Tag>Great location</Tag>
          </HStack>
          <Text color="gray.600">
            A modern, comfy flat in a vibrant neighborhood. Walk to cafes,
            galleries, and transit.
          </Text>
        </Stack>
      </SimpleGrid>

      <Divider mb={6} />

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
        <Box bg="white" p={4} rounded="lg" boxShadow="sm">
          <Heading size="sm" mb={2}>
            Highlights
          </Heading>
          <Text color="gray.600">
            Keyless entry, fast Wi-Fi, fully equipped kitchen.
          </Text>
        </Box>
        <Box bg="white" p={4} rounded="lg" boxShadow="sm">
          <Heading size="sm" mb={2}>
            Neighborhood
          </Heading>
          <Text color="gray.600">
            Soho / Shoreditch vibes. Nightlife, dining, and art on your
            doorstep.
          </Text>
        </Box>
        <Box bg="white" p={4} rounded="lg" boxShadow="sm">
          <Heading size="sm" mb={2}>
            House Rules
          </Heading>
          <Text color="gray.600">
            No parties, no smoking, quiet hours after 10pm.
          </Text>
        </Box>
      </SimpleGrid>

      <PublicReviewsSection data={data} />
    </Box>
  )
}
