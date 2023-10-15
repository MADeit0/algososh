import styles from "./fibonacci.module.css";
import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { getFibonacci } from "./utils";
import useInput from "../../hooks/useInput";

export const FibonacciPage: React.FC = () => {
  const intervalRef = useRef<NodeJS.Timer>(null);
  const [isLoader, setIsLoader] = useState(false);
  const [inputNumber, setInputNumber, handleInputChange] = useInput<number>(0);
  const [fibArray, setFibArray] = useState<number[]>([]);

  const handleReverseClick = () => {
    setIsLoader(true);
    setFibArray([]);
  };

  useEffect(() => {
    if (isLoader) {
      getFibonacci(setFibArray, setIsLoader, inputNumber, intervalRef);
    }
    //eslint-disable-next-line
  }, [isLoader]);

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
          type="number"
          maxLength={2}
          min={1}
          max={19}
          step={1}
          onChange={handleInputChange}
          value={inputNumber}
        />
        <Button
          onClick={handleReverseClick}
          extraClass={styles.button}
          text="Развернуть"
          isLoader={isLoader}
          disabled={!inputNumber || inputNumber < 0 || inputNumber > 19}
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
