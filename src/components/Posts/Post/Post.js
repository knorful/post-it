import React, { Component } from "react";
import axios from "axios";
import { format } from "timeago.js";

import Comments from "./Comments/Comments";
import classes from "./Post.module.css";

const USER_API = "https://www.reddit.com/user/";

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
    let hasVideo = this.props.post.media;
    let hasThumbnail = this.props.post.thumbnail;
    let voteCount = this.kFormatter(
      this.props.post.ups - this.props.post.downs
    );

    const epochTimeStamp = format(this.props.post.created_utc * 1000);

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

    let dynamicPostRender =
      hasThumbnail &&
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
          {/* <a href={this.props.post.url} target="_blank" rel="noreferrer">
            {this.props.post.url}
          </a> */}
          {showPosts}
        </>
      );

    let showComments = this.state.comments ? (
      <div className={classes.Footer}>
        <Comments
          numComments={this.kFormatter(this.props.post.num_comments)}
          comments={this.state.comments}
        />
      </div>
    ) : null;

    return (
      <div className={classes.Post}>
        <div className={classes.Votes}>
          <div className={classes.VoteDisplay}>
            <button className={classes.Up}>
              <i class="fas fa-arrow-alt-circle-up"></i>
            </button>
            <div className={classes.VoteCount}>{voteCount}</div>
            <button className={classes.Down}>
              <i class="fas fa-arrow-alt-circle-down"></i>
            </button>
          </div>
        </div>
        <div className={classes.Content}>
          <div className={classes.Tagline}>
            <ul>
              <li>
                <a
                  href={`${this.props.api}/${this.props.post.subreddit}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontWeight: 600 }}
                >
                  {this.props.post.subreddit_name_prefixed}
                </a>
              </li>
              <li>
                <a
                  href={`${USER_API}${this.props.post.author}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  * Posted By /u/{this.props.post.author}
                </a>
              </li>
            </ul>
          </div>
          {dynamicPostRender}
          <div className={classes.FooterContainer}>
            {showComments}
            <div className={classes.Timestamp}>
              <p>{epochTimeStamp}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
