import { Box, Grid, Modal, Typography } from "@mui/material";
import { IcPageHeader } from "@ukic/react";
import React, { useEffect, useState } from "react";
import AppWidgetSummary from "../components/appWidget";
import axios from "axios";
import apiLocation from "../components/apiLocation";
import GasCertModal from "../components/GasCertModal";
import { useAppContext } from "../App.context";

export default function DashboardView() {
  const { currentUser } = useAppContext();

  const [gasCertsdue, setGasCertsDue] = useState();
  const [numberOfGasCertsdue, setNumberOfGasCertsDue] = useState(0);
  const [gasCertsModalOpen, setGasCertsModalOpen] = useState(false);

  const [electricalInspectionsdue, setElectricalInspectionsDue] = useState();
  const [
    numberOfElectricalInspectionsdue,
    setNumberOfElectricalInspectionsDue,
  ] = useState(0);
  const [electricalInspectionsModalOpen, setElectricalInspectionsModalOpen] =
    useState(false);

  const [epcsdue, setEpcsDue] = useState();
  const [numberOfEpcsdue, setNumberOfEpcsDue] = useState(0);
  const [epcsModalOpen, setEpcsModalOpen] = useState(false);

  const [insuranceRenewalsdue, setInsuranceRenewalsDue] = useState();
  const [numberOfInsuranceRenewalsdue, setNumberOfInsuranceRenewalsDue] =
    useState(0);
  const [insuranceRenewalsdueModalOpen, setInsuranceRenewalsdueModalOpen] =
    useState(false);

  const [rentRenewalsdue, setRentRenewalsDue] = useState();
  const [numberOfRentRenewalsdue, setNumberOfRentRenewalsDue] = useState(0);
  const [rentRenewalsdueModalOpen, setRentRenewalsdueModalOpen] =
    useState(false);

  const [tenancyRenewalsdue, setTenancyRenewalsDue] = useState();
  const [numberOfTenancyRenewalsdue, setNumberOfTenancyRenewalsDue] =
    useState(0);
  const [tenancyRenewalsdueModalOpen, setTenancyRenewalsdueModalOpen] =
    useState(false);

  const [mortgageRenewalsdue, setMortgageRenewalsDue] = useState();
  const [numberOfMortgageRenewalsdue, setNumberOfMortgageRenewalsDue] =
    useState(0);
  const [mortgageRenewalsdueModalOpen, setMortgageRenewalsdueModalOpen] =
    useState(false);

  const [councilLicenseRenewalsdue, setCouncilLicenseRenewalsDue] = useState();
  const [
    numberOfCouncilLicenseRenewalsdue,
    setNumberOfCouncilLicenseRenewalsDue,
  ] = useState(0);
  const [
    councilLicenseRenewalsdueModalOpen,
    setCouncilLicenseRenewalsdueModalOpen,
  ] = useState(false);

  //Gas certs
  useEffect(() => {
    axios
      .get(`${apiLocation}/gas-certificates-due/90`)
      .then((response) => {
        const data = response.data;
        const mappedRows = [];
        data.map((property) =>
          mappedRows.push({
            name: property.address_line_1,
            country: property.country,
            date: property.gas_certificate_renewal_date,
          })
        );

        setGasCertsDue(mappedRows); // Update the state with the mapped data
        setNumberOfGasCertsDue(mappedRows.length);
      })
      .catch((error) => {
        console.error("There was an error fetching the issues:", error);
      });
  }, []);

  //EPC certs
  useEffect(() => {
    axios
      .get(`${apiLocation}/epc-certificates-due/90`)
      .then((response) => {
        const data = response.data;
        const mappedRows = [];
        data.map((property) =>
          mappedRows.push({
            name: property.address_line_1,
            country: property.country,
            date: property.epc_renewal_date,
          })
        );

        setEpcsDue(mappedRows); // Update the state with the mapped data
        setNumberOfEpcsDue(mappedRows.length);
      })
      .catch((error) => {
        console.error("There was an error fetching the issues:", error);
      });
  }, []);

  //Rent reviews
  useEffect(() => {
    axios
      .get(`${apiLocation}/rent-reviews-due/90`)
      .then((response) => {
        const data = response.data;
        const mappedRows = [];
        data.map((property) =>
          mappedRows.push({
            name: property.property_name,
            date: property.rent_review_date,
          })
        );

        setRentRenewalsDue(mappedRows); // Update the state with the mapped data
        setNumberOfRentRenewalsDue(mappedRows.length);
      })
      .catch((error) => {
        console.error("There was an error fetching the issues:", error);
      });
  }, []);

  //Tenancy reviews due
  useEffect(() => {
    axios
      .get(`${apiLocation}/tenancy-reviews-due/90`)
      .then((response) => {
        const data = response.data;
        const mappedRows = [];
        data.map((property) =>
          mappedRows.push({
            name: property.property_name,
            date: property.tenancy_renewal_date,
          })
        );

        setTenancyRenewalsDue(mappedRows); // Update the state with the mapped data
        setNumberOfTenancyRenewalsDue(mappedRows.length);
      })
      .catch((error) => {
        console.error("There was an error fetching the issues:", error);
      });
  }, []);

  //Electrical inspections due
  useEffect(() => {
    axios
      .get(`${apiLocation}/electrical-inspections-due/90`)
      .then((response) => {
        const data = response.data;
        const mappedRows = [];
        data.map((property) =>
          mappedRows.push({
            name: property.address_line_1,
            country: property.country,
            date: property.electrical_inspection_date,
          })
        );

        setElectricalInspectionsDue(mappedRows); // Update the state with the mapped data
        setNumberOfElectricalInspectionsDue(mappedRows.length);
      })
      .catch((error) => {
        console.error("There was an error fetching the issues:", error);
      });
  }, []);

  //Insurance renewals
  useEffect(() => {
    axios
      .get(`${apiLocation}/insurance-renewals-due/90`)
      .then((response) => {
        const data = response.data;
        const mappedRows = [];
        data.map((property) =>
          mappedRows.push({
            name: property.property,
            date: property.renewal_due,
          })
        );

        setInsuranceRenewalsDue(mappedRows); // Update the state with the mapped data
        setNumberOfInsuranceRenewalsDue(mappedRows.length);
      })
      .catch((error) => {
        console.error("There was an error fetching the issues:", error);
      });
  }, []);

  //Mortgage renewals
  useEffect(() => {
    axios
      .get(`${apiLocation}/mortgage-renewals-due/90`)
      .then((response) => {
        const data = response.data;
        const mappedRows = [];
        data.map((property) =>
          mappedRows.push({
            name: property.property,
            date: property.renewal_date,
          })
        );

        setMortgageRenewalsDue(mappedRows); // Update the state with the mapped data
        setNumberOfMortgageRenewalsDue(mappedRows.length);
      })
      .catch((error) => {
        console.error("There was an error fetching the issues:", error);
      });
  }, []);

  //Council license renewals due
  useEffect(() => {
    axios
      .get(`${apiLocation}/council-license-renewals-due/90`)
      .then((response) => {
        const data = response.data;
        const mappedRows = [];
        data.map((property) =>
          mappedRows.push({
            name: property.address_line_1,
            country: property.country,
            date: property.council_license_date,
          })
        );

        setCouncilLicenseRenewalsDue(mappedRows); // Update the state with the mapped data
        setNumberOfCouncilLicenseRenewalsDue(mappedRows.length);
      })
      .catch((error) => {
        console.error("There was an error fetching the issues:", error);
      });
  }, []);

  return (
    <>
      <IcPageHeader
        heading={`Welcome to the Property Manager, ${currentUser}`}
      />
      <Grid container spacing={2} sx={{ paddingTop: 2 }}>
        {/* Row 1 */}
        <Grid item xs={3}>
          <AppWidgetSummary
            title="Gas certificates due in under 3 months"
            total={numberOfGasCertsdue}
            onClick={() => setGasCertsModalOpen(true)}
          />
        </Grid>
        <Grid item xs={3}>
          <AppWidgetSummary
            title="EPC certificates due in under 3 months"
            total={numberOfEpcsdue}
            onClick={() => setEpcsModalOpen(true)}
          />
        </Grid>
        <Grid item xs={3}>
          <AppWidgetSummary
            title="Rent reviews due in under 3 months"
            total={numberOfRentRenewalsdue}
            onClick={() => setRentRenewalsdueModalOpen(true)}
          />
        </Grid>
        <Grid item xs={3}>
          <AppWidgetSummary
            title="Tenancy reviews due in under 3 months"
            total={numberOfTenancyRenewalsdue}
            onClick={() => setTenancyRenewalsdueModalOpen(true)}
          />
        </Grid>
        {/* Row 2 */}
        <Grid item xs={3}>
          <AppWidgetSummary
            title="Electrical inspections due in under 3 months"
            total={numberOfElectricalInspectionsdue}
            onClick={() => setElectricalInspectionsModalOpen(true)}
          />
        </Grid>
        <Grid item xs={3}>
          <AppWidgetSummary
            title="Insurance renewals due in under 3 months"
            total={numberOfInsuranceRenewalsdue}
            onClick={() => setInsuranceRenewalsdueModalOpen(true)}
          />
        </Grid>
        <Grid item xs={3}>
          <AppWidgetSummary
            title="Mortgage renewals due in under 3 months"
            total={numberOfMortgageRenewalsdue}
            onClick={() => setMortgageRenewalsdueModalOpen(true)}
          />
        </Grid>
        <Grid item xs={3}>
          <AppWidgetSummary
            title="Council license renewals due in under 3 months"
            total={numberOfCouncilLicenseRenewalsdue}
            onClick={() => setCouncilLicenseRenewalsdueModalOpen(true)}
          />
        </Grid>
      </Grid>
      {/* Gas */}
      <Modal
        open={gasCertsModalOpen && numberOfGasCertsdue !== 0}
        onClose={() => setGasCertsModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 2,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {" "}
            Gas Certificates Due (within 3 months)
          </Typography>
          <GasCertModal data={gasCertsdue} />
        </Box>
      </Modal>
      {/* EPC */}
      <Modal
        open={epcsModalOpen && numberOfEpcsdue !== 0}
        onClose={() => setEpcsModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 2,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {" "}
            EPCs Due (within 3 months)
          </Typography>
          <GasCertModal data={epcsdue} />
        </Box>
      </Modal>
      {/* Rent Renews */}
      <Modal
        open={rentRenewalsdueModalOpen && numberOfRentRenewalsdue !== 0}
        onClose={() => setRentRenewalsdueModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 2,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {" "}
            Rent Renewals Due (within 3 months)
          </Typography>
          <GasCertModal data={rentRenewalsdue} />
        </Box>
      </Modal>
      {/* Tenancy renrews */}
      <Modal
        open={tenancyRenewalsdueModalOpen && numberOfTenancyRenewalsdue !== 0}
        onClose={() => setTenancyRenewalsdueModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 2,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {" "}
            Tenancy Renewals Due (within 3 months){" "}
          </Typography>
          <GasCertModal data={tenancyRenewalsdue} />
        </Box>
      </Modal>
      {/* Elect */}
      <Modal
        open={
          electricalInspectionsModalOpen &&
          numberOfElectricalInspectionsdue !== 0
        }
        onClose={() => setElectricalInspectionsModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 2,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {" "}
            Electrical Inspections Due (within 3 months)
          </Typography>
          <GasCertModal data={electricalInspectionsdue} />
        </Box>
      </Modal>
      {/* Insure */}
      <Modal
        open={
          insuranceRenewalsdueModalOpen && numberOfInsuranceRenewalsdue !== 0
        }
        onClose={() => setInsuranceRenewalsdueModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 2,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {" "}
            Insurance Renewals Due (within 3 months)
          </Typography>
          <GasCertModal data={insuranceRenewalsdue} />
        </Box>
      </Modal>
      {/* Mortgage */}
      <Modal
        open={mortgageRenewalsdueModalOpen && numberOfMortgageRenewalsdue !== 0}
        onClose={() => setMortgageRenewalsdueModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 2,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {" "}
            Mortgage Renewals Due (within 3 months)
          </Typography>
          <GasCertModal data={mortgageRenewalsdue} />
        </Box>
      </Modal>
      {/* Council L */}
      <Modal
        open={
          councilLicenseRenewalsdueModalOpen &&
          numberOfCouncilLicenseRenewalsdue !== 0
        }
        onClose={() => setCouncilLicenseRenewalsdueModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 2,
            borderRadius: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {" "}
            Council License Renewals Due (within 3 months)
          </Typography>
          <GasCertModal data={councilLicenseRenewalsdue} />
        </Box>
      </Modal>
    </>
  );
}
