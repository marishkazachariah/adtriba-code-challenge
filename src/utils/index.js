import { mockData } from '../data/mockData'

export const averageAttributedConversions = (type) => {
  const filteredData = mockData
    .filter((item) => item.type === type)
    .map((item) => parseFloat(item.attributed_conversions))
  const averageAttributedConversions =
    filteredData.reduce((acc, curr) => acc + curr, 0) / filteredData.length
  return averageAttributedConversions
}

export const transformBarGraphData = ({ data, startDate, endDate }) => {
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

export const transformPieChartData = ({ data, valType, valNum }) => {
  const map = data.reduce((acc, val) => {
    acc[val[valType]] = {
      ...acc[val[valType]],
      ...val,
      value: (parseInt(acc[val[valType]]?.valNum) || 0) + parseInt(val[valNum]),

      id: val[valType],
    }

    return acc
  }, {})

  const result = Object.values(map)
  return result
}
