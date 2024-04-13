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
import { Delete, TaskAlt } from "@mui/icons-material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App.context";
import { FormRender } from "../components/FormRender";

const steps = ["Issue Details", "Contractor Details"];

export default function IssueEditView() {
  const navigate = useNavigate();

  const { issueToEdit } = useAppContext();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [beenFixed, setBeenFixed] = useState(false);
  const [beenAllocated, setBeenAllocated] = useState(false);
  const [propertyList, setPropertyList] = useState([]);

  const id = issueToEdit;

  const [property, setProperty] = useState("");
  const [propertyError, setPropertyError] = useState(false);

  const [problem, setProblem] = useState("");
  const [problemError, setProblemError] = useState(false);

  const [dateReported, setDateReported] = useState("");
  const [dateReportedError, setDateReportedError] = useState(false);

  const [dateFixed, setDateFixed] = useState("");
  const [dateFixedError, setDateFixedError] = useState(false);

  // Existing
  const [contractorList, setContractorList] = useState([]);
  const [selectedContractorName, setSelectedContractorName] = useState(0);
  // New
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [sortCode, setSortCode] = useState("");
  const [sortCodeError, setSortCodeError] = useState(false);

  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberError, setAccountNumberError] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    async function getIssue() {
      const response = await axios.get(`${apiLocation}/issue/${issueToEdit}`);

      setProperty(response.data.property);
      setProblem(response.data.problem);
      setDateReported(response.data.date_reported);
      if (
        response.data.date_fixed === "2000-01-02" ||
        response.data.date_fixed === "2000-01-01"
      ) {
        if (response.data.date_fixed === "2000-01-02") {
          //Allocated
          setBeenAllocated(true);
          setSelectedContractorName(response.data.contractor_responsible);
        }
      } else {
        setBeenAllocated(true);
        setBeenFixed(true);
        setDateFixed(response.data.date_fixed);
        setSelectedContractorName(response.data.contractor_responsible);
      }
    }

    async function getPropertyList() {
      try {
        const response = await axios.get(`${apiLocation}/property-list`);

        // Convert the response data into your desired format
        const data = response.data.map((property) => ({
          id: property.id,
          addressLine1: property.address_line_1,
          country: property.country,
        }));

        setPropertyList(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    async function getContractorList() {
      try {
        const response = await axios.get(`${apiLocation}/contractor-list`);

        // Convert the response data into your desired format
        const data = response.data.map((contractor) => ({
          id: contractor.id,
          name: contractor.name,
        }));

        setContractorList(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    getPropertyList();
    getContractorList();
    getIssue();
  }, []);

  async function handleDelete() {
    await axios.delete(`${apiLocation}/issue-delete/${id}`).then((response) => {
      setIsDelete(true);
      setUploadSuccess(true);
      setActiveStep(3);
    });
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
    {
      !beenAllocated && setDateFixed("2000-01-01");
    }
    {
      !beenAllocated && setSelectedContractorName(contractorList[0].id);
    }
    {
      !beenFixed && beenAllocated && setDateFixed("2000-01-02");
    }
    if (property === "") {
      setPropertyError(true);
    }
    if (problem === "") {
      setProblemError(true);
    }
    if (dateReported === "") {
      setDateReportedError(true);
    }
    if (dateFixed === "") {
      setDateFixedError(true);
    } else {
      if (!beenAllocated) {
        setActiveStep(3);
        handleComplete();
      } else {
        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const dateReportedFormatted = dateReported.toString().split("T");
    const dateFixedFormatted = dateFixed.toString().split("T");

    if (selectedContractorName !== 0) {
      const data = {
        id: id,
        property: property,
        problem: problem,
        date_reported: dateReportedFormatted[0],
        date_fixed: dateFixedFormatted[0],
        contractor_responsible: selectedContractorName,
      };
      axios
        .put(`${apiLocation}/issue-edit/${id}`, data)
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
    } else {
      //New
      //Post request for contractor
      if (name === "") {
        setNameError(true);
      } else {
        const contractorData = {
          name: name,
          address: address,
          phone_number: phoneNumber,
          email: email,
          bank_sort_code: sortCode,
          bank_account_number: accountNumber,
        };
        axios
          .post(`${apiLocation}/contractor-add/`, contractorData)
          .then((response) => {
            const data = {
              id: id,
              property: property,
              problem: problem,
              date_reported: dateReportedFormatted[0],
              date_fixed: dateFixedFormatted[0],
              contractor_responsible: response.data.id,
            };
            axios
              .put(`${apiLocation}/issue-edit/${id}`, data)
              .then((response) => {
                setUploadSuccess(true);
              })
              .catch((error) => {
                setUploadSuccess(false);
                console.error("Error:", error);
              });
          })
          .catch((error) => {
            setUploadSuccess(false);
            console.error("Error:", error);
          });
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        setActiveStep(3);
      }
    }
  };

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

  function handleStepShow() {
    // Issue details
    if (activeStep === 0) {
      return (
        <>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={12}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={property}
                label="Property"
                select
                onChange={(e) => setProperty(e.target.value)}
                color={propertyError && "error"}
                fullWidth
              >
                {propertyList
                .sort((a, b) => a.addressLine1.localeCompare(b.addressLine1))
                .map((property, index) => (
                  <MenuItem key={property.id} value={property.id}>
                    {property.addressLine1} ({property.country})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Problem"
                variant="outlined"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                color={problemError && "error"}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date reported"
                  format="DD/MM/YYYY"
                  value={dayjs(dateReported)}
                  onChange={(date) => setDateReported(formatDate(date))}
                  color={dateReportedError && "error"}
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                checked={beenAllocated}
                control={<Checkbox />}
                label="Has been allocated?"
                labelPlacement="start"
                onClick={() => {
                  setBeenAllocated(!beenAllocated);
                }}
              />
            </Grid>
            {beenAllocated && (
              <Grid item xs={12}>
                <FormControlLabel
                  checked={beenFixed}
                  control={<Checkbox />}
                  label="Has been resolved?"
                  labelPlacement="start"
                  onClick={() => {
                    setBeenFixed(!beenFixed);
                  }}
                />
                {beenFixed && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date fixed"
                      value={dayjs(dateFixed)}
                      format="DD/MM/YYYY"
                      onChange={(date) => setDateFixed(formatDate(date))}
                      sx={{ marginLeft: 2 }}
                      fullWidth
                      color={dateFixedError && "error"}
                    />
                  </LocalizationProvider>
                )}
              </Grid>
            )}
          </Grid>
        </>
      );
    }

    // Contractor details
    if (activeStep === 1) {
      return (
        <>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={12}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={selectedContractorName}
                label="Contractor"
                select
                onChange={(e) => setSelectedContractorName(e.target.value)}
                fullWidth
              >
                {selectedContractorName !== 0 && (
                  <MenuItem key={""} value={0}>
                    New Contractor
                  </MenuItem>
                )}
                {contractorList
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((property, index) => (
                  <MenuItem key={index} value={property.id}>
                    {property.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {selectedContractorName === 0 && (
              // None selected (manual fill)
              <>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Name (required)"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    color={nameError && "error"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    color={addressError && "error"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    color={phoneNumberError && "error"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    color={emailError && "error"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Sort Code"
                    variant="outlined"
                    onChange={(e) => setSortCode(e.target.value)}
                    value={sortCode}
                    color={sortCodeError && "error"}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Account Number"
                    variant="outlined"
                    onChange={(e) => setAccountNumber(e.target.value)}
                    value={accountNumber}
                    color={accountNumberError && "error"}
                    fullWidth
                  />
                </Grid>
              </>
            )}
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
                message="Issue successfully deleted"
              />
            ) : (
              <StaticAlert type="success" message="Issue successfully edited" />
            )
          ) : (
            <StaticAlert
              type="error"
              message="An error occurred when editing issue, issue edit failed"
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => navigate("/issues")}>
              Return to issues table
            </Button>
          </Box>
        </>
      );
    }
  }

  return (
    <>
      <IcPageHeader heading={"Add Issue"}>
        <IcButton slot="actions" variant="tertiary" onClick={handleComplete}>
          <TaskAlt slot="left-icon" /> Finish Editing
        </IcButton>
        <IcButton
          slot="actions"
          variant="destructive"
          onClick={() => handleDelete()}
        >
          <Delete slot="left-icon" /> Delete Issue
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
          navLocation={"/issues"}
        />
      </Box>
    </>
  );
}
