import React, { Component } from "react";

import classes from "./Comments.module.css";

class Comments extends Component {
  render() {
    return (
      <div className={classes.Comments}>
        <button className={classes.Btn}>
          <i className="far fa-comment"></i>
          <p className={classes.FooterText}>{this.props.numComments}</p>
        </button>
      </div>
    );
  }
}

export default Comments;
