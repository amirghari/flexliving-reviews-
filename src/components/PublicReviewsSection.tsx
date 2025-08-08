'use client'
import { isApproved } from '@/lib/approvals'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import ReviewCard from '@/components/ReviewCard'
import type { NormalizedReview } from '@/lib/normalize'

export default function PublicReviewsSection({
  data,
}: {
  data: NormalizedReview[]
}) {
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
