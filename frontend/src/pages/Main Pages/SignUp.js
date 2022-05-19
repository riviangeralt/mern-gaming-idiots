import React from "react";
import { Grid, Paper, FormGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomForm } from "../../control/useForm";
import { Link, withRouter } from "react-router-dom";
import TextFieldController from "../../control/TextFieldController";
import ButtonController from "../../control/ButtonController";
import SelectController from "../../control/SelectController";
import RadioController from "../../control/RadioController";
import logo from "../../assets/logo.png";
import { country, gender } from "../../common/common";
import instanceApi from "../../api/backend";

const SignUp = (props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    getValues,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let response = await instanceApi.post("/signup", {
        email: data.email,
        password: data.password,
        name: data.name,
        country: data.country,
        gender: data.gender,
        userName: data.userName,
      });
      if (response) {
        props.history.push("/login");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <Grid
      container
      component={Paper}
      style={{
        height: "auto  ",
        padding: "1.5rem",
        width: "auto",
        margin: "0 auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <img
        src={logo}
        style={{ width: "6rem", height: "6rem", margin: "0 auto" }}
        alt="Gaming Idiots Logo"
      />
      <CustomForm
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", margin: "0 auto", textAlign: "center" }}
      >
        <Grid
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "1rem",
            margin: "1rem 0",
          }}
        >
          <FormGroup>
            <TextFieldController
              control={control}
              errors={errors}
              name="name"
              label="Name"
              rules={{
                required: "This field is required",
              }}
              register={register}
            />
          </FormGroup>
          <FormGroup>
            <TextFieldController
              control={control}
              errors={errors}
              name="email"
              label="Email"
              rules={{
                required: "This field is required",
                validate: (value) =>
                  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
                    value
                  ) || "Please enter the valid email id",
              }}
              register={register}
            />
          </FormGroup>
        </Grid>
        <Grid
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "1rem",
            margin: "1rem 0",
          }}
        >
          <FormGroup>
            <TextFieldController
              type="password"
              control={control}
              errors={errors}
              name="password"
              label="Password"
              rules={{
                required: "This field is required",
                // min
              }}
              register={register}
            />
          </FormGroup>
          <FormGroup>
            <SelectController
              name="country"
              label="Select your country"
              control={control}
              rules={{ required: "this field is required" }}
              errors={errors}
              options={country}
              register={register}
              onChange={(e) => setValue("country", e.target.value)}
            ></SelectController>
          </FormGroup>
        </Grid>

        <FormGroup style={{ width: "100%", margin: "1rem 0" }}>
          <RadioController
            options={gender}
            label="Gender"
            name="gender"
            errors={errors}
            rules={{ required: "This Field is Required" }}
            control={control}
          />
        </FormGroup>
        <ButtonController type="submit" label="Sign Up" text="Sign Up" />
        <span style={{ display: "block", margin: ".5rem 0 0 0 " }}>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </CustomForm>
    </Grid>
  );
};

export default withRouter(SignUp);
