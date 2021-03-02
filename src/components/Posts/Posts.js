import React, { Component } from "react";

import Post from "./Post/Post";
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
          ...(postObj.data["validatedImgAddress"] = this.checkURL(
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

  checkURL = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  render() {
    let posts = this.state.posts;
    let renderPost = posts
      ? this.state.posts.map((post, i) =>
          post.data.validatedImgAddress ? (
            <Post
              key={post.data.subreddit_id + i}
              title={post.data.title}
              pic={post.data.url}
            />
          ) : (
            <Post key={post.data.subreddit_id + i} title={post.data.title} />
          )
        )
      : null;
    console.log("Render Posts: ", renderPost);
    return <div>{renderPost}</div>;
  }
}

export default Posts;
