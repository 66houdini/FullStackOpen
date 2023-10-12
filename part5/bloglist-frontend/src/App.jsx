import "./App.css";
import { useState, useEffect } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from "./services/login"
import BlogForm from "./components/BlogForm";

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  const className = message.includes('error') ? 'error' : 'success';
  return (
    <div className={className}>
      {message}
    </div>
  )
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogVisible, setBlogVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
       const sortedBlogs = blogs.sort((c, d) => d.likes -c.likes)
      setBlogs(sortedBlogs)
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setErrorMessage("Logged in")
      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        setUsername("")
        setPassword("")
    } catch (exception) {
      setErrorMessage("Wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login to application</h2>
      <div>
        username <input
        id="username"
        type='text'
        value={username}
        name='Username'
        onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        password <input
        id="password"
        type='password'
        value={password}
        name='Password'
        onChange={({target}) => setPassword(target.value)} />
      </div>
      <button id="login-button" type='submit'>login</button>
    </form>
  )

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
  }
  blogService.create(blogObject).then(returnedBlog => {
    setBlogs(blogs.concat(returnedBlog))
    setErrorMessage(`a new blog ${title} by ${author} added`)
    setTitle('')
    setAuthor('')
    setUrl('')
  }).catch(error => {
    setErrorMessage("Failed to add blog")
  })

}

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleSubmit={addBlog}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)} />
           <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
       
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && <div>
        <h2>blogs</h2>
      <div className='name'>{user.name} logged in <button onClick={handleLogout}>logout</button> </div>  
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
        </div>}
      
    </div>
  )
} 

export default App;