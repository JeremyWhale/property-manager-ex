import { IcPageHeader, IcNavigationItem } from "@ukic/react";
import React, { useState } from 'react';
import { TextField, MenuItem } from "@mui/material";
import styled from "styled-components";
import TenancyReviewsTable from "../components/reportViews/tenancyReviews";
import RentReviewsTable from "../components/reportViews/rentReviews";
import EpcTable from "../components/reportViews/epcs";
import ElectricalCertsTable from "../components/reportViews/electricCerts";
import GasSafetyCertsTable from "../components/reportViews/gasSafetyCerts";
import MortgageReviewsTable from "../components/reportViews/mortgageRenewals";
import InsurancePremiumsTable from "../components/reportViews/insurancePremiums";

const StyledIcNavigationItem = styled(IcNavigationItem)`
    color: #282c34 !important;
    --ic-theme-text: #282c34 !important;
`;

export default function ReportView() {
  const [selectedInfoView, setSelectedInfoView] = useState('TR')
  const [dateRange, setDateRange] = useState(30)

  const dateList = [1, 2, 3, 6, 12]

  function showTable(){
    if(selectedInfoView === 'TR'){
        return(<TenancyReviewsTable range={dateRange} />)   
    }
    if(selectedInfoView === 'RR'){
        return(<RentReviewsTable range={dateRange}/>)
    }
    if(selectedInfoView === 'EPC'){
        return(<EpcTable range={dateRange}/>)
    }
    if(selectedInfoView === 'EC'){
        return(<ElectricalCertsTable range={dateRange}/>)
    }
    if(selectedInfoView === 'IP'){
        return(<InsurancePremiumsTable range={dateRange}/>)
    }
    if(selectedInfoView === 'MR'){
        return(<MortgageReviewsTable range={dateRange}/>)
    }
    if(selectedInfoView === 'GSC'){
        return(<GasSafetyCertsTable range={dateRange}/>)
    }
    else{
        return(<></>)
    }
  }

  return (
    <>
      <IcPageHeader heading='Reports'>
        <TextField
            slot="input"
            labelId="demo-simple-select-label"
            variant="outlined"
            id="demo-simple-select"
            value={dateRange}
            label="Select Date Range"
            select
            onChange={(e) => setDateRange(e.target.value)}
            fullWidth
        >
            {dateList.map((month) => (
                <MenuItem key={(month*30)} value={(month*30)}>
                    {month} Month(s)
                </MenuItem>
            ))}
        </TextField>
        <StyledIcNavigationItem
            slot="tabs" 
            label="Tenancy Reviews" 
            onClick={() => {setSelectedInfoView('TR')}}
            selected = {selectedInfoView === 'TR'}
        />
        <StyledIcNavigationItem
            slot="tabs" 
            label="Rent Reviews" 
            onClick={() => {setSelectedInfoView('RR')}}
            selected = {selectedInfoView === 'RR'}
        />
        <StyledIcNavigationItem
            slot="tabs" 
            label="EPCs" 
            onClick={() => {setSelectedInfoView('EPC')}}
            selected = {selectedInfoView === 'EPC'}
        />
        <StyledIcNavigationItem
            slot="tabs" 
            label="Electrical Certificates" 
            onClick={() => {setSelectedInfoView('EC')}}
            selected = {selectedInfoView === 'EC'}
        />
        <StyledIcNavigationItem
            slot="tabs" 
            label="Gas Safety Certificates" 
            onClick={() => {setSelectedInfoView('GSC')}}
            selected = {selectedInfoView === 'GSC'}
        />
        <StyledIcNavigationItem
            slot="tabs" 
            label="Insurance Premiums" 
            onClick={() => {setSelectedInfoView('IP')}}
            selected = {selectedInfoView === 'IP'}
        />
        <StyledIcNavigationItem
            slot="tabs" 
            label="Mortgage Renewals" 
            onClick={() => {setSelectedInfoView('MR')}}
            selected = {selectedInfoView === 'MR'}
        />
    </IcPageHeader>
    {showTable()}
    </>
  );
}
