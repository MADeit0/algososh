/// <reference types="cypress" />

import { borderColorShape, dataAttributes, selectors } from "../../constants/constants";
describe("Тесты для страницы рекурсии", function () {
  beforeEach(() => {
    cy.visit("/recursion");
    cy.contains("Строка");

    cy.get(selectors.input_text).as("input");
    cy.getBySel(dataAttributes.BTN_REVERSE_STRING).as("BtnReverseStr");
  });

  it("должен проверить, что если в инпуте пусто, то кнопка разворота недоступна", () => {
    cy.get("@input").should("have.value", "");
    cy.get("@BtnReverseStr").should("be.disabled");
  });

  it("должен проверить, что если в инпуте есть текст, то кнопка разворота доступна", () => {
    cy.get("@input").type("12345");
    cy.get("@BtnReverseStr").should("not.be.disabled");
  });

  it("должен корректно развернуть строку и отследить анимацию подсветки изменяемых элементов, ", () => {
    cy.get("@input").type("12345");
    cy.get("@BtnReverseStr").click();

    cy.getBySel(dataAttributes.CIRCLE).should("have.length", 5).as("circle");

    cy.get("@circle").each(($el, index) => {
      cy.get($el).contains("12345"[index]);
      if (index === 0 || index === 4) {
        cy.get($el).should(
          "have.css",
          "border-color",
          borderColorShape.CHANGING
        );
      } else {
        cy.get($el).should(
          "have.css",
          "border-color",
          borderColorShape.DEFAULT
        );
      }
    });

    cy.get("@circle").each(($el, index) => {
      cy.get($el).contains("52341"[index]);
      switch (index) {
        case 0:
        case 4:
          cy.get($el).should(
            "have.css",
            "border-color",
            borderColorShape.MODIFIED
          );
          break;
        case 1:
        case 3:
          cy.get($el).should(
            "have.css",
            "border-color",
            borderColorShape.CHANGING
          );
          break;
        default:
          cy.get($el).should(
            "have.css",
            "border-color",
            borderColorShape.DEFAULT
          );
          break;
      }
    });

    cy.get("@circle").each(($el, index) => {
      cy.get($el).contains("54321"[index]);
      if (index <= 1 || index >= 3) {
        cy.get($el).should(
          "have.css",
          "border-color",
          borderColorShape.MODIFIED
        );
      } else {
        cy.get($el).should(
          "have.css",
          "border-color",
          borderColorShape.CHANGING
        );
      }
    });

    cy.get("@circle").each(($el, index) => {
      cy.get($el).contains("54321"[index]);
      cy.get($el).should("have.css", "border-color", borderColorShape.MODIFIED);
    });
  });
});
