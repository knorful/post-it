import React, { Component } from "react";

class Post extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        {this.props.pic ? <img src={this.props.pic} alt="pic" /> : null}
      </div>
    );
  }
}

export default Post;
