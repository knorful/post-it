import React, { Component } from "react";

import axios from "axios";

const BASE_API = "https://www.reddit.com/r";

class Posts extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    try {
      let getPosts = await axios.get(`${BASE_API}/popular.json`, {
        headers: { Accept: "application/json" },
      });

      this.setState({
        posts: getPosts.data.data.children,
      });
    } catch (e) {
      console.log("Error:", e);
    }
  }

  render() {
    console.log("Here are the popular posts: ", this.state.posts);
    return (
      <div>
        <h1>Posts will go here</h1>
      </div>
    );
  }
}

export default Posts;
