import React, { useState, useEffect } from "react";
import { IcPageHeader } from "@ukic/react";
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
import { FormRender } from "../components/FormRender";

const steps = ["Issue Details"];

export default function IssueAddView() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [beenFixed, setBeenFixed] = useState(false);
  const [beenAllocated, setBeenAllocated] = useState(false);
  const [propertyList, setPropertyList] = useState([]);

  const [property, setProperty] = useState("");
  const [propertyError, setPropertyError] = useState(false);

  const [problem, setProblem] = useState("");
  const [problemError, setProblemError] = useState(false);

  const [dateReported, setDateReported] = useState("");
  const [dateReportedError, setDateReportedError] = useState(false);

  const [dateAllocated, setDateAllocated] = useState("")

  const [dateFixed, setDateFixed] = useState("");
  const [dateFixedError, setDateFixedError] = useState(false);

  // Existing
  const [contractorList, setContractorList] = useState([]);
  const [selectedContractorName, setSelectedContractorName] = useState("");
  // New

  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    async function getPropertyList() {
      try {
        const response = await axios.get(`${apiLocation}/property-list`);

        // Convert the response data into your desired format
        const data = response.data.map((property) => ({
          id: property.id,
          addressLine1: property.address_line_1,
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
    } else {
      if (!beenAllocated) {
        handleComplete();
        setActiveStep(3);
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
    const dateAllocatedFormatted = dateAllocated.toString().split("T")

    let dateFixedUpload = dateFixedFormatted[0]

    // 01-01-2000 for Unallocated, 02-01-2000 for Allocated
    beenAllocated && !beenFixed && (dateFixedUpload = "2000-01-02")
    !beenAllocated && (dateFixedUpload = "2000-01-01" )

      const data = {
        property: property,
        problem: problem,
        date_reported: dateReportedFormatted[0],
        date_allocated: dateAllocatedFormatted[0],
        date_fixed: dateFixedUpload,
        contractor_responsible: selectedContractorName,
      };


      axios
        .post(`${apiLocation}/issue-add/`, data)
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
    setProperty("");
    setProblem("");
    setDateReported("");
    setDateAllocated("")
    setDateFixed("");
    setSelectedContractorName("");
    setBeenAllocated(false);
    setBeenFixed(false);
    setActiveStep(0);
    setCompleted({});
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
            <Grid item xs={3}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={property}
                label="Property (required)"
                select
                onChange={(e) => setProperty(e.target.value)}
                color={propertyError && "error"}
                fullWidth
              >
                {propertyList
                .sort((a, b) => a.addressLine1.localeCompare(b.addressLine1))
                .map((property, index) => (
                  <MenuItem key={property.id} value={property.id}>
                    {property.addressLine1}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
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
            {beenAllocated && (
              <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date allocated"
                  format="DD/MM/YYYY"
                  value={dayjs(dateAllocated)}
                  onChange={(date) => setDateAllocated(formatDate(date))}
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            )}
            {beenFixed && beenAllocated && (
              <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date fixed"
                    format="DD/MM/YYYY"
                    value={dayjs(dateFixed)}
                    onChange={(date) => setDateFixed(formatDate(date))}
                    sx={{ marginLeft: 2 }}
                    fullWidth
                    color={dateFixedError && "error"}
                  />
                </LocalizationProvider>
              </Grid>
                )}
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Problem"
                variant="outlined"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                color={problemError && "error"}
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={3}>
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
              <>
              <Grid item xs={3}>
                <FormControlLabel
                  checked={beenFixed}
                  control={<Checkbox />}
                  label="Has been resolved?"
                  labelPlacement="start"
                  onClick={() => {
                    setBeenFixed(!beenFixed);
                  } } />
              </Grid>
              <Grid item xs={6}>
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
                    {contractorList
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((property, index) => (
                        <MenuItem key={index} value={property.name}>
                          {property.name}
                        </MenuItem>
                    ))}
                  </TextField>
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
            <StaticAlert
              type="success"
              message="New issue successfully uploaded"
            />
          ) : (
            <StaticAlert
              type="error"
              message="An error occurred when uploading issue, issue upload failed"
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button onClick={handleReset} color="inherit">
              Add another issue
            </Button>
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
      <IcPageHeader heading={"Add Issue"} />
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
