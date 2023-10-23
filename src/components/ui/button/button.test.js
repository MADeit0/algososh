import { fireEvent, getByText, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import React from "react";
import { Button } from "./button";

it("отрисовка с текстом", () => {
  const tree = renderer.create(<Button text="какой-то текст" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("отрисовка без текста", () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("отрисовка заблокированной кнопки", () => {
  const tree = renderer.create(<Button disabled={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("отрисовка кнопки с индикацией загрузки", () => {
  const tree = renderer.create(<Button isLoader={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Проверяем корректность вызова колбека при клике на кнопку.

it("Нажатие на кнопку вызывает колбэк корректно", () => {
  const onClickMock = jest.fn();

  const tree = render(<Button onClick={onClickMock} text="кнопка" />);
  const button = tree.getByText("кнопка");
  fireEvent.click(button);
  expect(onClickMock).toHaveBeenCalled();
});
