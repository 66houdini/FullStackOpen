import React from "react";
import "@testing-library/jest-dom"; 
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import axios from "axios";

test("only title and author rendered", () => {
  const blog = {
    title: "Test Blog Title",
    author: "Test Author",
    url: "http://example.com",
    likes: 42,
    user: {
      name: "Test User",
    },
  };

  const user = {
    id: "testUserId",
  };

  render (<Blog blog={blog} user={user} />)
  const title = screen.queryByText("Test Blog Title")
  const author = screen.queryByText("Test Author")
  const url = screen.queryByText("http://example.com")
  const likes = screen.queryByText("42")
  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()

});

test("all fields rendered on click", async () => {
    const blog = {
        title: "Test Blog Title",
        author: "Test Author",
        url: "http://example.com",
        likes: 42,
        user: {
          name: "Test User",
        },
      }
    
    const user = {id: "testUserId"}
    render(<Blog blog={blog} user={user}/>)
    const button = screen.getByText("view")
    await userEvent.click(button)

    const url = screen.queryByText("http://example.com")
    const likes = screen.queryByText("42")
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
    
})

test ("like button clicked twice", async () => {
    const blog = {
        title: "Test Blog Title",
        author: "Test Author",
        url: "http://example.com",
        likes: 42,
        user: {
          name: "Test User",
        },
      }
    
    const user = {id: "testUserId"}
    const mockHandler = jest.fn()
    render(<Blog blog={blog} user={user} handleLike={mockHandler}/>)
    const button = screen.getByText("view")
    await userEvent.click(button)

    const likeButton = screen.getByText("like")
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)
    expect(mockHandler).toHaveBeenCalledTimes(2)
    

})


