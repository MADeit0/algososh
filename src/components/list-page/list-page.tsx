import styles from "../../styles/data-structure.module.css";
import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import useInput from "../../hooks/useInput";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ReturnIcon } from "../ui/icons/return-icon";
import { AscendingIcon } from "../ui/icons/ascending-icon";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue, handleInputChange] = useInput("");
  const [inputIndex, setInputIndex, handleIndexChange] = useInput("");

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.form}>
        <Input
          extraClass={styles.input_linkedList}
          isLimitText={true}
          maxLength={4}
          onChange={handleInputChange}
          value={inputValue}
        />
        <Button extraClass={styles.button_wrap} text="Добавить в head" />
        <Button extraClass={styles.button_wrap} text="Добавить в tail" />
        <Button extraClass={styles.button_wrap} text="Удалить из head" />
        <Button extraClass={styles.button_wrap} text="Удалить из tail" />
      </div>
      <div className={styles.form}>
        <Input
          extraClass={styles.input_linkedList}
          maxLength={4}
          onChange={handleIndexChange}
          placeholder="Введите индекс"
          value={inputIndex}
        />
        <Button extraClass={styles.button_wrap} text="Добавить в head" />
        <Button extraClass={styles.button_wrap} text="Добавить в tail" />
      </div>
      <ul className={styles.container}>
        <li className={styles.list}>
          <Circle extraClass={styles.circle} letter={"sdsds"} />
          <ArrowIcon />
        </li>
        <li className={styles.list}>
          <Circle extraClass={styles.circle} letter={"sdsds"} />
          <ArrowIcon />
        </li>
      </ul>
    </SolutionLayout>
  );
};
