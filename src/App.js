import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import Test from "./pages/Test";
import RouteChangeTracker from "./components/RouteChangeTracker";

function App() {
  return (
    <>
      <RouteChangeTracker />
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/test/:slug" component={Test} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;