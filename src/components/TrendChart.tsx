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
import { Box } from '@chakra-ui/react'

type TrendChartProps = {
  qs: string
  dateLabelFontSize?: number
  dateLabelMargin?: number
}

export default function TrendChart({
  qs,
  dateLabelFontSize = 12, // default font size
  dateLabelMargin = 0, // default extra margin
}: TrendChartProps) {
  const [data, setData] = useState<any[]>([])

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
      if (r.rating == null) return
      const d = r.submittedAt.slice(0, 10)
      const prev = map.get(d) || { date: d, rating: 0, count: 0 }
      map.set(d, {
        date: d,
        rating: prev.rating + r.rating,
        count: prev.count + 1,
      })
    })
    return Array.from(map.values()).map((x) => ({
      date: x.date,
      avg: x.rating / x.count,
    }))
  }, [data])

  return (
    <Box h="256px">
      <ResponsiveContainer>
        <LineChart
          data={series}
          margin={{ top: 10, right: 20, left: 0, bottom: dateLabelMargin }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: dateLabelFontSize }}
            height={30 + dateLabelMargin}
          />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Line type="monotone" dataKey="avg" dot={false} stroke="#3182CE" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}
