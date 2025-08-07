'use client'
import { useEffect, useMemo, useState } from 'react'
import ReviewCard from '@/components/ReviewCard'
import { isApproved } from '@/lib/approvals'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'

export default function PropertyPage({
  params,
}: {
  params: { listingId: string }
}) {
  const [data, setData] = useState<any[]>([])
  const qs = useMemo(() => `?listingId=${params.listingId}`, [params.listingId])

  useEffect(() => {
    fetch(`/api/reviews/hostaway${qs}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.ok) setData(j.data)
      })
  }, [qs])

  const approved = data.filter((r) => isApproved(r.listingId, r.id))

  return (
    <Box maxW="1100px" mx="auto" p={4}>
      <Heading size="lg" mb={4}>
        {decodeURIComponent(params.listingId)}
      </Heading>
      <Heading size="md" mb={2}>
        Guest Reviews (Approved)
      </Heading>
      <Stack spacing={3}>
        {approved.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
        {approved.length === 0 && (
          <Text color="gray.500">No approved reviews yet.</Text>
        )}
      </Stack>
    </Box>
  )
}
