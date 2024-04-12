import { IcPageHeader } from "@ukic/react";
import React, { useState } from 'react';
import { TextField, MenuItem } from "@mui/material";
import StaticAlert from "../components/staticAlert";
import AgentList from "../components/contactViews/agentList";
import DepositSchemeList from "../components/contactViews/DepositSchemeList";
import ContractorList from "../components/contactViews/ContractorList";
import TenantList from "../components/contactViews/TenantList";
import LenderList from "../components/contactViews/MortgageList";
import InsuranceCompanyList from "../components/contactViews/InsuranceList";
import GasSupplierList from "../components/contactViews/GasSupplierList";
import ElectricSupplierList from "../components/contactViews/ElectricSupplierList";
import WaterSupplierList from "../components/contactViews/WaterSupplierList";

export default function ContactView() {
//   T, M, I, A, D, C, GS, ES, WS
    const [contactType, setContactType] = useState('')

  function showTable(){
    if(contactType === 'A'){
        return(<AgentList />)   
    }
    if(contactType === 'C'){
        return(<ContractorList />)   
    }
    if(contactType === 'D'){
        return(<DepositSchemeList />)   
    }
    if(contactType === 'I'){
        return(<InsuranceCompanyList />)   
    }
    if(contactType === 'M'){
        return(<LenderList />)   
    }
    if(contactType === 'T'){
        return(<TenantList />)   
    }
    if(contactType === 'GS'){
        return(<GasSupplierList />)   
    }
    if(contactType === 'ES'){
        return(<ElectricSupplierList />)   
    }
    if(contactType === 'WS'){
        return(<WaterSupplierList />)   
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
            <MenuItem key='ES' value='ES'>Electric Suppliers</MenuItem>
            <MenuItem key='GS' value='GS'>Gas Suppliers</MenuItem>
            <MenuItem key='I' value='I'>Insurance Companies</MenuItem>
            <MenuItem key='M' value='M'>Mortgage Lenders</MenuItem>
            <MenuItem key='T' value='T'>Tenants</MenuItem>
            <MenuItem key='WS' value='WS'>Water Suppliers</MenuItem>

        </TextField>
    </IcPageHeader>
    {showTable()}
    </>
  );
}
