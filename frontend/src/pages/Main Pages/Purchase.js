import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  TableBody,
} from "@mui/material";
import { purchaseHistory } from "../../api/callApi";
import { isAuthenticated } from "../../auth/Auth";
import moment from "moment";

const Purchase = () => {
  const [purchase, setPurchase] = useState([]);
  const user = isAuthenticated() && isAuthenticated().user._id;
  useEffect(() => {
    purchaseHistory(user)
      .then((res) => {
        setPurchase(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid
      container
      lg={12}
      component={Paper}
      sx={{ marginLeft: "1rem", padding: "1.5rem" }}
    >
      {purchase.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ordered</TableCell>
                <TableCell>Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchase.map((purchase) => (
                <TableRow key={purchase._id}>
                  <TableCell>
                    {purchase.cartItems.map((item) => {
                      return <div>{item.game.name}</div>;
                    })}
                  </TableCell>
                  <TableCell>{purchase.cartItems.length}</TableCell>
                  <TableCell>{purchase.amount}</TableCell>
                  <TableCell>{purchase.status}</TableCell>
                  <TableCell>{moment(purchase.createdAt).fromNow()}</TableCell>
                  <TableCell>{moment(purchase.updatedAt).fromNow()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h5" component="h2" color="#000">
          No Purchase History
        </Typography>
      )}
    </Grid>
  );
};

export default Purchase;
