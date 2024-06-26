import React, { useState, useEffect } from "react";
import { IcButton, IcPageHeader } from "@ukic/react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { Grid, TextField } from "@mui/material";
import axios from "axios";
import apiLocation from "../components/apiLocation";
import StaticAlert from "../components/staticAlert";
import { Delete, TaskAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App.context";
import { FormRender } from "../components/FormRender";

const steps = ["Tenant Details", "Emergency Contact Details"];

export default function TenantEditView() {
  const navigate = useNavigate();

  const { tenantToEdit } = useAppContext();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  //Tenant fields
  const [id, setId] = useState();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [phone2, setPhone2] = useState("")
  const [email2, setEmail2] = useState("")

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [bankName, setBankName] = useState("");

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
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    async function getTenant() {
      const response = await axios.get(
        `${apiLocation}/tenant-details/${tenantToEdit}`
      );

      setId(response.data.id);
      setName(response.data.full_name);
      setPhoneNumber(response.data.phone_number);
      setPhone2(response.data.phone_number_2);
      setEmail(response.data.email);
      setEmail2(response.data.email_2);
      setBankName(response.data.bank_name)
      setSortCode(response.data.bank_sort_code);
      setAccountNumber(response.data.bank_account_number);
      setEmergencyContactName(response.data.emergency_contact_name);
      setEmergencyContactPhone(response.data.emergency_contact_phone_number);
      setEmergencyContactEmail(response.data.emergency_contact_email);
    }

    getTenant();
  }, []);

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
      id: id,
      full_name: name,
      phone_number: phoneNumber,
      phone_number_2: phone2,
      email: email,
      email_2: email2,
      bank_name: bankName,
      bank_sort_code: sortCode,
      bank_account_number: accountNumber,
      emergency_contact_name: emergencyContactName,
      emergency_contact_phone_number: emergencyContactPhone,
      emergency_contact_email: emergencyContactEmail,
    };
    axios
      .put(`${apiLocation}/tenant-edit/${id}`, data)
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

  async function handleDelete() {
    await axios
      .delete(`${apiLocation}/tenant-delete/${id}`)
      .then((response) => {
        setIsDelete(true);
        setUploadSuccess(true);
        setActiveStep(3);
      });
  }

  function handleStepShow() {
    // Tenant details
    if (activeStep === 0) {
      return (
        <>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Name (required)"
                variant="outlined"
                fullWidth
                color={name === "" && "error"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Phone number"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Second phone number"
                variant="outlined"
                fullWidth
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Second email"
                variant="outlined"
                fullWidth
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-basic"
                label="Bank name"
                variant="outlined"
                fullWidth
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-basic"
                label="Account number"
                variant="outlined"
                fullWidth
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-basic"
                label="Sort code"
                variant="outlined"
                placeholder="00-00-00"
                fullWidth
                value={sortCode}
                onChange={(e) => setSortCode(e.target.value)}
              />
            </Grid>
          </Grid>
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
                value={emergencyContactEmail}
                onChange={(e) => setEmergencyContactEmail(e.target.value)}
              />
            </Grid>
          </Grid>
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
                message="Tenant successfully deleted"
              />
            ) : (
              <StaticAlert
                type="success"
                message="Tenant successfully edited"
              />
            )
          ) : (
            <StaticAlert
              type="error"
              message="An error occurred when editing tenant, tenant edit failed"
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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
      <IcPageHeader heading={`Edit Tenant`} subheading={tenantToEdit}>
        <IcButton slot="actions" variant="tertiary" onClick={handleComplete}>
          <TaskAlt slot="left-icon" /> Finish Editing
        </IcButton>
        <IcButton
          slot="actions"
          variant="destructive"
          onClick={() => handleDelete()}
        >
          <Delete slot="left-icon" /> Delete Tenant
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
          handleSubmit={handleComplete}
          navLocation={"/tenants"}
        />
      </Box>
    </>
  );
}
