import PropTypes from "prop-types";

const BlogForm = ({
  title,
  author,
  url,
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => (
  <form onSubmit={handleSubmit}>
    <h2>Create new</h2>
    title: <input id="title" value={title} onChange={handleTitleChange} /> <br />
    author:
    <input id="author" value={author} onChange={handleAuthorChange} /> <br />
    url: <input id="url" value={url} onChange={handleUrlChange} /> <br />
    <button id="create-button" type="submit">create</button>
  </form>
);
BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
}

export default BlogForm;