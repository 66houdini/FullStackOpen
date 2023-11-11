import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    like(state, action) {
      const id = action.payload;
      const blogToChange = state.find((n) => n.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      const updatedState = state.map((blog) =>
        blog.id !== id ? blog : changedBlog,
      );
      return updatedState.sort((a, b) => b.likes - a.likes);
    },
    appendBlogs(state, action) {
      return state.concat(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    del(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    updateBlog(state, action) {
      return action.payload;
    },
  },
});

export const { like, appendBlogs, setBlogs, del, updateBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlogs(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(like(updatedBlog.id));
  };
};

export const addComment = (commentObject) => {
  console.log(commentObject);
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.addComment(
        commentObject.blog,
        commentObject.content,
      );
      dispatch(updateBlog(updatedBlog));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id);
    dispatch(del(blog.id));
  };
};

export default blogSlice.reducer;
