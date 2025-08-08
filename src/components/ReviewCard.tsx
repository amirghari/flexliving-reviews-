'use client'

import Link from 'next/link'
import { isApproved, setApproval } from '@/lib/approvals'
import type { NormalizedReview } from '@/lib/normalize'
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
  Flex,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type Props = {
  r: NormalizedReview
  enableApproval?: boolean
}

export default function ReviewCard({ r, enableApproval = false }: Props) {
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setApproved(isApproved(r.listingId, r.id))
    }
  }, [r.listingId, r.id])

  const handleToggle = () => {
    const newStatus = !approved
    setApproved(newStatus)
    setApproval(r.listingId, r.id, newStatus)
  }

  return (
    <Box
      borderWidth="1px"
      rounded="xl"
      p={4}
      bg="white"
      boxShadow="sm"
      outline={approved ? '2px solid' : undefined}
      outlineColor={approved ? 'solid' : 'secondary'}
      transition="outline-color 0.2s ease"
    >
      <HStack justify="space-between" align="start">
        <Heading size="sm">{r.listingName}</Heading>
        <Text fontSize="sm" color="gray.600">
          {new Date(r.submittedAt).toLocaleDateString()}
        </Text>
      </HStack>

      {r.guestName && (
        <Text mt={1} fontSize="sm" color="gray.600">
          Guest: {r.guestName}
        </Text>
      )}

      <Text mt={2}>{r.comment}</Text>

      <Flex mt={2} gap={2} flexWrap="wrap">
        <Tag variant="metric">Overall: {r.rating ?? '—'}</Tag>
        {r.categories?.map((c) => (
          <Tag key={c.key} variant="metric">
            {c.key}: {c.rating}
          </Tag>
        ))}
      </Flex>

      {enableApproval && (
        <Stack mt={3} direction="row" spacing={3}>
          <Button
            variant={approved ? 'solid' : 'secondary'}
            onClick={handleToggle}
          >
            {approved
              ? 'Approved (click to unapprove)'
              : 'Approve for Public Page'}
          </Button>

          <Button
            as={Link}
            href={`/properties/${r.listingId}`}
            variant="outline"
          >
            View public page
          </Button>
        </Stack>
      )}
    </Box>
  )
}
