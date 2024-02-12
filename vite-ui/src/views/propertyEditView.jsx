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
import { Delete, SettingsPower } from "@mui/icons-material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App.context";

const steps = [
  "Property Details",
  "Tenancy Details",
  "Purchase Details",
  "Insurance Details",
  "Agent Details",
  "Documents",
];

export default function PropertyEditView() {
  const navigate = useNavigate();

  const { propertyToEdit, propertyTenant } = useAppContext()

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

  const [originalPurchaseMethod, setOriginalPurchaseMethod] = useState();

  //Insure
  const [insuranceCompany, setInsuranceCompany] = useState("");
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
        console.log('orig pm', requestPurchase.data[0].purchase_type)

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
      } else {
        setPurchaseId(requestPurchase.data[0].id);
        setPurchaseDate(requestPurchase.data[0].purchase_date);
        setPurchasePrice(requestPurchase.data[0].purchase_price);
        setPurchaseMethod(requestPurchase.data[0].purchase_method);
        setPurchaseType(requestPurchase.data[0].purchase_type);

        setOriginalPurchaseMethod(requestPurchase.data[0].purchase_type);
        console.log('orig pm', requestPurchase.data[0].purchase_type)
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
    } catch (e) {
      //Alert saying api cannot be reached try again later
    }
  }

  async function getTenancyDetails(tenant) {
    try {
      const response = await axios.get(
        `${apiLocation}/tenancy-details/${tenant}`
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
    if (
      addressLine1 !== "" &&
      addressLine2 !== "" &&
      town !== "" &&
      county !== "" &&
      country !== "" &&
      postCode !== "" &&
      currentValue !== "" &&
      entryCode !== "" &&
      selectedGasSupplier !== "" &&
      selectedElectricSupplier !== "" &&
      selectedWaterSupplier !== "" &&
      councilLicenseRenewalDate !== "" &&
      gasAccountNumber !== "" &&
      electricAccountNumber !== "" &&
      waterAccountNumber !== ""
    ) {
      handleNext();
    }
  }

  function handle1Next() {
    if (
      moveInDate !== "" &&
      rentReviewDate !== "" &&
      term !== "" &&
      initialRent !== "" &&
      currentRent !== "" &&
      amountPaid !== "" &&
      selectedPaymentMethod !== "" &&
      depositAmount !== "" &&
      withDps !== "" &&
      selectedScheme !== "" &&
      depositPolicyNumber !== ""
    ) {
      handleNext();
    }
  }

  function handle2Next() {
    if (purchaseType === "Cash") {
      if (
        purchaseDate !== "" &&
        purchasePrice !== "" &&
        purchaseMethod !== "" &&
        purchaseType !== ""
      ) {
        handleNext();
      }
    } else {
      if (
        purchaseDate !== "" &&
        purchasePrice !== "" &&
        purchaseMethod !== "" &&
        purchaseType !== "" &&
        lenderName !== "" &&
        mortgageAccountNumber !== "" &&
        lenderAddress !== "" &&
        lenderPhoneNumber !== "" &&
        lenderEmail !== "" &&
        amountBorrowed !== "" &&
        interestRate !== "" &&
        monthlyAmount !== "" &&
        mortgageTerm !== "" &&
        mortgageType !== "" &&
        mortgageRenewalDate !== ""
      ) {
        handleNext();
      }
    }
  }

  function handle3Next() {
    if (
      insuranceCompany !== "" &&
      insurancePolicyNumber !== "" &&
      insuranceRenewalDate !== "" &&
      currentPremium !== "" &&
      previousPremium !== ""
    ) {
      handleNext();
    }
  }

  function handle4Next() {
    if (selectedAgent === undefined) {
      if (
        agentStartDate !== "" &&
        agentName !== "" &&
        agentAddress !== "" &&
        agentPhone !== "" &&
        agentEmail !== ""
      ) {
        handleNext();
      }
    } else {
      if (selectedAgent !== "" && agentStartDate !== "") {
        handleNext();
      }
    }
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
            };

            console.log(propertyData);

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

          if (purchaseType === 'Mortgage') {
            const mortgageData = {
              account_number: mortgageAccountNumber,
              property: response.data.id,
              amount_borrowed: amountBorrowed,
              interest_rate: interestRate,
              term: mortgageTerm,
              renewal_date: mortgageRenewalDate,
              lender_name: lenderName,
              lender_address: lenderAddress,
              lender_email: lenderEmail,
              lender_phone_number: lenderPhoneNumber,
              mortgage_type: mortgageType,
              monthly_amount: monthlyAmount,
            };

            if (originalPurchaseMethod === 'Cash') {
              axios
                .post(`${apiLocation}/mortgage-add/`, mortgageData)
                .catch((error) => {
                  console.error("Error:", error);
                });
            } else {
              axios
                .put(`${apiLocation}/mortgage-edit/${mortgageId}`, mortgageData)
                .catch((error) => {
                  console.error("Error:", error);
                });
            }
          }

          const insuranceData = {
            insurance_number: insurancePolicyNumber,
            property: response.data.id,
            company: insuranceCompany,
            premium: currentPremium,
            previous_premium: previousPremium,
            renewal_due: insuranceRenewalDate,
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
    }
  };

  function handle5Next() {
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
      handleComplete();
    }
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
            <Grid item xs={6}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Current Value
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">£</InputAdornment>
                }
                label="Amount"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                color={currentValue === "" && "error"}
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
                  label="Council License Renewal Date"
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
                {gasSupplierOptions.map((tenant, index) => (
                  <MenuItem key={index} value={tenant.id}>
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
                {electricSupplierOptions.map((tenant, index) => (
                  <MenuItem key={index} value={tenant.id}>
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
                {waterSupplierOptions.map((tenant, index) => (
                  <MenuItem key={index} value={tenant.id}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={selectedTenant}
                label="Select Tenant"
                select
                onChange={(e) => setSelectedTenant(e.target.value)}
                color={selectedTenant === "" && "error"}
                fullWidth
              >
                {tenantList.map((tenant, index) => (
                  <MenuItem key={index} value={tenant.id}>
                    {tenant.fullName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              onClick={() => navigate("/properties")}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => handle0Next()}>Next</Button>
          </Box>
        </>
      );
    }

    // Tenancy details
    if (activeStep === 1) {
      return (
        <>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Initial rent
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">£</InputAdornment>
                }
                label="Amount"
                value={initialRent}
                onChange={(e) => setInitialRent(e.target.value)}
                color={initialRent === "" && "error"}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Current rent
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">£</InputAdornment>
                }
                label="Amount"
                value={currentRent}
                onChange={(e) => setCurrentRent(e.target.value)}
                color={currentRent === "" && "error"}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount paid
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">£</InputAdornment>
                }
                label="Amount"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                color={amountPaid === "" && "error"}
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
                <MenuItem key={0} value={"Cash"}>
                  Cash
                </MenuItem>
                <MenuItem key={1} value={"Direct Debit"}>
                  Direct Debit
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Deposit amount
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">£</InputAdornment>
                }
                label="Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                color={depositAmount === "" && "error"}
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
                {dpsSchemeOptions.map((tenant, index) => (
                  <MenuItem key={index} value={tenant.id}>
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
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => handle1Next()}>Next</Button>
          </Box>
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
              <InputLabel htmlFor="outlined-adornment-amount">
                Purchase Price
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">£</InputAdornment>
                }
                label="Amount"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                color={purchasePrice === "" && "error"}
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
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount borrowed
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">£</InputAdornment>
                    }
                    label="Amount"
                    value={amountBorrowed}
                    onChange={(e) => setAmountBorrowed(e.target.value)}
                    color={amountBorrowed === "" && "error"}
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
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Interest rate
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    endAdornment={
                      <InputAdornment position="end">%</InputAdornment>
                    }
                    label="Amount"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    color={interestRate === "" && "error"}
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Monthly amount
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">£</InputAdornment>
                    }
                    label="Amount"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(e.target.value)}
                    color={monthlyAmount === "" && "error"}
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
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Mortgage Renewal Date"
                      format="DD/MM/YYYY"
                      value={dayjs(mortgageRenewalDate)}
                      onChange={(date) =>
                        setMortgageRenewalDate(formatDate(date))
                      }
                      color={mortgageRenewalDate === "" && "error"}
                      fullWidth
                    />
                  </LocalizationProvider>
                </Grid>
              </>
            )}
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => handle2Next()}>Next</Button>
          </Box>
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
            <Grid item xs={6}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Current Premium{" "}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">£</InputAdornment>
                }
                label="Amount"
                value={currentPremium}
                onChange={(e) => setCurrentPremium(e.target.value)}
                color={currentPremium === "" && "error"}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Previous Premium{" "}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">£</InputAdornment>
                }
                label="Amount"
                value={previousPremium}
                onChange={(e) => setPreviousPremium(e.target.value)}
                color={previousPremium === "" && "error"}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => handle3Next()}>Next</Button>
          </Box>
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
                {agentOptions.map((tenant, index) => (
                  <MenuItem key={index} value={tenant.id}>
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
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => handle4Next()}>Next</Button>
          </Box>
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
                color={astLink === "" && "error"}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="EPC folder link"
                variant="outlined"
                value={epcLink}
                onChange={(e) => setEpcLink(e.target.value)}
                color={epcLink === "" && "error"}
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
                  color={epcReviewDate === "" && "error"}
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
                color={escLink === "" && "error"}
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
                  color={escReviewDate === "" && "error"}
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
                color={gscLink === "" && "error"}
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
                  color={gscReviewDate === "" && "error"}
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
                color={inventoryLink === "" && "error"}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Other document folder link"
                variant="outlined"
                value={otherDocumentsLink}
                onChange={(e) => setOtherDocumentsLink(e.target.value)}
                color={otherDocumentsLink === "" && "error"}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => handle5Next()}>Finish</Button>
          </Box>
        </>
      );
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
      <IcPageHeader heading={"Edit Property"}>
        <IcButton
          slot="actions"
          variant="destructive"
          onClick={() => handleDelete()}
        >
          <Delete slot="left-icon" /> Delete Property
        </IcButton>
      </IcPageHeader>
      <Box sx={{ width: "100%", paddingTop: 2 }}>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {handleStepShow()}
      </Box>
    </>
  );
}
