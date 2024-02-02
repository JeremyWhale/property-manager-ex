import { UploadOutlined } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from "react";
import axios from "axios";
import apiLocation from "./apiLocation";

export default function AgentHistoryAdd(props){
    const [tenantOptions, setTenantOptions] = useState([])
    const [selectedAgent, setSelectedAgent] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    function formatDate(date){
        const year = date.$y.toString()

        const monthUnformatted = (date.$M+1).toString()
        let month = monthUnformatted

        const dayUnformatted = date.$D.toString()
        let day = dayUnformatted
        
        {monthUnformatted.length === 1 && (
            month = '0'+ monthUnformatted
        )}

        {dayUnformatted.length === 1 && (
            day = '0'+ dayUnformatted
        )}

        return (`${year}-${month}-${day}`)
    };

    useEffect(() => {
        async function getTenantList() {
            try {
                const response = await axios.get(`${apiLocation}/agents`);
    
                // Convert the response data into your desired format
                const data = response.data.map((tenant) => ({
                    fullName: tenant.name,
                    id: tenant.id
                }));
    
                setTenantOptions(data);
            } catch (e) {
                // Handle your error here
                console.error("Error fetching data:", e);
            }
        }
    
        getTenantList(); // Execute the function
    }, []);

    function handleUpload(){
        if (selectedAgent !== '' && startDate !== '' && endDate !== ''){
            const data = {
              agent: selectedAgent,
              property: props.property,
              start_date: startDate,
              end_date: endDate,
            }

            axios.post(`${apiLocation}/agent-history-add/`, data)
        }
    }

    return(
        <Grid container spacing={2} sx={{paddingTop: 2}} direction={'column'}>
            <Grid item xs={6}>
                <TextField
                    slot="input"
                    labelId="demo-simple-select-label"
                    variant="outlined"
                    id="demo-simple-select"
                    value={selectedAgent}
                    label="Select Agent"
                    select
                    onChange={(e) => setSelectedAgent(e.target.value)}
                    fullWidth
                    color={selectedAgent === '' && ('error')}
                >
                    {tenantOptions.map((tenant, index) => (
                        <MenuItem key={index} value={tenant.id}>
                            {tenant.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Start date" color={startDate === '' && ('error')} onChange={(date) => setStartDate(formatDate(date))} fullWidth/>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="End date" color={endDate === '' && ('error')} onChange={(date) => setEndDate(formatDate(date))} fullWidth/>
                </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" startIcon={<UploadOutlined />} onClick={() => handleUpload()}>
                    Upload Agent
                </Button>
            </Grid>
            {/* Static alert for success/error */}
        </Grid>
    )
}