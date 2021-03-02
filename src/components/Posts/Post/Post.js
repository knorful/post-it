import React, { Component } from "react";

import classes from "./Post.module.css";

class Post extends Component {
  kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };
  render() {
    let voteCount = this.kFormatter(
      this.props.post.ups - this.props.post.downs
    );
    return (
      <div className={classes.Post}>
        <div className={classes.Votes}>
          <div className={classes.VoteDisplay}>
            <button className={classes.Up}>
              <i className="far fa-thumbs-up"></i>
            </button>
            <div className={classes.VoteCount}>{voteCount}</div>
            <button className={classes.Down}>
              <i className="far fa-thumbs-down"></i>
            </button>
          </div>
        </div>
        <div className={classes.Content}>
          <h3 className={classes.Title}>{this.props.post.title}</h3>
          <figure className={classes.ImgContainer}>
            {this.props.pic ? <img src={this.props.pic} alt="pic" /> : null}
          </figure>
        </div>
      </div>
    );
  }
}

export default Post;
