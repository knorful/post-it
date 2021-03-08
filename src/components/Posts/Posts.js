import React, { Component } from "react";

import Post from "./Post/Post";
import Categories from "../Categories/Categories";
import LoadPage from "./Post/LoadPage/LoadPage";
import classes from "./Posts.module.css";

class Posts extends Component {
  render() {
    let posts = this.props.posts;
    let renderPost = this.props.loading
      ? this.props.posts.map((post, i) =>
          post.data.validatedImgAddress ? (
            <Post
              key={post.data.subreddit_id + i}
              post={post.data}
              pic={post.data.url}
              api={this.props.api}
            />
          ) : (
            <Post
              key={post.data.subreddit_id + i}
              post={post.data}
              api={this.props.api}
            />
          )
        )
      : null;

    return (
      <div className={classes.PostsContainer}>
        <div className={classes.Posts}>
          {this.props.loading ? (
            <>
              <div className={classes.Posts_content}>{renderPost}</div>
              <Categories
                loading={this.props.loading}
                posts={posts}
                api={this.props.api}
              />
            </>
          ) : (
            <LoadPage />
          )}
        </div>
      </div>
    );
  }
}

export default Posts;
