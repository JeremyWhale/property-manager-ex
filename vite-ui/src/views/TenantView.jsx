import React, { useState, useEffect } from "react";
import { IcPageHeader, IcButton } from "@ukic/react";
import { Add, Edit } from "@mui/icons-material";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import apiLocation from "../components/apiLocation";
import StaticAlert from "../components/staticAlert";
import formatDisplayDate from "../components/formatdisplayDate";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App.context";

export default function TenantView() {
  const navigate = useNavigate();

  const { setTenantToEdit, setPropertySelected, propertyTenant } =
    useAppContext();

  const [tenantList, setTenantList] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState("");
  const [tenantDetails, setTenantDetails] = useState();
  const [address, setAddress] = useState("No Property Listed");
  const [moveInDate, setMoveInDate] = useState("No Property");

  useEffect(() => {
    function checkForUrlId() {
      if (propertyTenant !== "" && propertyTenant !== "No Assigned Tenant") {
        setSelectedTenant(propertyTenant);
      }
    }

    async function getTenantList() {
      try {
        const response = await axios.get(`${apiLocation}/tenant-list`);

        // Convert the response data into your desired format
        const data = response.data
          .filter(tenant => tenant.full_name !== 'No Assigned Tenant')
          .map(tenant => ({
            fullName: tenant.full_name,
            property: tenant.address_line_1
          }));

        setTenantList(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    getTenantList();
    checkForUrlId();
  }, []);

  useEffect(() => {
    async function getTenantDetails() {
      try {
        const response = await axios.get(
          `${apiLocation}/tenant-details/${selectedTenant}`
        );

        // Convert the response data into your desired format
        const data = {
          // Full name already exists
          phoneNumber: response.data.phone_number,
          phoneNumber2: response.data.phone_number_2,
          email: response.data.email,
          email2: response.data.email_2,
          bankName: response.data.bank_name,
          sortCode: response.data.bank_sort_code,
          accountNumber: response.data.bank_account_number,
          EContactName: response.data.emergency_contact_name,
          EContactNumber: response.data.emergency_contact_phone_number,
          EContactEmail: response.data.emergency_contact_email,
          addressLine1: response.data.address_line_1,
        };

        setTenantDetails(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    getTenantDetails(); // Execute the function
  }, [selectedTenant]);

  useEffect(() => {
    async function getTenancyDetails() {
      if (
        tenantDetails &&
        tenantDetails.addressLine1 !== "No Property Listed"
      ) {
        try {
          const response = await axios.get(
            `${apiLocation}/tenancy-details/${tenantDetails.addressLine1}`
          );

          setMoveInDate(formatDisplayDate(response.data[0].move_in_date));
          setAddress(response.data[0].property_name);
        } catch (e) {
          // Handle your error here
          console.error("Error fetching data:", e);
        }
      } else {
        setMoveInDate("No Property Listed");
        setAddress("No Property Listed");
      }
    }

    getTenancyDetails();
  }, [tenantDetails]);

  const handleEditSelect = () => {
    setTenantToEdit(selectedTenant);
    navigate(`/tenants/edit`);
  };

  const handlePropertyClick = () => {
    setPropertySelected(address);
    navigate(`/properties`);
  };

  return (
    <>
      <IcPageHeader heading="Tenants" reverseOrder>
        <IcButton
          slot="actions"
          variant="primary"
          onClick={() => navigate("/tenants/add")}
        >
          <Add slot="left-icon" /> Add Tenant
        </IcButton>
        {selectedTenant.length === 0 ? (
          <></>
        ) : (
          <IcButton
            slot="actions"
            variant="tertiary"
            onClick={handleEditSelect}
          >
            <Edit slot="left-icon" /> Edit Tenant
          </IcButton>
        )}
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
        >
          {tenantList
          .sort((a, b) => a.fullName.localeCompare(b.fullName))
          .map((tenant, index) => (
            <MenuItem key={index} value={tenant.fullName}>
              {tenant.fullName} ({tenant.property})
            </MenuItem>
          ))}
        </TextField>
      </IcPageHeader>
      {selectedTenant !== "" &&
      moveInDate !== undefined &&
      tenantDetails &&
      address !== undefined ? (
        <Grid container rowSpacing={2} sx={{ paddingTop: 2 }}>
          {/* Row 1 */}
          <Grid item xs={4}>
            <Typography>
              <b>Full name: </b>
              {selectedTenant}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            {address === "No Property Listed" ? (
              <Typography>
                <b>Property: </b>
                {address}
              </Typography>
            ) : (
              <Typography>
                <b>Property: </b>
                <span className="linkText" onClick={handlePropertyClick}>
                  {address}
                </span>
              </Typography>
            )}
          </Grid>
          {/* Row 2 */}
          <Grid item xs={4}>
            <Typography>
              <b>Phone Number: </b>
              {tenantDetails.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              <b>Second Phone Number: </b>
              {tenantDetails.phoneNumber2}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <b>Email: </b>
              {tenantDetails.email}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              <b>Second Email: </b>
              {tenantDetails.email2}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <b>Move In Date: </b>
              {moveInDate}
            </Typography>
          </Grid>
          {/* Row 3 */}
          <Grid item xs={8}>
            <Typography>
              <b>Emergency Contact Name: </b>
              {tenantDetails.EContactName}
            </Typography>
          </Grid>
          {/* Row 4 */}
          <Grid item xs={4}>
            <Typography>
              <b>Bank name: </b>
              {tenantDetails.bankName}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              <b>Emergency Contact Phone Number: </b>
              {tenantDetails.EContactNumber}
            </Typography>
          </Grid>
          {/* Row 5 */}
          <Grid item xs={4}>
            <Typography>
              <b>Account number: </b>
              {tenantDetails.accountNumber}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              <b>Emergency Contact Email: </b>
              {tenantDetails.EContactEmail}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <b>Sort Code: </b>
              {tenantDetails.sortCode}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <StaticAlert
          type="info"
          message="Select a tenant to view their details"
        />
      )}
    </>
  );
}
