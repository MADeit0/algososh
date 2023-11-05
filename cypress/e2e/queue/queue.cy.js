/// <reference types="cypress" />

import { borderColorShape, dataAttributes, selectors } from "../../constants/constants";

describe("Тесты для страницы очередь", function () {
  const queue = ["a", "ab", "abc"];

  beforeEach(() => {
    cy.visit("/queue");
    cy.contains("Очередь");

    cy.get(selectors.input_text).as("input");
    cy.getBySel(dataAttributes.BTN_ADD_ITEM).as("btnAddItem");
    cy.getBySel(dataAttributes.BTN_DELETE_ITEM).as("btnDeleteItem");
    cy.getBySel(dataAttributes.BTN_CLEAR_ALL).as("btnClearAll");
    cy.getBySel(dataAttributes.CIRCLE).as("circle");
  });

  it("должен проверить, что если в инпуте пусто, то все кнопки недоступны", () => {
    cy.get("@input").should("have.value", "");

    cy.get("@btnAddItem").should("be.disabled");
    cy.get("@btnDeleteItem").should("be.disabled");
    cy.get("@btnClearAll").should("be.disabled");
  });

  it("должен добавить элементы 'a, ab, abc' в очередь и отрисовать курсоры head и tail корректно", () => {
    queue.forEach((item, index) => {
      cy.get("@circle").eq(0).parent().contains("head");
      cy.get("@input").type(item);
      cy.get("@btnAddItem").click();

      cy.get("@circle").eq(index).parent().contains("tail");
      index !== 0 &&
        cy
          .get("@circle")
          .eq(index - 1)
          .parent()
          .should("not.contain", "tail");

      cy.get("@circle")
        .eq(index)
        .should("have.css", "border-color", borderColorShape.CHANGING);
      cy.get("@circle")
        .eq(index)
        .should("have.css", "border-color", borderColorShape.DEFAULT);

      cy.get("@circle").eq(index).contains(item);
    });
  });

  it("должен удалить первый элемент из очереди и сместить курсор head на следующий элемент", () => {
    queue.forEach((item) => {
      cy.get("@input").type(item);
      cy.get("@btnAddItem").click();
    });

    cy.get("@btnDeleteItem").click();
    cy.get("@circle")
      .eq(0)
      .should("have.css", "border-color", borderColorShape.CHANGING);
    cy.get("@circle")
      .eq(0)
      .should("have.css", "border-color", borderColorShape.DEFAULT);
    cy.get("@circle").eq(0).should("not.contain", "a");

    cy.get("@circle")
      .parent()
      .each(($el, index) => {
        if (index === 1) {
          cy.get($el).contains("head");
        } else {
          cy.get($el).should("not.contain", "head");
        }
      });
  });

  it("должен  очистить все элементы в очереди", () => {
    queue.forEach((item) => {
      cy.get("@input").type(item);
      cy.get("@btnAddItem").click();
    });

    cy.get("@btnClearAll").click();
    cy.get("@circle").eq(0).parent().contains("head");

    cy.get("@circle").each(($el) => {
      cy.get($el).children().should("not.have.text");
    });
  });
});
