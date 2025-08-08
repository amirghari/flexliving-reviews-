'use client'
import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'

export type FiltersState = {
  listingId?: string
  minRating?: number
  q?: string
  sort?: string
}

export default function Filters({
  onChange,
  layout = 'grid', // 'grid' | 'vertical'
}: {
  onChange: (s: FiltersState) => void
  layout?: 'grid' | 'vertical'
}) {
  const [state, setState] = useState<FiltersState>({ sort: 'date_desc' })

  function update<K extends keyof FiltersState>(k: K, v: FiltersState[K]) {
    const next = { ...state, [k]: v }
    setState(next)
    onChange(next)
  }

  const Controls = (
    <>
      <FormControl>
        <FormLabel>Listing ID</FormLabel>
        <Input
          placeholder="soho-loft-5c"
          onChange={(e) => update('listingId', e.target.value || undefined)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Min Rating</FormLabel>
        <NumberInput
          min={0}
          max={10}
          onChange={(_, v) =>
            update('minRating', Number.isNaN(v) ? undefined : v)
          }
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>

      <FormControl>
        <FormLabel>Search</FormLabel>
        <Input
          placeholder="comment or guest"
          onChange={(e) => update('q', e.target.value || undefined)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Sort</FormLabel>
        <Select
          defaultValue="date_desc"
          onChange={(e) => update('sort', e.target.value)}
        >
          <option value="date_desc">Newest</option>
          <option value="date_asc">Oldest</option>
          <option value="rating_desc">Rating ↓</option>
          <option value="rating_asc">Rating ↑</option>
        </Select>
      </FormControl>
    </>
  )

  return layout === 'vertical' ? (
    <VStack spacing={4} align="stretch">
      {Controls}
    </VStack>
  ) : (
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={3}>
      {Controls}
    </SimpleGrid>
  )
}
