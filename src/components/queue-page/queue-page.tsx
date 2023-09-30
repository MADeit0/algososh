import styles from "../../styles/data-structure.module.css";
import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import useInput from "../../hooks/useInput";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue, handleInputChange] = useInput("");

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
      <div className={styles.container}></div>
    </SolutionLayout>
  );
};
