import styles from "../../styles/data-structure.module.css";
import React, { useEffect, useState } from "react";
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
  const [inputValue, setInputValue, handleInputChange] = useInput<string>("");
  const [queueState, setQueueState] = useState<(string | null)[]>([]);
  const [circleState, setCircleState] = useState<ElementStates[]>([]);
  const [events, setEvents] = useState({
    addEvent: false,
    removeEvent: false,
    clearEvent: false,
  });

  /**
   * Функция добавления элемента в очередь
   *
   */
  const handleAddItem = async () => {
    setEvents((prev) => ({
      ...prev,
      addEvent: true,
    }));
    queue.enqueue(inputValue);
    setInputValue("");
    updateCircleColor(ElementStates.Changing, queue.tail);
    await delay(500);
    updateCircleColor(ElementStates.Default, queue.tail);
    setQueueState([...queue.getArray()]);
    setEvents((prev) => ({
      ...prev,
      addEvent: false,
    }));
  };

  /**
   * Функция удаления первого элемента из очереди
   *
   */
  const handleDeleteItem = async () => {
    setEvents((prev) => ({
      ...prev,
      removeEvent: true,
    }));
    updateCircleColor(ElementStates.Changing, queue.head);
    await delay(500);
    updateCircleColor(ElementStates.Default, queue.head);
    queue.dequeue();
    setQueueState([...queue.getArray()]);
    setEvents((prev) => ({
      ...prev,
      removeEvent: false,
    }));
  };

  /**
   * Функция обнуления массива
   *
   */
  const clearQueue = async () => {
    setCircleState((prev) => {
      const arr = prev.map((item, index) => {
        return queueState[index]
          ? (item = ElementStates.Changing)
          : (item = ElementStates.Default);
      });
      return [...arr];
    });
    await delay(500);
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
          isLoader={events.addEvent}
        />
        <Button
          text="Удалить"
          onClick={handleDeleteItem}
          disabled={queue.isEmpty()}
          isLoader={events.removeEvent}
        />
        <Button
          extraClass={styles.button}
          text="Очистить"
          onClick={clearQueue}
          disabled={queue.head === 0 && queue.tail === 0 && queue.isEmpty()}
          isLoader={events.clearEvent}
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
