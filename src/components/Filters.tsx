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
  HStack,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
  Text,
} from '@chakra-ui/react'
import { FiCalendar } from 'react-icons/fi'

export type FiltersState = {
  minRating?: number
  q?: string
  sort?: string
  from?: string // YYYY-MM-DD
  to?: string // YYYY-MM-DD
}

export default function Filters({
  onChange,
  layout = 'grid',
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

  function clearDates() {
    const next = { ...state, from: undefined, to: undefined }
    setState(next)
    onChange(next)
  }

  const Controls = (
    <>
      {/* Search (top) */}
      <FormControl>
        <FormLabel>Search</FormLabel>
        <Input
          placeholder="Comment, Guest, Listing Name"
          onChange={(e) => update('q', e.target.value || undefined)}
        />
      </FormControl>

      {/* Min overall */}
      <FormControl>
        <FormLabel>Min Overall</FormLabel>
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

      {/* Date range (clean inline inputs) */}
      <FormControl>
        <FormLabel>From</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FiCalendar} color="brand.500" />
          </InputLeftElement>
          <Input
            type="date"
            value={state.from ?? ''}
            onChange={(e) => update('from', e.target.value || undefined)}
          />
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>To</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FiCalendar} color="brand.500" />
          </InputLeftElement>
          <Input
            type="date"
            value={state.to ?? ''}
            onChange={(e) => update('to', e.target.value || undefined)}
          />
        </InputGroup>
      </FormControl>

      {/* Sort */}
      <FormControl>
        <FormLabel>Sort</FormLabel>
        <Select
          value={state.sort ?? 'date_desc'}
          onChange={(e) => update('sort', e.target.value)}
        >
          <option value="date_desc">Newest</option>
          <option value="date_asc">Oldest</option>
          <option value="rating_desc">Rating ↓</option>
          <option value="rating_asc">Rating ↑</option>
        </Select>
      </FormControl>

      {/* Clear dates */}
      <HStack alignSelf="end">
        <Button size="sm" variant="outline" onClick={clearDates}>
          Clear dates
        </Button>
      </HStack>
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
