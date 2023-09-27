import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./Stack";
import { delay } from "../utils/utils";
import { ElementStates } from "../../types/element-states";

const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [stackState, setStackState] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setInputValue(targetValue);
  };

  const handleAddItem = () => {
    stack.push(inputValue);
    const item = stack.peek();
    item && setStackState((prev) => [...prev, item]);
    setInputValue("");
  };

  const handleDeleteItem = async () => {
    stack.pop();
    setStackState(stack.toArray());
  };

  const handleClearArray = () => {
    stack.clear();
    setStackState(stack.toArray());
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
              state = {ElementStates.Modified}
              head={arr.length - 1 === index ? "top" : ""}
              letter={`${item}`}
              key={index}
              index={index}
              extraClass={styles.circle}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
