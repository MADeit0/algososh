import styles from "./sorting-page.module.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SortMethods } from "../../types/sorting-types";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {
  const [sortMethod, setSortMethod] = useState<SortMethods>(
    SortMethods.Selection
  );

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.form}>
        <RadioInput
          extraClass="mr-20"
          label="Выбор"
          name="sortMethod"
          checked={sortMethod === SortMethods.Selection}
          onChange={() => {
            setSortMethod(SortMethods.Selection);
          }}
        />
        <RadioInput
          extraClass="mr-25"
          label="Пузырёк"
          name="sortMethod"
          checked={sortMethod === SortMethods.Bubble}
          onChange={() => {
            setSortMethod(SortMethods.Bubble);
          }}
        />
        <Button
          extraClass={`${styles.button_sorting} mr-6`}
          text="По возрастанию"
          sorting={Direction.Ascending}
        />
        <Button
          extraClass={`${styles.button_sorting} mr-40`}
          text="По убыванию"
          sorting={Direction.Descending}
        />
        <Button extraClass={styles.button} text="Новый массив" />
      </div>
    </SolutionLayout>
  );
};
