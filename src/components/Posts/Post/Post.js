import axios from "axios";
import React, { Component } from "react";

import Comments from "./Comments/Comments";
import classes from "./Post.module.css";

class Post extends Component {
  state = {
    comments: [],
  };

  async componentDidMount() {
    try {
      let getComments = await axios
        .get(
          `${this.props.api}/${this.props.post.subreddit}/comments/${this.props.post.id}.json`
        )
        .then((res) => res.data[1].data.children);

      this.setState((st) => ({
        ...st.comments,
        comments: getComments,
      }));
    } catch (e) {
      console.log(e);
    }
  }
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
      <p className={classes.SelfText}>{this.props.post.selftext}</p>
    ) : (
      <figure className={classes.mediaContainer}>
        {this.props.pic ? (
          <img className={classes.mediaImg} src={this.props.pic} alt="pic" />
        ) : hasVideo !== null ? (
          <video className={classes.mediaVideo} controls>
            <source src={hasVideo.reddit_video.fallback_url}></source>
            Your browser does not support the video tag.
          </video>
        ) : hasThumbnail &&
          hasThumbnail !== "default" &&
          hasThumbnail !== "self" ? (
          <div className={classes.ThumbnailWrapper}>
            <a
              href={this.props.post.url}
              target="_blank"
              rel="noreferrer"
              className={classes.ThumbnailLink}
            >
              <div className={classes.Thumbnail}>
                <div className={classes.ThumbnailIcon}>
                  <i class="fas fa-arrow-circle-right"></i>
                </div>
                <img
                  title="Click image to visit article!"
                  width={hasThumbnail.thumbnail_width}
                  height={hasThumbnail.thumbnail_height}
                  src={hasThumbnail}
                  alt="pic"
                />
              </div>
            </a>
          </div>
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
          {hasThumbnail &&
          hasThumbnail !== "default" &&
          hasThumbnail !== "self" &&
          !this.props.pic &&
          !hasVideo ? (
            <div className={classes.Container}>
              <div className={classes.Title}>
                <h3>{this.props.post.title}</h3>
              </div>
              {showPosts}
            </div>
          ) : (
            <>
              <div className={classes.Title}>
                <h3>{this.props.post.title}</h3>
              </div>
              {showPosts}
            </>
          )}

          {this.state.comments ? (
            <div className={classes.Footer}>
              <Comments
                numComments={this.kFormatter(this.props.post.num_comments)}
                comments={this.state.comments}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Post;
