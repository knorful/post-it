import React, { Component } from "react";
import axios from "axios";

import Header from "./components/Header/Header";
import Posts from "./components/Posts/Posts";

import classes from "./App.module.css";

const BASE_API = "https://www.reddit.com/r";

class App extends Component {
  state = {
    posts: [],
    loading: false,
    term: "",
  };

  async componentDidMount() {
    console.log("componentDidMount");
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
        loading: true,
      });
    } catch (e) {
      console.log("Error:", e);
    }
  }

  checkForImgURL = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  searchTerm = (term) => {
    this.setState({
      term: term,
    });
  };

  filteredPosts = () => {
    return this.state.posts.filter((post) =>
      post.data.hasOwnProperty("title")
        ? post.data.title.toLowerCase().includes(this.state.term.toLowerCase())
        : null
    );
  };

  render() {
    return (
      <div className={classes.App}>
        <Header searchTerm={this.searchTerm} />
        {!this.state.term ? (
          <Posts
            posts={this.state.posts}
            loading={this.state.loading}
            api={BASE_API}
          />
        ) : (
          <Posts
            posts={this.filteredPosts()}
            loading={this.state.loading}
            api={BASE_API}
          />
        )}
      </div>
    );
  }
}

export default App;
