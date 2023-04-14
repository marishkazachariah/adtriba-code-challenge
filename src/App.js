import { useState } from 'react'
import { ColorModeContext, useMode } from './theme'
import { Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Topbar from './containers/global/Topbar'
import Sidebar from './containers/global/Sidebar'
import Dashboard from './containers/dashboard'
import SampleData from './containers/sampleData'
import Bar from './containers/bar'
import Pie from './containers/pie'

function App() {
  const [theme, colorMode] = useMode()
  const [isSidebar, setIsSidebar] = useState(true)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/adtriba-code-challenge" element={<Dashboard />} />
              <Route path="/sampleData" element={<SampleData />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
