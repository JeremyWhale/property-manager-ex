import React, { useEffect, useState } from "react";
import { IcSideNavigation, IcNavigationItem } from "@ukic/react";
import {
  ChecklistRtl,
  ContactPhoneOutlined,
  ErrorOutline,
  HomeOutlined,
  MapsHomeWork,
  PersonOutline,
  Settings,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import apiLocation from "./apiLocation";
import axios from "axios";
import { Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function SideNav() {
  const navigate = useNavigate();

  const [issuesCount, setIssuesCount] = useState(0);

  useEffect(() => {
    async function getIssueCount() {
      axios.get(`${apiLocation}/issues/`).then((response) => {
        const data = response.data;
        let count = 0;
        data.map((issue) => {
          if (
            issue.date_fixed === "2000-01-01" ||
            issue.date_fixed === "2000-01-02"
          ) {
            count = count + 1;
          }
        });
        setIssuesCount(count);
      });
    }

    getIssueCount();
  }, []);

  return (
    <IcSideNavigation
      appTitle="Property Manager"
      status="v1.4.1"
      collapsedIconLabels={false}
      href="#"
    >
      {/* App Logo */}
      <MapsHomeWork onClick={() => navigate("/")} slot="app-icon" />
      {/* Propety view link */}
      <IcNavigationItem
        onClick={() => navigate("/properties")}
        slot="primary-navigation"
        label="Properties"
      >
        <HomeOutlined slot="icon" />
      </IcNavigationItem>
      {/* Tenant view link */}
      <IcNavigationItem
        slot="primary-navigation"
        onClick={() => navigate("/tenants")}
        label="Tenants"
      >
        <PersonOutline slot="icon" />
      </IcNavigationItem>
      {/* Issues view link */}
      <IcNavigationItem
        slot="primary-navigation"
        onClick={() => navigate("/issues")}
        label="Issues"
      >
        <Badge
          badgeContent={issuesCount}
          color={issuesCount === 0 ? "success" : "warning"}
          slot="icon"
        >
          <ErrorOutline />
        </Badge>
      </IcNavigationItem>
       {/* Purchases view link */}
       <IcNavigationItem
        slot="primary-navigation"
        onClick={() => navigate("/purchases")}
        label="Purchases"
      >
        <ShoppingCartOutlined slot="icon" />
      </IcNavigationItem>
       {/* Reports view link */}
       <IcNavigationItem
        slot="primary-navigation"
        onClick={() => navigate("/reports")}
        label="Reports"
      >
        <ChecklistRtl slot="icon" />
      </IcNavigationItem>
      {/* Contacts view link */}
      <IcNavigationItem
        slot="primary-navigation"
        onClick={() => navigate("/contacts")}
        label="Contacts"
      >
        <ContactPhoneOutlined slot="icon" />
      </IcNavigationItem>
      {/* Settings view link */}
      <IcNavigationItem
        slot="secondary-navigation"
        onClick={() => navigate("/settings")}
        label="Settings"
      >
        <Settings slot="icon" />
      </IcNavigationItem>
    </IcSideNavigation>
  );
}
