import styles from "../../styles/data-structure.module.css";
import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import useInput from "../../hooks/useInput";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue, handleInputChange] = useInput("");
  const [queueState, setQueueState] = useState<string[]>([]);
  const [circleState, setCircleState] = useState<ElementStates[]>([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push("");
    }

    setQueueState(arr);
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
        <Button text="Добавить" />
        <Button text="Удалить" />
        <Button extraClass={styles.button} text="Очистить" />
      </div>
      <div className={styles.container}>
        {queueState.map((item, index, arr) => {
          return (
            <Circle
              extraClass={styles.circle}
              state={circleState[index]}
              head={item ? "top" : ""}
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
