import styles from "./fibonacci.module.css";
import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { getFibonacci } from "./utils";
import useInputNumber from "../../hooks/useInputNumber";

export const FibonacciPage: React.FC = () => {
  const intervalRef = useRef<NodeJS.Timer>(null);
  const [isLoader, setIsLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputNumber, setInputNumber, handleIndexChange] = useInputNumber(0);
  const [fibArray, setFibArray] = useState<number[]>([]);

  const handleReverseClick = () => {
    setIsLoader(true);
    setFibArray([]);
  };

  useEffect(() => {
    inputNumber !== 0 && inputNumber <= 19
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [inputNumber]);

  useEffect(() => {
    if (isLoader) {
      getFibonacci(
        setFibArray,
        setIsLoader,
        inputNumber,
        isLoader,
        intervalRef
      );
    }
  }, [inputNumber, isLoader]);

  useEffect(() => {
    let interval = intervalRef;
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.form}>
        <Input
          extraClass={styles.input}
          isLimitText={true}
          type={""}
          maxLength={2}
          max={19}
          onChange={handleIndexChange}
          value={inputNumber}
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
