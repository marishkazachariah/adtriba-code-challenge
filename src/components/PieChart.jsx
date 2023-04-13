import { ResponsivePie } from '@nivo/pie'
import { tokens } from '../theme'
import { Box, useTheme } from '@mui/material'
import { mockData } from '../data/mockData'
import { useState } from 'react'

const transformData = ({ data }) => {
  // change .source to "type" and "optimisation_target"
  // change .spends to the other amounts

  const map = data.reduce((acc, val) => {
    acc[val.source] = {
      ...acc[val.source],
      ...val,
      value: (parseInt(acc[val.source]?.spends) || 0) + parseInt(val.spends),

      id: val.source,
    }

    return acc
  }, {})

  const result = Object.values(map)
  return result
}

const dropDownOptions = [
  'attributed_conversions',
  'attributed_revenue',
  'spends',
  'optimisation_target',
  'type',
]

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [value, setValue] = useState('spends')
  return (
    <>
      {!isDashboard && (
        <Box display="flex">
          <label htmlFor="dropDownOptions">Choose a option to compare sources with:</label>
          <select name="dropdownOptions" style={{ marginLeft: 6 }}>
            {dropDownOptions.map((opt) => (
              <option
                value={opt}
                onClick={(e) => {
                  console.log(value)

                  setValue(e.target.value)
                }}
              >
                {opt}
              </option>
            ))}
          </select>
        </Box>
      )}
      <ResponsivePie
        data={transformData({ data: mockData, dynamicValue: 'spends' })}
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
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        enableArcLinkLabels={isDashboard ? false : true}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        enableArcLabels={false}
        arcLabelsRadiusOffset={0.4}
        arcLabelsSkipAngle={7}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={
          isDashboard
            ? 0
            : [
                {
                  anchor: 'top right',
                  direction: 'column',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 5,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                },
              ]
        }
      />
    </>
  )
}

export default PieChart
