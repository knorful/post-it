import React, { Component } from "react";
import { format } from "timeago.js";
import CommentReplies from "./CommentReplies/CommentReplies";

import classes from "./Comments.module.css";

class Comments extends Component {
  state = {
    showComments: false,
  };

  handleClick = () => {
    this.setState({
      showComments: !this.state.showComments,
    });
  };

  formatTime = (time) => {
    return format(time * 1000);
  };

  render() {
    let comments = this.props.comments.map((comment) => (
      <div className={classes.Container}>
        <div className={classes.Tagline}>
          <p className={classes.Author}>{comment.data.author}</p>
          <div className={classes.Timestamp}>
            <p>{this.formatTime(comment.data.created_utc)}</p>
          </div>
        </div>

        <div className={classes.Content}>
          <p className={classes.Body}>{comment.data.body}</p>
          <div>
            {comment.data.replies ? (
              <CommentReplies replies={comment.data.replies} />
            ) : null}
          </div>
        </div>
      </div>
    ));
    return (
      <div className={classes.Comments}>
        <button onClick={this.handleClick} className={classes.Btn}>
          <i className="far fa-comment"></i>
          <p className={classes.FooterText}>{this.props.numComments} </p>
          {this.state.showComments ? (
            <p className={classes.Close_Open}>Close Comments</p>
          ) : (
            <p className={classes.Close_Open}> Comments</p>
          )}
        </button>
        {this.state.showComments ? comments : null}
      </div>
    );
  }
}

export default Comments;
