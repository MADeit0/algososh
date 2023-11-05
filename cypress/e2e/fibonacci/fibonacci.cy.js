/// <reference types="cypress" />

import { dataAttributes, selectors } from "../../constants/constants";

describe("Тесты для страницы чисел Фибоначчи", function () {
  beforeEach(() => {
    cy.visit("/fibonacci");
    cy.contains("Последовательность Фибоначчи");

    cy.get(selectors.input_number).as("input");
    cy.getBySel(dataAttributes.BTN_GET_FIBONACCI).as("btnGetFibonacci");
  });

  it("должен проверить, что если в инпуте пусто, то кнопка разворота недоступна", () => {
    cy.get("@input").should("have.value", "");
    cy.get("@btnGetFibonacci").should("be.disabled");
  });

  it("должен проверить, что если в инпуте есть текст, то кнопка разворота доступна", () => {
    cy.get("@input").type("12");
    cy.get("@btnGetFibonacci").should("not.be.disabled");
  });

  it("должен сгенерировать корректно последовательность фибоначчи до 10 числа исключая 0", () => {
    const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

    cy.get("@input").type("9");
    cy.get("@btnGetFibonacci").click();

    cy.wait(5000);

    cy.getBySel(dataAttributes.CIRCLE)
      .should("have.length", "10")
      .each(($el, index) => {
        cy.get($el).contains(fibonacci[index]);
      });
  });
});
