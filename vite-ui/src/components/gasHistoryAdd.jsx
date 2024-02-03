import { UploadOutlined } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from "react";
import axios from "axios";
import apiLocation from "./apiLocation";

export default function GasHistoryAdd(props){
    const [readingDate, setReadingDate] = useState('')
    const [tenantOptions, setTenantOptions] = useState([])
    const [selectedTenant, setSelectedTenant] = useState('')
    const [reading, setReading] = useState('')

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
                const response = await axios.get(`${apiLocation}/tenant-list`);
    
                // Convert the response data into your desired format
                const data = response.data.map((tenant) => ({
                    fullName: tenant.full_name,
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
        if (selectedTenant !== '' && readingDate !== '' && reading !== ''){
            const data = {
                property: props.property,
                tenant: selectedTenant,
                reading: reading,
                reading_date: readingDate,
            }
            if (props.type === 'g'){
                axios.post(`${apiLocation}/gas-history-add/`, data)
            } else {
                axios.post(`${apiLocation}/electric-history-add/`, data)
            }
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
                    value={selectedTenant}
                    label="Select Tenant"
                    select
                    onChange={(e) => setSelectedTenant(e.target.value)}
                    fullWidth
                    color={selectedTenant === '' && ('error')}
                >
                    {tenantOptions.map((tenant, index) => (
                        <MenuItem key={index} value={tenant.id}>
                            {tenant.fullName}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Reading date" color={readingDate === '' && ('error')} onChange={(date) => setReadingDate(formatDate(date))} fullWidth/>
                </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
                <TextField id="outlined-basic" color={reading === '' && ('error')} label="Reading" variant="outlined" onChange={(e) => setReading(e.target.value)} fullWidth/>
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" startIcon={<UploadOutlined />} onClick={() => handleUpload()}>
                    Upload Reading
                </Button>
            </Grid>
            {/* Static alert for success/error */}
        </Grid>
    )
}