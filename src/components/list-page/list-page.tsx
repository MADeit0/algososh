import styles from "../../styles/data-structure.module.css";
import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import useInput from "../../hooks/useInput";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./LinkedList";
import { ElementStates } from "../../types/element-states";
import { delay } from "../utils/utils";

enum Position {
  HEAD = "head",
  TAIL = "tail",
}

const linkedList = new LinkedList<string>();

export const ListPage: React.FC = () => {
  const [list, setList] = useState<string[]>([]);
  const [inputValue, setInputValue, handleInputChange] = useInput("");
  const [inputIndex, setInputIndex, handleIndexChange] = useInput("");

  const [circleState, setCircleState] = useState<ElementStates[]>([]);
  const [events, setEvents] = useState({
    addEvent: false,
    removeEvent: false,
  });
  const countRef = useRef<number>(0);

  const performLinkedListOperation = async (
    positionOrIndex: number,
    operation: (list: LinkedList<string>) => void
  ) => {
    countRef.current = positionOrIndex;
    updateCircleColor(ElementStates.Changing, positionOrIndex);
    await delay(500);
    updateCircleColor(ElementStates.Default, positionOrIndex);

    operation(linkedList);

    setList([...linkedList.ToArray()]);
  };

  const addElementByIndex = async () => {
    const count = Number(inputIndex);
    const size = linkedList.getSize() - 1;

    switch (true) {
      case count === 0:
        addElementAtHead();
        break;
      case count === size:
        addElementAtTail();
        break;
      case count > 0 && count < size:
        setEvents((prev) => ({
          ...prev,
          addEvent: true,
        }));
        for (let i = 0; i < count; i++) {
          countRef.current = i;
          updateCircleColor(ElementStates.Changing, i);
          await delay(500);
        }
        //
        await performLinkedListOperation(count, (list) => {
          list.insertElement(inputValue, count);
        });
        setEvents((prev) => ({
          ...prev,
          addEvent: false,
        }));
        //
        updateCircleColor(ElementStates.Modified, count);
        await delay(500);
        setCircleState([]);
        break;
      default:
        throw new Error(`Неверный индекс: ${count}`);
    }
  };

  const removeElementByIndex = async () => {
    const count = Number(inputIndex);
    const size = linkedList.getSize() - 1;

    switch (true) {
      case count === 0:
        removeElementAtHead();
        break;
      case count === size:
        removeElementAtTail();
        break;
      case count > 0 && count < size:
        for (let i = 0; i <= count; i++) {
          updateCircleColor(ElementStates.Changing, i);
          await delay(500);
        }
        //
        setEvents((prev) => ({
          ...prev,
          removeEvent: true,
        }));
        await performLinkedListOperation(count, (list) => {
          list.removeElement(count);
        });
        setEvents((prev) => ({
          ...prev,
          removeEvent: false,
        }));
        //
        setCircleState([]);
        break;
      default:
        throw new Error(`Неверный индекс: ${count}`);
    }
  };

  const addElementAtHead = async () => {
    setEvents((prev) => ({
      ...prev,
      addEvent: true,
    }));
    await performLinkedListOperation(0, (list) => {
      list.prepend(inputValue);
    });
    setEvents((prev) => ({
      ...prev,
      addEvent: false,
    }));
    updateCircleColor(ElementStates.Modified, 0);
    await delay(500);
    updateCircleColor(ElementStates.Default, 0);
  };

  const addElementAtTail = async () => {
    setEvents((prev) => ({
      ...prev,
      addEvent: true,
    }));
    const size = linkedList.getSize() - 1;
    await performLinkedListOperation(size, (list) => {
      list.append(inputValue);
    });
    setEvents((prev) => ({
      ...prev,
      addEvent: false,
    }));
    updateCircleColor(ElementStates.Modified, size + 1);
    await delay(500);
    updateCircleColor(ElementStates.Default, size + 1);
  };

  const removeElementAtHead = async () => {
    setEvents((prev) => ({
      ...prev,
      removeEvent: true,
    }));
    await performLinkedListOperation(0, (list) => {
      list.shift();
    });
    setEvents((prev) => ({
      ...prev,
      removeEvent: false,
    }));
  };

  const removeElementAtTail = async () => {
    setEvents((prev) => ({
      ...prev,
      removeEvent: true,
    }));
    const size = linkedList.getSize() - 1;
    await performLinkedListOperation(size, (list) => {
      list.pop();
    });
    setEvents((prev) => ({
      ...prev,
      removeEvent: false,
    }));
  };

  /**
   *Функция  обновляющая цвет у элемента
   *
   * @param {ElementStates} elementStates цвет элемента (выбирается из коллекции)
   */
  const updateCircleColor = (elementStates: ElementStates, index: number) => {
    setCircleState((prev) => {
      let newArr = [...prev];
      newArr[index] = elementStates;
      return newArr;
    });
  };

  const smileCircleState = (
    indexValue: number,
    index: number
  ): false | JSX.Element => {
    const letter = events.removeEvent ? list[index] : inputValue;

    return (
      indexValue === index &&
      circleState[indexValue] === ElementStates.Changing && (
        <Circle isSmall={true} letter={letter} state={ElementStates.Changing} />
      )
    );
  };

  const isPosition = (index: number, position: Position): Position | null => {
    if (index === 0 && position === Position.HEAD) {
      return Position.HEAD;
    } else if (index === list.length - 1 && position === Position.TAIL) {
      return Position.TAIL;
    }
    return null;
  };

  useEffect(() => {
    linkedList.fromArray(["0", "1", "2", "3"]);
    setList([...linkedList.ToArray()]);
  }, []);

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
        <Button
          extraClass={styles.button_wrap}
          text="Добавить в head"
          onClick={addElementAtHead}
        />
        <Button
          extraClass={styles.button_wrap}
          text="Добавить в tail"
          onClick={addElementAtTail}
        />
        <Button
          extraClass={styles.button_wrap}
          text="Удалить из head"
          onClick={removeElementAtHead}
        />
        <Button
          extraClass={styles.button_wrap}
          text="Удалить из tail"
          onClick={removeElementAtTail}
        />
      </div>
      <div className={styles.form}>
        <Input
          extraClass={styles.input_linkedList}
          maxLength={4}
          onChange={handleIndexChange}
          placeholder="Введите индекс"
          value={inputIndex}
        />
        <Button
          extraClass={styles.button_wrap}
          text="Добавить в head"
          onClick={addElementByIndex}
        />
        <Button
          extraClass={styles.button_wrap}
          text="Добавить в tail"
          onClick={removeElementByIndex}
        />
      </div>
      <ul className={styles.container}>
        {list.map((item, index, arr) => {
          return (
            <li className={styles.list} key={index}>
              <Circle
                extraClass={styles.circle}
                letter={item}
                state={circleState[index]}
                head={
                  (events.addEvent &&
                    smileCircleState(Number(countRef.current), index)) ||
                  isPosition(index, Position.HEAD)
                }
                tail={
                  (events.removeEvent &&
                    smileCircleState(Number(countRef.current), index)) ||
                  isPosition(index, Position.TAIL)
                }
              />
              {index < arr.length - 1 && <ArrowIcon />}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
