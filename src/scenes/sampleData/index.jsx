import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import { mockData } from '../../data/mockData'
import Header from '../../components/Header'
import { useTheme } from '@mui/material'
import { v4 as uuid } from 'uuid'

const SampleData = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const columns = [
    { field: 'date', headerName: 'Date', flex: 0.5 },
    { field: 'source', headerName: 'Advertising Source', align: 'center' },
    {
      field: 'attributed_conversions',
      headerName: 'Attributed Conversions',
      type: 'number',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'attributed_revenue',
      headerName: 'Attributed Revenue',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 0.5,
    },
    {
      field: 'spends',
      headerName: 'Total Spent on Advertising',
      type: 'currency',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'partition_id',
      headerName: 'Partition ID',
    },
    {
      field: 'optimisation_target',
      headerName: 'Optimisation Target',
      flex: 0.75,
    },
  ]

  return (
    <Box m="20px">
      <Header title="Sample Data" subtitle="List of Sample Data" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={uuid}
        />
      </Box>
    </Box>
  )
}

export default SampleData
