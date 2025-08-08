'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Heading,
  HStack,
  Image as ChakraImage,
  SimpleGrid,
  Stack,
  Tag,
  Text,
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
    <Box
      maxW="1100px"
      mx="auto"
      px={{ base: 4, md: 6 }}
      py={{ base: 6, md: 8 }}
    >
      {/* Breadcrumb */}
      <Breadcrumb fontSize={{ base: 'xs', md: 'sm' }} mb={{ base: 3, md: 4 }}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{listingName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Hero: image + details */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 6 }} mb={6}>
        <ChakraImage
          src={imageSrc}
          alt={listingName}
          rounded="xl"
          objectFit="cover"
          w="100%"
          h={{ base: '220px', md: '340px' }}
          border="1px solid"
          borderColor={brand50}
        />
        <Stack spacing={{ base: 2, md: 3 }} justify="center">
          <Heading fontSize={{ base: 'xl', md: '2xl' }}>{listingName}</Heading>
          <HStack spacing={2} flexWrap="wrap">
            <Tag>2 guests</Tag>
            <Tag>1 bedroom</Tag>
            <Tag>Great location</Tag>
          </HStack>
          <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
            A modern, comfy flat in a vibrant neighborhood. Walk to cafes,
            galleries, and transit.
          </Text>
        </Stack>
      </SimpleGrid>

      <Divider mb={{ base: 5, md: 6 }} />

      {/* Info cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 4, md: 6 }} mb={8}>
        <Box bg="white" p={{ base: 3, md: 4 }} rounded="lg" boxShadow="sm">
          <Heading size="sm" mb={2}>
            Highlights
          </Heading>
          <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
            Keyless entry, fast Wi‑Fi, fully equipped kitchen.
          </Text>
        </Box>

        <Box bg="white" p={{ base: 3, md: 4 }} rounded="lg" boxShadow="sm">
          <Heading size="sm" mb={2}>
            Neighborhood
          </Heading>
          <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
            Soho / Shoreditch vibes. Nightlife, dining, and art on your
            doorstep.
          </Text>
        </Box>

        <Box bg="white" p={{ base: 3, md: 4 }} rounded="lg" boxShadow="sm">
          <Heading size="sm" mb={2}>
            House Rules
          </Heading>
          <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
            No parties, no smoking, quiet hours after 10pm.
          </Text>
        </Box>
      </SimpleGrid>

      {/* Approved-only reviews */}
      <PublicReviewsSection data={data} />
    </Box>
  )
}
