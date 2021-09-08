import React from "react";
import { Link } from "react-router-dom";

const SingleBlog = ({ match, blogs, edit, deleteBlog }) => {
  const id = parseInt(match.params.id);
  const blog = blogs.find((blog) => blog.id === id);

  //////////////////////
  // Styles
  /////////////////////
  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
  };

  return (
    <div style={div}>
      <h1>{blog.title}</h1>
      <h2>{blog.body}</h2>
      <button onClick={(event) => deleteBlog(blog)}>
        Delete
      </button>
      <button onClick={(event) => edit(blog)}>
        EDIT
      </button>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );

  }
export default SingleBlog;