import { Box, Heading, Link as CLink, Stack } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <Box maxW="1100px" mx="auto" p={4}>
      <Stack spacing={4}>
        <Heading size="lg">Flex Living Reviews</Heading>
        <CLink as={Link} href="/dashboard" color="blue.600" fontWeight="medium">
          Go to Dashboard
        </CLink>
      </Stack>
    </Box>
  )
}
