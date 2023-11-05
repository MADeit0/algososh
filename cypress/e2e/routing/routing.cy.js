/// <reference types="cypress" />

describe("Роутинг страниц", function () {
  beforeEach(() => {
    cy.visit("/");
  });

  it("должно перейти на страницу c алгоритмом разворота строки", () => {
    cy.get('a[href="/recursion"]').click();
    cy.contains("Строка");
  });

  it("должно перейти на страницу c алгоритмом последовательности Фибоначи", () => {
    cy.get('a[href="/fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("должно перейти на страницу c алгоритмом сортировки", () => {
    cy.get('a[href="/sorting"]').click();
    cy.contains("Сортировка массива");
  });

  it("должно перейти на страницу c алгоритмом стек", () => {
    cy.get('a[href="/stack"]').click();
    cy.contains("Стек");
  });

  it("должно перейти на страницу c алгоритмом очередь", () => {
    cy.get('a[href="/queue"]').click();
    cy.contains("Очередь");
  });

  it("должно перейти на страницу c алгоритмом связный список", () => {
    cy.get('a[href="/list"]').click();
    cy.contains("Связный список");
  });
});
