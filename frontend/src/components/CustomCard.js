import React from "react";
import { Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Card } from "@mui/material";
import ButtonController from "../control/ButtonController";
import { withRouter } from "react-router-dom";
import {
  removeSearchedGame,
  addCartItems,
  removeCartItems,
} from "../slices/gamesSlice";
import { useDispatch, useSelector } from "react-redux";

const CustomCard = (props) => {
  const { height, isSmall, element, type, fromCart } = props;
  const cartItems = useSelector((state) => state.games.cart);
  const dispatch = useDispatch();
  return (
    <Card
      sx={
        isSmall
          ? { maxWidth: 345, height: height }
          : { backgroundColor: "transparent" }
      }
    >
      <CardMedia
        component="img"
        alt={element.slug}
        height={height}
        image={
          type === "platforms"
            ? element?.image_background
            : element?.background_image
        }
      />
      <CardContent
        className="backgroundColor"
        style={
          isSmall
            ? { marginTop: "-7rem" }
            : {
                position: "absolute",
                top: "80%",
                left: "50%",
                transform: "translate(-50%,-80%)",
                padding: 0,
              }
        }
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={
            isSmall ? { fontSize: "1rem", color: "white" } : { color: "white" }
          }
        >
          {element.name}
        </Typography>
      </CardContent>
      <CardActions
        style={
          isSmall
            ? null
            : {
                position: "absolute",
                top: "90%",
                left: "50%",
                transform: "translate(-50%,-90%)",
              }
        }
      >
        <ButtonController
          size="small"
          onClick={() => {
            dispatch(removeSearchedGame());
            type === "platforms"
              ? props.history.push(`/platform/${element.id}/${element.slug}`)
              : props.history.push(`/gameinfo/${element.id}/${element.slug}`);
          }}
        >
          {type === "platforms" ? "View Games" : "View More"}
        </ButtonController>
        {(isSmall && props?.match?.path === "/platform/:id/:name") ||
        (isSmall && props?.match?.path === "/new") ||
        (isSmall && props?.match?.path === "/rated") ? (
          <ButtonController
            size="small"
            disabled={
              fromCart
                ? false
                : cartItems.filter((item) => item.game.id === element.id)
                    .length === 1
                ? true
                : false
            }
            onClick={() => {
              fromCart
                ? dispatch(removeCartItems(element.id))
                : dispatch(addCartItems(element));
            }}
          >
            {cartItems.filter((item) => item.game.id === element.id).length ===
            1
              ? fromCart
                ? "Remove"
                : "Added to cart"
              : "Add to Cart"}
          </ButtonController>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default withRouter(CustomCard);
