import styles from "./fibonacci.module.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { getFibonacci } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputValue, setInputValue] = useState<number>(0);
  const [fibArray, setFibArray] = useState<number[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue: number = parseInt(e.target.value, 10);
    setInputValue(targetValue);
  };

  const handleReverseClick = () => {
    setIsLoader(true);
    setFibArray([]);
  };

  useEffect(() => {
    inputValue !== 0 && inputValue <= 19
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [inputValue]);

  useEffect(() => {
    if (isLoader) {
      getFibonacci(setFibArray, setIsLoader, inputValue, isLoader);
    }

    return () => {
      setIsLoader(false);
    };
  }, [inputValue, isLoader]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.form}>
        <Input
          extraClass={styles.input}
          isLimitText={true}
          type={""}
          maxLength={2}
          max={19}
          onChange={handleInputChange}
          value={inputValue || 0}
        />
        <Button
          onClick={handleReverseClick}
          extraClass={styles.button}
          text="Развернуть"
          isLoader={isLoader}
          disabled={isDisabled}
        />
      </div>
      <div className={styles.container}>
        {fibArray.map((item, index) => {
          return (
            <Circle
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
