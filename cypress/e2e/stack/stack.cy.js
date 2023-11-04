import { borderColorShape } from "../../constants/constants";

describe("Тесты для страницы Стек", function () {
  const stack = ["a", "ab", "abc"];

  beforeEach(() => {
    cy.visit("/stack");
    cy.contains("Стек");

    cy.get("input[type='text']").as("input");
    cy.get('[data-testid="btnAddItem"]').as("btnAddItem");
    cy.get('[data-testid="btnDeleteItem"]').as("btnDeleteItem");
    cy.get('[data-testid="btnClearAll"]').as("btnClearAll");
  });

  it("должен проверить, что если в инпуте пусто, то все кнопки недоступны", () => {
    cy.get("@input").should("have.value", "");

    cy.get("@btnAddItem").should("be.disabled");
    cy.get("@btnDeleteItem").should("be.disabled");
    cy.get("@btnClearAll").should("be.disabled");
  });

  it("должен добавить элементы 'a, ab, abc' в стек", () => {
    stack.forEach((item, index) => {
      cy.get("@input").type(item);
      cy.get("@btnAddItem").click();
      cy.get("[data-testid='circle']")
        .eq(index)
        .should("have.css", "border-color", borderColorShape.CHANGING);
      cy.get("[data-testid='circle']")
        .eq(index)
        .should("have.css", "border-color", borderColorShape.DEFAULT);
    });

    cy.get("[data-testid='circle']")
      .should("have.length", "3")
      .each(($el, index) => {
        cy.get($el).contains(stack[index]);
      });
  });

  it("должен удалить элементы 'a, ab, abc' из стека", () => {
    stack.forEach((item, index, arr) => {
      cy.get("@input").type(item);
      cy.get("@btnAddItem").click();
    });

    cy.get("@btnDeleteItem").click();
    cy.get("[data-testid='circle']")
      .eq(2)
      .should("have.css", "border-color", borderColorShape.CHANGING);
    cy.get("@btnDeleteItem").click();
    cy.get("[data-testid='circle']")
      .eq(1)
      .should("have.css", "border-color", borderColorShape.CHANGING);
    cy.get("@btnDeleteItem").click();
    cy.get("[data-testid='circle']")
      .eq(0)
      .should("have.css", "border-color", borderColorShape.CHANGING);

    cy.get("[data-testid='circle']").should("have.length", 0);
  });

  it("должен  очистить все элементы в стеке", () => {
    stack.forEach((item, index, arr) => {
      cy.get("@input").type(item);
      cy.get("@btnAddItem").click();
    });

    cy.get("@btnClearAll").click();

    cy.get("[data-testid='circle']").should("have.length", 0);
  });
});
