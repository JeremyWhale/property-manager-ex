import "./App.css";
import "./styles.css";
import SideNav from "./components/sideNav";
import DashboardView from "./views/dashboardView";
import PropertyView from "./views/propertyView";
import { Box } from "@mui/material";
import { Route, Routes, HashRouter as BrowserRouter } from "react-router-dom";
import IssueView from "./views/issueView";
import SettingsView from "./views/settingsView";
import LoginView from "./views/loginView";
import PropertyAddView from "./views/propertyAddView";
import TenantView from "./views/TenantView";
import IssueAddView from "./views/issueAddView";
import IssueEditView from "./views/issueEditView";
import TenantAddView from "./views/tenantAddView";
import ReportView from "./views/reportView";
import TenantEditView from "./views/tenantEditView";
import PropertyEditView from "./views/propertyEditView";
import { useAppContext } from "./App.context";
import axios from "axios";
import generateAuthToken from "./components/auth";

function App() {
  const { currentUser } = useAppContext();

  function getCSRFToken() {
    const cookieValue = document.cookie.match(/csrftoken=([^;]+)/);
    console.log('cv:', cookieValue)
    return cookieValue ? cookieValue[1] : null;
}

  axios.interceptors.request.use((config) => {
    config.params = { token: generateAuthToken() };

    const csrfToken = getCSRFToken();
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    
    return config;
  });

  return (
    <div className="App">
      {!currentUser ? (
        <LoginView />
      ) : (
        <BrowserRouter>
          <Box sx={{ display: "flex" }}>
            <SideNav />
            <Box sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route path="/" Component={DashboardView} />
                <Route path="/login" Component={LoginView} />
                <Route path="/properties" Component={PropertyView} />
                <Route path="/properties/add" Component={PropertyAddView} />
                <Route path="/properties/edit" Component={PropertyEditView} />
                <Route path="/tenants" Component={TenantView} />
                <Route path="/tenants/add" Component={TenantAddView} />
                <Route path="/tenants/edit" Component={TenantEditView} />
                <Route path="/issues" Component={IssueView} />
                <Route path="/issues/add" Component={IssueAddView} />
                <Route path="/issues/edit" Component={IssueEditView} />
                <Route path="/settings" Component={SettingsView} />
                <Route path="/reports" Component={ReportView} />
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
