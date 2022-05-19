import React, { useEffect } from "react";
import { CustomForm } from "../control/useForm";
import { FormGroup, Grid, Paper, Typography } from "@mui/material";
import TextFieldController from "../control/TextFieldController";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "../auth/Auth";
import { fetchIndividualUser } from "../slices/userSlice";
import TextField from "@mui/material/TextField";
import { ListItem, ListItemText } from "@mui/material";

const EditForm = (props) => {
  const selectedUser = useSelector((state) => state.users.selectedUser);

  const adminId = isAuthenticated().user._id;
  const userId = props?.match?.params?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIndividualUser({ admin: adminId, user: userId }));
  }, [dispatch]);

  return (
    <>
      {selectedUser ? (
        <Grid component={Paper} sx={{ padding: "1rem" }}>
          {/* Display the user's information */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ListItem>
                <ListItemText primary={selectedUser.name} secondary="Name" />
                <ListItemText primary={selectedUser.email} secondary="Email" />
                <ListItemText
                  primary={selectedUser.role === 0 ? "User" : "Admin"}
                  secondary="Role"
                />
                <ListItemText
                  primary={selectedUser.history?.length}
                  secondary="Game Purchases"
                />
              </ListItem>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default EditForm;
