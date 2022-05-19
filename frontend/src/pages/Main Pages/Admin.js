import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dashboard from "../section/Dashboard";
import Users from "../section/Users";
import Orders from "../section/Orders";
import { isAuthenticated } from "../../auth/Auth";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  backgroundColor: "transparent",
  boxShadow: "none !important",
}));
const Admin = () => {
  const [value, setValue] = React.useState(0);
  const user = isAuthenticated().user._id;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Item>
          <Tabs
            orientation="vertical"
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            TabIndicatorProps={{ style: { backgroundColor: "transparent" } }}
            sx={{ backgroundColor: "#FFF" }}
          >
            <Tab
              label="Dashboard"
              disableRipple={true}
              style={{ color: value === 0 ? "#105404" : "" }}
            />

            <Tab
              label="Users"
              disableRipple={true}
              style={{ color: value === 1 ? "#105404" : "" }}
            />
            <Tab
              label="Orders"
              disableRipple={true}
              style={{ color: value === 2 ? "#105404" : "" }}
            />
          </Tabs>
        </Item>
      </Grid>
      <Grid item xs={10}>
        <Item>
          {value === 0 ? <Dashboard user={user} /> : null}
          {value === 1 ? <Users user={user} /> : null}
          {value === 2 ? <Orders user={user} /> : null}
        </Item>
      </Grid>
    </Grid>
  );
};

export default Admin;
