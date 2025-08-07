'use client'
import { exportApprovals, importApprovals } from '@/lib/approvals'
import { Button, HStack, Textarea } from '@chakra-ui/react'
import { useRef } from 'react'

export default function ApprovalControls() {
  const ta = useRef<HTMLTextAreaElement>(null)
  return (
    <>
      <HStack spacing={2} mb={2}>
        <Button
          colorScheme="blue"
          onClick={() => {
            if (ta.current) ta.current.value = exportApprovals()
          }}
        >
          Export
        </Button>
        <Button
          colorScheme="green"
          onClick={() => {
            if (ta.current) importApprovals(ta.current.value)
          }}
        >
          Import
        </Button>
      </HStack>
      <Textarea
        ref={ta}
        placeholder="Approvals JSON will appear here on Export; paste to Import"
        rows={6}
      />
    </>
  )
}
