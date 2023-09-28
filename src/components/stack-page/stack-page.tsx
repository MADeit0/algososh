import styles from "./stack-page.module.css";
import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./Stack";
import { delay } from "../utils/utils";
import { ElementStates } from "../../types/element-states";

//Инстанс класса имитирующий структуру стека
const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [stackState, setStackState] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [circleState, setCircleState] = useState<ElementStates[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setInputValue(targetValue);
  };

  /**
   *Функция добавления последнего элемента в стек
   *
   */
  const handleAddItem = async () => {
    stack.push(inputValue);
    const item = stack.peek();

    if (item) {
      setCircleState((prev) => [...prev, ElementStates.Changing]);
      setStackState((prev) => [...prev, item]);
      await delay(500);
      updateCircleColor(ElementStates.Default);
      setInputValue("");
    }
  };

  /**
   *Функция удаления последнего элемента из стека
   *
   */
  const handleDeleteItem = async () => {
    updateCircleColor(ElementStates.Changing);
    await delay(500);
    stack.pop();
    setStackState(stack.toArray());

    setCircleState((prev) => {
      const newArray = [...prev];
      newArray.pop();
      return newArray;
    });
  };

  /**
   *Функция обнуления массива
   *
   */
  const handleClearArray = () => {
    stack.clear();
    setStackState(stack.toArray());
    setCircleState([]);
  };

  /**
   *Функция  обновляющая цвет у элемента
   *
   * @param {ElementStates} elementStates цвет элемента (выбирается из коллекции)
   */
  const updateCircleColor = (elementStates: ElementStates) => {
    setCircleState((prev) => {
      prev[prev.length - 1] = elementStates;
      return [...prev];
    });
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.form}>
        <Input
          extraClass={styles.input}
          isLimitText={true}
          maxLength={4}
          onChange={handleInputChange}
          value={inputValue}
        />
        <Button
          text="Добавить"
          disabled={!inputValue}
          onClick={handleAddItem}
        />
        <Button
          text="Удалить"
          disabled={!stackState?.length}
          onClick={handleDeleteItem}
        />
        <Button
          extraClass={styles.button}
          text="Очистить"
          disabled={!stackState?.length}
          onClick={handleClearArray}
        />
      </div>
      <div className={styles.container}>
        {stackState.map((item, index, arr) => {
          return (
            <Circle
              extraClass={styles.circle}
              state={circleState[index]}
              head={arr.length - 1 === index ? "top" : ""}
              letter={`${item}`}
              key={index}
              index={index}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
