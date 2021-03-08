import React, { Component } from "react";

import Header from "./components/Header/Header";
import Posts from "./components/Posts/Posts";
import Categories from "./components/Categories/Categories";

import classes from "./App.module.css";

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Header />
        <Posts />
      </div>
    );
  }
}

export default App;
