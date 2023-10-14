import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { reverseString } from "./utils";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const intervalRef = useRef<NodeJS.Timer>(null);
  const [isSorting, setIsSorting] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [reversedStr, setReversedStr] = useState<string[]>([]);
  const [circleStates, setCircleStates] = useState<ElementStates[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleReverseClick = () => {
    setIsSorting(true);
    setCircleStates([]);
  };

  useEffect(() => {
    if (isSorting) {
      reverseString(
        inputValue,
        setIsSorting,
        setReversedStr,
        setCircleStates,
        isSorting,
        intervalRef
      );
    }
  }, [isSorting, inputValue]);

  useEffect(() => {
    let interval = intervalRef;
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  return (
    <SolutionLayout title="Строка">
      <div className={styles.form}>
        <Input
          extraClass={styles.input}
          isLimitText={true}
          maxLength={11}
          onChange={handleInputChange}
          value={inputValue}
        />
        <Button
          onClick={handleReverseClick}
          extraClass={styles.button}
          text="Развернуть"
          isLoader={isSorting}
        />
      </div>
      <div className={styles.container}>
        {reversedStr.map((item, index) => {
          return (
            <Circle letter={item} key={index} state={circleStates[index]} />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
