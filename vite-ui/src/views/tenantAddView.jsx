import React, { useState, useEffect } from "react";
import { IcPageHeader } from "@ukic/react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import apiLocation from "../components/apiLocation";
import StaticAlert from "../components/staticAlert";
import { useNavigate } from "react-router-dom";

const steps = ["Tenant Details", "Emergency Contact Details"];

export default function TenantAddView() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  //Tenant fields
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [sortCode, setSortCode] = useState("");
  const [sortCodeError, setSortCodeError] = useState(false);

  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberError, setAccountNumberError] = useState(false);

  //EC fields
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactNameError, setEmergencyContactNameError] =
    useState(false);

  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [emergencyContactPhoneError, setEmergencyContactPhoneError] =
    useState(false);

  const [emergencyContactEmail, setEmergencyContactEmail] = useState("");
  const [emergencyContactEmailError, setEmergencyContactEmailError] =
    useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);

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
    if (name === "") {
      setNameError(true);
    } else {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const data = {
      full_name: name,
      phone_number: phoneNumber,
      email: email,
      bank_sort_code: sortCode,
      bank_account_number: accountNumber,
      emergency_contact_name: emergencyContactName,
      emergency_contact_phone_number: emergencyContactPhone,
      emergency_contact_email: emergencyContactEmail,
    };
    axios
      .post(`${apiLocation}/tenant-add/`, data)
      .then((response) => {
        setUploadSuccess(true);
      })
      .catch((error) => {
        setUploadSuccess(false);
        console.error("Error:", error);
      });
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setActiveStep(3);
  };

  const handleReset = () => {
    setName("");
    setNameError(false);
    setPhoneNumber("");
    setPhoneNumberError(false);
    setEmail("");
    setEmailError(false);
    setSortCode("");
    setSortCodeError(false);
    setAccountNumber("");
    setAccountNumberError(false);
    setEmergencyContactName("");
    setEmergencyContactNameError(false);
    setEmergencyContactPhone("");
    setEmergencyContactPhoneError(false);
    setEmergencyContactEmail("");
    setEmergencyContactEmailError(false);
    setActiveStep(0);
    setCompleted({});
  };

  function handleStepShow() {
    // Tenant details
    if (activeStep === 0) {
      return (
        <>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                fullWidth
                color={nameError && "error"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Phone number"
                variant="outlined"
                fullWidth
                color={phoneNumberError && "error"}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                color={emailError && "error"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Sort code"
                variant="outlined"
                placeholder="00-00-00"
                fullWidth
                color={sortCodeError && "error"}
                value={sortCode}
                onChange={(e) => setSortCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Account number"
                variant="outlined"
                fullWidth
                color={accountNumberError && "error"}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              onClick={() => navigate("/tenants")}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>Next</Button>
          </Box>
        </>
      );
    }

    if (activeStep === 1) {
      return (
        <>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Emergency Contact Name"
                variant="outlined"
                fullWidth
                color={emergencyContactNameError && "error"}
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Emergency Contact Phone No."
                variant="outlined"
                fullWidth
                color={emergencyContactPhoneError && "error"}
                value={emergencyContactPhone}
                onChange={(e) => setEmergencyContactPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Emergency Contact Email"
                variant="outlined"
                fullWidth
                color={emergencyContactEmailError && "error"}
                value={emergencyContactEmail}
                onChange={(e) => setEmergencyContactEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleComplete}>Finish</Button>
          </Box>
        </>
      );
    }

    // Completed step
    else {
      return (
        <>
          {uploadSuccess ? (
            <StaticAlert
              type="success"
              message="New tenant successfully uploaded"
            />
          ) : (
            <StaticAlert
              type="error"
              message="An error occurred when uploading tenant, tenant upload failed"
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button onClick={handleReset} color="inherit">
              Add another tenant
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => navigate("/tenants")}>
              Return to view tenants
            </Button>
          </Box>
        </>
      );
    }
  }

  return (
    <>
      <IcPageHeader heading={"Add Tenant"} />
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
