import { Grid, Paper, FormGroup } from "@mui/material";
import React from "react";
import TextFieldController from "../../control/TextFieldController";
import ButtonController from "../../control/ButtonController";
import SelectController from "../../control/SelectController";
import { useForm } from "react-hook-form";
import { CustomForm } from "../../control/useForm";
import { subscription } from "../../common/common";
import { isAuthenticated } from "../../auth/Auth";

const YourInfo = () => {
  const methods = useForm();
  const {
    user: { email, name, role },
  } = isAuthenticated();
  const onSubmit = (data) => {
    if (data) {
      if (name !== data.name) {
        methods.setValue("name", data.name);
        console.log(methods.getValues("name"));
      }
    }
  };
  return (
    <Grid
      container
      lg={12}
      component={Paper}
      sx={{ marginLeft: "1rem", padding: "1.5rem" }}
    >
      <CustomForm
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{
          width: "100%",
          margin: "0 auto",
          textAlign: "center",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        <FormGroup>
          <TextFieldController
            control={methods.control}
            errors={methods.formState.errors}
            name="email"
            label="Email"
            disabled={true}
            defaultValue={email}
            rules={{
              required: "This field is required",
              // validate: (value) =>
              //     /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
              //         value
              //     ) || "Please enter the valid email id",
            }}
            register={methods.register}
          />
        </FormGroup>
        <FormGroup>
          <TextFieldController
            type={"password"}
            control={methods.control}
            errors={methods.formState.errors}
            name="password"
            label="Password"
            disabled={true}
            defaultValue={"aasim123"}
            // rules={{
            //     required: 'This field is required',
            //     // validate: (value) =>
            //     //     /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
            //     //         value
            //     //     ) || "Please enter the valid email id",
            // }}
            register={methods.register}
          />
        </FormGroup>
        <FormGroup>
          <TextFieldController
            control={methods.control}
            errors={methods.formState.errors}
            name="name"
            label="Name"
            // disabled={true}
            defaultValue={name}
            rules={{
              required: "This field is required",
              // validate: (value) =>
              //     /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
              //         value
              //     ) || "Please enter the valid email id",
            }}
            register={methods.register}
          />
        </FormGroup>
        <FormGroup>
          {/* <TextFieldController
                        control={methods.control}
                        errors={methods.formState.errors}
                        name='subscription'
                        label='Subscription'
                        defaultValue={'Registered Customer'}
                        rules={{
                            required: 'This field is required',
                            // validate: (value) =>
                            //     /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
                            //         value
                            //     ) || "Please enter the valid email id",
                        }}
                        register={methods.register}
                    /> */}
          <SelectController
            name="subscription"
            label="Your Subscription"
            control={methods.control}
            disabled={true}
            defaultValue={role === 0 ? "Registered User" : "Admin"}
            value={role === 0 ? "Registered User" : "Admin"}
            errors={methods.formState.errors}
            options={subscription}
            register={methods.register}
          ></SelectController>
        </FormGroup>

        <ButtonController
          type="submit"
          label="Update Information"
          text="Update Info"
        />
      </CustomForm>
    </Grid>
  );
};

export default YourInfo;
