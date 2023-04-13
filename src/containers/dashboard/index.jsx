import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import BarChart from '../../components/BarChart'
import Header from '../../components/Header'
import PieChart from '../../components/PieChart'
import StatBox from '../../components/StatBox'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import { averageAttributedConversions } from '../../utils'

const Dashboard = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />
      </Box>
      <Box display="flex" justifyContent="space-between" mb={3} gap={3}>
        <Box
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          <StatBox
            title={`${averageAttributedConversions('incrementality').toFixed(2)} %`}
            subtitle="Average attributed conversions for all data with type: incrementality"
            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          <StatBox
            title={`${averageAttributedConversions('baseline').toFixed(2)} %`}
            subtitle="Average attributed conversions for all data with type: baseline"
            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
          />
        </Box>
        <Box
          backgroundColor={colors.primary[400]}
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" fontWeight="600" sx={{ pt: 2, pl: 4 }}>
            Total spends between Jun - Nov 2022 across all advertising sources/channels
          </Typography>
          <Box height="270px" mt="-10px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
      <Box backgroundColor={colors.primary[400]}>
        <Typography variant="h6" fontWeight="600" sx={{ pt: 2, mb: 6, pl: 4 }}>
          Spends, Attributed Conversions, and Attributed Revenues at a Glance
        </Typography>
        <Box height="250px" mt="-20px">
          <BarChart isDashboard={true} />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
