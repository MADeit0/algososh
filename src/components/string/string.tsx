import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { reverseString } from "./utils";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [isSorting, setIsSorting] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [reversedStr, setReversedStr] = useState<string[]>([]);
  const [circleStates, setCircleStates] = useState<ElementStates[]>([]);

  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleReverseClick = () => {
    setIsSorting(true);
    setCircleStates([])
    reverseString(inputValue, setIsSorting, setReversedStr, setCircleStates);
  };

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
            <Circle
              letter={item}
              key={index}
              state={circleStates[index]}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
