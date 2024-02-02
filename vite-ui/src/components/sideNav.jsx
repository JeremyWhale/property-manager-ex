import React, { useEffect, useState } from "react";
import {IcSideNavigation, IcNavigationItem, } from "@ukic/react";
import { ChecklistRtl, ErrorOutline, HomeOutlined, MapsHomeWork, PersonOutline, Settings } from "@mui/icons-material";
import apiLocation from "./apiLocation";
import axios from "axios";
import { Badge } from "@mui/material";

export default function SideNav(){

    const [issuesCount, setIssuesCount] = useState(0)

    useEffect(() => {
        async function getIssueCount(){
            axios.get(`${apiLocation}/issues/`)
            .then((response) => {
                const data = response.data;
                let count = 0
                data.map(issue => {if (issue.date_fixed === '2000-01-01' || issue.date_fixed === '2000-01-02'){count = count+1}});
                setIssuesCount(count)
            })
        }

        getIssueCount()
    }, [])

    return(
        <IcSideNavigation appTitle="Property Manager" status="v1.0.0" collapsedIconLabels>
            {/* App Logo */}
            <MapsHomeWork slot='app-icon' />
            {/* Propety view link */}
            <IcNavigationItem slot="primary-navigation" href="/properties" label="Properties">
                <HomeOutlined slot='icon'/>
            </IcNavigationItem>
            {/* Tenant view link */}
            <IcNavigationItem slot="primary-navigation" href="/tenants" label="Tenants">
                <PersonOutline slot='icon'/>
            </IcNavigationItem>
            {/* Reports view link */}
            <IcNavigationItem slot="primary-navigation" href="/reports" label="Reports">
                <ChecklistRtl slot='icon'/>
            </IcNavigationItem>
            {/* Issues view link */}
            <IcNavigationItem slot="primary-navigation" href="/issues" label="Issues">
                <Badge badgeContent={issuesCount} color={issuesCount === 0 ? 'success' : 'warning'} slot='icon'>
                    <ErrorOutline />
                </Badge>
            </IcNavigationItem>
            {/* Settings view link */}
            <IcNavigationItem slot="secondary-navigation" href="/settings" label="Settings">
                <Settings slot='icon'/>
            </IcNavigationItem>
        </IcSideNavigation>
    )
}