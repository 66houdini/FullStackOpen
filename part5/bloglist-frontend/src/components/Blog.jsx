import { useState } from "react";
// import "../App.css";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);


  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const updatedLikes = likes + 1;
    const updatedBlog = {...blog,likes:updatedLikes};
    const response = await blogService.updateBlog(updatedBlog)
    setLikes(updatedLikes)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
      } catch (err) {
        console.log("Error deleting blog: ",err);
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div className="blog">{blog.title} {blog.author}</div>
      
      <button onClick={toggleVisibility}>
        {visible ? "hide" : "view"}
      </button>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>likes {likes}<button onClick={handleLike}>like</button></p>
          <p>{blog?.user?.name}</p>
          {user && user.id === blog?.user?.id && (
            <button className="delete" onClick={handleDelete}>remove</button>
          )}
        </div>
      )}
    </div>
    
  )
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}
export default Blog;
