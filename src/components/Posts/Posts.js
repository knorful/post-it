import React, { Component } from "react";

import Post from "./Post/Post";
import classes from "./Posts.module.css";

import axios from "axios";

const BASE_API = "https://www.reddit.com/r";

class Posts extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    try {
      let getPosts = await axios
        .get(`${BASE_API}/popular.json`, {
          headers: { Accept: "application/json" },
        })
        .then((res) => res.data.data.children);

      let validatedPosts = getPosts.map((postObj) => {
        return {
          ...postObj,
          ...(postObj.data["validatedImgAddress"] = this.checkForImgURL(
            postObj.data.url
          )),
        };
      });

      this.setState({
        posts: validatedPosts,
      });
    } catch (e) {
      console.log("Error:", e);
    }
  }

  checkForImgURL = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  render() {
    let posts = this.state.posts;
    let renderPost = posts
      ? this.state.posts.map((post, i) =>
          post.data.validatedImgAddress ? (
            <Post
              key={post.data.subreddit_id + i}
              post={post.data}
              pic={post.data.url}
              api={BASE_API}
            />
          ) : (
            <Post
              key={post.data.subreddit_id + i}
              post={post.data}
              api={BASE_API}
            />
          )
        )
      : null;
    return (
      <div className={classes.Posts}>
        <h1>Popular posts</h1>
        <div className={classes.Posts_content}>{renderPost}</div>
      </div>
    );
  }
}

export default Posts;
