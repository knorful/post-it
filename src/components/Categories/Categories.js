import React, { Component } from "react";
import axios from "axios";

import classes from "./Categories.module.css";

class Categories extends Component {
  state = {
    icons: [],
    persistedIcons: JSON.parse(localStorage.getItem("Icons")),
  };

  componentDidMount() {
    for (let i = 0; i < this.props.posts.length; i++) {
      this.createIconObj(this.props.posts[i]);
    }
  }

  createIconObj = (post) => {
    this.fetchIcons(post.data.subreddit, post);
  };

  fetchIcons = async (subreddit, post) => {
    try {
      await axios
        .get(`${this.props.api}/${subreddit}/about.json`, {
          headers: { Accept: "application/json" },
        })
        .then((res) =>
          res.data.data.hasOwnProperty("community_icon")
            ? res.data.data.community_icon
            : res.data.data.icon_img
        )
        .then((result) => {
          let imgURL = result ? this.ampersandConverter(result) : null;
          if (imgURL !== null) {
            this.setIcons(subreddit, imgURL, post);
          }
        });
    } catch (e) {
      console.log("This is the error", e);
    }
  };

  setIcons = (sub, url, post) => {
    let copyOfIconsInState = this.state.icons.slice();
    copyOfIconsInState.push({ topic: sub, imgAddress: url });
    this.setState((st) => ({
      ...st.icons,
      icons: copyOfIconsInState,
    }));
    localStorage.setItem("Icons", JSON.stringify(this.state.icons));
  };

  ampersandConverter = (url) => {
    let regex = /(&amp;|&)/gi;
    let convertedLink = url ? url.replace(regex, "&") : null;
    return convertedLink;
  };

  render() {
    let getCategories = this.state.persistedIcons
      ? this.state.persistedIcons.map((obj, i) => {
          return (
            <li key={i}>
              <img src={obj.imgAddress} alt="img" />
              <p>r/{obj.topic}</p>
            </li>
          );
        })
      : this.state.icons.map((obj, i) => {
          return (
            <li key={i}>
              <img src={obj.imgAddress} alt="img" />
              <p>r/{obj.topic}</p>
            </li>
          );
        });

    let loadCategories = this.props.loading ? (
      <>
        <div className={classes.Header}>
          <h1>Subreddits</h1>
        </div>
        {getCategories}
      </>
    ) : null;
    return (
      <div className={classes.Categories}>
        <ul>{loadCategories}</ul>
      </div>
    );
  }
}

export default Categories;
