import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import usersService from "./services/users";
import BlogForm from "./components/BlogForm";
import {
  addComment,
  createBlog,
  initializeBlogs,
  likeBlog,
} from "./reducers/blogReducer";
import {
  clearNotification,
  setNotification,
} from "./reducers/notificationReducer";
import { clearUser, setUser } from "./reducers/userReducer";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
const Home = ({ localUser, loginForm, blogForm, handleLogout }) => {
  return (
    <div>
      {!localUser && loginForm()}
      {localUser && (
        <div>
          {blogForm()}
          <Blog user={localUser} />
        </div>
      )}
    </div>
  );
};

const Navigation = ({ logout }) => {
  const padding = {
    // paddingRight: 5,
    paddingTop: 10,
  };
  const user = useSelector(({ user }) => {
    return user;
  });

  if (user == null) {
    return <h2>loading ...</h2>;
  }

  return (
    <div>
      <div style={padding}>
        <Nav>
          <Nav.Link>
            <Link to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/users">users</Link>
          </Nav.Link>
          <Nav>
            <div style={padding}>
              <em>{user.name} logged in</em>
            </div>
          </Nav>
          <Nav>
            <Button onClick={logout}>logout</Button>
          </Nav>
        </Nav>
      </div>
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const className = message.includes("error") ? "error" : "success";
  return <div className={className}>{message}</div>;
};

const Header = ({ localUser, handleLogout }) => {
  return (
    <div>
      <h2>blogs</h2>
      <div className="name">
        {localUser.name} logged in{" "}
        <button onClick={handleLogout}>logout</button>{" "}
      </div>
    </div>
  );
};

const Users = ({ logout }) => {
  const [users, setUsers] = useState(null);
  const user = useSelector(({ user }) => {
    return user;
  });
  const info = useSelector(({ blogs }) => {
    return blogs;
  });

  const getUsers = async () => {
    const users = await usersService.getAll();
    setUsers(users);
    console.log(users);
  };
  useEffect(() => {
    getUsers();
  }, []);

  if (user == null || users == null) {
    return <h2>loading ...</h2>;
  }
  return (
    <div>
      <Header localUser={user} handleLogout={logout} />
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const User = ({ logout }) => {
  const [data, setData] = useState(null);
  const user = useSelector(({ user }) => {
    return user;
  });
  const match = useMatch("/users/:id");
  const info = match.params.id;

  useEffect(() => {
    const getData = async () => {
      try {
        // const id = info.id
        const userData = await usersService.getOne(info);
        setData(userData);
        console.log(userData);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [info]);
  if (user == null || data == null) {
    return <h2>loading ...</h2>;
  }
  return (
    <div>
      <Header localUser={user} handleLogout={logout} />
      <h2>{data.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {data.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

const Page = ({ logout }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [comment, setComment] = useState("");
  const match = useMatch("/blogs/:id");
  const id = match.params.id;
  const user = useSelector(({ user }) => {
    return user;
  });

  useEffect(() => {
    const getData = async () => {
      try {
        // const id = info.id
        const userData = await blogService.getOne(id);
        setData(userData);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [id, data]);
  if (user == null || data == null) {
    return <h2>loading ...</h2>;
  }

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const addComments = (event) => {
    event.preventDefault();
    const commentObject = {
      content: comment,
      blog: data.id,
    };
    dispatch(addComment(commentObject));
    setComment("");
    console.log(data.comments);
  };
  const handleLike = async (data) => {
    dispatch(likeBlog(data));
  };

  return (
    <div>
      <div>
        <Header localUser={user} handleLogout={logout} />
        <h3>{data.title}</h3>
        <a href={data.url}>{data.url}</a>
        <p>
          {data.likes} likes{" "}
          <button onClick={() => handleLike(data)}>like</button>
        </p>
        <p>added by {data.user.name}</p>
      </div>

      <div>
        <h3>comments</h3>
        <form onSubmit={addComments}>
          <input value={comment} onChange={handleComment} />
          <button type="submit">add comment</button>
        </form>
        <ul key={data.comments.id}>
          {data?.comments?.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const [blogVisible, setBlogVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const localUser = useSelector(({ user }) => {
    return user;
  });
  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));

      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setErrorMessage("Logged in");
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login to application</h2>
      <div>
        username{" "}
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    dispatch(createBlog(blogObject));
    setTitle("");
    setAuthor("");
    setUrl("");
    dispatch(setNotification(`New blog: ${title} by ${author}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? "none" : "" };
    const showWhenVisible = { display: blogVisible ? "" : "none" };
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>create new</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            title={title}
            author={author}
            url={url}
            handleSubmit={addBlog}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
          />
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(clearUser());
    // setLocalUser(localUser)
  };

  return (
    <div>
      <Container>
        <Notification message={errorMessage} />
        <Navigation logout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                localUser={localUser}
                loginForm={loginForm}
                blogForm={blogForm}
                handleLogout={handleLogout}
              />
            }
          />
          <Route path="/users" element={<Users logout={handleLogout} />} />
          <Route path="/users/:id" element={<User logout={handleLogout} />} />
          <Route path="/blogs/:id" element={<Page logout={handleLogout} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
