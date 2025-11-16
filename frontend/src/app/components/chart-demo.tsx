"use client"

import * as React from "react"
import type { PublicStatsResult } from "@/components/ui/public-stats"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../components/chart"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts"
import type { TooltipContentProps } from "recharts/types/component/Tooltip"
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"
import type { Props as DefaultLegendContentProps } from "recharts/types/component/DefaultLegendContent"
import computeMonthlyRevenue from "../lib/aggregators"

export function StatsChart({ data }: { data?: PublicStatsResult }) {
  const config: ChartConfig = {
    // Use design system chart color for higher contrast in both themes
    // 'count' represents revenue here
    count: { label: "Revenue", color: "var(--border)" },
  }

  const [live, setLive] = React.useState<PublicStatsResult | null>(null)
  React.useEffect(() => {
    // If parent provided data, don't fetch local CSV
    if (data) return

    // Fetch from our local API which reads the CSV (route at app/api/data)
    const controller = new AbortController()
    const fetchLocal = async () => {
      try {
        const res = await fetch('/api/data', { signal: controller.signal })
        if (!res.ok) throw new Error('Local data fetch failed')
        const json = await res.json()

        // `extr` is the filename (extr.csv) parsed server-side (see route.ts)
        const rows: Array<Record<string, any>> = json?.extr ?? []

        // Use shared aggregator (Amount * priceper) to compute monthly revenue
        let series = computeMonthlyRevenue(rows)

        // Try to sort by month name if present
        const monthIndex: Record<string, number> = {
          January: 1,
          February: 2,
          March: 3,
          April: 4,
          May: 5,
          June: 6,
          July: 7,
          August: 8,
          September: 9,
          October: 10,
          November: 11,
          December: 12,
        }

        series = series.sort((a, b) => (monthIndex[a.date] ?? 999) - (monthIndex[b.date] ?? 999))

        setLive({ title: 'Total revenue', series })
      } catch {
        // swallow for demo
      }
    }

    fetchLocal()
    return () => controller.abort()
  }, [data])

  const source = data ?? live
  const chartData =
    source?.series.map((d: any) => ({ date: d.date, count: d.count })) ?? []

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>{source?.title ?? 'Total Revenue by Month'}</CardTitle>
        <CardDescription>Source: extr.csv (via /api/data)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-auto h-[300px]">
          <AreaChart
            data={chartData}
            margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={8} />
            <YAxis
              tickFormatter={(v) =>
                Intl.NumberFormat(undefined, {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(Number(v))
              }
              tick={{ fontSize: 12 }}
              tickMargin={8}
            />
            <ChartTooltip
              content={(props: any) => <ChartTooltipContent {...(props as any)} />}
            />
            <ChartLegend
              verticalAlign="top"
              content={(props: DefaultLegendContentProps) => (
                <ChartLegendContent
                  verticalAlign="top"
                  payload={props.payload as any}
                />
              )}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="var(--color-count)"
              fill="var(--color-count)"
              fillOpacity={0.2}
              name="Revenue"
              dot={{
                r: 2,
                stroke: "var(--color-count)",
                fill: "var(--color-count)",
              }}
              activeDot={{ r: 3 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )

}

export default StatsChart
