import { mockData } from '../data/mockData'

export const averageAttributedConversions = (type) => {
  const filteredData = mockData
    .filter((item) => item.type === type)
    .map((item) => parseFloat(item.attributed_conversions))
  const averageAttributedConversions =
    filteredData.reduce((acc, curr) => acc + curr, 0) / filteredData.length
  return averageAttributedConversions
}
