import AllBlogs from "./pages/AllBlogs"; 
import SingleBlog from "./pages/SingleBlog";
import Form from "./pages/Form";

import React, {useState, useEffect} from 'react'
import {Route, Switch, Link} from "react-router-dom"

function App(props) {
//////////////////////
/// Styling
//////////////////////

const h1 = {
  textAlign: 'center',
  margin: '10px'
}
const button = {
  backgroundColor: 'navy',
  display: 'block',
  margin: 'auto'
}
  /////////////////////////
  // State & Other Variables
  /////////////////////////

  // API URL
  const url = "https://sw-django-blogs.herokuapp.com/blogs/"

  // State to Hold List of Blogs
  const [blogs, setBlogs] = useState([])

   const nullBlog = {
    subject: "",
    details: ""
}
const [targetBlog, setTargetBlog] = useState(nullBlog)

//////////////////////////
// Functions
//////////////////////////
const getBlogs = async () => {
  const response = await fetch(url)
  const data = await response.json()
  setBlogs(data)
}


const addBlogs = async (newBlog) => {
  const response = await fetch(url, {
    method:"post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newBlog)
  })

  getBlogs()
}

const getTargetBlog = (blog) => {
  setTargetBlog(blog)
  props.history.push("/edit")
}

const updateBlog = async (blog) => {
  const response = await fetch(url + blog.id + "/", {
    method: "put",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(blog)
  })

  getBlogs()
}

const deleteBlog = async (blog) => {
  const response = await fetch(url + blog.id + "/", {
    method:"delete"
  })

  getBlogs()
  props.history.push("/")
}
//////////////////////////
// useEffects
//////////////////////////

useEffect(() => {getBlogs()}, [])



  return (
    <div className="App">
       <h1 style={h1}> My Blog List </h1>
       <Link to='/new'><button style={button}>Create a new Blog Post</button></Link>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => <AllBlogs {...routerProps} blogs={blogs} />}
        />
        <Route
          path="/new"
          render={(routerProps) => <Form 
            {...routerProps}
            initialBlog={nullBlog}
            handleSubmit={addBlogs}
            buttonLabel="Create Blog"
            />}
        />
        <Route
          path="/edit"
          render={(routerProps) => <Form 
            {...routerProps}
            initialBlog={targetBlog}
            handleSubmit={updateBlog}
            buttonLabel="Update Blog"
            />}
        />
        <Route
          path="/blog/:id"
          render={(routerProps) => <SingleBlog 
            {...routerProps} blogs={blogs} 
            edit={getTargetBlog} 
            deleteBlog={deleteBlog}
          /> }
        />
      </Switch>
    </div>
  );
}

export default App;
