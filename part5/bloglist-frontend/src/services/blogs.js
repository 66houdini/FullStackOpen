import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updateBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return response.data;
};

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    id,
    comment,
  });
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default {
  getAll,
  getOne,
  addComment,
  create,
  setToken,
  updateBlog,
  deleteBlog,
};
