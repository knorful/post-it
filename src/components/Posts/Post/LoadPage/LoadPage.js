import React, { Component } from "react";

import classes from "./LoadPage.module.css";

class ViewPage extends Component {
  render() {
    return (
      <div className={classes.LoadPage}>
        <div className={classes.Text}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
}

export default ViewPage;
