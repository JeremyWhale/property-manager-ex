import React, { useState, useEffect } from "react";
import { IcButton, IcPageHeader } from "@ukic/react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import apiLocation from "../components/apiLocation";
import StaticAlert from "../components/staticAlert";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Storage, TaskAlt } from "@mui/icons-material";
import { FormRender } from "../components/FormRender";

const steps = [
  "Property Details",
  "Tenancy Details",
  "Purchase Details",
  "Insurance Details",
  "Agent Details",
  "Documents",
  "Notes",
];

export default function PropertyAddView() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState(false);

  //Prop details
  const [propertyId, setPropertyId] = useState();
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [town, setTown] = useState("");
  const [county, setCounty] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostCode] = useState("");

  const [currentValue, setCurrentValue] = useState("");
  const [entryCode, setEntryCode] = useState("");
  const [councilLicenseRenewalDate, setCouncilLicenseRenewalsDue] =
    useState("");

  const [gasSupplierOptions, setGasSupplierOptions] = useState([]);
  const [selectedGasSupplier, setSelectedGasSupplier] = useState("");
  const [gasAccountNumber, setGasAccountNumber] = useState("");

  const [electricSupplierOptions, setElectricSupplierOptions] = useState([]);
  const [selectedElectricSupplier, setSelectedElectricSupplier] = useState("");
  const [electricAccountNumber, setElectricAccountNumber] = useState("");

  const [waterSupplierOptions, setWaterSupplierOptions] = useState([]);
  const [selectedWaterSupplier, setSelectedWaterSupplier] = useState("");
  const [waterAccountNumber, setWaterAccountNumber] = useState("");

  const [tenantList, setTenantList] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState("");

  const [notes, setNotes] = useState("")

  const [status, setStatus] = useState("")

  const [type, setType] = useState("")

  //Tenancy details
  const [moveInDate, setMoveInDate] = useState("");
  const [rentReviewDate, setRentReviewDate] = useState("");
  const [term, setTerm] = useState("");
  const [initialRent, setInitialRent] = useState("");
  const [currentRent, setCurrentRent] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash");

  const [depositAmount, setDepositAmount] = useState("");
  const [withDps, setWithDps] = useState(false);

  const [dpsSchemeOptions, setDpsSchemeOptions] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState("");

  const [depositPolicyNumber, setDepositPolicyNumber] = useState("");

  //Purchase details
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [purchaseMethod, setPurchaseMethod] = useState("");

  //Purchase details - mortgage
  const [lenderName, setLenderName] = useState("");
  const [mortgageAccountNumber, setMortgageAccountNumber] = useState("");
  const [lenderAddress, setLenderAddress] = useState("");
  const [lenderPhoneNumber, setLenderPhoneNumber] = useState("");
  const [lenderEmail, setLenderEmail] = useState("");

  const [amountBorrowed, setAmountBorrowed] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [mortgageType, setMortgageType] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [mortgageRenewalDate, setMortgageRenewalDate] = useState("");
  const [mortgageStartDate, setMortgageStartDate] = useState("")

  //Insure
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [insuranceCompanyPhone, setInsuranceCompanyPhone] = useState("");
  const [insuranceCompanyEmail, setInsuranceCompanyEmail] = useState("");
  const [insuranceCompanyAddress, setInsuranceCompanyAddress] = useState("");

  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState("");
  const [insuranceRenewalDate, setInsuranceRenewalDate] = useState("");
  const [currentPremium, setCurrentPremium] = useState("");
  const [previousPremium, setPreviousPremium] = useState("");

  //Agent
  const [agentOptions, setAgentOptions] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState();

  const [agentStartDate, setAgentStartDate] = useState("");

  //Agent - new
  const [agentName, setAgentName] = useState("");
  const [agentAddress, setAgentAddress] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const [agentEmail, setAgentEmail] = useState("");

  //documents
  const [astLink, setAstLink] = useState("");
  const [tenancyReviewDate, setTenancyReviewDate] = useState("");

  const [epcLink, setEpcLink] = useState("");
  const [epcReviewDate, setEpcReviewDate] = useState("");

  const [escLink, setEscLink] = useState("");
  const [escReviewDate, setEscReviewDate] = useState("");

  const [gscLink, setGscLink] = useState("");
  const [gscReviewDate, setGscReviewDate] = useState("");

  const [inventoryLink, setInventoryLink] = useState("");
  const [otherDocumentsLink, setOtherDocumentsLink] = useState("");

  useEffect(() => {
    async function getTenantList() {
      try {
        const response = await axios.get(`${apiLocation}/tenant-list`);

        // Convert the response data into your desired format
        const data = response.data.map((tenant) => ({
          fullName: tenant.full_name,
          id: tenant.id,
        }));

        setTenantList(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    async function getAgentList() {
      try {
        const response = await axios.get(`${apiLocation}/agents`);

        // Convert the response data into your desired format
        const data = response.data.map((tenant) => ({
          id: tenant.id,
          name: tenant.name,
        }));

        setAgentOptions(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    async function getSuppliers() {
      try {
        const Gresponse = await axios.get(`${apiLocation}/gas-supplier-list/`);
        const Eresponse = await axios.get(
          `${apiLocation}/electric-supplier-list/`
        );
        const Wresponse = await axios.get(
          `${apiLocation}/water-supplier-list/`
        );

        // Convert the response data into your desired format
        const Gdata = Gresponse.data.map((tenant) => ({
          name: tenant.name,
          id: tenant.id,
        }));

        const Edata = Eresponse.data.map((tenant) => ({
          name: tenant.name,
          id: tenant.id,
        }));

        const Wdata = Wresponse.data.map((tenant) => ({
          name: tenant.name,
          id: tenant.id,
        }));

        setGasSupplierOptions(Gdata);
        setElectricSupplierOptions(Edata);
        setWaterSupplierOptions(Wdata);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    async function getDepositSchemes() {
      try {
        const response = await axios.get(`${apiLocation}/deposit-scheme-list/`);

        // Convert the response data into your desired format
        const data = response.data.map((tenant) => ({
          name: tenant.scheme_name,
          id: tenant.id,
        }));

        setDpsSchemeOptions(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    getTenantList(); // Execute the function
    getAgentList();
    getSuppliers();
    getDepositSchemes();
  }, []);

  function formatDate(date) {
    const year = date.$y.toString();

    const monthUnformatted = (date.$M + 1).toString();
    let month = monthUnformatted;

    const dayUnformatted = date.$D.toString();
    let day = dayUnformatted;

    {
      monthUnformatted.length === 1 && (month = "0" + monthUnformatted);
    }

    {
      dayUnformatted.length === 1 && (day = "0" + dayUnformatted);
    }

    return `${year}-${month}-${day}`;
  }

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  function handle0Next() {
    if (addressLine1 !== "" && selectedTenant !== "") {
      handleNext();
    }
  }

  function handle1Next() {
    handleNext();
  }

  function handle2Next() {
    handleNext();
  }

  function handle3Next() {
    handleNext();
  }

  function handle4Next() {
    handleNext();
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const propertyData = {
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      city: town,
      county: county,
      country: country,
      post_code: postCode,
      current_tenant: selectedTenant,
      current_value: currentValue,
      epc_renewal_date: epcReviewDate,
      gas_certificate_renewal_date: gscReviewDate,
      electrical_inspection_date: escReviewDate,
      council_license_date: councilLicenseRenewalDate,
      gas_supplier_details: selectedGasSupplier,
      gas_account_number: gasAccountNumber,
      electric_supplier_details: selectedElectricSupplier,
      electric_account_number: electricAccountNumber,
      water_supplier_details: selectedWaterSupplier,
      water_account_number: waterAccountNumber,
      entry_code: entryCode,
      agent: selectedAgent,
      agent_start_date: agentStartDate,
      notes: notes,
      status: status,
      type: type,
    };

    axios
      .post(`${apiLocation}/property-add/`, propertyData)
      .then((response) => {
        setPropertyId(response.data.id);

        const tenancyData = {
          property: response.data.id,
          tenant: selectedTenant,
          move_in_date: moveInDate,
          contract_term: term,
          initial_rent_amount: initialRent,
          current_rent_amount: currentRent,
          payment_method: selectedPaymentMethod,
          amount_paid: amountPaid,
          rent_review_date: rentReviewDate,
          tenancy_renewal_date: tenancyReviewDate,
          deposit_amount: depositAmount,
          deposit_lodged_with_dps: withDps,
          scheme_name: selectedScheme,
          scheme_policy_number: depositPolicyNumber,
        };

        axios
          .post(`${apiLocation}/tenancy-add/`, tenancyData)
          .catch((error) => {
            console.error("Error:", error);
          });

        const purchaseData = {
          property: response.data.id,
          purchase_price: purchasePrice,
          purchase_date: purchaseDate,
          purchase_method: purchaseMethod,
          purchase_type: purchaseType,
        };

        axios
          .post(`${apiLocation}/purchase-details-add/`, purchaseData)
          .catch((error) => {
            console.error("Error:", error);
          });

          const mortgageData = {
            account_number: mortgageAccountNumber,
            property: response.data.id,
            amount_borrowed: amountBorrowed,
            interest_rate: interestRate,
            term: mortgageTerm,
            renewal_date: mortgageRenewalDate,
            start_date: mortgageStartDate,
            lender_name: lenderName,
            lender_address: lenderAddress,
            lender_email: lenderEmail,
            lender_phone_number: lenderPhoneNumber,
            mortgage_type: mortgageType,
            monthly_amount: monthlyAmount,
          };

          axios
            .post(`${apiLocation}/mortgage-add/`, mortgageData)
            .catch((error) => {
              console.error("Error:", error);
            });

        const insuranceData = {
          insurance_number: insurancePolicyNumber,
          property: response.data.id,
          company: insuranceCompany,
          premium: currentPremium,
          previous_premium: previousPremium,
          renewal_due: insuranceRenewalDate,
          company_phone_number: insuranceCompanyPhone,
          company_email: insuranceCompanyEmail,
          company_address: insuranceCompanyAddress,
        };

        axios
          .post(`${apiLocation}/insurance-add/`, insuranceData)
          .catch((error) => {
            console.error("Error:", error);
          });

        const urlsData = {
          property: response.data.id,
          ast_url: astLink,
          epc_url: epcLink,
          electrical_cert_url: escLink,
          gas_safety_url: gscLink,
          inventory_url: inventoryLink,
          other_docs_url: otherDocumentsLink,
        };

        axios
          .post(`${apiLocation}/url-add/`, urlsData)
          .then((response) => {
            setUploadSuccess(true);
            const newCompleted = completed;
            newCompleted[activeStep] = true;
            setCompleted(newCompleted);
            setActiveStep(10);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function handle5Next() {
    handleComplete();
  }

  const handleReset = () => {
    setUploadSuccess(false);
    setPropertyId();
    setAddressLine1("");
    setAddressLine2("");
    setTown("");
    setCounty("");
    setCountry("");
    setPostCode("");

    setCurrentValue("");
    setEntryCode("");
    setCouncilLicenseRenewalsDue("");

    setSelectedGasSupplier("");
    setGasAccountNumber("");

    setSelectedElectricSupplier("");
    setElectricAccountNumber("");

    setSelectedWaterSupplier("");
    setWaterAccountNumber("");

    setSelectedTenant("");

    setNotes("")

    setStatus("")

    setType("")

    //Tenancy details
    setMoveInDate("");
    setRentReviewDate("");
    setTerm("");
    setInitialRent("");
    setCurrentRent("");
    setAmountPaid("");
    setSelectedPaymentMethod("Cash");
    setDepositAmount("");
    setWithDps(false);
    setSelectedScheme("");
    setDepositPolicyNumber("");

    //Purchase details
    setPurchaseDate("");
    setPurchasePrice("");
    setPurchaseType("");
    setPurchaseMethod("");

    //Purchase details - mortgage
    setLenderName("");
    setMortgageAccountNumber("");
    setLenderAddress("");
    setLenderPhoneNumber("");
    setLenderEmail("");
    setAmountBorrowed("");
    setInterestRate("");
    setMortgageTerm("");
    setMortgageType("");
    setMonthlyAmount("");
    setMortgageRenewalDate("");
    setMortgageStartDate("")

    //Insure
    setInsuranceCompany("");
    setInsuranceCompanyPhone("")
    setInsuranceCompanyEmail("")
    setInsuranceCompanyAddress("")
    setInsurancePolicyNumber("");
    setInsuranceRenewalDate("");
    setCurrentPremium("");
    setPreviousPremium("");

    //Agent
    setSelectedAgent();
    setAgentStartDate("");

    // //Agent - new
    // const [agentName, setAgentName] = useState("");
    // const [agentAddress, setAgentAddress] = useState("");
    // const [agentPhone, setAgentPhone] = useState("");
    // const [agentEmail, setAgentEmail] = useState("");

    //documents
    setAstLink("");
    setTenancyReviewDate("");
    setEpcLink("");
    setEpcReviewDate("");
    setEscLink("");
    setEscReviewDate("");
    setGscLink("");
    setGscReviewDate("");
    setInventoryLink("");
    setOtherDocumentsLink("");

    setActiveStep(0);
    setCompleted({});
  };

  useEffect(() => {
    handleReset();
  }, []);

  function handleStepShow() {
    // Property details
    if (activeStep === 0) {
      return (
        <>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            {/* Row */}
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Address line 1 (required)"
                variant="outlined"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                color={addressLine1 === "" && "error"}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Current Value (£)"
                variant="outlined"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Property Type"
                variant="outlined"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
              />
            </Grid>
            {/* Row */}
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Address line 2"
                variant="outlined"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Entry code"
                variant="outlined"
                value={entryCode}
                onChange={(e) => setEntryCode(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Council Tax Renewal Date"
                  format="DD/MM/YYYY"
                  value={dayjs(councilLicenseRenewalDate)}
                  onChange={(date) =>
                    setCouncilLicenseRenewalsDue(formatDate(date))
                  }
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>

            {/* Row */}
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Town/City"
                variant="outlined"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={selectedGasSupplier}
                label="Select Gas Supplier"
                select
                onChange={(e) => setSelectedGasSupplier(e.target.value)}
                fullWidth
              >
                {gasSupplierOptions
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((tenant, index) => (
                  <MenuItem key={index} value={tenant.name}>
                    {tenant.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Gas Account Number"
                variant="outlined"
                value={gasAccountNumber}
                onChange={(e) => setGasAccountNumber(e.target.value)}
                fullWidth
              />
            </Grid>
            {/* Row */}
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="County"
                variant="outlined"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={selectedElectricSupplier}
                label="Select Electric Supplier"
                select
                onChange={(e) => setSelectedElectricSupplier(e.target.value)}
                fullWidth
              >
                {electricSupplierOptions
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((tenant, index) => (
                  <MenuItem key={index} value={tenant.name}>
                    {tenant.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Electric Account Number"
                variant="outlined"
                value={electricAccountNumber}
                onChange={(e) => setElectricAccountNumber(e.target.value)}
                fullWidth
              />
            </Grid>
            {/* Row */}
            <Grid item xs={6}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={country}
                label="Country"
                select
                onChange={(e) => setCountry(e.target.value)}
                fullWidth
              >
                <MenuItem key={0} value={"United Kingdom"}>
                  United Kingdom
                </MenuItem>
                <MenuItem key={1} value={"USA"}>
                  United States of America
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={selectedWaterSupplier}
                label="Select Water Supplier"
                select
                onChange={(e) => setSelectedWaterSupplier(e.target.value)}
                fullWidth
              >
                {waterSupplierOptions
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((tenant, index) => (
                  <MenuItem key={index} value={tenant.name}>
                    {tenant.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Water Account Number"
                variant="outlined"
                value={waterAccountNumber}
                onChange={(e) => setWaterAccountNumber(e.target.value)}
                fullWidth
              />
            </Grid>
            {/* Row */}
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Post code"
                variant="outlined"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={status}
                label="Select Status"
                select
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
              >
                  <MenuItem key='none' value='Active'>Active</MenuItem>
                  <MenuItem key='sold' value='Sold'>Sold</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={selectedTenant}
                label="Select Tenant (required)"
                select
                onChange={(e) => setSelectedTenant(e.target.value)}
                color={selectedTenant === "" && "error"}
                fullWidth
              >
                {tenantList
                .sort((a, b) => a.fullName.localeCompare(b.fullName))
                .map((tenant, index) => (
                  <MenuItem key={index} value={tenant.id}>
                    {tenant.fullName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </>
      );
    }

    // Tenancy details
    if (activeStep === 1) {
      return (
        <>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  label="Move in date"
                  value={dayjs(moveInDate)}
                  onChange={(date) => setMoveInDate(formatDate(date))}
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Rent review date"
                  format="DD/MM/YYYY"
                  value={dayjs(rentReviewDate)}
                  onChange={(date) => setRentReviewDate(formatDate(date))}
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Tenancy Review Date"
                  format="DD/MM/YYYY"
                  value={dayjs(tenancyReviewDate)}
                  onChange={(date) => setTenancyReviewDate(formatDate(date))}
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Term (months)"
                variant="outlined"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Initial Rent (£)"
                variant="outlined"
                value={initialRent}
                onChange={(e) => setInitialRent(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Current Rent (£)"
                variant="outlined"
                value={currentRent}
                onChange={(e) => setCurrentRent(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={selectedPaymentMethod}
                label="Select Payment Method"
                select
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                fullWidth
              >
                <MenuItem key={0} value={"Bank Transfer"}>
                  Bank Transfer
                </MenuItem>
                <MenuItem key={0} value={"Cash"}>
                  Cash
                </MenuItem>
                <MenuItem key={0} value={"Cheque"}>
                  Cheque
                </MenuItem>
                <MenuItem key={0} value={"Credit Card"}>
                  Credit Card
                </MenuItem>
                <MenuItem key={1} value={"Direct Debit"}>
                  Direct Debit
                </MenuItem>
                <MenuItem key={0} value={"Standing Order"}>
                  Standing Order
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Deposit Amount (£)"
                variant="outlined"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                checked={withDps}
                control={<Checkbox />}
                label="Deposit with a protection scheme?"
                labelPlacement="start"
                onClick={() => setWithDps(!withDps)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={selectedScheme}
                label="Select Deposit Scheme"
                select
                onChange={(e) => setSelectedScheme(e.target.value)}
                fullWidth
              >
                {dpsSchemeOptions
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((tenant, index) => (
                  <MenuItem key={index} value={tenant.name}>
                    {tenant.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-basic"
                label="Deposit Policy No."
                variant="outlined"
                value={depositPolicyNumber}
                onChange={(e) => setDepositPolicyNumber(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </>
      );
    }

    // Purchase details
    if (activeStep === 2) {
      return (
        <>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Purchase date"
                  format="DD/MM/YYYY"
                  value={dayjs(purchaseDate)}
                  onChange={(date) => setPurchaseDate(formatDate(date))}
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Purchase Price (£)"
                variant="outlined"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={purchaseMethod}
                label="Purchase Method"
                select
                onChange={(e) => setPurchaseMethod(e.target.value)}
                fullWidth
              >
                <MenuItem key={0} value={"Agent"}>
                  Agent
                </MenuItem>
                <MenuItem key={1} value={"Auction"}>
                  Auction
                </MenuItem>
                <MenuItem key={2} value={"Private"}>
                  Private
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={purchaseType}
                label="Purchase type"
                select
                onChange={(e) => setPurchaseType(e.target.value)}
                fullWidth
              >
                <MenuItem key={"Cash"} value={"Cash"}>
                  Cash
                </MenuItem>
                <MenuItem key={"Mortgage"} value={"Mortgage"}>
                  Mortgage
                </MenuItem>
              </TextField>
            </Grid>
            {purchaseType === "Mortgage" && (
              <>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Lender name"
                    variant="outlined"
                    value={lenderName}
                    onChange={(e) => setLenderName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Amount Borrowed (£)"
                    variant="outlined"
                    value={amountBorrowed}
                    onChange={(e) => setAmountBorrowed(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Account no."
                    variant="outlined"
                    value={mortgageAccountNumber}
                    onChange={(e) => setMortgageAccountNumber(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Interest Rate (%)"
                    variant="outlined"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="outlined-basic"
                    label="Monthly Amount (£)"
                    variant="outlined"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    value={lenderAddress}
                    onChange={(e) => setLenderAddress(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Mortgage term (years)"
                    variant="outlined"
                    value={mortgageTerm}
                    onChange={(e) => setMortgageTerm(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Phone number"
                    variant="outlined"
                    value={lenderPhoneNumber}
                    onChange={(e) => setLenderPhoneNumber(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    slot="input"
                    labelId="demo-simple-select-label"
                    variant="outlined"
                    id="demo-simple-select"
                    value={mortgageType}
                    label="Mortgage Type"
                    select
                    onChange={(e) => setMortgageType(e.target.value)}
                    fullWidth
                  >
                    <MenuItem key={0} value={"Interest Only"}>
                      Interest Only
                    </MenuItem>
                    <MenuItem key={1} value={"Repayment"}>
                      Repayment
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={lenderEmail}
                    onChange={(e) => setLenderEmail(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Mortgage Start Date"
                      format="DD/MM/YYYY"
                      value={dayjs(mortgageStartDate)}
                      onChange={(date) =>
                        setMortgageStartDate(formatDate(date))
                      }
                      fullWidth
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Mortgage Renewal Date"
                      format="DD/MM/YYYY"
                      value={dayjs(mortgageRenewalDate)}
                      onChange={(date) =>
                        setMortgageRenewalDate(formatDate(date))
                      }
                      fullWidth
                    />
                  </LocalizationProvider>
                </Grid>
              </>
            )}
          </Grid>
        </>
      );
    }

    // Insurance details
    if (activeStep === 3) {
      return (
        <>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={4}>
              <TextField
                id="outlined-basic"
                label="Company"
                variant="outlined"
                value={insuranceCompany}
                onChange={(e) => setInsuranceCompany(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-basic"
                label="Policy no."
                variant="outlined"
                value={insurancePolicyNumber}
                onChange={(e) => setInsurancePolicyNumber(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Renewal date"
                  value={dayjs(insuranceRenewalDate)}
                  format="DD/MM/YYYY"
                  onChange={(date) => setInsuranceRenewalDate(formatDate(date))}
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            {/* Row 2 */}
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                value={insuranceCompanyPhone}
                onChange={(e) => setInsuranceCompanyPhone(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={insuranceCompanyEmail}
                onChange={(e) => setInsuranceCompanyEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                value={insuranceCompanyAddress}
                onChange={(e) => setInsuranceCompanyAddress(e.target.value)}
                fullWidth
              />
            </Grid>
            {/* Row 3 */}
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Current Premium (£)"
                variant="outlined"
                value={currentPremium}
                onChange={(e) => setCurrentPremium(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Previous Premium (£)"
                variant="outlined"
                value={previousPremium}
                onChange={(e) => setPreviousPremium(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </>
      );
    }

    // Agent details
    if (activeStep === 4) {
      return (
        <>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={6}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={selectedAgent}
                label="Select Existing Agent"
                select
                onChange={(e) => setSelectedAgent(e.target.value)}
                fullWidth
              >
                {/* {selectedAgent !== undefined && (
                  <MenuItem key={undefined} value={undefined}>
                    Deselect existing agent
                  </MenuItem>
                )} */}
                {agentOptions
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((tenant, index) => (
                  <MenuItem key={index} value={tenant.name}>
                    {tenant.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* This is part of property details */}
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start date"
                  format="DD/MM/YYYY"
                  value={dayjs(agentStartDate)}
                  onChange={(date) => setAgentStartDate(formatDate(date))}
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            {/* {selectedAgent === undefined && (
              <>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    color={agentName === "" && "error"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    value={agentAddress}
                    onChange={(e) => setAgentAddress(e.target.value)}
                    color={agentAddress === "" && "error"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Phone no."
                    variant="outlined"
                    value={agentPhone}
                    onChange={(e) => setAgentPhone(e.target.value)}
                    color={agentPhone === "" && "error"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={agentEmail}
                    onChange={(e) => setAgentEmail(e.target.value)}
                    color={agentEmail === "" && "error"}
                    fullWidth
                  />
                </Grid>
              </>
            )} */}
          </Grid>
        </>
      );
    }

    //Documents
    if (activeStep === 5) {
      return (
        <>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="AST folder link"
                variant="outlined"
                value={astLink}
                onChange={(e) => setAstLink(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <></>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="EPC folder link"
                variant="outlined"
                value={epcLink}
                onChange={(e) => setEpcLink(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="EPC due date"
                  format="DD/MM/YYYY"
                  value={dayjs(epcReviewDate)}
                  onChange={(date) => setEpcReviewDate(formatDate(date))}
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Electrical safety certificate folder link"
                variant="outlined"
                value={escLink}
                onChange={(e) => setEscLink(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Electrical safety certificate due date"
                  value={dayjs(escReviewDate)}
                  format="DD/MM/YYYY"
                  onChange={(date) => setEscReviewDate(formatDate(date))}
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Gas safety certificate folder link"
                variant="outlined"
                value={gscLink}
                onChange={(e) => setGscLink(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Gas safety certificate due date"
                  value={dayjs(gscReviewDate)}
                  format="DD/MM/YYYY"
                  onChange={(date) => setGscReviewDate(formatDate(date))}
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Inventory folder link"
                variant="outlined"
                value={inventoryLink}
                onChange={(e) => setInventoryLink(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Other documents folder link"
                variant="outlined"
                value={otherDocumentsLink}
                onChange={(e) => setOtherDocumentsLink(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </>
      );
    }

    //Notes
    if (activeStep === 6) {
      return (
        <Grid container sx={{ paddingTop: 2 }}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Notes"
              variant="outlined"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
              multiline
            />
          </Grid>
        </Grid>
      )
    }

    // Completed step
    else {
      return (
        <>
          {uploadSuccess ? (
            <StaticAlert
              type="success"
              message="New property successfully uploaded"
            />
          ) : (
            <StaticAlert
              type="error"
              message="An error occurred when uploading property, property upload failed"
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button onClick={() => handleReset()} color="inherit">
              Add another property
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => navigate("/properties")}>
              Return to view properties
            </Button>
          </Box>
        </>
      );
    }
  }

  return (
    <>
      <IcPageHeader heading={"Add Property"}>
        {addressLine1 !== "" && selectedTenant !== "" && (
          <IcButton
            slot="actions"
            variant="tertiary"
            onClick={() => handle5Next()}
          >
            <TaskAlt slot="left-icon" /> Finish Creating
          </IcButton>
        )}
        <IcButton
          slot="actions"
          variant="tertiary"
          href="https://1drv.ms/f/s!AlsETmNsZjQugRSX82-qqkUwN1-X?e=K4oLoM"
          target="_blank"
        >
          <Storage slot="left-icon" /> Cloud Storage
        </IcButton>
      </IcPageHeader>
      <Box sx={{ width: "100%", paddingTop: 2 }}>
        <FormRender
          activeStep={activeStep}
          steps={steps}
          handleStepShow={handleStepShow}
          completed={completed}
          handleNext={handleNext}
          handleBack={handleBack}
          handleStep={handleStep}
          handleSubmit={handle5Next}
          navLocation={"/properties"}
        />
      </Box>
    </>
  );
}
