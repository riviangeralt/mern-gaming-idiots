import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Box, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIndividualGame,
  individualGame,
  removeSelectedGame,
  cart,
  addCartItems,
} from "../../slices/gamesSlice";
import { SemipolarSpinner } from "react-epic-spinners";
import ButtonController from "../../control/ButtonController";
import { List, ListItem, ListItemText } from "@mui/material";

const useStyles = makeStyles({
  heading: {
    display: "block",
    color: "#FFFFFF",
    fontSize: "1.1rem",
    borderRadius: "3px 3px 0 0 ",
    textTransform: "uppercase",
  },
  headContainer: {
    padding: "8px 20px",
    position: "relative",
    backgroundColor: "#105404",
    borderRadius: "3px 3px 0 0",
    borderBottom: "4px solid #727272",
    // width: '81.6%'
  },
});

const Info = (props) => {
  const classes = useStyles();
  const gameId = props.match?.params?.id;
  const dispatch = useDispatch();
  const details = useSelector(individualGame);
  const cartItems = useSelector(cart);
  useEffect(() => {
    dispatch(fetchIndividualGame(gameId));
    return () => {
      dispatch(removeSelectedGame());
    };
  }, [dispatch, gameId]);
  const truncate = (str) => {
    return str.length > 1030 ? str.substring(0, 1027) + "..." : str;
  };
  return (
    <>
      {!details?.name ? (
        <Grid
          item
          lg={12}
          style={{
            height: "15rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SemipolarSpinner color="#00ff00" />
        </Grid>
      ) : (
        <>
          <Box className={classes.headContainer}>
            <Box variant="h2" className={classes.heading}>
              {details.name ? details.name : details.name_original}
            </Box>
          </Box>
          <Grid
            container
            lg={12}
            style={{ padding: ".875rem", backgroundColor: "#f0f0f0" }}
          >
            <Grid item lg={12} md={12}>
              <div
                style={{
                  zIndex: "99",
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#00000070",
                  borderRadius: "5px",
                  padding: ".875rem",
                  color: "#fff",
                }}
              >
                <List dense={true}>
                  <ListItem>
                    <ListItemText
                      primary={details.genres.map((genre) => `${genre.name}, `)}
                      secondary={"Genres"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={details.publishers.map((dev) => dev.name)}
                      secondary={"Developer"}
                    />
                  </ListItem>
                </List>
                <List dense={true}>
                  <ListItem>
                    <ListItemText
                      primary={
                        details.parent_platforms
                          ? details.parent_platforms.map(
                              (plat) => `${plat.platform.name}, `
                            )
                          : null
                      }
                      secondary={"Available On"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`${details.playtime} Hours`}
                      secondary={"Total Playtime"}
                    />
                  </ListItem>
                </List>
                <List dense={true}>
                  <ListItem>
                    <ListItemText
                      primary={
                        details?.esrb_rating
                          ? details?.esrb_rating.name
                          : "Mature"
                      }
                      secondary={"Rating"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={`Rs.${details.id}/-`}
                      secondary={"Price"}
                    />
                  </ListItem>
                </List>
                <List dense={true}>
                  <ListItem>
                    <ListItemText
                      primary={details.released}
                      secondary={"Released"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={details.achievements_count}
                      secondary={"Total Achievements"}
                    />
                  </ListItem>
                </List>
                <List>
                  <ListItem>
                    <ButtonController
                      onClick={async () => {
                        await dispatch(addCartItems(details));
                        await props.history.push("/buy");
                      }}
                      width="12rem"
                    >
                      Buy now
                    </ButtonController>
                  </ListItem>
                  <ListItem>
                    <ButtonController
                      disabled={
                        cartItems.filter((item) => item.game.id === details.id)
                          .length === 1
                          ? true
                          : false
                      }
                      onClick={() => {
                        dispatch(addCartItems(details));
                      }}
                      width="12rem"
                    >
                      {cartItems.filter((item) => item.game.id == details.id)
                        .length === 1
                        ? "Added to cart"
                        : "Add to Cart"}
                    </ButtonController>
                  </ListItem>
                </List>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(0,255,0,.5)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  component="img"
                  style={{
                    width: "15%",
                    height: "220px",
                    border: "5px solid green",
                  }}
                  image={details?.background_image}
                  alt={details.id}
                />
                <div style={{ padding: "1rem 3rem", flex: "1" }}>
                  <h1 style={{ color: "rgba(0,0,0,.7)" }}>{details.name}</h1>
                  <p style={{ height: "140px", width: "100%" }}>
                    {truncate(details.description_raw)}
                  </p>
                </div>
              </div>
              <CardMedia
                component="img"
                image={details.background_image_additional}
                alt={details.id}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default withRouter(Info);
