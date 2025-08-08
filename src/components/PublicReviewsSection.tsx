'use client'
import { isApproved } from '@/lib/approvals'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import ReviewCard from '@/components/ReviewCard'

type Review = {
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

export default function PublicReviewsSection({ data }: { data: Review[] }) {
  const approved = data.filter((r) => isApproved(r.listingId, r.id))

  return (
    <Box id="guest-reviews" mt={8}>
      <Heading size="lg" mb={4}>
        Guest Reviews
      </Heading>
      <Stack spacing={3}>
        {approved.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
        {approved.length === 0 && (
          <Text color="gray.500">
            No approved reviews yet. Once a manager approves reviews in the
            dashboard, they will appear here.
          </Text>
        )}
      </Stack>
    </Box>
  )
}
