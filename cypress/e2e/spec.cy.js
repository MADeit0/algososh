/// <reference types="cypress" />

describe("доступ к приложению", function () {
  it("должно проверить, что приложение поднялось", () => {
    cy.visit("http://localhost:3000");
  });
});
