import { useState } from "react";
import PropTypes from "prop-types";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

const Blog = ({ user }) => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };



  return (
    <div>
      {sortedBlogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <div className="blog">
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
          
        </div>
      ))}
    </div>
  );
};

Blog.propTypes = {
  user: PropTypes.object.isRequired,
};
export default Blog;
