import React, { useState, useEffect, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { reverseString } from "./utils";
import { ElementStates } from "../../types/element-states";
import useInput from "../../hooks/useInput";

export const StringComponent: React.FC = () => {
  const intervalRef = useRef<NodeJS.Timer>(null);
  const [isSorting, setIsSorting] = useState(false);
  const [inputValue, setInputValue, handleInputChange] = useInput<string>("");
  const [reversedStr, setReversedStr] = useState<string[]>([]);
  const [circleStates, setCircleStates] = useState<ElementStates[]>([]);

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
        intervalRef
      );
    }
    //eslint-disable-next-line
  }, [isSorting]);

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
          disabled={!inputValue}
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
