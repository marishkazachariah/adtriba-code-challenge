import { useTheme } from '@mui/material'
import { ResponsiveBar } from '@nivo/bar'
import { tokens } from '../theme'
import { mockData } from '../data/mockData'
import { useState } from 'react'
import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material'

const transformData = ({ data, startDate, endDate }) => {
  const filteredData =
    startDate && endDate
      ? data.filter((item) => {
          return (
            new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate)
          )
        })
      : data
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
  const [yAxis, setYAxis] = useState(yAxisOptions)
  const initEndDate = isDashboard ? mockData[1000].date : mockData[mockData.length - 1].date
  const [startDate, setStartDate] = useState(mockData[0].date)
  const [endDate, setEndDate] = useState(initEndDate)

  return (
    <>
      {!isDashboard && (
        <Box display="flex" justifyContent="center" alignItems="center" gap={20}>
          <Box display="flex" gap={4}>
            <input
              type="date"
              value={startDate}
              min={mockData[0].date}
              max={mockData[mockData.length - 1].date}
              onChange={(event) => setStartDate(event.target.value)}
            />
            <input
              type="date"
              value={endDate}
              min={mockData[0].date}
              max={mockData[mockData.length - 1].date}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </Box>
          <Box>
            <FormGroup>
              {yAxisOptions.map((opt) => (
                <>
                  <FormControlLabel
                    key={opt}
                    control={
                      <Checkbox
                        defaultChecked
                        value={opt}
                        key={opt}
                        onChange={() => {
                          if (yAxis.includes(opt)) {
                            setYAxis(yAxis.filter((val) => val !== opt))
                          } else {
                            setYAxis(yAxis.concat(opt))
                          }
                        }}
                        sx={{
                          color: colors.grey[100],
                          '&.Mui-checked': {
                            color: colors.primary[100],
                          },
                        }}
                      />
                    }
                    label={opt}
                  />
                </>
              ))}
            </FormGroup>
          </Box>
        </Box>
      )}

      <ResponsiveBar
        data={transformData({ data: mockData, startDate, endDate })}
        theme={{
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
          tooltip: {
            container: {
              background: colors.grey[300],
              color: colors.primary[400],
            },
          },
        }}
        keys={yAxis}
        indexBy={'date'}
        margin={{ top: 0, right: 130, bottom: 100, left: 80 }}
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
          tickRotation: 40,
          legend: isDashboard ? undefined : 'Date',
          legendPosition: 'middle',
          legendOffset: 70,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : yAxis.join(', '),
          legendPosition: 'middle',
          legendOffset: -70,
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
            translateX: 130,
            translateY: 0,
            itemsSpacing: 0,
            itemWidth: 130,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 10,
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
