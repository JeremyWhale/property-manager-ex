import { UploadOutlined } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from "react";
import axios from "axios";
import apiLocation from "./apiLocation";

export default function TenantHistoryAdd(props){
    const [tenantOptions, setTenantOptions] = useState([])
    const [selectedTenant, setSelectedTenant] = useState('')
    const [moveInDate, setMoveInDate] = useState('')
    const [moveOutDate, setMoveOutDate] = useState('')
    const [initialRent, setInitialRent] = useState('')
    const [currentRent, setCurrentRent] = useState('')

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
        if (selectedTenant !== '' && moveInDate !== '' && moveOutDate !== '' && initialRent !== '' && currentRent !== ''){
            const data = {
                property: props.property,
                tenant: selectedTenant,
                move_in_date: moveInDate,
                move_out_date: moveOutDate,
                initial_rent_amount: initialRent,
                final_rent_amount: currentRent,
            }

            axios.post(`${apiLocation}/tenant-history-add/`, data)
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
                    {tenantOptions
                    .sort((a, b) => a.fullName.localeCompare(b.fullName))
                    .map((tenant, index) => (
                        <MenuItem key={index} value={tenant.id}>
                            {tenant.fullName}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Move in date" color={moveInDate === '' && ('error')} onChange={(date) => setMoveInDate(formatDate(date))} fullWidth/>
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Move out date" color={moveOutDate === '' && ('error')} onChange={(date) => setMoveOutDate(formatDate(date))} fullWidth/>
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
                <TextField id="outlined-basic" color={initialRent === '' && ('error')} label="Initial rent" variant="outlined" onChange={(e) => setInitialRent(e.target.value)} fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="outlined-basic" color={currentRent === '' && ('error')} label="Final rent" variant="outlined" onChange={(e) => setCurrentRent(e.target.value)} fullWidth/>
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" startIcon={<UploadOutlined />} onClick={() => handleUpload()}>
                    Upload Tenant
                </Button>
            </Grid>
            {/* Static alert for success/error */}
        </Grid>
    )
}