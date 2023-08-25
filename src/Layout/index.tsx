import { lazy, Suspense } from "react";
import styles from "./index.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Paper } from "@material-ui/core";
import Fallback from "components/Fallback";
import AppHeader from "components/AppHeader";
import React from "react";

const Home = lazy(() => import("pages/Home"));
const MovieDetails = lazy(() => import("pages/MovieDetails"));

const Layout = () => {
  const [searchValue, setSearchValue] = React.useState("")
  const onSearch = (value: string) => {
    setSearchValue(value)
  }
  return (
    <Router>
      <Paper square className={styles.root}>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route exact path="/">
              <AppHeader onClick={onSearch} value={"home"}/>
              <Home value={searchValue} />
            </Route>
            <Route path="/:movieId">
              <AppHeader onClick={onSearch} value={"details"}/>
              <MovieDetails />
            </Route>
          </Switch>
        </Suspense>
      </Paper>
    </Router>
  );
};

export default Layout;
