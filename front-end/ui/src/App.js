import './App.css';
import { useEffect, useState } from 'react';
import SideNav from './components/sideNav';
import DashboardView from './views/dashboardView';
import PropertyView from './views/propertyView';
import { Box } from '@mui/material';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import IssueView from './views/issueView';
import SettingsView from './views/settingsView';
import LoginView from './views/loginView';
import PropertyAddView from './views/propertyAddView';
import TenantView from './views/TenantView';
import IssueAddView from './views/issueAddView';
import IssueEditView from './views/issueEditView';
import TenantAddView from './views/tenantAddView';
import ReportView from './views/reportView';
import TenantEditView from './views/tenantEditView';
import PropertyEditView from './views/propertyEditView';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect (() => {
    const response = window.localStorage.getItem('user')
    if (response === null && window.location.href !== 'http://localhost:3000/login'){
      setLoggedIn(false)
       window.open('/login', '_self')
    }
    if (response === null){
      setLoggedIn(false)
    } 
    else {
      setLoggedIn(true)
    }
  }, [])

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        {loggedIn === true ? <SideNav /> : <></>}
        <Box sx={{ flexGrow: 1, p:3}}>
          <BrowserRouter>
            <Routes>
              <Route path='/login' Component={LoginView}/>
              <Route path='/' Component={DashboardView}/>
              <Route path='/properties' Component={PropertyView}/>
              <Route path='/properties/add' Component={PropertyAddView}/>
              <Route path='/properties/edit' Component={PropertyEditView}/>
              <Route path='/tenants' Component={TenantView}/>
              <Route path='/tenants/add' Component={TenantAddView}/>
              <Route path='/tenants/edit' Component={TenantEditView}/>
              <Route path='/issues' Component={IssueView}/>
              <Route path='/issues/add' Component={IssueAddView}/>
              <Route path='/issues/edit' Component={IssueEditView}/>
              <Route path='/settings' Component={SettingsView}/>
              <Route path='/reports' Component={ReportView}/>
            </Routes>
          </BrowserRouter>
        </Box>
      </Box>
    </div>
  )
}

export default App;
