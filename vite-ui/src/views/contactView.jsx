import { IcPageHeader } from "@ukic/react";
import React, { useState } from 'react';
import { TextField, MenuItem } from "@mui/material";
import StaticAlert from "../components/staticAlert";

export default function ContactView() {
//   T, M, I, A, D, S, C
    const [contactType, setContactType] = useState('')

  function showTable(){
    if(contactType === 'A'){
        return(<></>)   
    }
    else{
        return(
            <StaticAlert
                type="info"
                message="Select a contact type"
            />
        )
    }
  }

  return (
    <>
      <IcPageHeader heading='Contacts'>
        <TextField
            slot="input"
            labelId="demo-simple-select-label"
            variant="outlined"
            id="demo-simple-select"
            value={contactType}
            label="Select Contact Type"
            select
            onChange={(e) => setContactType(e.target.value)}
            fullWidth
        >
            <MenuItem key='A' value='A'>Agents</MenuItem>
            <MenuItem key='C' value='C'>Contractors</MenuItem>
            <MenuItem key='D' value='D'>Deposit Schemes</MenuItem>
            <MenuItem key='I' value='I'>Insurance Companies</MenuItem>
            <MenuItem key='M' value='M'>Mortgage Lenders</MenuItem>
            <MenuItem key='T' value='T'>Tenants</MenuItem>
            <MenuItem key='U' value='U'>Utility Suppliers</MenuItem>

        </TextField>
    </IcPageHeader>
    {showTable()}
    </>
  );
}
