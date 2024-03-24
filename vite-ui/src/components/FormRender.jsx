import { Button, Grid, Step, StepButton, Stepper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const FormRender = ({
  steps,
  activeStep,
  handleStepShow,
  completed,
  handleStep,
  handleBack,
  handleNext,
  handleSubmit,
  navLocation,
}) => {
  const navigate = useNavigate();
  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={1} display="flex" justifyContent={"center"}>
        {activeStep < steps.length && (
          <Button
            onClick={() => {
              if (activeStep === 0) navigate(navLocation);
              else handleBack();
            }}
          >
            Back
          </Button>
        )}
      </Grid>
      <Grid item xs>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={1}>
        {activeStep < steps.length && (
          <Button
            onClick={() => {
              if (activeStep !== steps.length - 1) handleNext();
              else handleSubmit();
            }}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        )}
      </Grid>
      <Grid item xs={12}>
        {handleStepShow()}
      </Grid>
    </Grid>
  );
};
