import { Box } from '@mui/material'
import Header from '../../components/Header'
import PieChart from '../../components/PieChart'

const Pie = () => {
  return (
    <Box m="10px">
      <Header
        title="Pie Chart"
        subtitle="Pie chart comparing either the sources/channels, type (baseline and incrementality) 
        or optimisation target (conversions and revenue) to the total spends, attributed revenue, and attributed conversions
        for the months of June 2022 - Nov 2022"
      />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  )
}

export default Pie
