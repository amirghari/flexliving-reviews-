'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { Box, useColorModeValue, useToken } from '@chakra-ui/react'

type TrendChartProps = {
  qs: string
  dateLabelFontSize?: number
  dateLabelMargin?: number // extra gap below labels
  reversed?: boolean
}

export default function TrendChart({
  qs,
  dateLabelFontSize = 12,
  dateLabelMargin = 8,
  reversed = false,
}: TrendChartProps) {
  const [data, setData] = useState<any[]>([])
  const [brand500, brand50, text600] = useToken('colors', [
    'brand.500',
    'brand.50',
    'gray.600',
  ])
  const border = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    fetch(`/api/reviews/hostaway${qs}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.ok) setData(j.data)
      })
  }, [qs])

  const series = useMemo(() => {
    const map = new Map<
      string,
      { date: string; rating: number; count: number }
    >()
    data.forEach((r) => {
      if (r?.rating == null || !r?.submittedAt) return
      const d = r.submittedAt.slice(0, 10)
      const prev = map.get(d) || { date: d, rating: 0, count: 0 }
      map.set(d, {
        date: d,
        rating: prev.rating + r.rating,
        count: prev.count + 1,
      })
    })
    const arr = Array.from(map.values()).map((x) => ({
      date: x.date,
      avg: x.count ? x.rating / x.count : null,
    }))
    arr.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
    return reversed ? arr.reverse() : arr
  }, [data, reversed])

  return (
    <Box
      h="256px" // fixed height ensures container can be 100%
      bg="white"
      borderWidth="1px"
      borderColor={border}
      rounded="xl"
      boxShadow="sm"
      p={2} // less padding = more plot area
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={series}
          margin={{
            top: 6,
            right: 8,
            bottom: 8 + dateLabelMargin, // extra space for labels
            left: 6, // tighter left margin
          }}
        >
          <CartesianGrid stroke={brand50} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: dateLabelFontSize, fill: text600 }}
            tickMargin={6 + dateLabelMargin} // pushes labels away from axis
            axisLine={{ stroke: brand50 }}
            tickLine={{ stroke: brand50 }}
            padding={{ left: 0, right: 0 }} // no extra left/right padding
            height={24 + dateLabelMargin}
          />
          <YAxis
            domain={[0, 10]}
            width={28} // slimmer Y axis = more plot width
            tick={{ fill: text600 }}
            axisLine={{ stroke: brand50 }}
            tickLine={{ stroke: brand50 }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${brand50}`,
            }}
            labelStyle={{ color: text600 }}
          />
          <Line
            type="monotone"
            dataKey="avg"
            stroke={brand500}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}
