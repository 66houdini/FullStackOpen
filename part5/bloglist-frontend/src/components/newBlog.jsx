import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import BlogForm from "./BlogForm";

const NewBlog = () => {
  const dispatch = useDispatch();
  const addBlog = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    dispatch(createBlog(title, author, url));
    dispatch(setNotification(`New blog: ${title} by ${author}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
  return (
    <>
      <BlogForm />
    </>
  );
};

export default NewBlog;
