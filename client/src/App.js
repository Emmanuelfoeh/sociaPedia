import {BrowserRouter,Navigate,Routes,Route} from "react-router-dom"
import {CssBaseline, ThemeProvider} from '@mui/material'
import {createTheme} from '@mui/material/styles'
import {themeSettings} from './theme'
import {useSelector} from 'react-redux'
import {useMemo} from 'react'
import HomePage from "scenes/homePage/HomePage";
import LoginPage from "scenes/loginPage/LoginPage";
import ProfilePage from "scenes/profilePage/ProfilePage";



function App() {
  const mode = useSelector((state)=>state.mode)
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])
  return (
    <div className="app">
      <BrowserRouter>
<ThemeProvider theme={theme}>
  <CssBaseline/>
   <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/profile/:userId" element={<ProfilePage/>}/>
      </Routes>
</ThemeProvider>
     
      </BrowserRouter>
    </div>
  );
}

export default App;
