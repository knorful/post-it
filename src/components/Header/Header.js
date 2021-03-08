import React, { Component } from "react";

import Search from "./Search/Search";
import classes from "./Header.module.css";

class Header extends Component {
  render() {
    return (
      <header>
        <nav className={classes.Header}>
          <div className={classes.Logo}>
            <h1>PostIt.</h1>
            <p>a reddit minimalist website</p>
          </div>
          <Search searchTerm={this.props.searchTerm} />
        </nav>
      </header>
    );
  }
}

export default Header;
