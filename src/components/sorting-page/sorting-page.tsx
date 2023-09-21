import styles from "./sorting-page.module.css";
import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SortMethods } from "../../types/sorting-types";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { randomArr, selectionSort } from "./utils";
import { ElementStates } from "../../types/element-states";
import { bubbleSort } from "./bubbleSort";

export const SortingPage: React.FC = () => {
  const isSorting = useRef<boolean>(false);
  const [sortMethod, setSortMethod] = useState<SortMethods>(
    SortMethods.Selection
  );
  const [array, setArray] = useState<number[]>([]);
  const [columnState, setColumnState] = useState<ElementStates[]>([]);
  const [isSortingAscending, setIsSortingAscending] = useState<boolean>(false);
  const [isSortingDescending, setIsSortingDescending] = useState<boolean>(
    false
  );
  /**
   *Функция остановки сортировки
   *
   */
  const stopSorting = () => {
    setColumnState([]);
    isSorting.current = false;
  };
  /**
   *Функция генерции массива колонок
   *
   */
  const handleGeneratingArray = () => {
    const newArr = randomArr(17, 3);
    setColumnState([]);
    setArray([...newArr]);
  };

  /**
   *Функция устанавлявающая состояния для сортировки по возрастанию
   *
   */
  const handleSortingAscending = async () => {
    setIsSortingDescending(false);
    setIsSortingAscending(true);
    await sorting(false);
    setIsSortingAscending(false);
  };

  /**
   *Функция устанавлявающая состояния для сортировки по убыванию
   *
   */
  const handleSortingDescending = async () => {
    setIsSortingAscending(false);
    setIsSortingDescending(true);
    await sorting(true);
    setIsSortingDescending(false);
  };

  /**
   *Функция запускающая сортировку по выбору или пузырьком
   *
   * @param {boolean} reverse Флаг установки сортировки по возрастанию или убыванию
   */
  const sorting = async (reverse: boolean) => {
    isSorting.current = true;

    if (sortMethod === SortMethods.Selection) {
      // Сортировка выбором
      await selectionSort(array, setArray, setColumnState, isSorting, reverse);
    } else {
      // Иначе сортировка пузырьком
      await bubbleSort(array, setArray, setColumnState, isSorting, reverse);
    }
    isSorting.current = false;
  };

  useEffect(() => {
    handleGeneratingArray();
  }, []);

  useEffect(() => {
    return () => {
      isSorting.current = false;
    };
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
          disabled={isSortingDescending}
        />
        <Button
          extraClass={`${styles.button_sorting_descending} mr-40`}
          text="По убыванию"
          sorting={Direction.Descending}
          onClick={handleSortingDescending}
          isLoader={isSortingDescending}
          disabled={isSortingAscending}
        />
        <Button
          extraClass={styles.button}
          text={isSorting.current ? "Стоп" : "Новый массив"}
          onClick={isSorting.current ? stopSorting : handleGeneratingArray}
        />
      </div>
      <div className={styles.container}>
        {array.map((item, index) => {
          return <Column index={item} state={columnState[index]} key={index} />;
        })}
      </div>
    </SolutionLayout>
  );
};
