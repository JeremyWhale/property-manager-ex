import React, { useState, useEffect } from "react";
import { IcButton, IcPageHeader } from "@ukic/react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import apiLocation from "../components/apiLocation";
import StaticAlert from "../components/staticAlert";
import { Delete, SettingsPower, TaskAlt, Storage } from "@mui/icons-material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App.context";
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

export default function PropertyEditView() {
  const navigate = useNavigate();

  const { propertyToEdit, propertyTenant } = useAppContext();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  //Record IDs
  const [propertyId, setPropertyId] = useState();
  const [tenancyId, setTenancyId] = useState();
  const [purchaseId, setPurchaseId] = useState();
  const [mortgageId, setMortgageId] = useState();
  const [insuranceId, setInsuranceId] = useState();
  const [urlId, setUrlId] = useState();

  //Prop details
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

  const [notes, setNotes] = useState("")

  const [status, setStatus] = useState("")

  const [type, setType] = useState("")

  const [tenantList, setTenantList] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState("");

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

  const [originalPurchaseMethod, setOriginalPurchaseMethod] = useState();

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
  const [mortgageLink, setMortgageLink]  = useState("");
  const [insuranceLink, setInsuranceLink] = useState("");
  const [legalLink, setLegalLink] = useState("");

  async function handleDelete() {
    await axios
      .delete(`${apiLocation}/property-delete/${propertyId}`)
      .then((response) => {
        setIsDelete(true);
        setUploadSuccess(true);
        setActiveStep(3298);
      });
  }

  async function getPropertyDetails(selectedProperty) {
    try {
      await axios
        .get(`${apiLocation}/property-details/${selectedProperty}`)
        .then((response) => {
          setPropertyId(response.data.id);
          setAddressLine1(response.data.address_line_1);
          setAddressLine2(response.data.address_line_2);
          setTown(response.data.city);
          setCounty(response.data.county);
          setCountry(response.data.country);
          setPostCode(response.data.post_code);
          setSelectedTenant(response.data.current_tenant_id);
          setCurrentValue(response.data.current_value);
          setEpcReviewDate(response.data.epc_renewal_date);
          setGscReviewDate(response.data.gas_certificate_renewal_date);
          setEscReviewDate(response.data.electrical_inspection_date);
          setCouncilLicenseRenewalsDue(response.data.council_license_date);
          setSelectedGasSupplier(response.data.gas_supplier_id);
          setGasAccountNumber(response.data.gas_account_number);
          setSelectedElectricSupplier(response.data.electric_supplier_id);
          setElectricAccountNumber(response.data.electric_account_number);
          setSelectedWaterSupplier(response.data.water_supplier_id);
          setWaterAccountNumber(response.data.water_account_number);
          setEntryCode(response.data.entry_code);
          setSelectedAgent(response.data.agent_id);
          setAgentStartDate(response.data.agent_start_date);
          setNotes(response.data.notes)
          setStatus(response.data.status)
          setType(response.data.type)
        });
    } catch (e) {
      //Alert saying api cannot be reached try again later
    }
  }

  async function getPurchaseDetails(selectedProperty) {
    try {
      const requestPurchase = await axios.get(
        `${apiLocation}/purchase-details/${selectedProperty}`
      );

      if (requestPurchase.data[0].purchase_type === "Mortgage") {
        const requestMortgage = await axios.get(
          `${apiLocation}/mortgage-details/${selectedProperty}`
        );

        setPurchaseId(requestPurchase.data[0].id);
        setPurchaseDate(requestPurchase.data[0].purchase_date);
        setPurchasePrice(requestPurchase.data[0].purchase_price);
        setPurchaseMethod(requestPurchase.data[0].purchase_method);
        setPurchaseType(requestPurchase.data[0].purchase_type);

        setOriginalPurchaseMethod(requestPurchase.data[0].purchase_type);

        setMortgageId(requestMortgage.data[0].id);
        setMortgageAccountNumber(requestMortgage.data[0].account_number);
        setAmountBorrowed(requestMortgage.data[0].amount_borrowed);
        setInterestRate(requestMortgage.data[0].interest_rate);
        setMortgageTerm(requestMortgage.data[0].term);
        setLenderName(requestMortgage.data[0].lender_name);
        setLenderAddress(requestMortgage.data[0].lender_address);
        setLenderEmail(requestMortgage.data[0].lender_email);
        setLenderPhoneNumber(requestMortgage.data[0].lender_phone_number);
        setMortgageType(requestMortgage.data[0].mortgage_type);
        setMonthlyAmount(requestMortgage.data[0].monthly_amount);
        setMortgageRenewalDate(requestMortgage.data[0].renewal_date);
        setMortgageStartDate(requestMortgage.data[0].start_date)
      } else {
        setPurchaseId(requestPurchase.data[0].id);
        setPurchaseDate(requestPurchase.data[0].purchase_date);
        setPurchasePrice(requestPurchase.data[0].purchase_price);
        setPurchaseMethod(requestPurchase.data[0].purchase_method);
        setPurchaseType(requestPurchase.data[0].purchase_type);

        setOriginalPurchaseMethod(requestPurchase.data[0].purchase_type);
      }
    } catch (e) {
      //Alert saying api cannot be reached try again later
    }
  }

  async function getInsuranceDetails(selectedProperty) {
    try {
      const request = await axios.get(
        `${apiLocation}/insurance-details/${selectedProperty}`
      );

      setInsuranceId(request.data[0].id);
      setInsurancePolicyNumber(request.data[0].insurance_number);
      setInsuranceCompany(request.data[0].company);
      setCurrentPremium(request.data[0].premium);
      setPreviousPremium(request.data[0].previous_premium);
      setInsuranceRenewalDate(request.data[0].renewal_due);
      setInsuranceCompanyPhone(request.data[0].company_phone_number)
      setInsuranceCompanyEmail(request.data[0].company_email)
      setInsuranceCompanyAddress(request.data[0].company_address)
    } catch (e) {
      //Alert saying api cannot be reached try again later
    }
  }

  async function getUrls(selectedProperty) {
    try {
      const request = await axios.get(
        `${apiLocation}/urls/${selectedProperty}`
      );

      setUrlId(request.data[0].id);
      setAstLink(request.data[0].ast_url);
      setEpcLink(request.data[0].epc_url);
      setEscLink(request.data[0].electrical_cert_url);
      setGscLink(request.data[0].gas_safety_url);
      setInventoryLink(request.data[0].inventory_url);
      setOtherDocumentsLink(request.data[0].other_docs_url);
      setMortgageLink(request.data[0].lender_url)
      setInsuranceLink(request.data[0].insurance_url)
      setLegalLink(request.data[0].legal_url)
    } catch (e) {
      //Alert saying api cannot be reached try again later
    }
  }

  async function getTenancyDetails(tenant) {
    try {
      const response = await axios.get(
        `${apiLocation}/tenancy-details/${propertyToEdit}`
      );

      setTenancyId(response.data[0].id);
      setMoveInDate(response.data[0].move_in_date);
      setTerm(response.data[0].contract_term);
      setInitialRent(response.data[0].initial_rent_amount);
      setCurrentRent(response.data[0].current_rent_amount);
      setSelectedPaymentMethod(response.data[0].payment_method);
      setAmountPaid(response.data[0].amount_paid);
      setRentReviewDate(response.data[0].rent_review_date);
      setTenancyReviewDate(response.data[0].tenancy_renewal_date);
      setDepositAmount(response.data[0].deposit_amount);
      setWithDps(response.data[0].deposit_lodged_with_dps);
      setSelectedScheme(response.data[0].scheme_id);
      setDepositPolicyNumber(response.data[0].scheme_policy_number);
    } catch (e) {
      // Handle your error here
      console.error("Error fetching data:", e);
    }
  }

  useEffect(() => {
    async function getPropertyInfo() {
      getPropertyDetails(propertyToEdit);
      getPurchaseDetails(propertyToEdit);
      getInsuranceDetails(propertyToEdit);
      getUrls(propertyToEdit);
      getTenancyDetails(propertyTenant);
    }

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
    getPropertyInfo();
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
    if (selectedAgent === undefined) {
      const agentData = {
        name: agentName,
        phone_number: agentPhone,
        email: agentEmail,
        address: agentAddress,
      };
      axios
        .post(`${apiLocation}/agent-add/`, agentData)
        .then((response) => {
          setSelectedAgent(response.data.id);

          if (
            astLink !== "" &&
            tenancyReviewDate !== "" &&
            epcLink !== "" &&
            epcReviewDate !== "" &&
            escLink !== "" &&
            escReviewDate !== "" &&
            gscLink !== "" &&
            gscReviewDate !== "" &&
            inventoryLink !== "" &&
            otherDocumentsLink !== ""
          ) {
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
              council_license_date: councilLicenseRenewalDate || "2000-01-01",
              gas_supplier_details: selectedGasSupplier,
              gas_account_number: gasAccountNumber,
              electric_supplier_details: selectedElectricSupplier,
              electric_account_number: electricAccountNumber,
              water_supplier_details: selectedWaterSupplier,
              water_account_number: waterAccountNumber,
              entry_code: entryCode,
              agent: response.data.id,
              agent_start_date: agentStartDate,
              notes: notes,
              status: status,
              type: type,
            };

            axios
              .put(`${apiLocation}/property-edit/`, propertyData)
              .catch((error) => {
                console.error("Error:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

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
      .put(`${apiLocation}/property-edit/${propertyId}`, propertyData)
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
          .put(`${apiLocation}/tenancy-edit/${tenancyId}`, tenancyData)
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
          .put(
            `${apiLocation}/purchase-details-edit/${purchaseId}`,
            purchaseData
          )
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
              .put(`${apiLocation}/mortgage-edit/${mortgageId}`, mortgageData)
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
          .put(`${apiLocation}/insurance-edit/${insuranceId}`, insuranceData)
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
          lender_url: mortgageLink,
          insurance_url: insuranceLink,
          legal_url: legalLink,
        };

        axios
          .put(`${apiLocation}/url-edit/${urlId}`, urlsData)
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
    setActiveStep(0);
    setCompleted({});
  };

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
                label="Address line 1"
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
                color={addressLine2 === "" && "error"}
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
                color={entryCode === "" && "error"}
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
                  color={councilLicenseRenewalDate === "" && "error"}
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
                color={town === "" && "error"}
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
                color={selectedGasSupplier === "" && "error"}
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
                color={gasAccountNumber === "" && "error"}
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
                color={county === "" && "error"}
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
                color={selectedElectricSupplier === "" && "error"}
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
                color={electricAccountNumber === "" && "error"}
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
                color={country === "" && "error"}
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
                color={selectedWaterSupplier === "" && "error"}
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
                color={waterAccountNumber === "" && "error"}
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
                color={postCode === "" && "error"}
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
                  color={moveInDate === "" && "error"}
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
                  color={rentReviewDate === "" && "error"}
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
                  color={tenancyReviewDate === "" && "error"}
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
                color={term === "" && "error"}
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
                color={selectedPaymentMethod === "" && "error"}
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
                color={selectedScheme === "" && "error"}
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
                color={depositPolicyNumber === "" && "error"}
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
                  color={purchaseDate === "" && "error"}
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
                color={purchaseMethod === "" && "error"}
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
                color={purchaseType === "" && "error"}
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
                    color={lenderName === "" && "error"}
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
                    color={mortgageAccountNumber === "" && "error"}
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
                    color={lenderAddress === "" && "error"}
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
                    color={mortgageTerm === "" && "error"}
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
                    color={lenderPhoneNumber === "" && "error"}
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
                    color={mortgageType === "" && "error"}
                    fullWidth
                  >
                    <MenuItem key={0} value={"Interest only"}>
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
                    color={lenderEmail === "" && "error"}
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
                color={insuranceCompany === "" && "error"}
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
                color={insurancePolicyNumber === "" && "error"}
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
                  color={insuranceRenewalDate === "" && "error"}
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
                  color={agentStartDate === "" && "error"}
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
              <TextField
                id="outlined-basic"
                label="Legal documents folder link"
                variant="outlined"
                value={legalLink}
                onChange={(e) => setLegalLink(e.target.value)}
                fullWidth
              />
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
                label="Mortgage documents folder link"
                variant="outlined"
                value={mortgageLink}
                onChange={(e) => setMortgageLink(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Insurance documents folder link"
                variant="outlined"
                value={insuranceLink}
                onChange={(e) => setInsuranceLink(e.target.value)}
                fullWidth
              />
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
            isDelete ? (
              <StaticAlert
                type="success"
                message="Property successfully deleted"
              />
            ) : (
              <StaticAlert
                type="success"
                message="Property successfully edited"
              />
            )
          ) : (
            <StaticAlert
              type="error"
              message="An error occurred when editing property, property edit failed"
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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
      <IcPageHeader heading={"Edit Property"} subheading={propertyToEdit}>
        <IcButton
          slot="actions"
          variant="tertiary"
          onClick={() => handle5Next()}
        >
          <TaskAlt slot="left-icon" /> Finish Editing
        </IcButton>
        <IcButton
          slot="actions"
          variant="tertiary"
          href="https://www.dropbox.com/scl/fo/98rb9am8clf6tbm86hm31/AM0h4BCGtCykPUCFYlfKINM?rlkey=ebuo40bw7jy04cpbhr4maqgqk&dl=0"
          target="_blank"
        >
          <Storage slot="left-icon" /> Cloud Storage
        </IcButton>
        <IcButton
          slot="actions"
          variant="destructive"
          onClick={() => handleDelete()}
        >
          <Delete slot="left-icon" /> Delete Property
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
