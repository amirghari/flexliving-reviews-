'use client'
import useSWR from 'swr'
import ReviewCard from './ReviewCard'
import { Stack, Text } from '@chakra-ui/react'

type ApiResponse = {
  ok: boolean
  total: number
  page: number
  pageSize: number
  data: any[]
}

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function ReviewList({
  qs,
  enableApproval = false,
}: {
  qs: string
  enableApproval?: boolean
}) {
  const { data, isLoading } = useSWR<ApiResponse>(
    `/api/reviews/hostaway${qs}`,
    fetcher,
  )

  if (isLoading) return <Text>Loading…</Text>
  if (!data?.ok) return <Text color="red.500">Error loading reviews</Text>

  return (
    <Stack spacing={3}>
      {data.data.map((r) => (
        <ReviewCard key={r.id} r={r} enableApproval={enableApproval} />
      ))}
      {data.data.length === 0 && (
        <Text color="gray.500">No reviews match your filters.</Text>
      )}
    </Stack>
  )
}
