import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import { StepLabel, Typography, Step, Divider } from "@mui/material";
import ButtonController from "../../control/ButtonController";
import AddressForm from "../section/AddressForm";
import { useForm, FormProvider } from "react-hook-form";
import { CustomForm } from "../../control/useForm";
import Summary from "../section/Summary";
import { CardContent, CardHeader } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { handleCart } from "../../slices/gamesSlice";
import PaymentGateway from "./PaymentGateway";
import { Redirect } from "react-router-dom";

const getSteps = () => {
  return ["Payment Option"];
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BuyNow = () => {
  const methods = useForm();
  const steps = getSteps();
  const [activeStep, setActiveStep] = React.useState(0); // eslint-disable-next-line
  const cartItems = useSelector((state) => state.games.cart);
  const dispatch = useDispatch();
  let sum = 0;
  let rs = cartItems.map((item) => item.game.id);
  for (let i = 0; i < rs.length; i++) {
    sum += rs[i];
  }
  const handleNext = (add) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepsData = (stepIndex) => {
    switch (stepIndex) {
      // case 0:
      //   return <AddressForm methods={methods} />;
      // case 1:
      // return <Summary />;
      case 0:
        return <PaymentGateway amount={sum} cart={cartItems} />;
      default:
        return "Unknown Index";
    }
  };
  const clearCart = async () => {
    if (activeStep === steps.length - 1) {
      dispatch(handleCart({ type: "REMOVE_ALL" }));
    }
  };
  return (
    <>
      {cartItems.length > 0 ? (
        <Box sx={{ width: "100%" }}>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item lg={9}>
              <Item>
                <Stepper
                  alternativeLabel
                  activeStep={activeStep}
                  orientation="horizontal"
                  style={{ margin: "1rem 0" }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <FormProvider {...methods}>
                  {activeStep === steps.length ? (
                    <div key={"key-test"}>
                      <Typography sx={{ marginBottom: "2rem" }}>
                        Your order has been placed!
                      </Typography>
                      {/* <ButtonController type="button" onClick={handleReset}>Reset</ButtonController> */}
                    </div>
                  ) : (
                    <CustomForm onSubmit={methods.handleSubmit(handleNext)}>
                      {getStepsData(activeStep)}
                      {activeStep === 0 ? null : (
                        <ButtonController onClick={handleBack}>
                          Back
                        </ButtonController>
                      )}
                      {/* <ButtonController
                        margin="0 0 0 .5rem"
                        type="submit"
                        text={
                          activeStep === steps.length - 1
                            ? "Place Order"
                            : "Next"
                        }
                        onClick={clearCart}
                      /> */}
                    </CustomForm>
                  )}
                </FormProvider>
              </Item>
            </Grid>
            <Grid item lg={3}>
              <Item>
                <CardHeader title="Price Details" />
                <Divider />
                <CardContent sx={{ paddingBottom: "16px !important" }}>
                  <Grid container justifyContent="space-between">
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Price ({cartItems.length}{" "}
                      {cartItems.length === 1 || cartItems.length === 0
                        ? "Item"
                        : "Items"}
                      )
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      {sum}
                    </Typography>
                  </Grid>

                  <Grid
                    container
                    justifyContent="space-between"
                    sx={{ marginBottom: "1rem" }}
                  >
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      Delivery Charges
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      FREE
                    </Typography>
                  </Grid>
                  <Divider />
                  <Grid container justifyContent="space-between">
                    <Typography sx={{ fontSize: 20 }}>Total Payable</Typography>
                    <Typography sx={{ fontSize: 20 }}>{sum}</Typography>
                  </Grid>
                </CardContent>
              </Item>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default BuyNow;
