import React, { Component } from "react";
import classes from "./Header.module.css";

class Header extends Component {
  render() {
    return (
      <header>
        <nav className={classes.Header}>
          <div className={classes.Logo}>
            <h1>PostIt</h1>
          </div>
          <div className={classes.Search}>
            <input type="text" placeholder="Search" />
            <i className="fas fa-search"></i>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
