import { ResponsivePie } from '@nivo/pie'
import { tokens } from '../theme'
import { Box, InputLabel, MenuItem, Select, useTheme } from '@mui/material'
import { mockData } from '../data/mockData'
import { useState } from 'react'
import { transformPieChartData } from '../utils'

const dropDownTypeOptions = ['source', 'optimisation_target', 'type']
const dropDownNumOptions = ['attributed_conversions', 'attributed_revenue', 'spends']

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [valueType, setValueType] = useState('source')
  const [valueNum, setValueNum] = useState('attributed_conversions')
  return (
    <>
      {!isDashboard && (
        <Box display="flex" flexDirection="column" gap={3}>
          <Box>
            <InputLabel htmlFor="dropDownValTypeOptions">
              Choose between source (adbertising sources/channels), optimisation_target (conversions
              or revenue) and type (baseline (marketing organic channels) or incrementality
              (marketing paid channels)):
            </InputLabel>
            <Select
              name="dropDownValTypeOptions"
              sx={{ marginLeft: 1, width: '12%', mt: 1 }}
              defaultValue={valueType}
              onChange={(e) => {
                setValueType(e.target.value)
              }}
            >
              {dropDownTypeOptions.map((opt) => (
                <MenuItem value={opt} key={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <InputLabel htmlFor="dropDownNumTypeOptions" sx>
              Compare qualitative between the following quantitative fields: attributed_conversions,
              attributed_revenue, and spends:
            </InputLabel>
            <Select
              name="dropDownValTypeOptions"
              sx={{ marginLeft: 1, width: '12%', mt: 1 }}
              defaultValue={valueNum}
              onChange={(e) => {
                setValueNum(e.target.value)
              }}
            >
              {dropDownNumOptions.map((opt) => (
                <MenuItem value={opt} key={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      )}

      <ResponsivePie
        data={transformPieChartData({ data: mockData, valType: valueType, valNum: valueNum })}
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
