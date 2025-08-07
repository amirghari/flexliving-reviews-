'use client'
import { isApproved, setApproval } from '@/lib/approvals'
import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'

export type Review = {
  id: string
  listingId: string
  listingName: string
  type: string
  rating: number | null
  categories: { key: string; rating: number }[]
  comment: string
  submittedAt: string
  guestName?: string
}

export default function ReviewCard({
  r,
  enableApproval,
}: {
  r: Review
  enableApproval?: boolean
}) {
  const approved =
    typeof window !== 'undefined' && isApproved(r.listingId, r.id)
  return (
    <Box
      borderWidth="1px"
      rounded="xl"
      p={4}
      bg="white"
      boxShadow="sm"
      outline={approved ? '2px solid' : undefined}
      outlineColor={approved ? 'green.300' : undefined}
    >
      <HStack justify="space-between">
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
      <HStack mt={2} spacing={2} wrap="wrap">
        <Tag>Overall: {r.rating ?? '—'}</Tag>
        {r.categories.map((c) => (
          <Tag key={c.key}>
            {c.key}: {c.rating}
          </Tag>
        ))}
      </HStack>
      {enableApproval && (
        <Stack mt={3} direction="row">
          <Button
            colorScheme={approved ? 'green' : 'gray'}
            onClick={() => setApproval(r.listingId, r.id, !approved)}
          >
            {approved
              ? 'Approved (click to unapprove)'
              : 'Approve for Public Page'}
          </Button>
        </Stack>
      )}
    </Box>
  )
}
