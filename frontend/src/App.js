import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Info from "./pages/Main Pages/Info";
import Home from "./pages/Main Pages/Home";
import { makeStyles } from "@mui/styles";
import Header from "./common/Header";
import Cart from "./pages/Main Pages/Cart";
import Profile from "./pages/Main Pages/Profile";
import Games from "./pages/Main Pages/Games";
import BuyNow from "./pages/Main Pages/BuyNow";
import PageNotFound from "./pages/Main Pages/PageNotFound";
import Login from './pages/Main Pages/Login'
import SignUp from './pages/Main Pages/SignUp'
import { isAuthenticated } from "./auth/Auth";
import PrivateRoute from "./auth/PrivateRoute";
import Admin from "./pages/Main Pages/Admin";
import AdminRoute from "./auth/AdminRoute";
import EditForm from './components/EditForm'
//Pipeline check
const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: '1rem 4rem',
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {isAuthenticated() && <Header />}
      <Switch>
        {!isAuthenticated() && <Route exact path="/login" render={(props) => <Login {...props} />} />}
        {!isAuthenticated() && <Route exact path="/signup" render={(props) => <SignUp {...props} />} />}


        <AdminRoute exact path="/admin" component={Admin} />
        <PrivateRoute exact path="/" component={Home} />

        <PrivateRoute
          exact
          path="/gameinfo/:id/:name"
          component={Info}
        />
        <PrivateRoute
          exact
          path="/platform/:id/:name"
          component={Games}
        />
        <PrivateRoute
          exact
          path="/cart"
          component={Cart}
        />
        <PrivateRoute
          exact
          path="/profile"
          component={Profile}
        />
        <PrivateRoute
          exact
          path="/rated"
          component={Games}
          type="games"
        />
        <PrivateRoute
          exact
          path="/new"
          component={Games}
        />
        <PrivateRoute
          exact
          path="/buy"
          component={BuyNow}
        />
        <AdminRoute
          exact
          path="/edituser/:id"
          component={EditForm}
        />
        {/* <Redirect from="*" to="/" /> */}
        <Route path="*" render={() => <PageNotFound />} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
