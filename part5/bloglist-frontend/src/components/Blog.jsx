import { useState } from "react";
import blogService from "../services/blogs";
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
  const [visible, setVisible] = useState({});

  const toggleVisibility = (id) => {
    setVisible((prevVisibleBlogs) => ({
      ...prevVisibleBlogs,
      [id]: !prevVisibleBlogs[id],
    }));
  };

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog));
    dispatch(setNotification(`Liked blog: ${blog.title} by ${blog.author}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog));
        // await blogService.deleteBlog(blog.id);
      } catch (err) {
        console.log("Error deleting blog: ", err);
      }
    }
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
          {/* <button onClick={() => toggleVisibility(blog.id)}>
              {visible[blog.id] ? "hide" : "view"}
            </button>
            {visible[blog.id] && (
              <div>
                <p>{blog.url}</p>
                <p>
                  likes {blog.likes}
                  <button onClick={() => handleLike(blog)}>like</button>
                </p>
                <p>{blog?.user?.name}</p>
                {user && user.id === blog?.user?.id && (
                  <button className="delete" onClick={() => handleDelete(blog)}>
                    remove
                  </button>
                )}
              </div>
            )} */}
        </div>
      ))}
    </div>
  );
};

Blog.propTypes = {
  // blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
export default Blog;
