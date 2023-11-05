import styles from "../../styles/data-structure.module.css";
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./Stack";
import { delay } from "../utils/utils";
import { ElementStates } from "../../types/element-states";
import useInput from "../../hooks/useInput";

//Инстанс класса имитирующий структуру стека
const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue, handleInputChange] = useInput<string>("");
  const [stackState, setStackState] = useState<string[]>([]);
  const [circleState, setCircleState] = useState<ElementStates[]>([]);
  const [stackSize, setStackSize] = useState<number>(0);
  const [events, setEvents] = useState({
    addEvent: false,
    removeEvent: false,
    clearEvent: false,
  });

  /**
   *Функция добавления последнего элемента в стек
   *
   */
  const handleAddItem = async () => {
    setEvents((prev) => ({
      ...prev,
      addEvent: true,
    }));
    stack.push(inputValue);
    setStackSize(stack.size());

    const item = stack.peek();
    if (item) {
      setCircleState((prev) => [...prev, ElementStates.Changing]);
      setStackState((prev) => [...prev, item]);
      setInputValue("");
      await delay(500);
      updateCircleColor(ElementStates.Default);
    }
    setEvents((prev) => ({
      ...prev,
      addEvent: false,
    }));
  };

  /**
   *Функция удаления последнего элемента из стека
   *
   */
  const handleDeleteItem = async () => {
    setEvents((prev) => ({
      ...prev,
      removeEvent: true,
    }));
    updateCircleColor(ElementStates.Changing);
    await delay(500);
    stack.pop();
    setStackSize(stack.size());
    setStackState(stack.toArray());

    setCircleState((prev) => {
      const newArray = [...prev];
      newArray.pop();
      return newArray;
    });
    setEvents((prev) => ({
      ...prev,
      removeEvent: false,
    }));
  };

  /**
   *Функция обнуления массива
   *
   */
  const handleClearArray = async () => {
    setEvents((prev) => ({
      ...prev,
      clearEvent: true,
    }));
    stack.clear();

    setCircleState((prev) => {
      const arr = prev.map((item) => (item = ElementStates.Changing));
      return [...arr];
    });
    await delay(500);
    setStackSize(stack.size());
    setStackState(stack.toArray());
    setCircleState([]);
    setEvents((prev) => ({
      ...prev,
      clearEvent: false,
    }));
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
          disabled={!inputValue || stackSize + 1 >= 10}
          onClick={handleAddItem}
          isLoader={events.addEvent}
          data-testid="btnAddItem"
        />
        <Button
          text="Удалить"
          disabled={!stackState?.length}
          onClick={handleDeleteItem}
          isLoader={events.removeEvent}
          data-testid="btnDeleteItem"
        />
        <Button
          extraClass={styles.button}
          text="Очистить"
          disabled={!stackState?.length}
          onClick={handleClearArray}
          isLoader={events.clearEvent}
          data-testid="btnClearAll"
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
