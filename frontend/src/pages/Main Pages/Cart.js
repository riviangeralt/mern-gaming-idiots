import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CardMedia,
} from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeCartItems } from "../../slices/gamesSlice";
import ButtonController from "../../control/ButtonController";
import { handleDialog } from "../../slices/popupSlice";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.games.cart);
  const dispatch = useDispatch();
  let sum = 0;
  let rs = cartItems?.map((item) => item?.game.id);
  for (let i = 0; i < rs?.length; i++) {
    sum += rs[i];
  }

  return (
    <>
      <Grid
        container
        lg={12}
        component={Paper}
        style={{
          padding: ".5rem",
          display: "block",
          overflowY: cartItems?.length > 6 ? "scroll" : "hidden",
        }}
      >
        <Table
          aria-label="simple table"
          style={{
            display: "block",
            height: cartItems?.length > 0 ? "30rem" : "35rem",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Game Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell
                align="right"
                // onClick={() => dispatch(removeCartItems(item?.game.id))}
              >
                Clear Cart
              </TableCell>
            </TableRow>
          </TableHead>
          {cartItems?.length > 0 ? (
            <TableBody>
              {cartItems?.map((item) => (
                <TableRow
                  key={item.game.slug}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <CardMedia
                      component="img"
                      image={item.game.background_image}
                      style={{
                        width: "10%",
                        height: "10%",
                        marginRight: "1rem",
                        display: "inline-block",
                      }}
                      alt={item.game.id}
                    />
                    {item.game.name}
                  </TableCell>

                  <TableCell>
                    {
                      cartItems.filter((prod) => prod.game.id === item.game.id)
                        ?.length
                    }
                  </TableCell>
                  <TableCell>Rs.{item.game.id}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <DeleteIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => dispatch(removeCartItems(item))}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <div
              style={{
                height: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No Items Available
            </div>
          )}
        </Table>
        {/* </TableContainer> */}
      </Grid>
      {cartItems?.length > 0 ? (
        <div
          style={{
            height: "5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "3rem",
          }}
        >
          <ButtonController
            onClick={() => {
              props.history.push("/buy");
              dispatch(handleDialog({ type: "CLOSE" }));
            }}
            margin="1rem"
            style={{ position: "absolute", bottom: "0" }}
          >
            Buy Now
          </ButtonController>
          {`Your Total : ${sum}`}
        </div>
      ) : null}
    </>
  );
};

export default withRouter(Cart);
