describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Tunji Job",
      username: "66houdini",
      password: "Oyerinde1$",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Login to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("66houdini");
      cy.get("#password").type("Oyerinde1$");
      cy.get("#login-button").click();
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("66houdini");
      cy.get("#password").type("Oyerinde4");
      cy.get("#login-button").click();
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "66houdini", password: "Oyerinde1$" });
      cy.createBlog({
        title: "second most likes",
        author: "Tunji Job",
        url: "www.google.com",
        likes: 10,
      });
      cy.createBlog({
        title: "third most likes",
        author: "Tunji Job",
        url: "www.google.com",
        likes: 5,
      });
      cy.createBlog({
        title: "most likes",
        author: "Tunji Job",
        url: "www.google.com",
        likes: 15,
      });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("Tunji Job");
      cy.get("#url").type("www.google.com");
      cy.get("#create-button").click();
      cy.contains("a blog created by cypress");
    });
    it("user can like a blog", function () {
      cy.contains("view").click();
      cy.contains("like").click();
    });

    describe("only creators can delete a blog", function () {
      it("user can delete a blog", function () {
        cy.contains("view").click();
        cy.contains("remove").click();
      });
      it("user cannot delete a blog created by another user", function () {
        cy.contains("logout").click();
        const anotherUser = {
          name: "Another User",
          username: "anotheruser",
          password: "AnotherUser1$",
        };
        cy.request("POST", "http://localhost:3003/api/users", anotherUser);
        cy.login({ username: "anotheruser", password: "AnotherUser1$" });
        cy.contains("view").click();
        cy.contains("remove").should("not.exist");
      });
    });

    it("blogs are ordered according to likes", function () {
      cy.get(".blog").eq(0).should("contain", "most likes");
      cy.get(".blog").eq(1).should("contain", "second most likes");
      cy.get(".blog").eq(2).should("contain", "third most likes");
    });
  });
});
