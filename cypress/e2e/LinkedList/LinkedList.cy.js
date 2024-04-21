/// <reference types="cypress" />

import { dataAttributes, selectors } from "../../constants/constants";

describe("Тесты для страницы связный список", function () {
  beforeEach(() => {
    cy.visit("/list");
    cy.contains("Связный список");

    cy.get(selectors.input_number).as("inputIndex");
    cy.get(selectors.input_text).as("inputText");

    cy.getBySel(dataAttributes.BTN_ADD_ITEM_TO_HEAD).as("btnAddItemToHead");
    cy.getBySel(dataAttributes.BTN_ADD_ITEM_TO_TAIL).as("btnAddItemToTail");
    cy.getBySel(dataAttributes.BTN_ADD_ITEM_TO_INDEX).as("btnAddItemToIndex");
    cy.getBySel(dataAttributes.BTN_DELETE_ITEM_TO_HEAD).as(
      "btnDeleteItemToHead"
    );
    cy.getBySel(dataAttributes.BTN_DELETE_ITEM_TO_TAIL).as(
      "btnDeleteItemToTail"
    );
    cy.getBySel(dataAttributes.BTN_DELETE_ITEM_TO_INDEX).as(
      "btnDeleteItemToIndex"
    );
    cy.getBySel(dataAttributes.CIRCLE).as("circle");
  });

  it("должен проверить, что если в инпуте пусто, то все кнопки недоступны, кроме добавления в head и tail", () => {
    cy.get("@inputText").should("have.value", "");

    cy.get("@btnAddItemToHead").should("be.disabled");
    cy.get("@btnAddItemToTail").should("be.disabled");
    cy.get("@btnAddItemToIndex").should("be.disabled");
    cy.get("@btnDeleteItemToIndex").should("be.disabled");
  });

  it("должен проверить отрисовку стартовго списка", () => {
    const defaultListArray = ["0", "1", "2", "3"];

    cy.get("@circle").each(($el, index) => {
      cy.get($el).children().should("have.text", defaultListArray[index]);
    });
  });

  it("должен добавить элемент в head", () => {
    const defaultListArray = ["qwe", "0", "1", "2", "3"];
    cy.get("@inputText").type("qwe");
    cy.get("@btnAddItemToHead").click();

    cy.get("@circle")
      .not("div[class*=circle_small]")
      .should("have.length", "5")
      .each(($el, index) => {
        cy.get($el).should("have.text", defaultListArray[index]);
      });
  });

  it("должен добавить элемент в tail", () => {
    const defaultListArray = ["0", "1", "2", "3", "qwe"];
    cy.get("@inputText").type("qwe");
    cy.get("@btnAddItemToTail").click();

    cy.get("@circle")
      .not("div[class*=circle_small]")
      .should("have.length", "5")
      .each(($el, index) => {
        cy.get($el).should("have.text", defaultListArray[index]);
      });
  });

  it("должен добавить элемент по индексу в 4 ячейку", () => {
    const defaultListArray = ["0", "1", "2", "qwe", "3"];
    cy.get("@inputText").type("qwe");
    cy.get("@inputIndex").type("3");
    cy.get("@btnAddItemToIndex").click();

    cy.get("@circle")
      .not("div[class*=circle_small]")
      .should("have.length", "5")
      .each(($el, index) => {
        cy.get($el).should("have.text", defaultListArray[index]);
      });
  });

  it("должен удалить элемент из head", () => {
    const defaultListArray = ["1", "2", "3"];
    cy.get("@btnDeleteItemToHead").click();

    cy.get("@circle")
      .not("div[class*=circle_small]")
      .should("have.length", 3)
      .each(($el, index) => {
        cy.get($el).should("have.text", defaultListArray[index]);
      });
  });

  it("должен удалить элемент из tail", () => {
    const defaultListArray = ["0", "1", "2"];
    cy.get("@btnDeleteItemToTail").click();

    cy.get("@circle")
      .not("div[class*=circle_small]")
      .should("have.length", 3)
      .each(($el, index) => {
        cy.get($el).should("have.text", defaultListArray[index]);
      });
  });

  it("должен удалить элемент по индексу из 4 ячейки", () => {
    const defaultListArray = ["0", "1", "2"];
    cy.get("@inputIndex").type("3");
    cy.get("@btnDeleteItemToTail").click();

    cy.get("@circle")
      .not("div[class*=circle_small]")
      .should("have.length", 3)
      .each(($el, index) => {
        cy.get($el).should("have.text", defaultListArray[index]);
      });
  });
});
