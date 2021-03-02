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

    let hasVideo = this.props.post.media;
    let hasThumbnail = this.props.post.thumbnail;

    let showPosts = this.props.post.selftext ? (
      <p>{this.props.post.selftext}</p>
    ) : (
      <figure className={classes.mediaContainer}>
        {this.props.pic ? (
          <img src={this.props.pic} alt="pic" />
        ) : hasVideo !== null ? (
          <video controls>
            <source src={hasVideo.reddit_video.fallback_url}></source>
            Your browser does not support the video tag.
          </video>
        ) : null}
      </figure>
    );
    return (
      <div className={classes.Post}>
        <div className={classes.Votes}>
          <div className={classes.VoteDisplay}>
            <button className={classes.Up}>
              <i class="fas fa-arrow-up"></i>
            </button>
            <div className={classes.VoteCount}>{voteCount}</div>
            <button className={classes.Down}>
              <i class="fas fa-arrow-down"></i>
            </button>
          </div>
        </div>
        <div className={classes.Content}>
          <a
            href={this.props.post.url}
            target="_blank"
            rel="noreferrer"
            className={classes.Title}
          >
            <h3>{this.props.post.title}</h3>
          </a>
          {showPosts}
        </div>
      </div>
    );
  }
}

export default Post;
