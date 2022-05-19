import React, { useEffect } from "react";
import { withRouter } from "react-router";
import "../../App.css";
import { Typography } from "@mui/material";
import Cards from "../section/Cards";
import CustomSwiper from "../../components/CustomSwiper";
import OfferBanner from "../section/OfferBanner";
import Footer from "../section/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlatforms, fetchAsyncGames } from "../../slices/gamesSlice";
import { SemipolarSpinner } from "react-epic-spinners";

const Home = () => {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.games.platforms);
  const count = useSelector((state) => state.games.count);
  const allGames = useSelector((state) => state.games.allGames);

  useEffect(() => {
    dispatch(fetchAsyncGames(1));
    dispatch(fetchPlatforms());
  }, [dispatch]);
  return (
    <>
      {platforms?.length > 0 ? (
        <>
          <CustomSwiper
            space={0}
            data={allGames}
            pages={1}
            height={500}
            isSmall={false}
          />
          <Typography
            component="h1"
            style={{
              textAlign: "center",
              fontSize: "1.5rem ",
              fontWeight: "bold",
            }}
          >
            We have over{" "}
            <span style={{ color: "#0F0" }}>{count?.toLocaleString()} </span>
            games!
          </Typography>
          <Cards searchedGame={platforms} name="Platforms" type="platforms" />
          <Cards
            searchedGame={allGames}
            name="Games"
            url={"/all"}
            type="games"
          />
          <OfferBanner />
          <Footer />
        </>
      ) : (
        <div
          style={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SemipolarSpinner color="#00ff00" />
        </div>
      )}
    </>
  );
};

export default withRouter(Home);
