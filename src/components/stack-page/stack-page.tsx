import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { Circle } from "../ui/circle/circle";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <div className={styles.form}>
        <Input extraClass={styles.input} isLimitText={true} maxLength={4} />
        <Button text="Добавить" />
        <Button text="Удалить" />
        <Button extraClass={styles.button} text="Очистить" />
      </div>
      <div className={styles.container}>
        <Circle
          head="top"
          letter={`${0}`}
          key={0}
          index={0}
          extraClass={styles.circle}
        />
        <Circle letter={`${0}`} key={0} index={0} extraClass={styles.circle} />
      </div>
    </SolutionLayout>
  );
};
