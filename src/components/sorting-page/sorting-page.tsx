import styles from "./sorting-page.module.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SortMethods } from "../../types/sorting-types";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { randomArr } from "./utils";

export const SortingPage: React.FC = () => {
  const [sortMethod, setSortMethod] = useState<SortMethods>(
    SortMethods.Selection
  );
  const [array, setArray] = useState<number[]>([]);
  const [isSortingAscending, setIsSortingAscending] = useState(false);
  const [isSortingDescending, setIsSortingDescending] = useState(false);

  const handleSortingAscending = () => {
    console.log("handleSortingAscending");
    setIsSortingAscending(true);
    sorting();
  };
  const handleSortingDescending = () => {
    console.log("handleSortingDescending");
    setIsSortingDescending(true);
    sorting();
  };

  const handleGeneratingArray = () => {
    const newArr = randomArr(17, 3);
    console.log(newArr);
    setArray([...newArr]);
  };

  const sorting = () => {
    if (sortMethod === SortMethods.Selection) {
      console.log("selection");
    } else {
      console.log("booble");
    }
  };

  useEffect(() => {
    handleGeneratingArray();
  }, []);

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
          extraClass={`${styles.button_sorting_ascending} mr-6`}
          text="По возрастанию"
          sorting={Direction.Ascending}
          onClick={handleSortingAscending}
          isLoader={isSortingAscending}
        />
        <Button
          extraClass={`${styles.button_sorting_descending} mr-40`}
          text="По убыванию"
          sorting={Direction.Descending}
          onClick={handleSortingDescending}
          isLoader={isSortingDescending}
        />
        <Button
          extraClass={styles.button}
          text="Новый массив"
          onClick={handleGeneratingArray}
        />
      </div>
      <div className={styles.container}>
        {array.map((item, index) => {
          return <Column index={item} key={index} />;
        })}
      </div>
    </SolutionLayout>
  );
};
