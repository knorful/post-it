import React, { Component } from "react";

import classes from "./Search.module.css";

class Search extends Component {
  state = {
    term: "",
  };

  search = (e) => {
    console.log(e);
    e.preventDefault();
    this.props.searchTerm(this.state.term);
  };

  handleChange = (e) => {
    this.setState({
      term: e.target.value,
    });
  };
  render() {
    return (
      <div className={classes.Search}>
        <form onSubmit={this.search}>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Search"
          />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
