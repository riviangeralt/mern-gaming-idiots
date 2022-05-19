import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import millify from "millify";
import GamesIcon from "@mui/icons-material/Games";
import PersonIcon from "@mui/icons-material/Person";
import SellIcon from "@mui/icons-material/Sell";
import BarChart from "../../components/charts/BarChart";
import { allUsers } from "../../api/callApi";

const Dashboard = (props) => {
  const { user } = props;
  const [data, setData] = useState({});
  useEffect(() => {
    allUsers(user).then((res) => setData(res));
  }, []);
  const cardDetails = [
    { name: "Games Count", count: "670574", icon: <GamesIcon /> },
    {
      name: "Users Count",
      count: data?.totalUsers ? data?.totalUsers : 0,
      icon: <PersonIcon />,
    },
    {
      name: "Total Orders",
      count: data?.orders ? data?.orders : 0,
      icon: <SellIcon />,
    },
  ];
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
        }}
      >
        {cardDetails.map((card) => (
          <Card>
            <CardContent sx={{ padding: ".8rem !important" }}>
              <Typography
                sx={{ fontSize: 30, margin: 0 }}
                color="#105404"
                gutterBottom
              >
                {card.icon} {millify(card.count)}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontSize: 15, margin: 0 }}
              >
                {card.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <BarChart
        category={data?.date ? data?.date : []}
        width={"50%"}
        data={data?.user ? data?.user : []}
        series="User Signup Per Day"
      />
    </>
  );
};

export default Dashboard;
