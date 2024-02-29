import React, { useEffect, useState, useMemo } from "react";
import { IcPageHeader, IcButton, IcNavigationItem } from "@ukic/react";
import apiLocation from "../components/apiLocation";
import axios from "axios";
import {
  Grid,
  Typography,
  MenuItem,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import {
  Add,
  Edit,
  ElectricMeterOutlined,
  Engineering,
  GasMeterOutlined,
  History,
  PeopleOutlineOutlined,
  Reply,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import ElectricHistory from "../components/ElectricHistoryModal";
import GasHistory from "../components/GasHistoryModal";
import TenantHistory from "../components/TenantHistoryModal";
import styled from "styled-components";

import "../App.css";
import StaticAlert from "../components/staticAlert";
import GasHistoryAdd from "../components/gasHistoryAdd";
import TenantHistoryAdd from "../components/tenantHistoryAdd";
import AgentHistory from "../components/AgentHIstoryModal";
import AgentHistoryAdd from "../components/AgentHIstoryAdd";
import formatDisplayDate from "../components/formatdisplayDate";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App.context";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const StyledIcNavigationItem = styled(IcNavigationItem)`
  color: #282c34 !important;
  --ic-theme-text: #282c34 !important;
`;

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "dateReported",
    numeric: false,
    disablePadding: false,
    label: "Date Reported",
  },
  {
    id: "property",
    numeric: false,
    disablePadding: false,
    label: "Property",
  },
  {
    id: "problem",
    numeric: false,
    disablePadding: false,
    label: "Problem",
  },
  {
    id: "dateResolved",
    numeric: false,
    disablePadding: false,
    label: "Date Resolved",
  },
  {
    id: "contractor",
    numeric: false,
    disablePadding: false,
    label: "Contractor",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function PropertyView() {
  const navigate = useNavigate();

  const {
    propertySelected,
    setPropertyToEdit,
    setPropertyTenant,
    setIssueToEdit,
  } = useAppContext();

  const [propertyList, setPropertyList] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [propertyDetails, setPropertyDetails] = useState();
  const [tenantDetails, setTenantDetails] = useState();
  const [purchaseDetails, setPurchaseDetails] = useState();
  const [insuranceDetails, setInsuranceDetails] = useState();
  const [agentDetails, setAgentDetails] = useState();
  const [tenancyDetails, setTenancyDetails] = useState();
  const [depositDetails, setDepositDetails] = useState();
  const [urls, setUrls] = useState();
  const [selectedInfoView, setSelectedInfoView] = useState("PRD");

  const [gasSupplierDetails, setGasSupplierDetails] = useState();
  const [electricSupplierDetails, setElectricSupplierDetails] = useState();
  const [waterSupplierDetails, setWaterSupplierDetails] = useState();

  const [electricModalOpen, setElectricModalOpen] = useState(false);
  const [gasModalOpen, setGasModalOpen] = useState(false);
  const [tenantHistoryModalOpen, setTenantHistoryModalOpen] = useState(false);
  const [agentHistoryModalOpen, setAgentHistoryModalOpen] = useState(false);

  const [gasSupplierOpen, setGasSupplierOpen] = useState(false);
  const [electricSupplierOpen, setElectricSupplierOpen] = useState(false);
  const [waterSupplierOpen, setWaterSupplierOpen] = useState(false);

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("dateReported");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContractorName, setSelectedContractorName] = useState("");
  const [contractor, setContractor] = useState();

  const [gasAddMode, setGasAddMode] = useState(false);
  const [electricAddMode, setElectricAddMode] = useState(false);
  const [tenantHistoryAddMode, setTenantHistoryAddMode] = useState(false);
  const [agentHistoryAddMode, setAgentHistoryAddMode] = useState(false);

  const [selectedIssueId, setSelectedIssueId] = useState();

  useEffect(() => {
    function checkForUrlId() {
      console.log(propertySelected);
      if (propertySelected !== "") {
        setSelectedProperty(propertySelected);
      }
    }

    async function getPropertyList() {
      try {
        const response = await axios.get(`${apiLocation}/property-list`);

        // Convert the response data into your desired format
        const data = response.data.map((property) => ({
          addressLine1: property.address_line_1,
          country: property.country,
        }));

        console.log(data);
        setPropertyList(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    getPropertyList();
    checkForUrlId();
  }, []);

  useEffect(() => {
    async function getPropertyDetails() {
      try {
        const request = await axios.get(
          `${apiLocation}/property-details/${selectedProperty}`
        );
        const data = {
          id: request.data.id,
          addressLine1: request.data.address_line_1,
          addressLine2: request.data.address_line_2,
          city: request.data.city,
          county: request.data.county,
          country: request.data.country,
          postCode: request.data.post_code,
          currentTenant: request.data.current_tenant,
          currentValue: request.data.current_value,
          epcRenewalDate: request.data.epc_renewal_date,
          gasCertificateRenewalDate: request.data.gas_certificate_renewal_date,
          electricalInspectionDate: request.data.electrical_inspection_date,
          councilLicenseRenewalDate: request.data.council_license_date,
          gasSupplier: request.data.gas_supplier_details,
          gasAccountNumber: request.data.gas_account_number,
          electricSupplier: request.data.electric_supplier_details,
          electricAccountNumber: request.data.electric_account_number,
          waterSupplier: request.data.water_supplier_details,
          waterAccountNumber: request.data.water_account_number,
          entryCode: request.data.entry_code,
          agent: request.data.agent,
          startDate: request.data.agent_start_date,
        };
        console.log(data);
        setPropertyDetails(data);
      } catch (e) {
        //Alert saying api cannot be reached try again later
      }
    }

    async function getPurchaseDetails() {
      try {
        const requestPurchase = await axios.get(
          `${apiLocation}/purchase-details/${selectedProperty}`
        );

        if (requestPurchase.data[0].purchase_type === "Mortgage") {
          const requestMortgage = await axios.get(
            `${apiLocation}/mortgage-details/${selectedProperty}`
          );
          const data = {
            purchaseDate: requestPurchase.data[0].purchase_date,
            purchasePrice: requestPurchase.data[0].purchase_price,
            purchaseMethod: requestPurchase.data[0].purchase_method,
            purchaseType: requestPurchase.data[0].purchase_type,
            accountNumber: requestMortgage.data[0].account_number,
            ammountBorrowed: requestMortgage.data[0].amount_borrowed,
            interestRate: requestMortgage.data[0].interest_rate,
            term: requestMortgage.data[0].term,
            lenderName: requestMortgage.data[0].lender_name,
            lenderAddress: requestMortgage.data[0].lender_address,
            lenderEmail: requestMortgage.data[0].lender_email,
            lenderPhoneNumber: requestMortgage.data[0].lender_phone_number,
            mortgageType: requestMortgage.data[0].mortgage_type,
            monthlyAmount: requestMortgage.data[0].monthly_amount,
          };
          setPurchaseDetails(data);
        } else {
          const data = {
            purchaseDate: requestPurchase.data[0].purchase_date,
            purchasePrice: requestPurchase.data[0].purchase_price,
            purchaseMethod: requestPurchase.data[0].purchase_method,
            purchaseType: requestPurchase.data[0].purchase_type,
          };
          setPurchaseDetails(data);
        }
      } catch (e) {
        //Alert saying api cannot be reached try again later
      }
    }

    async function getInsuranceDetails() {
      try {
        const request = await axios.get(
          `${apiLocation}/insurance-details/${selectedProperty}`
        );

        const data = {
          insuranceNumber: request.data[0].insurance_number,
          company: request.data[0].company,
          premium: request.data[0].premium,
          prevPremium: request.data[0].previous_premium,
          renewalDate: request.data[0].renewal_due,
        };
        setInsuranceDetails(data);
      } catch (e) {
        //Alert saying api cannot be reached try again later
      }
    }

    async function getIssues() {
      axios
        .get(`${apiLocation}/issues/${selectedProperty}`)
        .then((response) => {
          const data = response.data;
          const mappedRows = data.map((issue) => ({
            id: issue.id,
            dateReported: issue.date_reported,
            property: issue.property,
            problem: issue.problem,
            dateResolved: issue.date_fixed,
            contractor: issue.contractor_responsible,
          }));

          setRows(mappedRows); // Update the state with the mapped data
        })
        .catch((error) => {
          console.error("There was an error fetching the issues:", error);
        });
    }

    async function getUrls() {
      try {
        const request = await axios.get(
          `${apiLocation}/urls/${selectedProperty}`
        );

        const data = {
          astUrl: request.data[0].ast_url,
          epcUrl: request.data[0].epc_url,
          electricalCertUrl: request.data[0].electrical_cert_url,
          gasSafetyUrl: request.data[0].gas_safety_url,
          inventoryUrl: request.data[0].inventory_url,
          otherDocsUrl: request.data[0].other_docs_url,
        };
        setUrls(data);
      } catch (e) {
        //Alert saying api cannot be reached try again later
      }
    }

    getPropertyDetails();
    getPurchaseDetails();
    getInsuranceDetails();
    getIssues();
    getUrls();
  }, [selectedProperty]);

  useEffect(() => {
    async function getTenantDetails() {
      try {
        const request = await axios.get(
          `${apiLocation}/tenant-details/${propertyDetails.currentTenant}`
        );
        const data = {
          //full name is propertyDetails.tenant
          phoneNumber: request.data[0].phone_number,
          emailAddress: request.data[0].email,
          sortCode: request.data[0].bank_sort_code,
          accountNumber: request.data[0].bank_account_number,
        };
        setTenantDetails(data);
      } catch (e) {
        //Alert saying api cannot be reached try again later
      }
    }

    async function getAgentDetails() {
      try {
        const request = await axios.get(
          `${apiLocation}/agent-details/${propertyDetails.agent}`
        );
        const data = {
          // name is propertyDetails.agent
          phoneNumber: request.data.phone_number,
          emailAddress: request.data.email,
          address: request.data.address,
        };
        setAgentDetails(data);
      } catch (e) {
        //Alert saying api cannot be reached try again later
      }
    }
    async function getTenancyDetails() {
      try {
        const response = await axios.get(
          `${apiLocation}/tenancy-details/${propertyDetails.addressLine1}`
        );

        // Convert the response data into your desired format
        const data = {
          // Full name already exists
          property: response.data[0].property_name,
          moveInDate: response.data[0].move_in_date,
          contractTerm: response.data[0].contract_term,
          initialRentAmount: response.data[0].initial_rent_amount,
          currentRentAmount: response.data[0].current_rent_amount,
          paymentMethod: response.data[0].payment_method,
          amountPaid: response.data[0].amount_paid,
          rentReviewDate: response.data[0].rent_review_date,
          tenancyReviewDate: response.data[0].tenancy_renewal_date,
          depositAmount: response.data[0].deposit_amount,
          depositWithDPS: response.data[0].deposit_lodged_with_dps,
          depositProvider: response.data[0].scheme_name,
          DPSPolicyNumber: response.data[0].scheme_policy_number,
        };

        setTenancyDetails(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    // Gas/Electric/Water suppplier info get
    // gas-supplier/name
    async function getGasSupplierInfo() {
      try {
        const response = await axios.get(
          `${apiLocation}/gas-supplier/${propertyDetails.gasSupplier}`
        );

        const data = {
          phoneNumber: response.data.phone_number,
          email: response.data.email,
        };

        setGasSupplierDetails(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    async function getElectricSupplierInfo() {
      try {
        const response = await axios.get(
          `${apiLocation}/electric-supplier/${propertyDetails.electricSupplier}`
        );

        const data = {
          phoneNumber: response.data.phone_number,
          email: response.data.email,
        };

        setElectricSupplierDetails(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    async function getWaterSupplierInfo() {
      try {
        const response = await axios.get(
          `${apiLocation}/water-supplier/${propertyDetails.waterSupplier}`
        );

        const data = {
          phoneNumber: response.data.phone_number,
          email: response.data.email,
        };

        setWaterSupplierDetails(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    getTenantDetails();
    getAgentDetails();
    getTenancyDetails();
    getGasSupplierInfo();
    getElectricSupplierInfo();
    getWaterSupplierInfo();
  }, [propertyDetails]);

  useEffect(() => {
    async function getDepositSchemeDetails() {
      const response = await axios.get(
        `${apiLocation}/deposit-scheme-details/${tenancyDetails.depositProvider}`
      );

      const data = {
        // Full name already exists
        email: response.data.scheme_email,
        phoneNumber: response.data.scheme_contact_number,
      };

      setDepositDetails(data);
    }

    if (tenancyDetails !== undefined) {
      getDepositSchemeDetails();
    }
  }, [tenancyDetails]);

  useEffect(() => {
    // Make an Axios GET request to fetch the data
    axios
      .get(`${apiLocation}/contractor-details/${selectedContractorName}/`)
      .then((response) => {
        const data = response.data;
        const mappedContractors = {
          name: data.name,
          address: data.address,
          phoneNumber: data.phone_number,
          email: data.email,
          bankSortCode: data.bank_sort_code,
          bankAccountNumber: data.bank_account_number,
        };

        setContractor(mappedContractors);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedContractorName]);

  // Function to open the modal when the contractor name is clicked
  const handleOpenModal = (contractorName, issueId) => {
    setSelectedContractorName(contractorName);
    setSelectedIssueId(issueId);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  useEffect(() => {
    setSelectedContractorName("");
  }, [selectedProperty, selectedInfoView]);

  const handleEditSelect = () => {
    setPropertyToEdit(selectedProperty);
    setPropertyTenant(propertyDetails.currentTenant);
    navigate(`/properties/edit`);
  };

  const handleIssueEditSelect = () => {
    setIssueToEdit(selectedIssueId);
    navigate("/issues/edit");
  };

  const handleTenantClick = () => {
    setPropertyTenant(propertyDetails.currentTenant);
    navigate("/tenants");
  };

  function secondaryButtons() {
    if (selectedContractorName.length !== 0) {
      return (
        <>
          {selectedContractorName !== "None" && (
            <IcButton
              slot="actions"
              variant="tertiary"
              onClick={() => setModalOpen(true)}
            >
              <Engineering slot="left-icon" /> Contactor Details
            </IcButton>
          )}
          <IcButton
            slot="actions"
            variant="tertiary"
            onClick={handleIssueEditSelect}
          >
            <Edit slot="left-icon" /> Edit Issue
          </IcButton>
        </>
      );
    }
    if (selectedProperty.length !== 0) {
      if (selectedInfoView === "PRD") {
        return (
          <>
            <IcButton
              slot="actions"
              variant="tertiary"
              onClick={() => {
                console.log("Electric button clicked");
                setElectricModalOpen(true);
              }}
            >
              <ElectricMeterOutlined slot="left-icon" /> Electric Readings
            </IcButton>
            <IcButton
              slot="actions"
              variant="tertiary"
              onClick={() => setGasModalOpen(true)}
            >
              <GasMeterOutlined slot="left-icon" /> Gas Readings
            </IcButton>
          </>
        );
      }
      if (selectedInfoView === "TD") {
        return (
          <IcButton
            slot="actions"
            variant="tertiary"
            onClick={() => setTenantHistoryModalOpen(true)}
          >
            <PeopleOutlineOutlined slot="left-icon" /> Tenant History
          </IcButton>
        );
      }
      if (selectedInfoView === "A") {
        return (
          <IcButton
            slot="actions"
            variant="tertiary"
            onClick={() => setAgentHistoryModalOpen(true)}
          >
            <History slot="left-icon" /> Agent History
          </IcButton>
        );
      }
    }
  }

  function displayedInfo() {
    if (
      selectedInfoView === "PRD" &&
      propertyDetails !== undefined &&
      purchaseDetails !== undefined
    ) {
      return (
        <Grid container spacing={2} sx={{ paddingTop: 2 }}>
          {/* Row */}
          <Grid item xs={6}>
            <Typography>
              <b>Address:</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Entry code: </b>
              {propertyDetails.entryCode}
            </Typography>
          </Grid>
          {/* Row */}
          <Grid item xs={6}>
            <Typography>{propertyDetails.addressLine1}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>EPC rewnewal date: </b>
              {formatDisplayDate(propertyDetails.epcRenewalDate)}
            </Typography>
          </Grid>
          {/* Row */}
          <Grid item xs={6}>
            <Typography>{propertyDetails.addressLine2}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Gas certificate rewnewal date: </b>
              {formatDisplayDate(propertyDetails.gasCertificateRenewalDate)}
            </Typography>
          </Grid>
          {/* Row */}
          <Grid item xs={6}>
            <Typography>{propertyDetails.city}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Next electrical inspection date: </b>
              {formatDisplayDate(propertyDetails.electricalInspectionDate)}
            </Typography>
          </Grid>
          {/* Row */}
          <Grid item xs={6}>
            <Typography>{propertyDetails.county}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Council license rewnewal date: </b>
              {formatDisplayDate(propertyDetails.councilLicenseRenewalDate)}
            </Typography>
          </Grid>
          {/* Row */}
          <Grid item xs={6}>
            <Typography>{propertyDetails.postCode}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Gas supplier: </b>
              <span
                onClick={() => setGasSupplierOpen(true)}
                className="linkText"
              >
                {propertyDetails.gasSupplier}
              </span>
            </Typography>
          </Grid>
          {/* Row */}
          <Grid item xs={6}>
            <Typography>
              <b>Current value: </b>
              £{propertyDetails.currentValue}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Electric supplier: </b>
              <span
                onClick={() => setElectricSupplierOpen(true)}
                className="linkText"
              >
                {propertyDetails.electricSupplier}
              </span>
            </Typography>
          </Grid>
          {/* Row */}
          <Grid item xs={6}>
            <Typography>
              <b>Purchase Price: </b>
              £{purchaseDetails.purchasePrice}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Water supplier: </b>
              <span
                onClick={() => setWaterSupplierOpen(true)}
                className="linkText"
              >
                {propertyDetails.waterSupplier}
              </span>
            </Typography>
          </Grid>
        </Grid>
      );
    }
    if (
      selectedInfoView === "TD" &&
      propertyDetails !== undefined &&
      tenancyDetails !== undefined
    ) {
      return (
        <Grid container spacing={2} sx={{ paddingTop: 2 }}>
          <Grid item xs={4}>
            <Typography>
              <b>Tenant: </b>
              <span className="linkText" onClick={handleTenantClick}>
                {propertyDetails.currentTenant}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <b>Contract Term: </b>
              {tenancyDetails.contractTerm} months
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <b>Payment Method: </b>
              {tenancyDetails.paymentMethod}
            </Typography>
          </Grid>
          {/* Row */}
          <Grid item xs={4}>
            <Typography>
              <b>Move in Date: </b>
              {formatDisplayDate(tenancyDetails.moveInDate)}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <b>Rent Review Date: </b>
              {formatDisplayDate(tenancyDetails.rentReviewDate)}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <b>Tenancy Review Date: </b>
              {formatDisplayDate(tenancyDetails.tenancyReviewDate)}
            </Typography>
          </Grid>
          {/* Row */}
          <Grid item xs={4}>
            <Typography>
              <b>Initial Rent: </b>
              £{tenancyDetails.initialRentAmount}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography>
              <b>Current Rent: </b>
              £{tenancyDetails.currentRentAmount}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <b>Amount paid: </b>
              £{tenancyDetails.amountPaid}
            </Typography>
          </Grid>
          {/* Row */}
          <Grid item xs={4}>
            <Typography>
              <b>Deposit Amount: </b>
              £{tenancyDetails.depositAmount}
            </Typography>
          </Grid>
          {/* Row */}
          <Grid item xs={4}>
            <Typography>
              <b>Deposit Lodged with DPS? </b>
              {tenancyDetails.depositWithDPS === true ? "Yes" : "No"}
            </Typography>
          </Grid>
          {tenancyDetails.depositWithDPS === true && (
            <>
              <Grid item xs={4}>
                <Typography>
                  <b>Scheme Name: </b>
                  {tenancyDetails.depositProvider}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <b>Deposit Account Number: </b>
                  {tenancyDetails.DPSPolicyNumber}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <b>Scheme Email: </b>
                  {depositDetails.email}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  <b>Scheme Phone Number: </b>
                  {depositDetails.phoneNumber}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      );
    }
    if (selectedInfoView === "PUD" && purchaseDetails !== undefined) {
      if (purchaseDetails.purchaseType === "Cash") {
        return (
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            {/* Row */}
            <Grid item xs={4}>
              <Typography>
                <b>Purchase Date: </b>
                {formatDisplayDate(purchaseDetails.purchaseDate)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <b>Purchase Mathod: </b>
                {purchaseDetails.purchaseMethod}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <b>Purchase Type: </b>
                {purchaseDetails.purchaseType}
              </Typography>
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            {/* Row */}
            <Grid item xs={4}>
              <Typography>
                <b>Purchase Date: </b>
                {formatDisplayDate(purchaseDetails.purchaseDate)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <b>Purchase Mathod: </b>
                {purchaseDetails.purchaseMethod}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <b>Purchase Type: </b> {purchaseDetails.purchaseType}
              </Typography>
            </Grid>
            {/* Row */}
            <Grid item xs={6}>
              <Typography>
                <b>Lender Name: </b>
                {purchaseDetails.lenderName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <b>Amount Borrowed: </b>
                £{purchaseDetails.ammountBorrowed}
              </Typography>
            </Grid>
            {/* Row */}
            <Grid item xs={6}>
              <Typography>
                <b>Account Number: </b>
                {purchaseDetails.accountNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <b>Interest rate: </b>
                {purchaseDetails.interestRate}%
              </Typography>
            </Grid>
            {/* Row */}
            <Grid item xs={6}>
              <Typography>
                <b>Address: </b>
                {purchaseDetails.lenderAddress}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <b>Term: </b>
                {purchaseDetails.term} years
              </Typography>
            </Grid>
            {/* Row */}
            <Grid item xs={6}>
              <Typography>
                <b>Email: </b>
                {purchaseDetails.lenderEmail}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <b>Mortgage Type: </b>
                {purchaseDetails.mortgageType}
              </Typography>
            </Grid>
            {/* Row */}
            <Grid item xs={6}>
              <Typography>
                <b>Phone no.: </b>
                {purchaseDetails.lenderPhoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <b>Monthly Amount: </b>
                £{purchaseDetails.monthlyAmount}
              </Typography>
            </Grid>
          </Grid>
        );
      }
    }
    if (selectedInfoView === "IS" && propertyDetails !== undefined) {
      return (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    let dateResolvedContent = row.dateResolved;
                    let contractorContent = row.contractor;
                    {
                      row.dateResolved === "2000-01-01" &&
                        (dateResolvedContent = "Unallocated");
                    }
                    {
                      row.dateResolved === "2000-01-01" &&
                        (contractorContent = "None");
                    }
                    {
                      row.dateResolved === "2000-01-02" &&
                        (dateResolvedContent = "Allocated");
                    }
                    {
                      row.dateResolved !== "2000-01-02" &&
                        row.dateResolved !== "2000-01-01" &&
                        (dateResolvedContent = formatDisplayDate(
                          row.dateResolved
                        ));
                    }

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          dateResolvedContent !== "Unallocated"
                            ? handleOpenModal(row.contractor, row.id)
                            : setSelectedContractorName("None");
                        }} // Open modal when contractor name is clicked
                      >
                        <TableCell align="left">
                          {formatDisplayDate(row.dateReported)}
                        </TableCell>
                        <TableCell align="left">{row.property}</TableCell>
                        <TableCell align="left">{row.problem}</TableCell>
                        <TableCell align="left">
                          {dateResolvedContent}
                        </TableCell>
                        <TableCell align="left">{contractorContent}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          {/* Material-UI Modal */}
          <Modal open={modalOpen} onClose={handleCloseModal}>
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
                Contractor{" "}
              </Typography>
              {contractor?.name && (
                <Typography sx={{ mt: 2 }}>
                  <b>Name:</b> {contractor.name}
                </Typography>
              )}
              {contractor?.address && (
                <Typography sx={{ mt: 2 }}>
                  <b>Address:</b> {contractor.address}
                </Typography>
              )}
              {contractor?.phoneNumber && (
                <Typography sx={{ mt: 2 }}>
                  <b>Phone Number:</b> {contractor.phoneNumber}
                </Typography>
              )}
              {contractor?.email && (
                <Typography sx={{ mt: 2 }}>
                  <b>Email:</b> {contractor.email}
                </Typography>
              )}
              {contractor?.bankSortCode && (
                <Typography sx={{ mt: 2 }}>
                  <b>Bank Sort Code:</b> {contractor.bankSortCode}
                </Typography>
              )}
              {contractor?.bankAccountNumber && (
                <Typography sx={{ mt: 2 }}>
                  <b>Bank Account Number:</b> {contractor.bankAccountNumber}
                </Typography>
              )}
            </Box>
          </Modal>
        </Box>
      );
    }
    if (
      selectedInfoView === "IN" &&
      purchaseDetails !== undefined &&
      insuranceDetails !== undefined
    ) {
      return (
        <Grid container spacing={2} sx={{ paddingTop: 2 }}>
          <Grid item xs={12}>
            <Typography>
              <b>Company: </b>
              {insuranceDetails.company}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Premium: </b>
              £{insuranceDetails.premium}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Previous Premium: </b>
              £{insuranceDetails.prevPremium}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Insurance No.: </b>
              {insuranceDetails.insuranceNumber}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Renewal Date: </b>
              {formatDisplayDate(insuranceDetails.renewalDate)}
            </Typography>
          </Grid>
        </Grid>
      );
    }
    if (
      selectedInfoView === "D" &&
      propertyDetails !== undefined &&
      tenancyDetails !== undefined
    ) {
      return (
        <Grid container spacing={2} sx={{ paddingTop: 2 }}>
          {/* Row */}
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              target="_blank"
              href={urls.astUrl}
            >
              View AST (Review by{" "}
              {formatDisplayDate(tenancyDetails.tenancyReviewDate)}){" "}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              target="_blank"
              href={urls.epcUrl}
            >
              View EPC Certificate (Review by{" "}
              {formatDisplayDate(propertyDetails.epcRenewalDate)}){" "}
            </Button>
          </Grid>
          {/* Row */}
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              target="_blank"
              href={urls.electricalCertUrl}
            >
              View Electrical Certificate (Review by{" "}
              {formatDisplayDate(propertyDetails.electricalInspectionDate)}){" "}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              target="_blank"
              href={urls.gasSafetyUrl}
            >
              View Gas Safety Certificate (Review by{" "}
              {formatDisplayDate(propertyDetails.gasCertificateRenewalDate)}){" "}
            </Button>
          </Grid>
          {/* Row */}
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              target="_blank"
              href={urls.inventoryUrl}
            >
              View Inventory{" "}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              target="_blank"
              href={urls.otherDocsUrl}
            >
              View Other Documents{" "}
            </Button>
          </Grid>
        </Grid>
      );
    }
    if(
      selectedInfoView === "A" &&
      propertyDetails.agent === null
    ) {
      return(
        <StaticAlert
          type="warning"
          message="No agent assigned to this property"
        />
      )
    }
    if (
      selectedInfoView === "A" &&
      propertyDetails !== undefined &&
      agentDetails !== undefined
    ) {
      return (
        <Grid container spacing={2} sx={{ paddingTop: 2 }}>
          <Grid item xs={12}>
            <Typography>
              <b>Name: </b>
              {propertyDetails.agent}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Phone No.: </b>
              {agentDetails.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Email: </b>
              {agentDetails.emailAddress}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Address: </b>
              {agentDetails.address}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <b>Start date: </b>
              {formatDisplayDate(propertyDetails.startDate)}
            </Typography>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <StaticAlert
          type="info"
          message="Select a property to view its details"
        />
      );
    }
  }

  return (
    <>
      <IcPageHeader heading="Manage Properties" reverseOrder>
        <IcButton
          slot="actions"
          variant="primary"
          onClick={() => navigate("/properties/add")}
        >
          <Add slot="left-icon" /> Add Property
        </IcButton>
        {secondaryButtons()}
        {selectedProperty.length !== 0 && propertyDetails !== undefined && (
          <IcButton
            slot="actions"
            variant="tertiary"
            onClick={handleEditSelect}
          >
            <Edit slot="left-icon" /> Edit Property
          </IcButton>
        )}
        <TextField
          slot="input"
          labelId="demo-simple-select-label"
          variant="outlined"
          id="demo-simple-select"
          value={selectedProperty}
          label="Select property"
          select
          onChange={(e) => setSelectedProperty(e.target.value)}
          fullWidth
        >
          {propertyList.map((property, index) => (
            <MenuItem key={index} value={property.addressLine1}>
              {property.addressLine1} ({property.country})
            </MenuItem>
          ))}
        </TextField>
        <StyledIcNavigationItem
          slot="tabs"
          label="Property Details"
          onClick={() => {
            setSelectedInfoView("PRD");
          }}
          selected={selectedInfoView === "PRD"}
        />
        <StyledIcNavigationItem
          slot="tabs"
          label="Tenancy Details"
          onClick={() => setSelectedInfoView("TD")}
          selected={selectedInfoView === "TD"}
        />
        <StyledIcNavigationItem
          slot="tabs"
          label="Purchase Details"
          onClick={() => setSelectedInfoView("PUD")}
          selected={selectedInfoView === "PUD"}
        />
        <StyledIcNavigationItem
          slot="tabs"
          label="Insurance Details"
          onClick={() => setSelectedInfoView("IN")}
          selected={selectedInfoView === "IN"}
        />
        <StyledIcNavigationItem
          slot="tabs"
          label="Agent"
          onClick={() => setSelectedInfoView("A")}
          selected={selectedInfoView === "A"}
        />
        <StyledIcNavigationItem
          slot="tabs"
          label="Property Issues"
          onClick={() => setSelectedInfoView("IS")}
          selected={selectedInfoView === "IS"}
        />
        <StyledIcNavigationItem
          slot="tabs"
          label="Documents"
          onClick={() => setSelectedInfoView("D")}
          selected={selectedInfoView === "D"}
          sx={{ color: "#282c34" }}
        />
      </IcPageHeader>
      {displayedInfo()}
      {/* Electric history Modal */}
      <Modal
        open={electricModalOpen}
        onClose={() => setElectricModalOpen(false)}
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
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => setElectricAddMode(!electricAddMode)}
          >
            {electricAddMode ? <Reply /> : <Add />}
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {" "}
            Electric Reading History{" "}
          </Typography>
          {electricAddMode ? (
            <GasHistoryAdd property={propertyDetails.id} type="e" />
          ) : (
            <ElectricHistory property={selectedProperty} />
          )}
        </Box>
      </Modal>
      {/* Gas history Modal */}
      <Modal open={gasModalOpen} onClose={() => setGasModalOpen(false)}>
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
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => setGasAddMode(!gasAddMode)}
          >
            {gasAddMode ? <Reply /> : <Add />}
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {" "}
            Gas Reading History{" "}
          </Typography>
          {gasAddMode ? (
            <GasHistoryAdd property={propertyDetails.id} type="g" />
          ) : (
            <GasHistory property={selectedProperty} />
          )}
        </Box>
      </Modal>
      {/* Tenant history Modal */}
      {propertyDetails === undefined ? (
        <></>
      ) : (
        <Modal
          open={tenantHistoryModalOpen}
          onClose={() => setTenantHistoryModalOpen(false)}
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
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => setTenantHistoryAddMode(!tenantHistoryAddMode)}
            >
              {tenantHistoryAddMode ? <Reply /> : <Add />}
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {" "}
              Tenant History{" "}
            </Typography>
            {tenantHistoryAddMode ? (
              <TenantHistoryAdd property={propertyDetails.id} />
            ) : (
              <TenantHistory
                property={selectedProperty}
                propertyDetails={propertyDetails}
                tenancyDetails={tenancyDetails}
              />
            )}
          </Box>
        </Modal>
      )}
      {/* Agent history Modal */}
      {agentDetails === undefined ? (
        <></>
      ) : (
        <Modal
          open={agentHistoryModalOpen}
          onClose={() => setAgentHistoryModalOpen(false)}
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
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => setAgentHistoryAddMode(!agentHistoryAddMode)}
            >
              {agentHistoryAddMode ? <Reply /> : <Add />}
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {" "}
              Agent History{" "}
            </Typography>
            {agentHistoryAddMode ? (
              <AgentHistoryAdd property={propertyDetails.id} />
            ) : (
              <AgentHistory
                property={propertyDetails.addressLine1}
                propertyDetails={propertyDetails}
              />
            )}
          </Box>
        </Modal>
      )}
      {/* Gas Supplier Modal */}
      {gasSupplierDetails !== undefined && propertyDetails !== undefined && (
        <Modal
          open={gasSupplierOpen}
          direction={"columns"}
          onClose={() => setGasSupplierOpen(false)}
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Gas Supplier
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Supplier:</b> {propertyDetails.gasSupplier}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Account Number:</b> {propertyDetails.gasAccountNumber}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Phone Number:</b> {gasSupplierDetails.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Email Address:</b> {gasSupplierDetails.email}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
      {/* Electric Supplier Modal */}
      {electricSupplierDetails !== undefined &&
        propertyDetails !== undefined && (
          <Modal
            open={electricSupplierOpen}
            direction={"columns"}
            onClose={() => setElectricSupplierOpen(false)}
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {" "}
                    Electric Supplier{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <b>Supplier:</b> {propertyDetails.electricSupplier}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <b>Account Number:</b>{" "}
                    {propertyDetails.electricAccountNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <b>Phone Number:</b> {electricSupplierDetails.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <b>Email Address:</b> {electricSupplierDetails.email}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        )}
      {/* Water Supplier Modal */}
      {waterSupplierDetails !== undefined && propertyDetails !== undefined && (
        <Modal
          open={waterSupplierOpen}
          direction={"columns"}
          onClose={() => setWaterSupplierOpen(false)}
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {" "}
                  Water Supplier{" "}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Supplier:</b> {propertyDetails.waterSupplier}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Account Number:</b> {propertyDetails.waterAccountNumber}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Phone Number:</b> {waterSupplierDetails.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Email Address:</b> {waterSupplierDetails.email}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </>
  );
}
