'use client'

import { exportApprovals, importApprovals } from '@/lib/approvals'
import {
  Box,
  Button,
  Flex,
  Heading,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRef } from 'react'

export default function ApprovalControls({
  showHeading = true,
  title = 'Approvals Export/Import',
}: {
  showHeading?: boolean
  title?: string
}) {
  const ta = useRef<HTMLTextAreaElement>(null)
  const border = useColorModeValue('gray.200', 'gray.700')

  return (
    <>
      {showHeading && (
        <Heading size="md" mb={3}>
          {title}
        </Heading>
      )}

      {/* Textarea in a white card */}
      <Box
        bg="white"
        borderWidth="1px"
        borderColor={border}
        rounded="lg"
        boxShadow="sm"
        p={3}
      >
        <Textarea
          ref={ta}
          placeholder="Approvals JSON will appear here on Export; paste to Import"
          rows={6}
          resize="vertical"
          border="none"
          _focus={{ boxShadow: 'none' }}
        />
      </Box>

      {/* Buttons below, aligned to the right */}
      <Flex gap={3} justify="flex-start" mt={3}>
        <Button
          variant="solid"
          onClick={() => {
            if (ta.current) importApprovals(ta.current.value)
          }}
        >
          Export
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            if (ta.current) ta.current.value = exportApprovals()
          }}
        >
          Import
        </Button>
      </Flex>
    </>
  )
}
