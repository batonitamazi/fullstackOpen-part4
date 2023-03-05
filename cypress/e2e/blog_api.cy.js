describe("blog api", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Tamazi",
      username: "tamazimirianashvili",
      password: "Tazo2001!",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user).then((response) => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
    })
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("login");
  });
  it("login form can be opened", function () {
    cy.contains("login");
  });
  it("wrong credentials", function () {
    cy.contains("login").click();
    cy.get("#username").type("tamazimirianashvili");
    cy.get("#password").type("Tazo2001");
    cy.get("#login-button").click();
    cy.get(".error")
      .should("contain", "Wront Credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
    cy.get("html").should("not.contain", "tamazimirianashvili logged in");
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("tamazimirianashvili");
    cy.get("#password").type("Tazo2001!");
    cy.get("#login-button").click();
    cy.contains("tamazimirianashvili logged in");
  });
  describe("when logged in", () => {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("input:first").type("tamazimirianashvili");
      cy.get("input:last").type("Tazo2001!");
      cy.get("#login-button").click();
    });
    it("a new blog can be created", function () {
      cy.contains("create new Blog").click();
      cy.get("#title").type("ხმაური და მძვინვარების შესახებ");
      cy.get("#author").type("თამაზ მირიანაშვილი");
      cy.get("#url").type("http://localhost:3000");
      cy.contains("save").click();
      cy.contains("ხმაური და მძვინვარების შესახებ");
    });
    
  });
});
