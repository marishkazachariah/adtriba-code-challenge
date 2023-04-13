import { Box } from '@mui/material'
import Header from '../../components/Header'
import BarChart from '../../components/BarChart'

const Bar = () => {
  return (
    <Box m="10px">
      <Header
        title="Bar Graph of Sphere Sample Data"
        subtitle="This bar graph highlights the comparison of revenue generated from the 
        Attributed conversions, attributed revenue, and spends within the span of 6 months. 
        This data can be selected by date range and numerical value of data from the spreadsheet."
      />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  )
}

export default Bar
