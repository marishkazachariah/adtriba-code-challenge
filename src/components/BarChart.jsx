import { useTheme } from '@mui/material'
import { ResponsiveBar } from '@nivo/bar'
import { tokens } from '../theme'
import { mockData } from '../data/mockData'
import { useState } from 'react'

const transformData = ({ data, date }) => {
  const filteredData = date ? data.filter((item) => item.date === date) : data
  // to add date range
  //   const filteredData = startDate && endDate ? data.filter((item) => {
  //     return new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate)
  //   }) : data
  const map = filteredData.reduce((acc, val) => {
    acc[val.date] = {
      ...acc[val.date],
      ...val,
      attributed_conversions:
        (parseInt(acc[val.date]?.attributed_conversions) || 0) +
        parseInt(val.attributed_conversions),
      attributed_revenue:
        (parseInt(acc[val.date]?.attributed_revenue) || 0) + parseInt(val.attributed_revenue),
      spends: (parseInt(acc[val.date]?.spends) || 0) + parseInt(val.spends),
    }

    return acc
  }, {})

  const result = Object.values(map)
  return result
}

const yAxisOptions = ['attributed_conversions', 'attributed_revenue', 'spends']

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [yAxis, setYAxis] = useState(['attributed_conversions', 'attributed_revenue', 'spends'])
  const [date, setDate] = useState('')

  return (
    <>
      <input
        type="date"
        value={date}
        min={mockData[0].date}
        max={mockData[mockData.length - 1].date}
        onChange={(event) => setDate(event.target.value)}
      />
      {yAxisOptions.map((opt) => (
        <>
          <input
            key={opt}
            type="checkbox"
            id={opt}
            checked={yAxis.includes(opt)}
            onChange={() => {
              if (yAxis.includes(opt)) {
                setYAxis(yAxis.filter((val) => val !== opt))
              } else {
                setYAxis(yAxis.concat(opt))
              }
            }}
          />
          <label htmlFor={opt}>{opt}</label>
        </>
      ))}

      <ResponsiveBar
        data={transformData({ data: mockData, date })}
        theme={{
          // added
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
        }}
        keys={yAxis}
        indexBy={'date'}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: 'color',
          modifiers: [['darker', '1.6']],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : 'date', // changed
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : yAxis, // changed
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        barAriaLabel={function (e) {
          return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
        }}
      />
    </>
  )
}

export default BarChart
