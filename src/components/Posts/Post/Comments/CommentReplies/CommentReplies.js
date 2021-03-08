import React, { Component } from "react";
import { format } from "timeago.js";

import classes from "./CommentReplies.module.css";

class CommentReplies extends Component {
  state = {
    showReplies: false,
  };

  handleClick = () => {
    this.setState({
      showReplies: !this.state.showReplies,
    });
  };
  formatTime = (time) => {
    return format(time * 1000);
  };
  render() {
    let showReplies = this.props.replies.data.children.map((reply) =>
      reply.data.hasOwnProperty("created_utc") ? (
        <div className={classes.Content}>
          <div className={classes.Tagline}>
            <p className={classes.Author}>{reply.data.author}</p>
            <div className={classes.Timestamp}>
              <p>{this.formatTime(reply.data.created_utc)}</p>
            </div>
          </div>
          <div className={classes.Body}>
            <p>{reply.data.body}</p>
          </div>
        </div>
      ) : null
    );
    return (
      <div className={classes.Replies}>
        <button className={classes.Btn} onClick={this.handleClick}>
          {!this.state.showReplies ? (
            <p>
              {showReplies.length - 1 === 0 ? 1 : showReplies.length - 1}{" "}
              Replies
            </p>
          ) : (
            <p>Close Replies</p>
          )}
        </button>
        {this.state.showReplies ? showReplies : null}
      </div>
    );
  }
}

export default CommentReplies;
