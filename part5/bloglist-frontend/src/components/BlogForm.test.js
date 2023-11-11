import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("New BlogForm", () => {
  it("calls the createBlogMock function with the correct arguments when the form is submitted", async () => {
    const createBlogMock = jest.fn();

    // Mock the requestSubmit function
    HTMLFormElement.prototype.requestSubmit = jest.fn();

    render(
      <BlogForm
        handleSubmit={createBlogMock}
        handleTitleChange={() => {}}
        handleAuthorChange={() => {}}
        handleUrlChange={() => {}}
      />,
    );

    userEvent.type(screen.getByPlaceholderText("title"), "Test Blog Title");
    userEvent.type(screen.getByPlaceholderText("author"), "Test Author");
    userEvent.type(screen.getByPlaceholderText("url"), "http://example.com");

    const button = screen.getByText("create");
    await userEvent.click(button);

    expect(createBlogMock).toHaveBeenCalledWith({
      title: "Test Blog Title",
      author: "Test Author",
      url: "http://example.com",
    });
  });
});
