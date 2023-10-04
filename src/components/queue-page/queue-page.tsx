import styles from "../../styles/data-structure.module.css";
import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import useInput from "../../hooks/useInput";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./Queue";
import { delay } from "../utils/utils";

const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue, handleInputChange] = useInput("");
  const [queueState, setQueueState] = useState<(string | null)[]>([]);
  const [circleState, setCircleState] = useState<ElementStates[]>([]);

  /**
   * Функция добавления элемента в очередь
   *
   */
  const handleAddItem = async () => {
    queue.enqueue(inputValue);
    setInputValue("");
    updateCircleColor(ElementStates.Changing, queue.tail);
    await delay(500);
    updateCircleColor(ElementStates.Default, queue.tail);
    setQueueState([...queue.getArray()]);
  };

  /**
   * Функция удаления первого элемента из очереди
   *
   */
  const handleDeleteItem = async () => {
    updateCircleColor(ElementStates.Changing, queue.head);
    await delay(500);
    updateCircleColor(ElementStates.Default, queue.head);
    queue.dequeue();
    setQueueState([...queue.getArray()]);
  };

  /**
   * Функция обнуления массива
   *
   */
  const clearQueue = () => {
    queue.clear();
    setQueueState([...queue.getArray()]);
    setCircleState([]);
  };

  /**
   *Функция  обновляющая цвет у элемента
   *
   * @param {ElementStates} elementStates цвет элемента (выбирается из коллекции)
   */
  const updateCircleColor = (elementStates: ElementStates, index: number) => {
    setCircleState((prev) => {
      let newArr = [...prev];
      newArr[index] = elementStates;
      return newArr;
    });
  };

  useEffect(() => {
    setQueueState([...queue.getArray()]);

    return () => {
      queue.clear();
    };
  }, []);

  return (
    <SolutionLayout title="Очередь">
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
          onClick={handleAddItem}
          disabled={!inputValue || queue.tail === queue.size - 1}
        />
        <Button
          text="Удалить"
          onClick={handleDeleteItem}
          disabled={queue.isEmpty()}
        />
        <Button
          extraClass={styles.button}
          text="Очистить"
          onClick={clearQueue}
          disabled={queue.head === 0 && queue.tail === 0 && queue.isEmpty()}
        />
      </div>
      <div className={styles.container}>
        {queueState.map((item, index) => {
          return (
            <Circle
              extraClass={styles.circle}
              state={circleState[index]}
              head={index === queue.head ? "head" : ""}
              tail={index === queue.tail && !queue.isEmpty() ? "tail" : ""}
              letter={item || undefined}
              key={index}
              index={index}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
