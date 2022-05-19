import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { Grid, Typography, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ButtonController from "../control/ButtonController";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch } from "react-redux";
import { handleDialog } from "../slices/popupSlice";
import CustomDialog from "../components/CustomDialog";
import { signOut, isAuthenticated } from "../auth/Auth";
import Cart from "../pages/Main Pages/Cart";
import { getCartItems } from "../slices/gamesSlice";

const Header = (props) => {
  const cartItems = useSelector((state) => state.games.cart);
  const user = isAuthenticated().user;
  const dispatch = useDispatch();
  const links = [
    { title: "Top Rated", url: "/rated" },
    { title: "New Released", url: "/new" },
  ];
  const adminLinks = [{ title: "Dashboard", url: "/admin" }];
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);
  return (
    <Grid
      container
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {user.role === 0
          ? links.map((el) => (
              <Link to={el.url}>
                <Typography
                  color="#FFF"
                  component="h4"
                  mr="1rem"
                  fontWeight="bold"
                >
                  {el.title}
                </Typography>
              </Link>
            ))
          : adminLinks.map((el) => (
              <Link to={el.url}>
                <Typography
                  color="#FFF"
                  component="h4"
                  mr="1rem"
                  fontWeight="bold"
                >
                  {el.title}
                </Typography>
              </Link>
            ))}
      </div>
      <div>
        <Typography
          component="h1"
          color="#FFF"
          fontWeight="bold"
          style={{
            textTransform: "uppercase",
            fontFamily: "inherit",
            fontSize: "2rem",
            cursor: "pointer",
          }}
          onClick={() => props.history.push("/")}
        >
          Gaming <span style={{ color: "#0F0" }}>Idiots!</span>
        </Typography>
      </div>
      <div>
        <Link to="/profile">
          <Badge color="success">
            <AccountCircle style={{ color: "#FFF" }} />
          </Badge>
        </Link>
        <ButtonController
          background="transparent"
          boxShadow="none"
          padding="0"
          onClick={() => dispatch(handleDialog({ type: "OPEN" }))}
        >
          <Badge badgeContent={cartItems?.length} color="success">
            <ShoppingCartOutlined
              style={{ color: "#FFF", marginLeft: "1rem" }}
            />
          </Badge>
        </ButtonController>
        <ButtonController
          onClick={() => signOut(() => props?.history.push("/login"))}
          label="logout"
          margin="0 0 0 1rem"
        >
          Logout
        </ButtonController>
      </div>
      {/* <Dialog /> */}
      <CustomDialog>
        <Cart />
      </CustomDialog>
    </Grid>
  );
};

export default withRouter(Header);
