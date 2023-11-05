/// <reference types="cypress" />

import { borderColorShape, dataAttributes, selectors } from "../../constants/constants";

describe("Тесты для страницы Стек", function () {
  const stack = ["a", "ab", "abc"];

  beforeEach(() => {
    cy.visit("/stack");
    cy.contains("Стек");

    cy.get(selectors.input_text).as("input");
    cy.getBySel(dataAttributes.BTN_ADD_ITEM).as("btnAddItem");
    cy.getBySel(dataAttributes.BTN_DELETE_ITEM).as("btnDeleteItem");
    cy.getBySel(dataAttributes.BTN_CLEAR_ALL).as("btnClearAll");
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
      cy.getBySel(dataAttributes.CIRCLE)
        .eq(index)
        .should("have.css", "border-color", borderColorShape.CHANGING);
        cy.getBySel(dataAttributes.CIRCLE)
        .eq(index)
        .should("have.css", "border-color", borderColorShape.DEFAULT);
    });

    cy.getBySel(dataAttributes.CIRCLE)
      .should("have.length", "3")
      .each(($el, index) => {
        cy.get($el).contains(stack[index]);
      });
  });

  it("должен удалить элементы 'a, ab, abc' из стека", () => {
    stack.forEach((item) => {
      cy.get("@input").type(item);
      cy.get("@btnAddItem").click();
    });

    cy.get("@btnDeleteItem").click();
    cy.getBySel(dataAttributes.CIRCLE).as('circle')

    cy.get('@circle')
      .eq(2)
      .should("have.css", "border-color", borderColorShape.CHANGING);
    cy.get("@btnDeleteItem").click();
    cy.get("@circle")
      .eq(1)
      .should("have.css", "border-color", borderColorShape.CHANGING);
    cy.get("@btnDeleteItem").click();
    cy.get("@circle")
      .eq(0)
      .should("have.css", "border-color", borderColorShape.CHANGING);

    cy.get("@circle").should("have.length", 0);
  });

  it("должен  очистить все элементы в стеке", () => {
    stack.forEach((item) => {
      cy.get("@input").type(item);
      cy.get("@btnAddItem").click();
    });

    cy.get("@btnClearAll").click();

    cy.getBySel(dataAttributes.CIRCLE).should("have.length", 0);
  });
});
